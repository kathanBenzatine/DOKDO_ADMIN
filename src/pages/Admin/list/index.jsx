import React, { useEffect, useMemo, useState } from 'react'
import {
    Card,
    CustomTable,
    DebounceInputBox,
    Loader,
    Switch,
} from '../../../components'
import { createColumnHelper } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAdminListAction,
    updateAdminStatusAction,
} from '../../../store/action/adminReducer'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'
import { DokdoConst } from '../../../constant/const'
import { setBreadcrumbMenuName } from '../../../store/action/themeRedux'

function AdminList() {
    const adminReducer = useSelector((state) => state.adminReducer)
    const { adminList, loading, updateAdmin } = adminReducer
    const { t } = useTranslation()
    const [globalFilter, setGlobalFilter] = useState('')
    const dispatch = useDispatch()
    const userData = JSON.parse(localStorage.getItem(DokdoConst))
    useEffect(() => {
        dispatch(getAdminListAction())
        dispatch(setBreadcrumbMenuName('Admin List'))
        return () => {}
    }, [])

    useEffect(() => {
        if (updateAdmin) {
            dispatch(getAdminListAction())
        }
        return () => {}
    }, [updateAdmin])

    const handleStatusChange = (adminId, currentStatus, name) => {
        Swal.fire({
            title: '',
            html: `Are you sure you want to <b>${currentStatus ? 'DEACTIVE' : 'ACTIVE'}</b> this user <b>${name}<b/>? `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            customClass: {
                container: 'bg-white',
                title: 'text-gray-800',
                content: 'text-gray-600',
                confirmButton:
                    'px-4 py-3 mr-3 bg-green-500 hover:bg-green-600 text-white font-semibold',
                cancelButton:
                    'px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(
                    updateAdminStatusAction({
                        user_id: adminId,
                        is_active: !currentStatus,
                    }),
                )
            }
        })
    }

    const columnHelper = createColumnHelper()
    const columns = useMemo(
        () => [
            columnHelper.display({
                header: () => <span>{t('number')}</span>,
                id: '#',
                cell: (info) => <div>{info.row.index + 1}</div>,
            }),
            columnHelper.accessor('name', {
                header: () => t('Name'),
                cell: (info) => (
                    <div className="capitalize">{info.getValue() || '-'}</div>
                ),
                enableSorting: true,
            }),
            columnHelper.accessor('email_id', {
                cell: (info) => info.getValue(),
                header: () => <span>{t('email')}</span>,
                enableSorting: true,
            }),
            columnHelper.accessor('is_active', {
                cell: (info) => (
                    <div
                        className={`flex h-7 w-[110px] items-center justify-center text-sm ${
                            info.getValue()
                                ? 'bg-green-100 dark:bg-green-50'
                                : 'bg-red-100 dark:bg-red-50'
                        } rounded-[10px] text-base font-bold`}
                    >
                        <div
                            className={`${
                                info.getValue()
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            } uppercase`}
                        >
                            {info.getValue() ? t('ACTIVE') : t('INACTIVE')}
                        </div>
                    </div>
                ),
                header: () => <span>{t('status')}</span>,
                enableSorting: true,
            }),
            columnHelper.accessor('createdBy', {
                cell: (info) => (
                    <span className="capitalize">{info.getValue() || '-'}</span>
                ),
                header: () => <span>{t('createdBy')}</span>,
                enableSorting: true,
            }),
            columnHelper.accessor('createdAt', {
                cell: (info) => (
                    <span className="inline-block w-max">
                        {info.row.original?.createdAt
                            ? dayjs(info.row.original?.createdAt).format(
                                  'DD MMM YYYY hh:mm A',
                              )
                            : '-'}
                    </span>
                ),
                header: () => <span>{t('createdAt')}</span>,
                enableSorting: true,
            }),
            columnHelper.display({
                header: () => <span>{t('Action')}</span>,
                id: 'action',
                cell: (info) => (
                    <>
                        {userData?._id !== info.row.original._id && (
                            <div className="flex items-center justify-center gap-3">
                                <Switch
                                    id={`switch-${info.row.original._id}`}
                                    name="statusSwitch"
                                    checked={info.row.original.is_active}
                                    onChange={() =>
                                        handleStatusChange(
                                            info.row.original._id,
                                            info.row.original.is_active,
                                            info.row.original.name,
                                        )
                                    }
                                />
                            </div>
                        )}
                    </>
                ),
            }),
        ],
        [],
    )
    const onChangeSearchInput = (e) => {
        setGlobalFilter(e)
    }
    return (
        <div>
            {loading && <Loader />}
            <div>
                <Card extra={` w-full h-full mt-3 !rounded-[20px]`}>
                    <div className="mb-5 w-full p-3 lg:w-25p">
                        <DebounceInputBox
                            placeholder={t('search')}
                            value={globalFilter}
                            onSearch={(e) => {
                                onChangeSearchInput(e)
                            }}
                        />
                    </div>
                    <CustomTable
                        data={adminList || []}
                        columns={columns}
                        staticTable={true}
                        totalCount={adminList?.length || 0}
                        globalFilter={globalFilter}
                    />
                </Card>
            </div>
        </div>
    )
}

export default AdminList
