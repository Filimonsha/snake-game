import { combineReducers, configureStore } from '@reduxjs/toolkit'
import globalConfigurationSlice from './slice/globalConfigurationSlice'


const reducer = combineReducers({
  globalConfigurations: globalConfigurationSlice
})

export const store = configureStore({
  reducer
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
