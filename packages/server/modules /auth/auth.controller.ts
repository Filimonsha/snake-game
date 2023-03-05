import type { Request, Response } from 'express';
import type { TUserLogin, TUserFull } from '../../types/user';
import { validate } from 'class-validator';
import { User } from './auth.model';
import { createSendToken } from '../../utils/createSendToken';
import type { TUserRequest } from '../../types/user';
import { getUserProfileData } from '../../utils/getUserData';

export const signUpUser = async (req: Request, res: Response) => {
  try {
    
    const userData: TUserFull = req.body;
    const user = await User.create(userData);
    const validationErrors = await validate(user);

    if (validationErrors.length > 0) {
      const reason = validationErrors.join(', ')
      return res
        .status(400)
        .json({ reason });
    }

    await user.save();
    
    return createSendToken(user, 201, res);
    
  } catch (error) {
    return res
      .status(500)
      .json({ reason: `${error}` });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    
    const { login, password }: TUserLogin = req.body;
    const user = await User.findOne({ 
      where: { login } 
    });
    
    const isPasswordValid = await user?.checkPassword(password);


    if (!user || !isPasswordValid) {
      return res
        .status(401)
        .json({ reason: 'Invalid login or password' });
    }

    return createSendToken(user, 200, res);
    
  } catch (error) {
    return res
      .status(500)
      .json({ reason: `${error}` });
  }
};

export const signOutUser = async (_req: Request, res: Response) => {
  try {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true,
    });
    
    return res
      .status(200)
      .json('Ok');
      
  } catch(error) {
    return res
      .status(500)
      .json({ reason: `${error}` })
  }
}

export const getAuthUserInfo = async (req: TUserRequest, res: Response) => {
  try {
    
    const user  = req.user?.dataValues as TUserFull | undefined;
    
    if (!user) {
      return res
      .status(401)
      .json({ reason: 'User not found' });
    }
    
    const userInfo = getUserProfileData(user);
    
    return res
      .status(200)
      .json(userInfo);
    
  } catch(error) {
    return res
      .status(500)
      .json({ reason: `${error}` })
  }
}
