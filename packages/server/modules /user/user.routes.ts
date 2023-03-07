import { Router } from 'express'
import { updateProfile, updatePassword } from './profile.controller'
import { upload, uploadAvatar } from './avatar.controller';
import { checkLoggedIn } from '../../utils/checkLoggedIn'

export const userRoutes = Router({ mergeParams: true })
  .put('/profile', checkLoggedIn, updateProfile)
  .put('/password', checkLoggedIn, updatePassword)
  .put('/avatar', upload.single('avatar'), uploadAvatar)
