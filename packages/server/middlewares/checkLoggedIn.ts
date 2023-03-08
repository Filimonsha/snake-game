import type { Response, NextFunction } from 'express';
import { User } from '../modules/auth/auth.model';
import * as jwt from 'jsonwebtoken';
import { getToken } from '../utils/getToken';
import type { TUserRequest } from '../types/user';

const checkLoggedIn = async (req: TUserRequest, res: Response, next: NextFunction) => {
  
  const token = getToken(req);
  
  if (!token) {
    return res.status(401)
      .json({ reason: 'Not logged in' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as {id: number};

    const user = await User.findOne({
      where: {
        id: decodedToken.id
      }
    });

    if (!user) {
      return res.status(401)
        .json({ reason: 'User not found' });
    }
    
    req.user = user;
    next();
    return;
    
  } catch (error) {
    return res.status(500)
      .json({ reason: `${error}` });
  }
}

export { checkLoggedIn };
