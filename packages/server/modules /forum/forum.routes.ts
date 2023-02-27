import { checkLoggedIn } from '../../utils/checkLoggedIn'
import { Router } from 'express'
import { createResponse, createTopic, getResponsesList, getTopicsList } from './forum.controller'

export const forumRoutes = Router({ mergeParams: true })
  // список всех топиков
  .get('/', checkLoggedIn, getTopicsList)
  // создание топика
  .post('/', checkLoggedIn, createTopic)
  // получение всех сообщений из определенного топика
  .get('/:topicId/responses', checkLoggedIn, getResponsesList)
  // создание ответа к топику
  .post('/:topicId/responses', checkLoggedIn, createResponse)

