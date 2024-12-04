import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { errorMessage } from '../../constant/const'
import { toastError, toastSuccess } from '../../utils/toaster'

const initialState = {
    campaignListData: null,
    loading: false,
    campaignAdded: false,
}

export const getCampaignListAction = createAsyncThunk(
    'campaign/getCampaignListAction',
    async (data) => {
        try {
            const response = await axiosInstance.get(
                `/admin/campaign/list?page=${data.page}&limit=${data.limit}&filterType=${data.filterType}&sortType=${data?.sortType}&search=${data?.search ? data.search : ``}`,
            )

            return response?.data?.body
        } catch (error) {
            console.log('error', error)
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

export const addCampaignAction = createAsyncThunk(
    'campaign/addCampaignAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/campaign/add`,
                data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            )
            toastSuccess(response?.data?.message)
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

export const editCampaignAction = createAsyncThunk(
    'campaign/editCampaignAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/campaign/update`,
                data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            )
            toastSuccess(response?.data?.message)
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

export const deleteCampaignAction = createAsyncThunk(
    'campaign/deleteCampaignAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/campaign/delete`,
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

const CampaignListSlice = createSlice({
    name: 'CampaignList',
    initialState: initialState,
    reducers: {
        setAddCampaignFlag: (state) => {
            state.campaignAdded = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCampaignListAction.pending, (state) => {
                state.loading = true
                state.campaignListData = null
            })
            .addCase(getCampaignListAction.fulfilled, (state, action) => {
                state.loading = false
                state.campaignListData = action.payload
            })
            .addCase(getCampaignListAction.rejected, (state) => {
                state.loading = false
                state.campaignListData = null
            })
            .addCase(addCampaignAction.pending, (state) => {
                state.loading = true
                state.campaignAdded = false
            })
            .addCase(addCampaignAction.fulfilled, (state) => {
                state.loading = false
                state.campaignAdded = true
            })
            .addCase(addCampaignAction.rejected, (state) => {
                state.loading = false
                state.campaignAdded = false
            })
            .addCase(editCampaignAction.pending, (state) => {
                state.loading = true
                state.campaignAdded = false
            })
            .addCase(editCampaignAction.fulfilled, (state) => {
                state.loading = false
                state.campaignAdded = true
            })
            .addCase(editCampaignAction.rejected, (state) => {
                state.loading = false
                state.campaignAdded = false
            })
            .addCase(deleteCampaignAction.pending, (state) => {
                state.loading = true
                state.campaignAdded = false
            })
            .addCase(deleteCampaignAction.fulfilled, (state) => {
                state.loading = false
                state.campaignAdded = true
            })
            .addCase(deleteCampaignAction.rejected, (state) => {
                state.loading = false
                state.campaignAdded = false
            })
    },
})

export const { setAddCampaignFlag } = CampaignListSlice.actions

export default CampaignListSlice.reducer
