import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { errorMessage } from '../../constant/const'
import { toastError, toastSuccess } from '../../utils/toaster'

const initialState = {
    addBicycleStatus: null,
    loading: false,
    listBicycle: [],
}

export const addAnimalAction = createAsyncThunk(
    'animal/addAnimalAction',
    async (data) => {
        try {
            const response = await axiosInstance.post(
                `/admin/big/add`,
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

export const getAnimalList = createAsyncThunk(
    'animal/getAnimalList',
    async (data) => {
        try {
            const response = await axiosInstance.get(
                `/admin/big/list?limit=${data.limit}&page=${data.page}&filterType=${data.filterType}&tier=${data.tier}&level=${data?.level || ''}`,
            )
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

const animalSlice = createSlice({
    name: 'animal',
    initialState: initialState,
    reducers: {
        resetUserInfo: (state) => {
            state.addBicycleStatus = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addAnimalAction.pending, (state) => {
                state.loading = true
                state.addBicycleStatus = false
            })
            .addCase(addAnimalAction.fulfilled, (state, action) => {
                state.loading = false
                state.addBicycleStatus = true
            })
            .addCase(addAnimalAction.rejected, (state) => {
                state.loading = false
                state.addBicycleStatus = false
            })
            .addCase(getAnimalList.pending, (state) => {
                state.loading = true
                state.listBicycle = []
            })
            .addCase(getAnimalList.fulfilled, (state, action) => {
                state.loading = false
                state.listBicycle = action.payload
            })
            .addCase(getAnimalList.rejected, (state) => {
                state.loading = false
                state.listBicycle = []
            })
    },
})

// export const {} = animalSlice.actions

export default animalSlice.reducer
