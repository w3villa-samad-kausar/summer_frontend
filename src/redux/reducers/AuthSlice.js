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
    isRegistered: null
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

export const signUp = createAsyncThunk('auth/signUp', async (data) => {
    try {
        const response = await API.post('/api/register', data);

        if (response) {
            successToastMessage(response?.data?.msg);
        }
        return response
    } catch (error) {
        errorToastMessage(error?.response?.data?.msg);
    }
})

export const googleSignin = createAsyncThunk('auth/googleLogin', async (data) => {
    try {
        const response = await API.post('/api/social-login', data);
        if (response?.token) {
            await setStoredToken(response?.token)
        }
        successToastMessage(response?.msg)
        if (response?.msg === 'User created , please verify mobile number') {
            navigation.navigate('MobileNumber', { email: data.email })
        }
        return response

        // Handle successful response, like navigating to another screen
    } catch (error) {
        console.error('Login failed:', error);
        // Handle error, like showing an error message
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
        builder.addCase(googleSignin.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(googleSignin.fulfilled, (state, action) => {
            state.loading = false
            state.isRegistered = action.payload
        })
        builder.addCase(googleSignin.rejected, (state, action) => {
            state.loading = false
        })
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
        builder.addCase(otpVerification.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(otpVerification.fulfilled, (state, action) => {
            state.loading = false
            state.isLoggedIn = action.payload
        })
        builder.addCase(otpVerification.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(resendOtp.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(resendOtp.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(resendOtp.rejected, (state, action) => {
            state.loading = false
        })

    },

})

export const {resetAuth} = authSlice.actions

export default authSlice.reducer