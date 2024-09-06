import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import API from "../../helpers/api/ApiHelper";
import { errorToastMessage, successToastMessage } from "../../utility/ToastMessage";
import { setStoredToken } from "../../utility/AuthToken";



const initialState = {
    loading: false,
    isLoggedIn: null,
}

export const signIn = createAsyncThunk('auth/signIn', async (data) => {
    try {
        const response = await API.post('/api/login', data);
        if (response?.token) {
            await setStoredToken(response?.token)
        }
        return response
    } catch (error) {
        errorToastMessage(error?.response?.data?.msg)
    }
})

export const signUp = createAsyncThunk('auth/signUp', async (data) => {
    try {
        const response = await API.post('/api/register', data);
        if (response) {
            successToastMessage(response?.msg);
        }
        return response
    } catch (error) {
        errorToastMessage(error?.response?.data?.msg);
    }
})

export const socialSignin = createAsyncThunk('auth/socialLogin', async (data) => {
    try {
        const response = await API.post('/api/social-login', data);
        if (response?.token) {
            await setStoredToken(response?.token)
        }
        return response

    } catch (error) {
        console.error('Login failed:', error?.response);
    }
})


export const otpVerification = createAsyncThunk('auth/otpVerification', async (data) => {
    try {
        const response = await API.post('/api/verify-otp', data)
        if (response?.token) {
            await setStoredToken(response?.token)
        }
        successToastMessage(response?.msg)
        return response
    } catch (error) {
        console.log('ERRRR>>>>', error?.response?.data?.msg)
        errorToastMessage(error?.response?.data?.msg)
    }
})

export const resendOtp = createAsyncThunk('auth/resendotp', async (data) => {
    try {
        const response = await API.post('/api/resend-otp', data)
        successToastMessage(response?.data?.msg)
        return response
    } catch (error) {
        errorToastMessage(error?.response?.data?.msg)

    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.isLoggedIn = null
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(signIn.pending, socialSignin.pending, signUp.pending, otpVerification.pending, resendOtp.pending), state => {
            state.loading = true
        })
        builder.addMatcher(isAnyOf(signIn.rejected, socialSignin.rejected, signUp.rejected, otpVerification.rejected, resendOtp.rejected, resendOtp.fulfilled), state => {
            state.loading = false
        })
        builder.addMatcher(isAnyOf(signIn.fulfilled, socialSignin.fulfilled, signUp.fulfilled, otpVerification.fulfilled), (state, action) => {
            state.loading = false
            state.isLoggedIn = action.payload
        })
    },
})

export const { resetAuth } = authSlice.actions

export default authSlice.reducer