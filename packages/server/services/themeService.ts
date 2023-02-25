import { Theme } from '../db';
import { DEFAULT_THEME } from '../constants';

interface ITheme {
  userId: number,
  theme: string
}

class ThemeService {
  
  public getOrCreateTheme = async (userId: number) => (
    Theme.findOrCreate({
      where: { userId },
      defaults: {
        theme: DEFAULT_THEME,
      },
    })
  );
  
  public createTheme = async ({ userId, theme }: ITheme) => (
    Theme.create({ userId, theme})
  );
  
  public updateTheme = async ({ userId, theme }: ITheme) => (
    Theme.update(
      { theme },
      { 
        where: { userId },
        returning: true,
      },
    )
  );
}

export { ThemeService };
