import { Theme } from '../db';

interface ITheme {
  userId: number,
  theme: string
}

class ThemeService {
  
  public getTheme = async (userId: number) => (
    Theme.findOne({ 
      where: { userId },
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
