import { Router } from 'express'
import { updateProfile, updatePassword, updateAvatar, deleteAvatar } from './user.controller'
import { upload, uploadAvatar } from '../../middlewares/uploadAvatar';
import { checkLoggedIn } from '../../middlewares/checkLoggedIn'

export const userRoutes = Router({ mergeParams: true })
  .put('/profile', checkLoggedIn, updateProfile)
  .put('/password', checkLoggedIn, updatePassword)
  .delete('/avatar', checkLoggedIn, deleteAvatar)
  .put('/avatar',
    checkLoggedIn,
    upload.single('avatar'), 
    uploadAvatar, 
    updateAvatar
  )
