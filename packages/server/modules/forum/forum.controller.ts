import type { Request, Response } from 'express'
import { ForumResponse, ForumTopic } from './forum.model'
import { User } from '../auth/auth.model'
import type { TUserRequest } from '../../types/user'

ForumResponse.belongsTo(User, {
  foreignKey: 'idUser',
  targetKey: 'id',
  as: 'userData'
});

ForumTopic.belongsTo(User, {
  foreignKey: 'creatorUserId',
  targetKey: 'id',
  as: 'creatorUserData'
});


export const getTopicsList = async (_req: Request, res: Response) => {
  try {
    const forumTopics = await ForumTopic.findAll({
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        as: 'creatorUserData',
        attributes: ['login', 'avatar']
      }]
      
    })

    return res.json(forumTopics)
  } catch (err) {
    return res
      .status(500)
      .json({ reason: `${err}` })
  }
}

export const getResponsesList = async (req: Request, res: Response) => {
  
  try {
    const { topicId } = req.params
    const numberTopicId = Number(topicId)

    const forumResponses = await ForumResponse.findAll({
      where: { topicId: numberTopicId },
      order: [['createdAt', 'ASC']],
      include: [{
        model: User,
        as: 'userData',
        attributes: ['login', 'avatar']
      }]
    })

    return res.json(forumResponses)
  } catch (err) {
    return res
      .status(500)
      .json({ reason: `${err}` })
  }
}

export const createTopic = async (req: TUserRequest, res: Response) => {
  try {
    const { title } = req.body
    
    if (!req.user) {
      throw new Error('User not found')
    }
    
    const {id: creatorUserId, login, avatar } = req.user

    const forumTopic = await ForumTopic.create({
      title,
      creatorUserId
    })
    
    const forumTopicResponse = { ...forumTopic.dataValues, creatorUserData: { login, avatar }}

    return res.status(201).json(forumTopicResponse)
  } catch (err) {
    return res
      .status(500)
      .json({ reason: `${err}` })
  }
}

export const createResponse = async (req: TUserRequest, res: Response) => {
  try {
    const { topicId } = req.params
    const { text } = req.body
    
    const numberTopicId = Number(topicId)
    
    if (!req.user) {
      throw new Error('User not found')
    }
    
    const { id, login, avatar } = req.user

    const forumResponse = await ForumResponse.create({
      text,
      topicId: numberTopicId,
      idUser: id
    })
    
    const updatedResponse = { ...forumResponse.dataValues, userData: { login, avatar }}
    

    return res.status(201).json(updatedResponse)
  } catch (err) {
    return res
      .status(500)
      .json({ reason: `${err}` })
  }
}
