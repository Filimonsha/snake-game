import { Router } from 'express'
import { updateProfile, updatePassword, updateAvatar } from './user.controller'
import { checkLoggedIn } from '../../utils/checkLoggedIn'

export const userRoutes = Router({ mergeParams: true })
  .put('/profile', checkLoggedIn, updateProfile)
  .put('/password', checkLoggedIn, updatePassword)
  .put('/avatar', checkLoggedIn, updateAvatar)
