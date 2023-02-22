export type ThemesList = 'light' | 'dark';

export type Theme = {
  theme: ThemesList,
}

export type User = {
  userId: number,
}

export type ThemeRequest = Theme & User;
export type ThemeResponse = ThemeRequest & {id: number};
