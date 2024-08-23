import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './reducers/UserSlice'
import AuthSlice from './reducers/AuthSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice
  },
})