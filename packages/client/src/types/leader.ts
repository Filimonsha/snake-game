export type UserScoreFullInfo = {
  score: number,
  idUser: number,
  userData: {
    login: string,
    avatar: string
  }
}

export type UserScoreShortInfo = Omit<UserScoreFullInfo, "userData">
  
export type LeaderboardResponse = Array<UserScoreFullInfo>;