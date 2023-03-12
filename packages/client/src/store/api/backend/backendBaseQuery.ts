import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { SERVER_BASE, SERVER_PORT, SERVER_API } from '../../../const/route';


const baseQuery = fetchBaseQuery({
  baseUrl: `${SERVER_BASE}${SERVER_PORT}${SERVER_API}`,
  mode: 'cors',
  credentials:'include'
})

const tagTypes: Array<string> = ['backend','theme']
const reducerPath = 'backendApi'

const backendApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes,
  endpoints: () => ({})
})

export default backendApi;
