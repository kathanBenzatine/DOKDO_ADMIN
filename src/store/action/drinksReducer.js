import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { errorMessage } from '../../constant/const'
import { toastError } from '../../utils/toaster'

const initialState = {
    hpDrinksList: null,
    loading: false,
    dDrinksList: null,
}

export const getHPDrinksListAction = createAsyncThunk(
    'drinks/getHPDrinksListAction',
    async () => {
        try {
            const response = await axiosInstance.get(`/admin/HPDrink/list`)
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

export const getDDrinksListAction = createAsyncThunk(
    'drinks/getDDrinksListAction',
    async () => {
        try {
            const response = await axiosInstance.get(`/admin/DDrink/list`)
            return response.data?.body
        } catch (error) {
            toastError(error?.response?.data?.message || errorMessage)
            throw error.response ? error.response.data : error.message
        }
    },
)

const drinksSlice = createSlice({
    name: 'drinks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHPDrinksListAction.pending, (state) => {
                state.loading = true
                state.hpDrinksList = null
            })
            .addCase(getHPDrinksListAction.fulfilled, (state, action) => {
                state.loading = false
                state.hpDrinksList = action.payload
            })
            .addCase(getHPDrinksListAction.rejected, (state) => {
                state.loading = false
                state.hpDrinksList = null
            })
            .addCase(getDDrinksListAction.pending, (state) => {
                state.loading = true
                state.dDrinksList = null
            })
            .addCase(getDDrinksListAction.fulfilled, (state, action) => {
                state.loading = false
                state.dDrinksList = action.payload
            })
            .addCase(getDDrinksListAction.rejected, (state) => {
                state.loading = false
                state.dDrinksList = null
            })
    },
})

// export const {} = drinksSlice.actions

export default drinksSlice.reducer
