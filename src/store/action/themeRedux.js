import { createSlice } from '@reduxjs/toolkit'

const userRegion = new Intl.DateTimeFormat().resolvedOptions().locale
const userLanguageCode = userRegion.split('-')[0]

const initialState = {
    darkTheme: localStorage.getItem('darkMode')
        ? localStorage.getItem('darkMode') === 'true'
            ? true
            : false
        : false,
    language: userLanguageCode || 'en',
    breadcrumb: 'Dashboard',
}

const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state, action) {
            localStorage.setItem('darkMode', action.payload)
            state.darkTheme = action.payload
        },
        changeLanguage(state, action) {
            state.language = action.payload
        },
        setBreadcrumbMenuName(state, action) {
            state.breadcrumb = action.payload
        },
    },
})

export const { toggleTheme, changeLanguage, setBreadcrumbMenuName } =
    ThemeSlice.actions
export default ThemeSlice.reducer
