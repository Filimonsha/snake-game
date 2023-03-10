import type { Request, Response, NextFunction } from 'express';
import { User } from '../modules/auth/auth.model';
import * as jwt from 'jsonwebtoken';
import { getToken } from '../utils/getToken';


// Проверка авторизации, чтобы пользователь 
// не мог зарегистрироваться или залогиниться дважды
// или сделать сразу одно и другое

const checkDoubleAuth = async (req: Request, res: Response, next: NextFunction) => {
  
  const token = getToken(req);
  
  if (!token) {
    next();
    return;
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as { id: number };

    const user = await User.findOne({
      where: {
        id: decodedToken.id
      }
    });

    if (!user) {
      next();
      return;
    }
    
    return res.status(400).json({ reason: 'User already in system' });
    
  } catch (error) {
    return res.status(500).json({ reason: `'${error}` });
  }
}

export { checkDoubleAuth };
