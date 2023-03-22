import type { Response, NextFunction } from 'express';
import { User } from '../modules/auth/auth.model';
import * as jwt from 'jsonwebtoken';
import { getToken } from '../utils/getToken';
import type { TUserRequest } from '../types/user';
import { authRoutes, redirectRoute } from '../constants';

const redirectMiddleware = async (req: TUserRequest, res: Response, next: NextFunction) => {
  
  if (!authRoutes.includes(req.originalUrl)) {
    next()
    return;
  }
  
  const token = getToken(req);
  
  if (!token) {
    res.redirect(redirectRoute)
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as {id: number};

    const user = await User.findOne({
      where: {
        id: decodedToken.id
      }
    });

    if (!user) {
      res.redirect(redirectRoute)
      return;
    }
    
    next();
    
  } catch (error) {
    res.redirect(redirectRoute)
    return;
  }
}

export { redirectMiddleware };
