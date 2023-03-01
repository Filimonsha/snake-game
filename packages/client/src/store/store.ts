import { combineReducers, configureStore } from '@reduxjs/toolkit'
import globalConfigurationSlice from './slice/globalConfigurationSlice'
import gameConfigurationSlice from './slice/gameConfigurationSlice'
import yandexApi from './api/yadnex/yandexBaseQuery'
import user from './slice/userSlice'


const reducer = combineReducers({
  globalConfigurations: globalConfigurationSlice,
  gameConfigurations: gameConfigurationSlice,
  [yandexApi.reducerPath]: yandexApi.reducer,
  user
})

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(yandexApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
