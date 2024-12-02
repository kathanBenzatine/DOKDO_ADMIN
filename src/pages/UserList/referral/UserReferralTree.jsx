import React, { useEffect } from 'react'
import { Card, Loader } from '../../../components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { numberFormateLabel } from '../../../utils/numberFormateLabel'
import { useTranslation } from 'react-i18next'
import { getUserReferralTreeDataAction } from '../../../store/action/userListReducer'
import { setBreadcrumbMenuName } from '../../../store/action/themeRedux'

const getUserInitials = (name) => {
    const initials = name
        .split(' ')
        .map((word) => word[0] + word[1])
        .join('')
    return initials.toUpperCase()
}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * 8)]
    }
    return color
}

const ParentUser = (props) => {
    const { item } = props
    const { t } = useTranslation()

    return (
        <>
            <div className="mgt-item-parent">
                <div className="person">
                    <div
                        className="image-create relative !border-gray-500 dark:!border-white/10"
                        style={{ backgroundColor: getRandomColor() }}
                    >
                        {getUserInitials(item?.username)}
                        <div
                            className={`absolute right-2 top-0 h-3 w-3 rounded-[50px] border-2 border-solid ${item?.is_new ? 'bg-yellow-500' : item?.is_active ? 'bg-green-500' : 'bg-gray-500'}`}
                        ></div>
                    </div>
                    <div className="name rounded-lg !text-[16px] dark:!bg-navy-400 dark:!text-white">
                        <div className="flex w-max items-center justify-center gap-2">
                            {`${item?.username} (${t('Total Distance')} - ${item?.total_distance || 0} KM)`}
                        </div>
                        <span className="m-auto block w-max">
                            {numberFormateLabel(item?.total_bic || 0)} (
                            {t('Total BIC Point')})
                        </span>
                        <span className="m-auto block w-max">
                            {numberFormateLabel(item?.total_bip || 0)} (
                            {t('Total BIP Point')})
                        </span>
                    </div>
                </div>
            </div>
            <div className="mgt-item-children p">
                {item &&
                    item.children.length > 0 &&
                    item.children.map((it, i) => {
                        return (
                            <div
                                className={`${item.children.length === 1 ? 'remove mgt-item-child' : 'mgt-item-child'} `}
                                key={i}
                            >
                                <div className="mgt-item">
                                    <ChildrenUser item={it} />
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

const ChildrenUser = (props) => {
    const { item } = props
    const { t } = useTranslation()
    return (
        <>
            <div
                className={`${item?.children.length > 0 ? 'mgt-item-parent' : ''} `}
            >
                <div className="person">
                    <div
                        className="image-create relative !border-gray-500 dark:!border-white/10"
                        style={{ backgroundColor: getRandomColor() }}
                    >
                        {getUserInitials(item?.username)}
                        <div
                            className={`absolute right-2 top-0 h-3 w-3 rounded-[50px] border-2 border-solid ${item?.is_new ? 'bg-yellow-500' : item?.is_active ? 'bg-green-500' : 'bg-gray-500'}`}
                        ></div>
                    </div>
                    <div className="name rounded-lg !text-[16px] dark:!bg-navy-400 dark:!text-white">
                        {item.children.length > 0 ? (
                            <>
                                <Link
                                    to={`/user-list/referral/${item?._id}`}
                                    className="underline"
                                >
                                    <div className="flex w-max items-center justify-center gap-2">
                                        {`${item?.username} (${t('Total Distance')} - ${item?.total_distance || 0} KM)`}
                                    </div>
                                </Link>
                                <span className="m-auto block w-max">
                                    {numberFormateLabel(item?.total_bic || 0)} (
                                    {t('Total BIC Point')})
                                </span>
                                <span className="m-auto block w-max">
                                    {numberFormateLabel(item?.total_bip || 0)} (
                                    {t('Total BIP Point')})
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="name rounded-lg !text-[16px] dark:!bg-navy-400 dark:!text-white">
                                    <div className="flex w-max items-center justify-center gap-2">
                                        {`${item?.username} (${t('Total Distance')} - ${item?.total_distance || 0} KM)`}
                                    </div>
                                    <span className="m-auto block w-max">
                                        {numberFormateLabel(
                                            item?.total_bic || 0,
                                        )}{' '}
                                        ({t('Total BIC Point')})
                                    </span>
                                    <span className="m-auto block w-max">
                                        {numberFormateLabel(
                                            item?.total_bip || 0,
                                        )}{' '}
                                        ({t('Total BIP Point')})
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className={`mgt-item-children`}>
                {item &&
                    item.children.length > 0 &&
                    item.children.map((it, i) => {
                        return (
                            <div
                                className={`${item.children.length === 1 ? 'remove mgt-item-child' : 'mgt-item-child'} `}
                                key={i}
                            >
                                <div className={`mgt-item`}>
                                    <ChildrenUser item={it} />
                                </div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

const UserReferralTree = () => {
    const { t } = useTranslation()
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userReducer = useSelector((state) => state.user)
    const { userReferralTreeData, loading } = userReducer

    useEffect(() => {
        if (params) {
            dispatch(getUserReferralTreeDataAction({ id: params.id }))
        }
        return () => {}
    }, [params])

    useEffect(() => {
        dispatch(setBreadcrumbMenuName('User List / referral'))
        return () => {}
    }, [])

    return (
        <Card extra={` w-full h-full mt-3 !rounded-[20px]`}>
            {loading && <Loader />}
            <div className="ml-3 w-max pt-3" onClick={() => navigate(-1)}>
                <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                    <svg
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                            fill="#A3AED0"
                        />
                    </svg>
                    <p className="ml-3 text-[15px] text-gray-600">
                        {t('Back')}
                    </p>
                </div>
            </div>
            <div className="p-2">
                <span className="font-bold">{t('status')}</span>
                <ul className="flex flex-wrap justify-start gap-2">
                    <li className="plan-after flex items-center justify-start gap-2">
                        {t('Active')} :
                        <div className="h-3 w-3 rounded-[50px] border-2 border-solid bg-green-600"></div>
                    </li>
                    <li className="plan-after flex items-center justify-start gap-2">
                        {t('InActive')} :
                        <div className="h-3 w-3 rounded-[50px] border-2 border-solid bg-gray-600"></div>
                    </li>
                    <li className="flex items-center justify-start gap-2">
                        {t('New User')} :
                        <div className="h-3 w-3 rounded-[50px] border-2 border-solid bg-yellow-600"></div>
                    </li>
                </ul>
            </div>
            <div className="verticals twelve">
                <section className="management-tree">
                    <div className="mgt-container pb-3">
                        <div className="mgt-wrapper">
                            <div className="mgt-item">
                                {userReferralTreeData &&
                                    userReferralTreeData?.length > 0 &&
                                    userReferralTreeData?.map((item, i) => {
                                        if (item.children.length > 0) {
                                            return (
                                                <ParentUser
                                                    item={item}
                                                    key={i}
                                                />
                                            )
                                        } else {
                                            return (
                                                <div>
                                                    <p>
                                                        No Referral Found for{' '}
                                                        <b className="capitalize">
                                                            {
                                                                userReferralTreeData[0]
                                                                    ?.username
                                                            }
                                                        </b>{' '}
                                                        user
                                                    </p>
                                                </div>
                                            )
                                        }
                                    })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Card>
    )
}

export default UserReferralTree
