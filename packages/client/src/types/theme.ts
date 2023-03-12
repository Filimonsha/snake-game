export enum ThemeTypes {
  DARK = "dark",
  LIGHT = "light",
}
export type Theme = {
  theme: ThemeTypes,
}

export type User = {
  userId: number,
}

export type ThemeRequest = Theme;
export type ThemeResponse = ThemeRequest & {id: number};
