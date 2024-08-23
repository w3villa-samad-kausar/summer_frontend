import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    userData: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
  })
  

  export const { } = userSlice.actions
  export default userSlice.reducer