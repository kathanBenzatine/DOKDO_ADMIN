import { createColumnHelper } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { numberFormateLabel } from '../../utils/numberFormateLabel'
import { Card, CustomTable, DebounceInputBox, Loader } from '../../components'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getUserListAction } from '../../store/action/userListReducer'
import dayjs from 'dayjs'
import { setBreadcrumbMenuName } from '../../store/action/themeRedux'

function UserList() {
    const { t } = useTranslation()
    const [paginationObj, setPaginationObj] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [globalFilter, setGlobalFilter] = useState('')
    const userData = useSelector((state) => state.user)
    const { userListData, loading } = userData
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserListAction({ limit: 10, page: 1, search: '' }))
        dispatch(setBreadcrumbMenuName('User List'))
        return () => {}
    }, [])

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.display({
            header: () => <span>{t('number')}</span>,
            id: '#',
            cell: (info) => (
                <div>
                    {info.row.index +
                        1 +
                        paginationObj.pageSize * paginationObj.pageIndex}
                </div>
            ),
        }),

        columnHelper.accessor('username', {
            header: t('Name'),
            cell: (info) => (
                <div>
                    {info.row.original?.referral_count > 0 ? (
                        <Link
                            className="underline"
                            to={`/user-list/referral/${info.row.original._id}`}
                        >
                            {info.getValue() || '-'}
                        </Link>
                    ) : (
                        <> {info.getValue() || '-'}</>
                    )}
                </div>
            ),
            enableSorting: true,
        }),


        columnHelper.accessor('wallet_address', {
            cell: (info) => info.getValue() || '-',
            header: () => (
                <span className="inline-block w-max">{t('walletAddress')}</span>
            ),
            enableSorting: true,
        }),
        
        columnHelper.accessor('discord_connected', {
            cell: (info) => info.getValue()==true?'Connected': 'Disconnected',
            header: () => (
                <span className="inline-block w-max">{t('discordconnected')}</span>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor('twitter_connected', {
            cell: (info) => info.getValue()==true?'Connected': 'Disconnected',
            header: () => (
                <span className="inline-block w-max">{t('twitterconnected')}</span>
            ),
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
                            info.getValue() ? 'text-green-500' : 'text-red-500'
                        } uppercase`}
                    >
                        {info.getValue() ? t('ACTIVE') : t('INACTIVE')}
                    </div>
                </div>
            ),
            header: () => <span>{t('status')}</span>,
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
            header: () => (
                <span className="inline-block w-max">{t('createdAt')}</span>
            ),
            enableSorting: true,
        }),
    ]

    const onPageChange = (page, limit) => {
        dispatch(
            getUserListAction({
                limit: limit,
                page: Number(page) + 1,
                search: globalFilter || '',
            }),
        )
        setPaginationObj({ pageIndex: Number(page - 1) + 1, pageSize: limit })
    }

    const onChangeSearchInput = (e) => {
        setGlobalFilter(e)
        setPaginationObj({ pageIndex: 0, pageSize: paginationObj.pageSize })
        dispatch(
            getUserListAction({
                limit: paginationObj.pageSize,
                page: 1,
                search: e,
            }),
        )
    }
    return (
        <div>
            {loading && <Loader />}
            <div>
                <Card extra={` w-full h-full mt-3 !rounded-[20px]`}>
                    <div className="mb-5 w-full p-3 lg:w-25p">
                        <DebounceInputBox
                            placeholder={t('searchByNameEmailAndWalletAddress')}
                            value={globalFilter}
                            autocomplete={"off"}
                            onSearch={(e) => {
                                onChangeSearchInput(e)
                            }}
                        />
                    </div>
                    <CustomTable
                        data={userListData?.list || []}
                        columns={columns}
                        totalCount={userListData?.count || 0}
                        isPagination={true}
                        paginationObj={paginationObj}
                        onPageChange={onPageChange}
                        staticTable={false}
                        globalFilter={globalFilter}
                    />
                </Card>
            </div>
        </div>
    )
}

export default UserList
