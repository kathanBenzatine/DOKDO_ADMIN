import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Portal } from '@chakra-ui/portal'
import Navbar from './Navbar'
import Footer from './Footer'
import { big5 } from '../../constant/const'
import { jwtTokenVerify } from '../../utils/jwtTokenVerify'
import { useDispatch, useSelector } from 'react-redux'
import { toastError } from '../../utils/toaster'
import { resetUserInfo } from '../../store/action/authReducer'
import { useTranslation } from 'react-i18next'

function AdminLayout() {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    const location = useLocation()
    const authData = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const themeData = useSelector((state) => state.theme)
    const { breadcrumb } = themeData
    const [currentRouteTitle, setCurrentRouteTitle] = useState(
        breadcrumb || 'Dashboard',
    )

    useEffect(() => {
        setCurrentRouteTitle(breadcrumb)
        return () => {}
    }, [breadcrumb])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    const onClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (authData && authData?.user && authData?.user?.token) {
            let logOutUser = jwtTokenVerify(authData?.user)
            if (logOutUser) {
                toastError('Session timeout, please login again.')
                setTimeout(() => {
                    dispatch(resetUserInfo())
                }, 1000)
            }
        }
        return () => {}
    }, [location])

    let user = localStorage.getItem(big5)
    if (!user) {
        return <Navigate to={'/auth/login'} />
    }

    return (
        <div className="flex h-full w-full">
            <Sidebar
                open={open}
                onClose={onClose}
                setCurrentRouteTitle={setCurrentRouteTitle}
            />
            <div className="h-full w-full dark:bg-navy-900">
                <main
                    className={`mx-2.5 flex-none transition-all dark:bg-navy-900 md:pr-2 xl:ml-[313px]`}
                >
                    <div>
                        <Portal>
                            <Navbar
                                onOpenSidenav={() => setOpen(!open)}
                                brandText={currentRouteTitle}
                            />
                        </Portal>
                        <div className="layout-wrap mx-auto min-h-screen p-3 pt-[120px]">
                            <Outlet />
                        </div>
                        <div className="p-3">
                            <Footer />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
