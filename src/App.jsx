import { Toaster } from 'react-hot-toast'
import './App.css'
import Router from './Routes'
import { useEffect } from 'react'
import { big5 } from './constant/const'
import { setLoginUserData } from './store/action/authReducer'
import { useDispatch } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function App() {
    const dispatch = useDispatch()
    const darkMode = localStorage.getItem('darkMode')
    useEffect(() => {
        let user = localStorage.getItem(big5)
        if (user) {
            let userData = JSON.parse(user)
            dispatch(setLoginUserData(userData))
        }
        return () => {}
    }, [])

    if (darkMode) {
        document.body.classList.add('dark')
    } else {
        document.body.classList.remove('dark')
    }
    return (
        <div>
            <ChakraProvider>
                <Toaster
                    position="top-center"
                    containerStyle={{ zIndex: 999999999 }}
                />
                <Router />
            </ChakraProvider>
        </div>
    )
}

export default App
