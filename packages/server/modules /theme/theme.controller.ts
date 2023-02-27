import type { Request, Response } from 'express'
import { ThemeSite } from './theme.model'

const DEFAULT_THEME = 'light'

export const requestTheme = async (req: Request, res: Response) => {
  try {
    const { idUser } = req.params

    const [currentTheme] = await ThemeSite.findOrCreate({
      where: { idUser },
      defaults: {
        theme: DEFAULT_THEME
      }
    })

    return res.json(currentTheme)
  } catch (err) {
    return res
      .status(500)
      .json({ errors: 'Error' })
  }
}

export const createTheme = async (req: Request, res: Response) => {
  try {
    const { idUser } = req.params
    const { theme } = req.body

    const newTheme = await ThemeSite.create({
      idUser,
      theme
    })

    return res.status(201).json(newTheme)
  } catch (err) {
    return res
      .status(500)
      .json({ errors: 'Error' })
  }
}

export const updateTheme = async (req: Request, res: Response) => {
  try {
    const { idUser } = req.params
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
  } catch (err) {
    return res
      .status(500)
      .json({ errors: 'Error' })
  }
}
