export type UserScore = {
  score: number,
  userId: number,
  userName: string
}

export type UserScoreData = {
  data: UserScore,
  ratingFieldName: "score" | "matches" | "time",
  teamName: string
}

export type LeaderboardRequest = {
  ratingFieldName: "score" | "matches" | "time",
  cursor: number,
  limit: number
}

export type LeaderboardResponse = Array<{ data: UserScore }>;