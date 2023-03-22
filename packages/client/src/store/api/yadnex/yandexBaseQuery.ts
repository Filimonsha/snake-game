import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { SERVER_API } from '../../../const/route'


const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_API,
  credentials: 'include',
  mode: 'cors',
})

const tagTypes: Array<string> = []

const yandexApi = createApi({
  baseQuery,
  tagTypes,
  endpoints: () => ({})
})

export default yandexApi
