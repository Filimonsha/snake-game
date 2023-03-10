import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/dist/query/react';
// import { RootState } from '../../store';


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/api/v1/',
  credentials: 'include',
  mode: 'cors',
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).globalConfigurations.token
  //   console.log(token)

  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`)
  //   }

  //   return headers
  // }
})

const tagTypes: Array<string> = []

const yandexApi = createApi({
  baseQuery,
  tagTypes,
  endpoints: () => ({})
})

export default yandexApi
