import { Router } from 'express'
import { getServiceId, getOauthToken } from './oauth.controller'
import { checkDoubleAuth } from '../../middlewares/checkDoubleAuth'

export const oauthRoutes = Router({ mergeParams: true })
  .get('/yandex/service-id', getServiceId)
  .post('/yandex', checkDoubleAuth, getOauthToken)
