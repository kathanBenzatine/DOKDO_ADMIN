import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { errorMessage } from '../../constant/const'
import { toastError, toastSuccess } from '../../utils/toaster'

const initialState = {
    configData: null,
    loading: false,
    updateConfig: false,
}

export const getConfigAction = createAsyncThunk(
    'config/getConfigAction',
    async () => {
        try {
            const response = await axiosInstance.get(`/config/getConfig`)
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

export const updateConfigAction = createAsyncThunk(
    'config/updateConfigAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/config/updateConfig`,
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

const configSlice = createSlice({
    name: 'config',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getConfigAction.pending, (state) => {
                state.loading = true
                state.configData = null
                state.updateConfig = false
            })
            .addCase(getConfigAction.fulfilled, (state, action) => {
                state.loading = false
                state.configData = action.payload
            })
            .addCase(getConfigAction.rejected, (state) => {
                state.loading = false
                state.configData = null
            })
            .addCase(updateConfigAction.pending, (state) => {
                state.loading = true
                state.updateConfig = false
            })
            .addCase(updateConfigAction.fulfilled, (state, action) => {
                state.loading = false
                state.updateConfig = true
            })
            .addCase(updateConfigAction.rejected, (state) => {
                state.loading = false
                state.updateConfig = false
            })
    },
})

// export const {} = configSlice.actions

export default configSlice.reducer
