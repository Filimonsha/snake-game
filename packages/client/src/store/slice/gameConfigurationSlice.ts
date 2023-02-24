import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  isGameSound: boolean
}

const initialState: InitialState = {
  isGameSound: false,
}

const gameConfigurationSlice = createSlice({
  name: 'gameConfiguration',
  initialState,
  reducers: {
    toggleGameSound(state) {
      state.isGameSound = !state.isGameSound
    }
  },
})

export const gameConfigurationActions = gameConfigurationSlice.actions
export default gameConfigurationSlice.reducer
