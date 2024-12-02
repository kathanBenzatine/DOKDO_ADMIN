import { configureStore } from '@reduxjs/toolkit'
import authReducer from './action/authReducer'
import dashboardReducer from './action/dashboardReducer'
import themeRedux from './action/themeRedux'
import adminReducer from './action/adminReducer'
import appSettingReducer from './action/appSettingReducer'
import configReducer from './action/configReducer'
import userListReducer from './action/userListReducer'
import animalReducer from './action/animalReducer'
import supportReducer from './action/supportReducer'
import drinksReducer from './action/drinksReducer'

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        theme: themeRedux,
        adminReducer: adminReducer,
        appSettings: appSettingReducer,
        config: configReducer,
        user: userListReducer,
        animal: animalReducer,
        support: supportReducer,
        drinks: drinksReducer,
    },
})

export default store
