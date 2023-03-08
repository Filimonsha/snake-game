import { Router } from 'express'
import { signInUser, signUpUser, signOutUser, getAuthUserInfo } from './auth.controller'
import { checkLoggedIn } from '../../middlewares/checkLoggedIn'
import { checkDoubleAuth } from '../../middlewares/checkDoubleAuth'

export const authRoutes = Router({ mergeParams: true })
  .post('/signup', checkDoubleAuth, signUpUser)
  .post('/signin', checkDoubleAuth, signInUser)
  .post('/logout', checkLoggedIn, signOutUser)
  .get('/user', checkLoggedIn, getAuthUserInfo)
