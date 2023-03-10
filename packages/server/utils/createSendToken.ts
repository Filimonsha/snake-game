import type { Response, CookieOptions } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import type { User } from '../modules/auth/auth.model';

dotenv.config()

const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN
} =
  process.env

export const createSendToken = (user: User, statusCode: number, res: Response) => {
  const { id } = user;
  const cookieExpire = Date.now() + Number(JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000;
  
  const token = jwt.sign(
    { id }, 
    JWT_SECRET!, 
    { expiresIn: JWT_EXPIRES_IN! }
  );

  const cookieOptions: CookieOptions = {
    expires: new Date(cookieExpire),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({ id: user.id });
};
