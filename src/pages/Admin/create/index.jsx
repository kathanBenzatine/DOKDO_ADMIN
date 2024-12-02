import React, { useEffect } from 'react'
import { Card, CustomInputBox, Loader } from '../../../components'
import { FormProvider, useForm } from 'react-hook-form'
import { EmailRegex } from '../../../constant/const'
import { ErrorMessage } from '@hookform/error-message'
import { useDispatch, useSelector } from 'react-redux'
import { createSubAdminAction } from '../../../store/action/adminReducer'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { setBreadcrumbMenuName } from '../../../store/action/themeRedux'

function CreateAdmin() {
    const adminReducer = useSelector((state) => state.adminReducer)
    const method = useForm()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const {
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = method
    const { subAdminCreate, loading } = adminReducer
    const dispatch = useDispatch()

    const password = watch('password', '')

    const onSubmit = (data) => {
        delete data?.c_password
        dispatch(createSubAdminAction(data))
        reset()
    }

    useEffect(() => {
        if (subAdminCreate) {
            navigate('/admin/list')
        }
        return () => {}
    }, [subAdminCreate])

    useEffect(() => {
        dispatch(setBreadcrumbMenuName('Create Admin'))
        return () => {}
    }, [])

    return (
        <div>
            {loading && <Loader />}
            <FormProvider {...method}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-span-2 flex h-full w-full flex-col gap-5 xl:col-span-1">
                        <Card extra={'w-full px-[20px] py-[22px] h-full'}>
                            {/* Header */}
                            <div className="w-full px-[8px]">
                                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                    {t('SubAdminDetails')}
                                </h4>
                            </div>
                            <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
                                <div>
                                    <CustomInputBox
                                        label={t('Name')}
                                        placeholder={t('enterTheName')}
                                        type="text"
                                        name="name"
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    t('pleaseEnterTheName'),
                                            },
                                            validate: (value) => {
                                                return !!value.trim()
                                            },
                                        }}
                                        state={errors?.name ? 'error' : ''}
                                    />
                                    <span className="text-red-500">
                                        <ErrorMessage
                                            errors={errors}
                                            name="name"
                                            message={errors?.name?.message}
                                        />
                                    </span>
                                </div>
                                <div>
                                    <CustomInputBox
                                        label={t('email')}
                                        placeholder={t('enterTheEmail')}
                                        type="text"
                                        name="email_id"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: t(
                                                    'pleaseEnterTheEmail',
                                                ),
                                            },
                                            validate: (value) => {
                                                return !!value.trim()
                                            },
                                            pattern: {
                                                value: EmailRegex,
                                                message: t(
                                                    'Please enter the valid email address',
                                                ),
                                            },
                                        }}
                                        state={errors?.email_id ? 'error' : ''}
                                    />
                                    <span className="text-red-500">
                                        <ErrorMessage
                                            errors={errors}
                                            name="email_id"
                                            message={errors?.email_id?.message}
                                        />
                                    </span>
                                </div>
                                <div>
                                    <CustomInputBox
                                        label={t('password')}
                                        placeholder={t('enterThePassword')}
                                        type="password"
                                        name="password"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: t(
                                                    'pleaseEnterThePassword',
                                                ),
                                            },
                                            validate: (value) => {
                                                return !!value.trim()
                                            },
                                        }}
                                        state={errors?.password ? 'error' : ''}
                                    />
                                    <span className="text-red-500">
                                        <ErrorMessage
                                            errors={errors}
                                            name="password"
                                            message={errors?.password?.message}
                                        />
                                    </span>
                                </div>
                                <div>
                                    <CustomInputBox
                                        label={t('ConfirmPassword')}
                                        placeholder={t(
                                            'enterTheConfirmPassword',
                                        )}
                                        type="password"
                                        name="c_password"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: t(
                                                    'pleaseEnterTheConfirmPassword',
                                                ),
                                            },
                                            validate: (value) =>
                                                value === password ||
                                                t('PasswordsDoNotMatch'),
                                        }}
                                        state={
                                            errors?.c_password ? 'error' : ''
                                        }
                                    />
                                    <span className="text-red-500">
                                        <ErrorMessage
                                            errors={errors}
                                            name="c_password"
                                            message={
                                                errors?.c_password?.message
                                            }
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="m-auto w-[200px]">
                                <button
                                    type="submit"
                                    className="shadow-btnShadow mt-6 w-full rounded-xl bg-primary-gradient py-3 text-base font-bold text-[#000] transition duration-200 dark:bg-dark-primary-gradient"
                                >
                                    {t('Submit')}
                                </button>
                            </div>
                        </Card>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default CreateAdmin
