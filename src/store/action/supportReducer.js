import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { errorMessage } from '../../constant/const'
import { toastError, toastSuccess } from '../../utils/toaster'

const initialState = {
    ticketList: [],
    loading: false,
    ticketDetails: null,
    updateTicket: false,
    supportReasonList: [],
    addUpdateSupportReason: false,
}
export const getTicketAction = createAsyncThunk(
    'support/getTicketAction',
    async (data) => {
        try {
            const response = await axiosInstance.get(
                `/admin/support/getTicketList?page=${data?.page}&limit=${data.limit}&search=${data?.search}&query_id=${data?.query_id || ''}`,
            )
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)
export const getTicketDetailsByIdAction = createAsyncThunk(
    'support/getTicketDetailsByIdAction',
    async (data) => {
        try {
            const response = await axiosInstance.get(
                `/admin/support/getTicketDetails?ticket_id=${data.ticket_id}`,
            )
            toastSuccess(response?.data?.message)
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

export const updateTicketByIdAction = createAsyncThunk(
    'support/updateTicketByIdAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/support/updateTicketStatus`,
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

export const getSupportReasonListAction = createAsyncThunk(
    'supportReason/getSupportReasonListAction',
    async () => {
        try {
            const response = await axiosInstance.get(
                `/admin/support/getQueryTitle`,
            )
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

export const updateSupportReasonStatusAction = createAsyncThunk(
    'supportReason/updateSupportReasonStatusAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/support/updateQuery`,
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

export const addSupportReasonAction = createAsyncThunk(
    'supportReason/addSupportReasonAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/support/addQuery`,
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

const supportSlice = createSlice({
    name: 'support',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTicketAction.pending, (state) => {
                state.loading = true
                state.ticketList = []
                state.ticketDetails = null
                state.updateTicket = false
            })
            .addCase(getTicketAction.fulfilled, (state, action) => {
                state.loading = false
                state.ticketList = action.payload
            })
            .addCase(getTicketAction.rejected, (state) => {
                state.loading = false
                state.ticketList = []
            })
            .addCase(getTicketDetailsByIdAction.pending, (state) => {
                state.loading = true
                state.ticketDetails = null
            })
            .addCase(getTicketDetailsByIdAction.fulfilled, (state, action) => {
                state.loading = false
                state.ticketDetails = action.payload
                state.updateTicket = false
            })
            .addCase(getTicketDetailsByIdAction.rejected, (state) => {
                state.loading = false
                state.ticketDetails = null
            })
            .addCase(updateTicketByIdAction.pending, (state) => {
                state.loading = true
                state.updateTicket = false
            })
            .addCase(updateTicketByIdAction.fulfilled, (state, action) => {
                state.loading = false
                state.updateTicket = true
            })
            .addCase(updateTicketByIdAction.rejected, (state) => {
                state.loading = false
                state.updateTicket = false
            })
            .addCase(getSupportReasonListAction.pending, (state) => {
                state.loading = true
                state.supportReasonList = []
                state.addUpdateSupportReason = false
            })
            .addCase(getSupportReasonListAction.fulfilled, (state, action) => {
                state.loading = false
                state.supportReasonList = action.payload
            })
            .addCase(getSupportReasonListAction.rejected, (state) => {
                state.loading = false
                state.supportReasonList = []
            })

            .addCase(addSupportReasonAction.pending, (state) => {
                state.loading = true
                state.addUpdateSupportReason = false
            })
            .addCase(addSupportReasonAction.fulfilled, (state, action) => {
                state.loading = false
                state.addUpdateSupportReason = true
            })
            .addCase(addSupportReasonAction.rejected, (state) => {
                state.loading = false
                state.addUpdateSupportReason = false
            })
            .addCase(updateSupportReasonStatusAction.pending, (state) => {
                state.loading = true
                state.addUpdateSupportReason = false
            })
            .addCase(updateSupportReasonStatusAction.fulfilled, (state) => {
                state.loading = false
                state.addUpdateSupportReason = true
            })
            .addCase(updateSupportReasonStatusAction.rejected, (state) => {
                state.loading = false
                state.addUpdateSupportReason = false
            })
    },
})

export const {} = supportSlice.actions

export default supportSlice.reducer
