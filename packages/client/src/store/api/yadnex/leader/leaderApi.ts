import yandexApi from '../yandexBaseQuery'
import { LeaderboardResponse, UserScoreShortInfo } from '../../../../types/leader'

const getLeaderEndpoint = (endpoint: string) => `leaderboard/${endpoint}`

export const leaderApi = yandexApi.injectEndpoints({
  endpoints: builder => ({

    addUserToLeaderboard: builder.mutation<void, {score: number} >({
      query: arg => ({
        url: getLeaderEndpoint('user'),
        method: 'POST',
        body: arg
      })
    }),

    
    getUserLeaderboard: builder.query<UserScoreShortInfo, void>({
      query: () => getLeaderEndpoint('user')
    }),

    getLeaderboard: builder.query<LeaderboardResponse, void>({
      query: () => getLeaderEndpoint(''),
    })

  })
})

export const {
  useGetLeaderboardQuery,
  useGetUserLeaderboardQuery,
  useAddUserToLeaderboardMutation
} = leaderApi
