import yandexApi from '../yandexBaseQuery'
import { UserFullInfo, UserShortInfo } from '../../../../utils/const/api/auth'

const getAuthEndpoint = (endpoint: string) => `auth/${endpoint}`

export const authApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<string, UserShortInfo>({
      query: arg => ({
        url: getAuthEndpoint('signin'),
        method: 'POST',
        body: arg
      })
    }),

    signUp: builder.mutation<{
      id: number
    }, UserFullInfo>({
      query: arg => ({
        url: getAuthEndpoint('signup'),
        method: 'POST',
        body: arg
      })
    }),

    logout: builder.mutation<string, void>({
      query: arg => ({
        url: getAuthEndpoint('logout'),
        method: 'POST',
        body: arg
      })
    }),

    getUserInfo: builder.query<UserFullInfo,void>({
      query: () => getAuthEndpoint('user')
    })

  })
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetUserInfoQuery
} = authApi
