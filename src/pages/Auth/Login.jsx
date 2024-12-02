import React, { useEffect } from 'react'
import { CustomInputBox, Loader } from '../../components'
import Footer from '../../Layouts/AdminLayout/Footer'
import { useNavigate } from 'react-router-dom'
import { LogoImage } from '../../assets'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../store/action/authReducer'
import { EmailRegex } from '../../constant/const'
import { ErrorMessage } from '@hookform/error-message'
import { useTranslation } from 'react-i18next'

function Login() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const authData = useSelector((state) => state.auth)
    const { user, isLogin, loading } = authData
    const navigate = useNavigate()
    const method = useForm()
    const {
        handleSubmit,
        formState: { errors },
    } = method

    const onSubmit = (data) => {
        dispatch(loginAction(data))
    }

    useEffect(() => {
        if (user && isLogin && user?.token) {
            navigate('/')
        }
        return () => {}
    }, [user])

    if (isLogin) {
        return null
    }

    return (
        <div className="relative flex dark:bg-navy-900">
            {loading && <Loader />}
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
                <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                            <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                                {t('signIn')}
                            </h3>
                            <p className="mb-9 ml-1 text-base text-gray-600">
                                {t('signInMessage')}
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormProvider {...method}>
                                    <div className="mb-3">
                                        <CustomInputBox
                                            name={'email_id'}
                                            label={t('email')}
                                            placeholder={t('enterTheEmail')}
                                            type="text"
                                            rules={{
                                                required: true,
                                                pattern: {
                                                    value: EmailRegex,
                                                    message: '',
                                                },
                                            }}
                                            state={
                                                errors?.email_id ? 'error' : ''
                                            }
                                        />
                                        {errors?.email_id && (
                                            <span className="ml-3 mt-2 text-red-500">
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="email_id"
                                                    message={t(
                                                        'pleaseEnterTheEmail',
                                                    )}
                                                />
                                            </span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <CustomInputBox
                                            name={'password'}
                                            label={t('password')}
                                            placeholder={t('enterThePassword')}
                                            type="password"
                                            rules={{ required: true }}
                                            state={
                                                errors?.password ? 'error' : ''
                                            }
                                        />
                                        {errors?.password && (
                                            <span className="ml-3 mt-2 text-red-500">
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="password"
                                                    message={t(
                                                        'pleaseEnterThePassword',
                                                    )}
                                                />
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="shadow-btnShadow w-full rounded-xl bg-primary-gradient py-3 text-base font-bold text-secondaryBlack transition duration-200 hover:bg-primary active:bg-primary dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
                                    >
                                        {t('login')}
                                    </button>
                                </FormProvider>
                            </form>
                        </div>
                    </div>
                    <div className="absolute right-0 hidden h-full min-h-screen items-center justify-center rounded-bl-[250px] bg-primary-gradient md:block lg:flex lg:w-[49vw] 2xl:w-[44vw]">
                        <div
                            className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                            style={{
                                backgroundImage: `url(${LogoImage})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                width: '50%',
                            }}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Login
