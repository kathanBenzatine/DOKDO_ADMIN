import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { errorMessage } from '../../constant/const'
import { toastError, toastSuccess } from '../../utils/toaster'

const initialState = {
    adminList: null,
    loading: false,
    updateAdmin: false,
    subAdminCreate: false,
}
export const getAdminListAction = createAsyncThunk(
    'admin/getAdminListAction',
    async () => {
        try {
            const response = await axiosInstance.get(`/admin/subAdmin/list`)
            return response.data?.body?.list
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
export const updateAdminStatusAction = createAsyncThunk(
    'admin/updateAdminStatusAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/subAdmin/updateStatus`,
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

export const createSubAdminAction = createAsyncThunk(
    'admin/createSubAdminAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/subAdmin/add`,
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

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdminListAction.pending, (state) => {
                state.loading = true
                state.adminList = null
                state.updateAdmin = false
                state.subAdminCreate = false
            })
            .addCase(getAdminListAction.fulfilled, (state, action) => {
                state.loading = false
                state.adminList = action.payload
                state.updateAdmin = false
                state.subAdminCreate = false
            })
            .addCase(getAdminListAction.rejected, (state) => {
                state.loading = false
                state.adminList = null
            })
            .addCase(updateAdminStatusAction.pending, (state) => {
                state.loading = true
                state.updateAdmin = false
            })
            .addCase(updateAdminStatusAction.fulfilled, (state, action) => {
                state.loading = false
                state.updateAdmin = true
            })
            .addCase(updateAdminStatusAction.rejected, (state) => {
                state.loading = false
                state.updateAdmin = false
            })
            .addCase(createSubAdminAction.pending, (state) => {
                state.loading = true
                state.subAdminCreate = false
            })
            .addCase(createSubAdminAction.fulfilled, (state) => {
                state.loading = false
                state.subAdminCreate = true
            })
            .addCase(createSubAdminAction.rejected, (state) => {
                state.loading = false
                state.subAdminCreate = false
            })
    },
})

// export const {} = adminSlice.actions

export default adminSlice.reducer
