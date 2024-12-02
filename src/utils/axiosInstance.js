import axios from 'axios'
import { DokdoConst } from '../constant/const'
import { jwtTokenVerify } from './jwtTokenVerify'
import { useDispatch } from 'react-redux'
import { resetUserInfo } from '../store/action/authReducer'
import store from '../store'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const token = JSON.parse(localStorage.getItem(DokdoConst))?.token
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        } catch (error) {
            console.error('Error setting Authorization header :', error)
            return Promise.reject(error)
        }
    },
    (error) => {
        console.error('Request interceptor error :', error)
        return Promise.reject(error)
    },
)

axiosInstance.interceptors.response.use(
    async (response) => {
        try {
            return response
        } catch (error) {
            console.error('Error setting Authorization:', error)
            return Promise.reject(error)
        }
    },
    (error) => {
        console.log('error', error.response?.status)
        if (error.response?.status === 401) {
            const user = JSON.parse(localStorage.getItem(DokdoConst))
            if (user && user?.token) {
                // let logOutUser = jwtTokenVerify(user)
                // if (logOutUser) {
                //     localStorage.removeItem(DokdoConst)
                //     setTimeout(() => {
                //         window.location.assign('/auth/login')
                //     }, 1000)
                // }
                localStorage.removeItem(DokdoConst)
                store.dispatch(resetUserInfo())
                window.location.href = '/auth/login'
            } else {
                localStorage.removeItem(DokdoConst)
                store.dispatch(resetUserInfo())
                window.location.href = '/auth/login'
            }
        }
        console.error('Request interceptor error:', error)
        return Promise.reject(error)
    },
)
export default axiosInstance
