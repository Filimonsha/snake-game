import yandexApi from '../yandexBaseQuery'
import { UserScoreData, LeaderboardRequest, LeaderboardResponse } from '../../../../utils/const/api/leader'

const getLeaderEndpoint = (endpoint: string) => `leaderboard` + endpoint

export const leaderApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    addUserToLeaderboard: builder.mutation<string, UserScoreData>({
      query: arg => ({
        url: getLeaderEndpoint(''),
        method: 'POST',
        body: arg
      }) 
    }),

    allUsersLeaderboard: builder.mutation<LeaderboardResponse, LeaderboardRequest>({ 
      query: arg => ({
        url: getLeaderEndpoint('/all'),
        method: 'POST',
        body: arg
      }) 
    })

  })
})

export const {
  useAddUserToLeaderboardMutation,
  useAllUsersLeaderboardMutation
} = leaderApi