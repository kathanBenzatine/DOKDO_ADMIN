import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '../Layouts'
import {
    AdminList,
    CreateAdmin,
    Dashboard,
    Login,
    NotFound,
    AppSettings,
    Config,
    UserList,
    UserReferralTree,
} from '../pages'

function Router() {
    return (
        <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<Navigate to={'/dashboard'} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin/list" element={<AdminList />} />
                <Route path="/admin/create" element={<CreateAdmin />} />
                <Route path="app-setting" element={<AppSettings />} />
                <Route path="config" element={<Config />} />
                <Route path="user-list" element={<UserList />} />
                <Route
                    path="user-list/referral/:id"
                    element={<UserReferralTree />}
                />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default Router
