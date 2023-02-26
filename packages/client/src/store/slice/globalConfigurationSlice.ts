import { createSlice } from '@reduxjs/toolkit'
import { themeApi } from '../api/backend/theme/themeApi'

type InitialState = {
  currentTheme: string;
}

const initialState: InitialState = {
  currentTheme: 'light'
}

const globalConfigurationSlice = createSlice({
  name: 'globalConfiguration',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(themeApi.endpoints.getTheme.matchFulfilled, (state, action) => {
      state.currentTheme = action.payload.theme
    })
  }
})

export const globalConfigurationActions = globalConfigurationSlice.actions
export default globalConfigurationSlice.reducer
