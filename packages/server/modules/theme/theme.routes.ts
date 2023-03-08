import { Router } from 'express'
import { createTheme, requestTheme, updateTheme } from './theme.controller'
import { checkLoggedIn } from '../../middlewares/checkLoggedIn'

export const themeRoutes = Router({ mergeParams: true })
  .get('/', checkLoggedIn, requestTheme)
  .post('/', checkLoggedIn, createTheme)
  .put('/', checkLoggedIn, updateTheme);
