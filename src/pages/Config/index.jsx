import React, { useEffect, useRef } from 'react'
import { Card, CustomInputBox, Loader } from '../../components'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2'
import {
    getConfigAction,
    updateConfigAction,
} from '../../store/action/configReducer'
import { setBreadcrumbMenuName } from '../../store/action/themeRedux'

function Config() {
    const configReducer = useSelector((state) => state.config)
    const { loading, configData, updateConfig } = configReducer
    const { t } = useTranslation()
    const methods = useForm()
    const formRef = useRef(null)
    const { handleSubmit, setValue, reset } = methods
    const dispatch = useDispatch()

    useEffect(() => {
        if (updateConfig) {
            dispatch(getConfigAction())
        }
        return () => {}
    }, [updateConfig])

    useEffect(() => {
        dispatch(getConfigAction())
        dispatch(setBreadcrumbMenuName('Config'))
        return () => {}
    }, [])

    useEffect(() => {
        if (configData) {
            setValue('email_id', configData?.email_id)
            setValue('terms_condition_url', configData?.terms_condition_url)
            setValue('privacy_policy_url', configData?.privacy_policy_url)
        } else {
            reset()
            formRef.current.reset()
        }
        return () => {}
    }, [configData])

    const onSubmit = (data) => {
        Swal.fire({
            title: '',
            html: t(`Are you sure you want to update config?`),
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
                dispatch(updateConfigAction(data))
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
                                    name={'email_id'}
                                    label={t('email')}
                                    placeholder={t('enterTheEmail')}
                                    type="email"
                                />
                            </div>
                            <div className="mb-3">
                                <CustomInputBox
                                    name={'terms_condition_url'}
                                    label={t('terms_condition_url')}
                                    placeholder={t(
                                        'Enter the terms condition url',
                                    )}
                                    type="text"
                                />
                            </div>
                            <div className="mb-3">
                                <CustomInputBox
                                    name={'privacy_policy_url'}
                                    label={t('privacy_policy_url')}
                                    placeholder={t(
                                        'Enter the privacy policy url',
                                    )}
                                    type="text"
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

export default Config
