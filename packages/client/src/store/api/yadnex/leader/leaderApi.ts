import yandexApi from '../yandexBaseQuery'
import { 
  UserScoreRequest,
  ScoreDataResponse,
  LeaderboardResponse
} from '../../../../types/leader'

const getLeaderEndpoint = (endpoint: string) => `leaderboard/${endpoint}`

export const leaderApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    
    getUserScore: builder.query<ScoreDataResponse, void>({
      query: () => ({
        url: getLeaderEndpoint('user'),
        method: 'GET',
      }),
      providesTags: [{ type: 'MaxScore'}]
    }),
    
    setUserScore: builder.mutation<ScoreDataResponse, UserScoreRequest>({
      query: arg => ({
        url: getLeaderEndpoint('user'),
        method: 'POST',
        body: arg
      }),
      invalidatesTags: [{ type: 'MaxScore'}],
    }),
    
    getLeaderboard: builder.query<LeaderboardResponse, void>({
      query: () => getLeaderEndpoint(''),
    })

  })
})

export const {
  useSetUserScoreMutation,
  useGetUserScoreQuery,
  useGetLeaderboardQuery
} = leaderApi
