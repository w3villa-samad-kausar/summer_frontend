import { combineReducers, configureStore } from '@reduxjs/toolkit'
import UserSlice from './reducers/UserSlice'
import AuthSlice from './reducers/AuthSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist';

const rootReducers = combineReducers({
  auth: AuthSlice,
  user: UserSlice
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)