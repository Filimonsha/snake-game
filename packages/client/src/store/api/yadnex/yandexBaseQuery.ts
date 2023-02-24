import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/dist/query/react';


const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ya-praktikum.tech/api/v2/',
  credentials: 'include',
  mode: 'cors'
})

const tagTypes: Array<string> = []

const yandexApi = createApi({
  baseQuery,
  tagTypes,
  endpoints: () => ({})
})

export default yandexApi
