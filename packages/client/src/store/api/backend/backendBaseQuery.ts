import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/dist/query/react';


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/api/v1/',
  mode: 'cors'
})

const tagTypes: Array<string> = ['backend']
const reducerPath = 'backendApi'

const backendApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes,
  endpoints: () => ({})
})

export default backendApi;
