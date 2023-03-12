import { checkLoggedIn } from '../../middlewares/checkLoggedIn'
import { getLeaderList, getPointUser, writePointUser } from './leaderBoard.controller'
import { Router } from 'express'

export const leaderBoardRoutes = Router({ mergeParams: true })
  // список всех пользователей фильтр по очкам
  .get('/', checkLoggedIn, getLeaderList)
  // получение макс очков текущего пользователя
  .get('/:idUser', checkLoggedIn, getPointUser)
  // запись очков текущего пользователя
  .post('/:idUser', checkLoggedIn, writePointUser)
