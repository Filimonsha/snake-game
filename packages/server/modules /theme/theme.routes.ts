import { Router } from 'express'
import { createTheme, requestTheme, updateTheme } from './theme.controller'
import { checkLoggedIn } from '../../utils/checkLoggedIn'

export const themeRoutes = Router({ mergeParams: true })
  .get('/:idUser', checkLoggedIn, requestTheme)
  .post('/:idUser', checkLoggedIn, createTheme)
  .put('/:idUser', checkLoggedIn, updateTheme)
