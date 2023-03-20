import fetch from 'node-fetch'
import type { Request, Response } from 'express'
import { User } from '../auth/auth.model'
import type { TUserFull } from 'user'
import RandExp from 'randexp'
import { createSendToken } from '../../utils/createSendToken'
import { Pattern } from '../../constants/validation'

export const getServiceId = async (_req: Request, res: Response) => {
  try {
    const service_id = process.env.YANDEX_CLIENT_ID

    return res
      .status(200)
      .json({ service_id });
    
  } catch (error) {
    return res
      .status(500)
      .json({ reason: `${error}` });
  }
}

export const getOauthToken = async (req: Request, res: Response) => {
  const { code } = req.body;
  const client_id = process.env.YANDEX_CLIENT_ID as string;
  const client_secret = process.env.YANDEX_CLIENT_SECRET as string;

  const add_params = {
    grant_type: 'authorization_code',
    code,
    client_id,
    client_secret
  };

  const body = new URLSearchParams([
    ...Object.entries(add_params),
  ]).toString();
  
  try {
    const result = await fetch('https://oauth.yandex.ru/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then(response => response.json());

    if (result.access_token) {
      const user = await getUser(result.access_token, res)
        .then(response => response)
        .then(data => data);
      return res
        .status(200)
        .json(user);
    }

    return res
      .status(200)
      .json(result);
  
  } catch (error) {
    return res
      .status(500)
      .json({ reason: `${error}` });
  }
}

const getUser = async (token: string, res: Response) => {
  try {
    const data = await fetch('https://login.yandex.ru/info', {
      method: 'GET',
      headers: {
        'Authorization': `OAuth ${token}`,
      },
    })
      .then(response => response.json());

    const email = data.default_email;
    const user = await User.findOne({ 
      where: { email } 
    });
    
    if (!user) {
      const randexp = new RandExp(Pattern.Password)
      const gennedPassword = randexp.gen()

      const userData: TUserFull = {
        id: data.id,
        first_name: data.first_name,
        second_name: data.last_name,
        login: data.login,
        email: data.default_email,
        password: gennedPassword,
        phone: data.default_phone.number,
        display_name: data.display_name,
        avatar: null
      }
      
      await signUpWithOauth(userData, res)

    } else if (user) {
      
      await signInWithOauth(user, res)
    }
    
  } catch (error) {
    console.error(error)
  }
}

const signUpWithOauth = async (userData: TUserFull, res: Response) => {
  const user = await User.create(userData);

  await user.save();
  return createSendToken(user, 201, res);
}

const signInWithOauth = async (user: User, res: Response) => {
  try {

    return createSendToken(user, 200, res);
    
  } catch (error) {
    return res
      .status(500)
      .json({ reason: `${error}` });
  }
}
