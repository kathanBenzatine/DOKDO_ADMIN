import React, { useEffect, useRef, useState } from 'react'
import { Card, CustomInputBox, Loader, Switch } from '../../components'
import { FormProvider, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2'
import {
    getAppSettingAction,
    updateAppSettingAction,
} from '../../store/action/appSettingReducer'
import { setBreadcrumbMenuName } from '../../store/action/themeRedux'

function AppSettings() {
    const appSettingsData = useSelector((state) => state.appSettings)
    const { loading, appSettingData, updateAppSettings } = appSettingsData
    const { t } = useTranslation()
    const methods = useForm()
    const formRef = useRef(null)
    const [isUpdateApp, setIsUpdateApp] = useState(false)
    const [isForceUpdate, setIsForceUpdate] = useState(false)
    const {
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
    } = methods
    const dispatch = useDispatch()

    useEffect(() => {
        if (updateAppSettings) {
            dispatch(getAppSettingAction())
        }
        return () => {}
    }, [updateAppSettings])

    useEffect(() => {
        dispatch(getAppSettingAction())
        dispatch(setBreadcrumbMenuName('App Settings'))
        return () => {}
    }, [])

    useEffect(() => {
        if (appSettingData) {
            setValue('force_update_app', appSettingData?.force_update_app)
            setValue('update_app', appSettingData?.update_app)
            setIsForceUpdate(appSettingData?.force_update_app)
            setIsUpdateApp(appSettingData?.update_app)
            setValue(
                'display_app_version_android',
                appSettingData?.display_app_version_android,
            )
            setValue(
                'display_app_version_iOS',
                appSettingData?.display_app_version_iOS,
            )
            setValue('app_version_android', appSettingData?.app_version_android)
            setValue('app_version_iOS', appSettingData?.app_version_iOS)
        } else {
            setIsForceUpdate(false)
            setIsUpdateApp(false)
            reset()
            formRef.current.reset()
        }
        return () => {}
    }, [appSettingData])

    const onSubmit = (data) => {
        Swal.fire({
            title: '',
            html: t(`Are you sure you want to update App Settings?`),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('Yes'),
            cancelButtonText: t('Cancel'),
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
                dispatch(updateAppSettingAction(data))
            }
        })
    }

    return (
        <div>
            {loading && <Loader />}
            <Card extra={'w-full px-[20px] py-[22px] h-full'}>
                <form ref={formRef}>
                    <FormProvider {...methods}>
                        <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
                            <div className="mb-3">
                                <CustomInputBox
                                    name={'display_app_version_android'}
                                    label={t('Display app version android')}
                                    placeholder={t(
                                        'Enter display app version android',
                                    )}
                                    type="text"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: t(
                                                'please enter display app version android',
                                            ),
                                        },
                                    }}
                                    state={
                                        errors?.display_app_version_android
                                            ? 'error'
                                            : ''
                                    }
                                />
                                {errors?.display_app_version_android && (
                                    <span className="ml-3 mt-2 text-red-500">
                                        <ErrorMessage
                                            errors={errors}
                                            name="display_app_version_android"
                                            message={
                                                errors
                                                    ?.display_app_version_android
                                                    ?.message
                                            }
                                        />
                                    </span>
                                )}
                            </div>
                            <div className="mb-3">
                                <CustomInputBox
                                    name={'display_app_version_iOS'}
                                    label={t('Display app version iOS')}
                                    placeholder={t(
                                        'Enter display app version iOS',
                                    )}
                                    type="text"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: t(
                                                'please enter display app version iOS',
                                            ),
                                        },
                                    }}
                                    state={
                                        errors?.display_app_version_iOS
                                            ? 'error'
                                            : ''
                                    }
                                />
                                {errors?.display_app_version_iOS && (
                                    <span className="ml-3 mt-2 text-red-500">
                                        <ErrorMessage
                                            errors={errors}
                                            name="display_app_version_iOS"
                                            message={
                                                errors?.display_app_version_iOS
                                                    ?.message
                                            }
                                        />
                                    </span>
                                )}
                            </div>
                            <div className="mb-3">
                                <CustomInputBox
                                    name={'app_version_android'}
                                    label={t('App version android')}
                                    placeholder={t('Enter app version android')}
                                    type="text"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: t(
                                                'please enter app version android',
                                            ),
                                        },
                                    }}
                                    state={
                                        errors?.app_version_android
                                            ? 'error'
                                            : ''
                                    }
                                />
                                {errors?.app_version_android && (
                                    <span className="ml-3 mt-2 text-red-500">
                                        <ErrorMessage
                                            errors={errors}
                                            name="app_version_android"
                                            message={
                                                errors?.app_version_android
                                                    ?.message
                                            }
                                        />
                                    </span>
                                )}
                            </div>
                            <div className="mb-3">
                                <CustomInputBox
                                    name={'app_version_iOS'}
                                    label={t('App version iOS')}
                                    placeholder={t('Enter app version iOS')}
                                    type="text"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: t(
                                                'please enter app version iOS',
                                            ),
                                        },
                                    }}
                                    state={
                                        errors?.app_version_iOS ? 'error' : ''
                                    }
                                />
                                {errors?.app_version_iOS && (
                                    <span className="ml-3 mt-2 text-red-500">
                                        <ErrorMessage
                                            errors={errors}
                                            name="app_version_iOS"
                                            message={
                                                errors?.app_version_iOS?.message
                                            }
                                        />
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-start gap-3">
                                <label
                                    className={`ml-1.5 text-sm font-medium text-navy-700 dark:text-white`}
                                >
                                    {t('Update App')}
                                </label>
                                <Switch
                                    id={`switch-1`}
                                    checked={isUpdateApp}
                                    name={'update_app'}
                                    onChange={(e) => {
                                        setIsUpdateApp(!isUpdateApp)
                                        setValue('update_app', !isUpdateApp)
                                    }}
                                />
                            </div>
                            <div className="mt-3 flex items-center justify-start gap-3">
                                <label
                                    className={`ml-1.5 text-sm font-medium text-navy-700 dark:text-white`}
                                >
                                    {t('Force Update App')}
                                </label>
                                <Switch
                                    id={`switch-2`}
                                    checked={isForceUpdate}
                                    name="force_update_app"
                                    onChange={() => {
                                        setIsForceUpdate(!isForceUpdate)
                                        setValue(
                                            'force_update_app',
                                            !isForceUpdate,
                                        )
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="shadow-btnShadow mt-6 w-max rounded-xl bg-primary-gradient py-3 pl-4 pr-4 text-base font-bold text-[#000] transition duration-200 dark:bg-dark-primary-gradient"
                                onClick={handleSubmit(onSubmit)}
                            >
                                {t('update')}
                            </button>
                        </div>
                    </FormProvider>
                </form>
            </Card>
        </div>
    )
}

export default AppSettings
