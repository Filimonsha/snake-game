import backendApi from '../backendBaseQuery';
import { User, ThemeRequest, ThemeResponse } from '../../../../types/theme';

const getThemeEndpoint = (endpoint: string | number = '') => `theme/${endpoint}`;

export const themeApi = backendApi.injectEndpoints({
  endpoints: builder => ({
    getTheme: builder.mutation<ThemeResponse, User>({
      query: arg => ({
        url: getThemeEndpoint(arg.userId),
        method: 'GET',
      })
    }),
    createTheme: builder.mutation<ThemeResponse, ThemeRequest>({
      query: arg => ({
        url: getThemeEndpoint(arg.userId),
        method: 'POST',
        body: arg.theme,
      })
    }),
    updateTheme: builder.mutation<ThemeResponse, ThemeRequest>({
      query: arg => ({
        url: getThemeEndpoint(arg.userId),
        method: 'PUT',
        body: arg.theme,
      })
    }),
  })
})

export const {
  useGetThemeMutation,
  useCreateThemeMutation,
  useUpdateThemeMutation
} = themeApi
