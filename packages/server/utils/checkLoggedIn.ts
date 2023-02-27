import type { NextFunction, Request, Response } from 'express'

export const checkLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  // если true то дальше, false ошибка
  if (req) {
    next()
  } else {
    const message = 'Not logged in!'
    res.status(401).send({ message })
  }
}
