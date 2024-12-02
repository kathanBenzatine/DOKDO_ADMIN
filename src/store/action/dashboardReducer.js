import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { errorMessage } from '../../constant/const'
import { toastError } from '../../utils/toaster'

const initialState = {
    dashboardData: null,
    loading: false,
}
export const getDashboardAction = createAsyncThunk(
    'dashboard/getDashboardAction',
    async () => {
        try {
            const response = await axiosInstance.get(`/admin/dashboard`)
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardAction.pending, (state) => {
                state.loading = true
                state.dashboardData = null
            })
            .addCase(getDashboardAction.fulfilled, (state, action) => {
                state.loading = false
                state.dashboardData = action.payload
            })
            .addCase(getDashboardAction.rejected, (state) => {
                state.loading = false
                state.dashboardData = null
            })
    },
})

// export const {} = dashboardSlice.actions

export default dashboardSlice.reducer
