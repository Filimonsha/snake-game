import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  some: string
}

const initialState: InitialState = {
  some: ''
}

const globalConfigurationSlice = createSlice({
  name: 'globalConfiguration',
  initialState,
  reducers: {}
})

export const globalConfigurationActions = globalConfigurationSlice.actions
export default globalConfigurationSlice.reducer
