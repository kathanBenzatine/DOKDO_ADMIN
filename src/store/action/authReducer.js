import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { DokdoConst, errorMessage } from '../../constant/const'
import { toastError, toastSuccess } from '../../utils/toaster'

const initialState = {
    user: null,
    loading: false,
    isLogin: false,
    resetPassword: false,
}
export const loginAction = createAsyncThunk(
    'auth/loginAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(`/admin/login`, data)
            toastSuccess(response?.data?.message)
            return {
                ...response.data?.body,
                isLogin: true,
            }
        } catch (error) {
            toastError(
                error?.response?.data?.message ||
                    error?.message ||
                    errorMessage,
            )
            throw error.response
                ? error?.response?.data?.message
                : error?.message
        }
    },
)

export const resetPasswordAction = createAsyncThunk(
    'auth/resetPasswordAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/changePassword`,
                data,
            )
            toastSuccess(response?.data?.message)
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        resetUserInfo: (state) => {
            state.user = null
            state.isLogin = false
            localStorage.removeItem(DokdoConst)
        },
        setLoginUserData: (state, action) => {
            state.user = action.payload
            state.isLogin = action.payload.isLogin
            localStorage.setItem(DokdoConst, JSON.stringify({ ...action.payload }))
        },
        setResetPasswordFlag: (state) => {
            state.resetPassword = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true
                state.user = null
                state.isLogin = false
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isLogin = action.payload.isLogin
                localStorage.setItem(DokdoConst, JSON.stringify(action.payload))
            })
            .addCase(loginAction.rejected, (state) => {
                state.loading = false
                state.user = null
                state.isLogin = false
            })
            .addCase(resetPasswordAction.pending, (state) => {
                state.loading = true
                state.resetPassword = false
            })
            .addCase(resetPasswordAction.fulfilled, (state, action) => {
                state.loading = false
                state.resetPassword = true
            })
            .addCase(resetPasswordAction.rejected, (state) => {
                state.loading = false
                state.resetPassword = false
            })
    },
})

export const { resetUserInfo, setLoginUserData, setResetPasswordFlag } =
    authSlice.actions

export default authSlice.reducer
