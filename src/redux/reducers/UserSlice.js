import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import API from "../../helpers/api/ApiHelper"
import { errorToastMessage } from "../../utility/ToastMessage"



const initialState = {
    loading: false,
    userData: null,
}
export const getUserData = createAsyncThunk('user/userData', async () => {
    try {
        const response = await API.get('/api/get-userdata')
        return response
    } catch (error) {
        errorToastMessage(error?.response?.data?.msg)
    }
})

export const storeFcmToken = createAsyncThunk('/user/fcmToken', async (data) => {
    try {
        const response = await API.post('/api/update-fcm-token', data)
        return response
    } catch (error) {
        errorToastMessage(error?.response?.data?.msg)
    }
})

export const changeProfilePicture = createAsyncThunk('/user/profilePicture', async (data) => {
    try {
        const response = await API.uploadImage('/api/profile-picture-upload', data);
        return response
    }
    catch (error) {
        errorToastMessage(error?.response?.data?.msg)
    }
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.loading = false
            state.userData = action?.payload
        })
        builder.addCase(changeProfilePicture.fulfilled, (state, action) => {
            state.loading = false
            state.userData[0].profile_picture_url=action?.payload?.url
        })
        builder.addMatcher(isAnyOf(getUserData.pending, storeFcmToken.pending,changeProfilePicture.pending), state => {
            state.loading = true
        })
        builder.addMatcher(isAnyOf(getUserData.rejected, storeFcmToken.fulfilled, storeFcmToken.rejected,changeProfilePicture.rejected), state => {
            state.loading = false
        })
    }
})


export const { } = userSlice.actions
export default userSlice.reducer