import { combineReducers, configureStore } from '@reduxjs/toolkit'
import globalConfigurationSlice from './slice/globalConfigurationSlice'
import yandexApi from './api/yadnex/yandexBaseQuery'


const reducer = combineReducers({
  globalConfigurations: globalConfigurationSlice,
  [yandexApi.reducerPath]: yandexApi.reducer
})

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(yandexApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
