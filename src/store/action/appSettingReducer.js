import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { errorMessage } from '../../constant/const'
import { toastError, toastSuccess } from '../../utils/toaster'

const initialState = {
    appSettingData: null,
    loading: false,
    updateAppSettings: false,
}

export const getAppSettingAction = createAsyncThunk(
    'appSettings/getAppSettingAction',
    async () => {
        try {
            const response = await axiosInstance.get(
                `/appSetting/getVersionDetails`,
            )
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

export const updateAppSettingAction = createAsyncThunk(
    'appSettings/updateAppSettingAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/appSetting/updateAppVersion`,
                data,
            )
            toastSuccess(response.data?.message)
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

const appSettingsSlice = createSlice({
    name: 'appSettings',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAppSettingAction.pending, (state) => {
                state.loading = true
                state.appSettingData = null
                state.updateAppSettings = false
            })
            .addCase(getAppSettingAction.fulfilled, (state, action) => {
                state.loading = false
                state.appSettingData = action.payload
            })
            .addCase(getAppSettingAction.rejected, (state) => {
                state.loading = false
                state.appSettingData = null
            })
            .addCase(updateAppSettingAction.pending, (state) => {
                state.loading = true
                state.updateAppSettings = false
            })
            .addCase(updateAppSettingAction.fulfilled, (state, action) => {
                state.loading = false
                state.updateAppSettings = true
            })
            .addCase(updateAppSettingAction.rejected, (state) => {
                state.loading = false
                state.updateAppSettings = false
            })
    },
})

// export const {} = appSettingsSlice.actions

export default appSettingsSlice.reducer
