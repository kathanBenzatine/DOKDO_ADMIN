import React, { useEffect, useState } from 'react'
import { MdOutlineBarChart, MdPerson } from 'react-icons/md'
import { numberFormateLabel } from '../../utils/numberFormateLabel'
import MiniStatistics from './components/MiniStatistics'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardAction } from '../../store/action/dashboardReducer'
import { Loader } from '../../components'
import WeeklyRegisterUsers from './components/WeeklyRegisterUsers'
import WeeklyTotalPoints from './components/WeeklyTotalPoints'
import { useTranslation } from 'react-i18next'
import { GiPathDistance } from 'react-icons/gi'
import { setBreadcrumbMenuName } from '../../store/action/themeRedux'
import { AnimalIcon } from '../../assets'

function Dashboard() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const dashboardReducer = useSelector((state) => state.dashboard)
    const { dashboardData, loading } = dashboardReducer
    const [barUserDate, setBarUserDate] = useState([])
    const [barTotalUser, setBarTotalUser] = useState([])
    const [totalWeeklyPoints, setTotalWeeklyPoints] = useState([])

    useEffect(() => {
        dispatch(getDashboardAction())
        dispatch(setBreadcrumbMenuName(t('Dashboard')))
        return () => {}
    }, [])

    useEffect(() => {
        if (dashboardData && dashboardData?.weeklyChart) {
            const dates = dashboardData?.weeklyChart?.map(
                (entry) => entry?.date,
            )
            const counts = dashboardData?.weeklyChart?.map(
                (entry) => entry?.user_count || 0,
            )
            const pointCounts = dashboardData?.weeklyChart?.map(
                (entry) => entry?.point || 0,
            )
            setBarUserDate(dates)
            setBarTotalUser(counts)
            setTotalWeeklyPoints(pointCounts)
        } else {
            setBarUserDate([])
            setBarTotalUser([])
            setTotalWeeklyPoints([])
        }
        return () => {}
    }, [dashboardData])

    return (
        <div className="mt-3 h-full w-full rounded-[20px]">
            {loading && <Loader />}
            <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 3xl:grid-cols-4">
                <div>
                    <MiniStatistics
                        icon={<MdPerson className="text-4xl" />}
                        title={t('NumberOfTotalUsers')}
                        value={numberFormateLabel(
                            dashboardData?.total_user || 0,
                        )}
                        bgColor={'bg-primary-gradient dark:!bg-navy-700'}
                        cardBg="bg-white"
                        titleColor="text-gray-600"
                        valueColor="text-navy-700 dark:text-white"
                        detailColor="text-gray-600"
                        iconColor="text-black "
                    />
                </div>
                <div>
                    <MiniStatistics
                        icon={<MdPerson className="text-4xl" />}
                        title={t('NumberOfActiveUsers')}
                        value={numberFormateLabel(
                            dashboardData?.total_active_user || 0,
                        )}
                        bgColor={'bg-primary-gradient dark:!bg-navy-700'}
                        cardBg="bg-white"
                        titleColor="text-gray-600"
                        valueColor="text-navy-700 dark:text-white"
                        detailColor="text-gray-600"
                        iconColor="text-black "
                    />
                </div>
                <div>
                    <MiniStatistics
                        icon={<MdOutlineBarChart className="text-4xl" />}
                        title={t('NumberOfTotalBIPPoints')}
                        value={numberFormateLabel(
                            dashboardData?.total_mining_point || 0,
                        )}
                        bgColor={'bg-primary-gradient dark:!bg-navy-700'}
                        cardBg="bg-white"
                        titleColor="text-gray-600"
                        valueColor="text-navy-700 dark:text-white"
                        detailColor="text-gray-600"
                        iconColor="text-black "
                    />
                </div>
                <div>
                    <MiniStatistics
                        icon={<GiPathDistance className="text-4xl" />}
                        title={t('total_covered_distance')}
                        value={numberFormateLabel(
                            dashboardData?.total_covered_distance || 0,
                        )}
                        valueLabel={'KM'}
                        bgColor={'bg-primary-gradient dark:!bg-navy-700'}
                        cardBg="bg-white"
                        titleColor="text-gray-600"
                        valueColor="text-navy-700 dark:text-white"
                        detailColor="text-gray-600"
                        iconColor="text-black "
                    />
                </div>
                <div>
                    <MiniStatistics
                        icon={<AnimalIcon size={30} />}
                        title={t('total_animal')}
                        value={numberFormateLabel(
                            dashboardData?.total_big || 0,
                        )}
                        bgColor={'bg-primary-gradient dark:!bg-navy-700'}
                        cardBg="bg-white"
                        titleColor="text-gray-600"
                        valueColor="text-navy-700 dark:text-white"
                        detailColor="text-gray-600"
                        iconColor="text-black "
                    />
                </div>
                <div>
                    <MiniStatistics
                        icon={<AnimalIcon size={30} />}
                        title={t('total_sold_animal')}
                        value={numberFormateLabel(dashboardData?.sold_big || 0)}
                        bgColor={'bg-primary-gradient dark:!bg-navy-700'}
                        cardBg="bg-white"
                        titleColor="text-gray-600"
                        valueColor="text-navy-700 dark:text-white"
                        detailColor="text-gray-600"
                        iconColor="text-black"
                    />
                </div>
            </div>

            {/*  */}
            <div className="mt-3 h-full w-full rounded-[20px]">
                <div className="mt-5 grid w-full grid-cols-1 gap-5 md:grid-cols-12 xl:grid-cols-12">
                    <div className="col-span-6 md:col-span-6 3xl:col-span-6">
                        <WeeklyRegisterUsers
                            dates={barUserDate}
                            totalUsers={barTotalUser}
                        />
                    </div>
                    <div className="col-span-6 md:col-span-6 3xl:col-span-6">
                        <WeeklyTotalPoints
                            dates={barUserDate}
                            totalUsers={totalWeeklyPoints}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
