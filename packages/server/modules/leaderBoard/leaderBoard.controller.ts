import type { Request, Response } from 'express'
import { LeaderBoard } from './leaderBoard.model'
import type { TUserRequest } from '../../types/user'
import { User } from '../auth/auth.model'

LeaderBoard.belongsTo(User, {
  foreignKey: 'idUser',
  targetKey: 'id',
  as: 'userData'
});

export const getLeaderList = async (_req: Request, res: Response) => {
  try {
    const leaderBoard = await LeaderBoard.findAll({
      order: [['score', 'DESC']],
      include: [{
        model: User,
        as: 'userData',
        attributes: ['login', 'avatar']
      }]
    })

    return res.json(leaderBoard)
  } catch (err) {
    return res
      .status(500)
      .json({ reason: `${err}` })
  }
}

export const getPointUser = async (req: TUserRequest, res: Response) => {
  try {
    
    if (!req.user) {
      throw new Error('User not found')
    }
    
    const idUser = req.user.id

    const [pointUser] = await LeaderBoard.findOrCreate({
      where: { idUser },
      defaults: {
        idUser,
        score: 0
      }
    })

    return res.json(pointUser)
  } catch (err) {
    return res
      .status(500)
      .json({ reason: `${err}` })
  }
}

export const writePointUser = async (req: TUserRequest, res: Response) => {
  try {
    
    if (!req.user) {
      throw new Error('User not found')
    }
    
    const idUser = req.user.id
    const { score } = req.body
    const numberScore = Number(score)

    const [user] = await LeaderBoard.findOrCreate({
      where: { idUser },
      defaults: {
        idUser,
        score: 0
      }
    })

    user.score = Math.max(user.score, numberScore)
    await user.save()

    return res.status(201).json({ user })
  } catch (err) {
    return res
      .status(500)
      .json({ reason: `${err}` })
  }
}
