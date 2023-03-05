import type { User } from '../modules /auth/auth.model';
import type { Request } from 'express';

export type TUserFull = {
  id: number,
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
  display_name: string | null,
  avatar: string | null,
}

export type TUserProfile = Omit<TUserFull, 'password'>

export type TUserLogin = {
  login: string,
  password: string,
}

export type TUserRequest = Request & { user? : User }
