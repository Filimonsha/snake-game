import type { Response } from 'express'
import type { TUserRequest } from '../../types/user';
import { ThemeSite } from './theme.model'

const DEFAULT_THEME = 'light'

export const requestTheme = async (req: TUserRequest, res: Response) => {
  try {
    const idUser = req.user?.id

    const [currentTheme] = await ThemeSite.findOrCreate({
      where: { idUser },
      defaults: {
        theme: DEFAULT_THEME
      }
    })

    return res.json(currentTheme)
  } catch (error) {
    return res
      .status(500)
      .json({ reason: `${error}`})
  }
}

export const createTheme = async (req: TUserRequest, res: Response) => {
  try {
    
    const idUser = req.user?.id
    const { theme } = req.body

    const newTheme = await ThemeSite.create({
      idUser,
      theme
    })

    return res.status(201).json(newTheme)
  } catch (error) {
    return res
      .status(500)
      .json({ reason: `${error}`})
  }
}

export const updateTheme = async (req: TUserRequest, res: Response) => {
  try {
    const idUser = req.user?.id
    const { theme } = req.body

    const response = await ThemeSite.update(
      { theme },
      {
        where: { idUser },
        returning: true
      }
    )
    const [updatedTheme] = response[1]

    return res.status(201).json(updatedTheme)
  } catch (error) {
    return res
      .status(500)
      .json({ reason: `${error}`})
  }
}
