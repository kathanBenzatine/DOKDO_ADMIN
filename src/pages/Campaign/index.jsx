import { createColumnHelper } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import './Campaign.css'
import { numberFormateLabel } from '../../utils/numberFormateLabel'
import { Card, CustomTable, DebounceInputBox, Loader } from '../../components'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useDisclosure } from '@chakra-ui/hooks'
import dayjs from 'dayjs'
import { setBreadcrumbMenuName } from '../../store/action/themeRedux'
import {
    getCampaignListAction,
    setAddCampaignFlag,
    deleteCampaignAction,
} from '../../store/action/campaignListReducer'
import UpdateCampaign from './components/UpdateCampaign'
import { Button } from '@chakra-ui/react'
import Swal from 'sweetalert2'

function Campaign() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [globalFilter, setGlobalFilter] = useState('')
    const CampaignData = useSelector((state) => state.campaign)
    const { campaignListData, loading, campaignAdded } = CampaignData
    const columnHelper = createColumnHelper()
    const [paginationObj, setPaginationObj] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const [UpdateParams, setUpdateParams] = useState({
        campaign_id: '',
        name: '',
        start_date: '',
        end_date: '',
        reward_type: '',
        reward_value: '',
        logo: '',
        status: 'add',
    })
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        dispatch(
            getCampaignListAction({
                limit: 10,
                page: 1,
                search: null,
                filterType: 1,
                sortType: 1,
            }),
        )
        dispatch(setBreadcrumbMenuName('Campaign List'))
        return () => {}
    }, [])
    const handleDelete = (cid) => {
        Swal.fire({
            title: '',
            html: `Are you sure you want to delete this campaign? `,
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
                    deleteCampaignAction({
                        campaign_id: cid,
                    }),
                )
            }
        })
    }

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
        columnHelper.accessor('name', {
            header: <span className="inline-block w-max">{t('Name')}</span>,
            cell: (info) => (
                <div>
                    <>{`${info.getValue()}`}</>
                </div>
            ),
            enableSorting: true,
        }),

        columnHelper.accessor('reward_type', {
            cell: (info) => info.getValue() || '-',
            header: () => (
                <span className="inline-block w-max">reward type</span>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor('reward_value', {
            cell: (info) =>
                info.getValue() ? numberFormateLabel(info.getValue()) : '-',
            header: () => (
                <span className="inline-block w-max">reward value</span>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor('logo', {
            cell: (info) => {
                return (
                    <div style={{ width: '100px' }}>
                        <img className="h-100p w-100p" src={info.getValue()} />
                    </div>
                )
            },
            header: () => <span className="inline-block w-max">logo</span>,
            enableSorting: true,
        }),
        columnHelper.accessor('start_date', {
            cell: (info) => (
                <span className="inline-block w-max">
                    {info.row.original?.start_date
                        ? dayjs(info.row.original?.start_date).format(
                              'DD MMM YYYY hh:mm A',
                          )
                        : '-'}
                </span>
            ),
            header: () => (
                <span className="inline-block w-max">Start date</span>
            ),
            enableSorting: true,
        }),
        columnHelper.accessor('end_date', {
            cell: (info) => (
                <span className="inline-block w-max">
                    {info.row.original?.end_date
                        ? dayjs(info.row.original?.end_date).format(
                              'DD MMM YYYY hh:mm A',
                          )
                        : '-'}
                </span>
            ),
            header: () => <span className="inline-block w-max">End date</span>,
            enableSorting: true,
        }),
        columnHelper.display({
            header: () => <span>UPDATE</span>,
            id: 'edit_campaign',
            cell: (info) => (
                <>
                    <div className="flex items-center justify-center gap-3">
                        <button
                            className="mr-2 w-80p rounded-xl bg-green-500 py-3 font-bold text-white hover:bg-primary active:bg-primary dark:bg-green-500 dark:hover:bg-brand-300 dark:active:bg-brand-200"
                            onClick={() => {
                                onOpen()
                                setUpdateParams({
                                    campaign_id: info?.row?.original?._id,
                                    name: info?.row?.original?.name,
                                    start_date: info?.row?.original?.start_date,
                                    end_date: info?.row?.original?.end_date,
                                    reward_type:
                                        info?.row?.original?.reward_type,
                                    reward_value:
                                        info?.row?.original?.reward_value,
                                    logo: info?.row?.original?.logo,
                                    status: 'edit',
                                })
                            }}
                        >
                            Edit
                        </button>
                        <buttinb
                            className="mr-2 w-99p rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-primary active:bg-primary dark:bg-red-600  dark:hover:bg-brand-300 dark:active:bg-brand-200"
                            onClick={() => {
                                handleDelete(info?.row?.original?._id)
                            }}
                        >
                            Delete
                        </buttinb>
                    </div>
                </>
            ),
        }),
    ]

    const onPageChange = (page, limit) => {
        dispatch(
            getCampaignListAction({
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
            getCampaignListAction({
                limit: paginationObj.pageSize,
                page: 1,
                search: e,
            }),
        )
    }

    useEffect(() => {
        if (campaignAdded) {
            // reset()
            setUpdateParams({ ...UpdateParams, status: 'add' })
            onClose()
            dispatch(setAddCampaignFlag())
            dispatch(
                getCampaignListAction({
                    limit: 10,
                    page: 1,
                    search: null,
                    filterType: 1,
                    sortType: 1,
                }),
            )
        }
    }, [campaignAdded])

    return (
        <div>
            {loading && <Loader />}
            <div>
                <Card extra={` w-full h-full mt-3 !rounded-[20px]`}>
                    <div className="m-6">
                        <span className="text-xl font-bold text-navy-700 dark:text-white">
                            Campaign List
                        </span>
                        <button
                            onClick={() => {
                                // reset()
                                setUpdateParams({
                                    ...UpdateParams,
                                    status: 'add',
                                })
                                onOpen()
                            }}
                            className="float-end w-10p rounded-xl bg-secondaryBlack py-3 text-base font-bold text-white transition duration-200 hover:bg-primary active:bg-primary dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                        >
                            Add Campaign
                        </button>
                    </div>
                    <div className="mb-5 w-full p-3 lg:w-25p">
                        <DebounceInputBox
                            placeholder={t('searchByNameEmailAndWalletAddress')}
                            value={globalFilter}
                            autoComplete={'off'}
                            onSearch={(e) => {
                                onChangeSearchInput(e)
                            }}
                        />
                    </div>
                    <CustomTable
                        data={campaignListData?.list || []}
                        columns={columns}
                        totalCount={campaignListData?.count || 0}
                        isPagination={true}
                        paginationObj={paginationObj}
                        onPageChange={onPageChange}
                        staticTable={false}
                        globalFilter={globalFilter}
                    />
                </Card>
            </div>
            <>
                {isOpen && (
                    <UpdateCampaign
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        UpdateParams={UpdateParams}
                        setUpdateParams={setUpdateParams}
                    />
                )}
            </>
        </div>
    )
}
export default Campaign
