import { combineReducers, configureStore } from '@reduxjs/toolkit'
import UserSlice from './reducers/UserSlice'
import AuthSlice from './reducers/AuthSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const rootReducers = combineReducers({
  auth: AuthSlice,
  user: UserSlice
})

const middlewares = [];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // serializableCheck: false,
      },
      immutableCheck: { warnAfter: 128 },
    }).concat(middlewares),
})

export const persistor = persistStore(store)