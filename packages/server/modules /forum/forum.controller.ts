import type { Request, Response } from 'express'
import { ForumResponse, ForumTopic } from './forum.model'

export const getTopicsList = async (_req: Request, res: Response) => {
  try {
    const forumTopics = await ForumTopic.findAll({
      order: [['createdAt', 'DESC']]
    })

    return res.json(forumTopics)
  } catch (err) {
    return res
      .status(500)
      .json({ errors: 'Error' })
  }
}

export const getResponsesList = async (req: Request, res: Response) => {
  try {
    const { topicId } = req.params

    const forumResponses = await ForumResponse.findAll({
      where: { topicId },
      order: [['createdAt', 'DESC']]
    })

    return res.json(forumResponses)
  } catch (err) {
    return res
      .status(500)
      .json({ errors: 'Error' })
  }
}

export const createTopic = async (req: Request, res: Response) => {
  try {
    const { title, creatorUserId } = req.body

    const forumTopic = await ForumTopic.create({
      title,
      creatorUserId
    })

    return res.status(201).json(forumTopic)
  } catch (err) {
    return res
      .status(500)
      .json({ errors: 'Error' })
  }
}

export const createResponse = async (req: Request, res: Response) => {
  try {
    const { topicId } = req.params
    const { text, idUser } = req.body
    const numberTopicId = Number(topicId)

    const forumResponse = await ForumResponse.create({
      text,
      topicId: numberTopicId,
      idUser,
    })

    return res.status(201).json(forumResponse)
  } catch (err) {
    return res
      .status(500)
      .json({ errors: 'Error' })
  }
}
