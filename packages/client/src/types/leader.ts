type UserData = {
  login: string,
  avatar: string | null,
}

export type UserScoreResponse = {
  idUser: number,
  score: number,
  createdAt: string,
  updatedAt: string,
  userData: UserData,
}

export type ScoreDataResponse = {
  idUser: number,
  score: number,
  createdAt: string,
  updatedAt: string,
}

export type UserScoreRequest = {
  score: number,
}

export type LeaderboardResponse = Array<UserScoreResponse>;
