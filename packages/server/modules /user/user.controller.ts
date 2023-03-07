import type { Response } from 'express';
import type { TUserFull, TUserRequest } from '../../types/user';
import { User } from '../auth/auth.model';
import { getUserProfileData } from '../../utils/getUserData';

export const updateProfile = async (req: TUserRequest, res: Response) => {
  try {
    
    const userData  = req.user?.dataValues as TUserFull | undefined;
    if (!userData) {
      res
        .status(404)
        .send('User not found');
      return;
    }
    
    const { 
      first_name, second_name, display_name,
      login, email, phone
    } = req.body
    
    const user = await User.findByPk(userData.id);
    if (!user) {
      res
        .status(404)
        .send('User not found');
      return;
    }
    
    user.first_name = first_name;
    user.second_name = second_name;
    user.display_name = display_name;
    user.login = login;
    user.email = email;
    user.phone = phone;
    
    await user.save();
    
    const userInfo = getUserProfileData(user.dataValues);
    
    return res
      .status(200)
      .json(userInfo);
      
  } catch (error) {
    return res
      .status(500)
      .json({ reason: `${error}`});
  }
}

export const updatePassword = async (req: TUserRequest, res: Response) => {
  try {
    
    const { old_password, new_password } = req.body;
    
    const userData  = req.user?.dataValues as TUserFull | undefined;
    if (!userData) {
      res
        .status(404)
        .send('User not found');
      return;
    }
    
    const user = await User.findByPk(userData.id);
    if (!user) {
      return res
        .status(404)
        .json({ reason: 'User not found' });
    }

    const isPasswordValid = await user.checkPassword(old_password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: 'Invalid old password' });
    }

    user.password = new_password;
    await user.save();

    return res.status(200).json('Ok');
  } catch (error) {
    return res
      .status(500)
      .json({ reason: `${error}`});
  }
}

export const updateAvatar = () => {
  console.log('😃')
}
