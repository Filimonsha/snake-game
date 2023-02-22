import type { Request, Response } from 'express';
import { ThemeService } from '../services/themeService';


const themeService = new ThemeService();


class ThemeController {
  
  public static request = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      console.log(req.params);
      const currentTheme = await themeService.getTheme(userId);
      return res.json(currentTheme);
    } catch (err) {
      return res
        .status(500)
        .json({ errors: 'Error' })
    }
  }
  
  public static create = async (req: Request, res: Response) => {
    try {
      const { userId, theme } = req.body;
      const newTheme = await themeService.createTheme({ userId, theme });
      return res.status(201).json(newTheme)
    } catch (err) {
      return res
        .status(500)
        .json({ errors: 'Error' })
    }
  }
  
  public static update = async (req: Request, res: Response) => {
    try {
      const { userId, theme } = req.body;
      const response = await themeService.updateTheme({ userId, theme });
      const [updatedTheme] = response[1];
      return res.status(201).json(updatedTheme)
    } catch (err) {
      return res
        .status(500)
        .json({ errors: 'Error' })
    }
  }
}

export { ThemeController };
