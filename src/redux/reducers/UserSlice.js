import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import API from "../../helpers/api/ApiHelper"
import { errorToastMessage } from "../../utility/ToastMessage"



const initialState = {
    loading:false,
    userData: null
}
export const getUserData=createAsyncThunk('user/userData',async()=>{
    try {
        const response = await API.get('/api/get-userdata')
        return response
    } catch (error) {
        errorToastMessage(error?.response?.data?.msg)
    }
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.loading = false
            state.userData = action.payload
        })
        builder.addCase(getUserData.rejected, (state, action) => {
            state.loading = false
        })
    }
  })
  

  export const { } = userSlice.actions
  export default userSlice.reducer