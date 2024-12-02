import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { errorMessage } from '../../constant/const'
import { toastError } from '../../utils/toaster'

const initialState = {
    userListData: null,
    loading: false,
    userReferralTreeData: [],
}

export const getUserListAction = createAsyncThunk(
    'user/getUserListAction',
    async (data) => {
        try {
            const response = await axiosInstance.get(
                `/admin/user/list?limit=${data.limit}&page=${data.page}&search=${data.search}`,
            )
            return response.data?.body
        } catch (error) {
            console.log("error", error)
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)
export const getUserReferralTreeDataAction = createAsyncThunk(
    'user/getUserReferralTreeDataAction',
    async (data) => {
        try {
            const response = await axiosInstance.get(
                `/admin/user/getReferralTree?user_id=${data?.id}`,
            )
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

const userListSlice = createSlice({
    name: 'userList',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserListAction.pending, (state) => {
                state.loading = true
                state.userListData = null
                state.updateConfig = false
                state.userReferralTreeData = []
            })
            .addCase(getUserListAction.fulfilled, (state, action) => {
                state.loading = false
                state.userListData = action.payload
            })
            .addCase(getUserListAction.rejected, (state) => {
                state.loading = false
                state.userListData = null
            })
            .addCase(getUserReferralTreeDataAction.pending, (state) => {
                state.loading = true
                state.userReferralTreeData = []
            })
            .addCase(
                getUserReferralTreeDataAction.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.userReferralTreeData = [action.payload]
                },
            )
            .addCase(getUserReferralTreeDataAction.rejected, (state) => {
                state.loading = false
                state.userReferralTreeData = []
            })
    },
})

// export const {} = userListSlice.actions

export default userListSlice.reducer
