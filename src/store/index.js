import { configureStore } from '@reduxjs/toolkit'
import authReducer from './action/authReducer'
import dashboardReducer from './action/dashboardReducer'
import themeRedux from './action/themeRedux'
import adminReducer from './action/adminReducer'

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        theme: themeRedux,
        adminReducer: adminReducer,
    },
})

export default store
