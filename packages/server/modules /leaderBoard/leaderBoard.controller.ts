import type { Request, Response } from 'express'
import { LeaderBoard } from './leaderBoard.model'

export const getLeaderList = async (_req: Request, res: Response) => {
  try {
    const leaderBoard = await LeaderBoard.findAll({
      order: [['point', 'DESC']]
    })

    return res.json(leaderBoard)
  } catch (err) {
    return res
      .status(500)
      .json({ errors: 'Error' })
  }
}

export const getPointUser = async (req: Request, res: Response) => {
  try {
    const { idUser } = req.params
    const numberIdUser = Number(idUser)

    const pointUser = await LeaderBoard.findOne({
      where: { idUser:numberIdUser }
    });

    return res.json(pointUser)
  } catch (err) {
    return res
      .status(500)
      .json({ errors: 'Error' })
  }
}

export const writePointUser = async (req: Request, res: Response) => {
  try {
    const { idUser } = req.params
    const { point } = req.body
    const numberIdUser = Number(idUser)
    const numberPoint = Number(point)

    const [user] = await LeaderBoard.findOrCreate({
      where: { idUser:numberIdUser },
      defaults: {
        idUser: numberIdUser,
        point: 0
      }
    })

    console.log(user)

    user.point = Math.max(user.point, numberPoint)
    await user.save()

    return res.status(201).json({ user })
  } catch (err) {
    return res
      .status(500)
      .json({ errors: 'Error' })
  }
}
