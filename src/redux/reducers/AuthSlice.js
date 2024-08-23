import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import API from "../../helpers/api/ApiHelper";
import { errorToastMessage, successToastMessage } from "../../utility/ToastMessage";
import { setStoredToken } from "../../utility/AuthToken";



const initialState = {
    loading: false,
    isLoggedIn: null,
    user: null,
    error: null,
    token: null,
    isRegistered:null
}

export const signIn = createAsyncThunk('auth/signIn', async (data) => {
    try {
        const response = await API.post('/api/login', data);
        if (response?.token) {
            await setStoredToken(response?.token)
        }
        successToastMessage(response?.msg)
        return response
    } catch (error) {
        errorToastMessage(error?.response?.data?.msg)
    }
})

export const signUp=createAsyncThunk('auth/signUp',async(data)=>{
    try {
        const response = await API.post('/api/register', data);
  
        if (response) {
          successToastMessage(response?.data?.msg);
        }
      } catch (error) {
        errorToastMessage(error?.response?.data?.msg);
      }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false
            state.isLoggedIn = action.payload
        })
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false
        })
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false
            state.isRegistered = action.payload
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false
        })
    },
    
})


export default authSlice.reducer