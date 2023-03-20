import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/dist/query/react';


const baseQuery = fetchBaseQuery({
  baseUrl: 'https://england-snake-21.ya-praktikum.tech/api/v1/',
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
