import yandexApi from '../yandexBaseQuery'
import { UserProfileInfo, PasswordChange } from '../../../../types/auth'

const getProfileEndpoint = (endpoint: string) => `user/${endpoint}`

export const profileApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    changeProfile: builder.mutation<UserProfileInfo, UserProfileInfo>({
      query: arg => ({
        url: getProfileEndpoint('profile'),
        method: 'PUT',
        body: arg
      })
    }),

    changePassword: builder.mutation<string, PasswordChange>({
      query: arg => ({
        url: getProfileEndpoint('password'),
        method: 'PUT',
        body: arg
      }),
    }),

    changeAvatar: builder.mutation<UserProfileInfo, FormData>({
      query: arg => ({
        url: getProfileEndpoint('avatar'),
        method: 'PUT',
        body: arg
      }),
      invalidatesTags: [{ type: 'CurrentUser'}],
    }),
    
    deleteAvatar: builder.mutation<UserProfileInfo, void>({
      query: () => ({
        url: getProfileEndpoint('avatar'),
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'CurrentUser'}],
    }),
  })
})

export const {
  useChangeProfileMutation,
  useChangePasswordMutation,
  useChangeAvatarMutation,
  useDeleteAvatarMutation,
} = profileApi
