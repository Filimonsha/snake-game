import backendApi from '../backendBaseQuery';
import { ThemeRequest, ThemeResponse } from '../../../../types/theme';

const getThemeEndpoint = (endpoint: string | number = '') => `theme${endpoint}`;

export const themeApi = backendApi.injectEndpoints({
  endpoints: builder => ({
    getTheme: builder.query<ThemeResponse, void>({
      query: () => getThemeEndpoint(""),
      providesTags:['theme']
    }),
    updateTheme: builder.mutation<ThemeResponse, ThemeRequest>({
      query: ({theme}) => ({
        url: getThemeEndpoint(""),
        method: 'PUT',
        body: { theme },
      }),
      invalidatesTags:['theme']
    }),
  })
})

export const {
  useGetThemeQuery,
  useCreateThemeMutation,
  useUpdateThemeMutation
} = themeApi
