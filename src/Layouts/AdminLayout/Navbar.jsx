import React, { useEffect, useState } from 'react'
import { BsJustify } from 'react-icons/bs'
import { RiMoonFill, RiSunFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { CustomInputBox, CustomModal, Dropdown, Loader } from '../../components'
import { useDisclosure } from '@chakra-ui/hooks'
import { useDispatch, useSelector } from 'react-redux'
import {
    resetPasswordAction,
    resetUserInfo,
    setResetPasswordFlag,
} from '../../store/action/authReducer'
import { LogoImage } from '../../assets'
import { Button } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { changeLanguage, toggleTheme } from '../../store/action/themeRedux'
import { useTranslation } from 'react-i18next'
import { DokdoConst } from '../../constant/const'

function Navbar(props) {
    const { onOpenSidenav, brandText } = props
    const { t } = useTranslation()
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode'))
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const authData = useSelector((state) => state.auth)
    const { user, resetPassword, loading } = authData

    const themeData = useSelector((state) => state.theme)
    const { language } = themeData

    const method = useForm()
    const {
        formState: { errors },
        reset,
        handleSubmit,
        watch,
    } = method

    const password = watch('new_password', '')

    const logout = () => {
        localStorage.removeItem(DokdoConst)
        dispatch(resetUserInfo())
        navigate('/')
    }

    const onSubmit = (data) => {
        delete data?.c_password
        dispatch(resetPasswordAction(data))
    }

    useEffect(() => {
        if (resetPassword) {
            reset()
            onClose()
            dispatch(setResetPasswordFlag())
        }
        return () => {}
    }, [resetPassword])

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value
        dispatch(changeLanguage(selectedLanguage))
    }

    // set theme
    if (darkMode) {
        document.body.classList.add('dark')
    } else {
        document.body.classList.remove('dark')
    }
    return (
        <div>
            {loading && <Loader />}
            <nav className="fixed right-3 top-3 flex w-[calc(100vw_-_6%)] flex-row flex-wrap items-center justify-between rounded-xl bg-white/55 p-2 backdrop-blur-xl dark:bg-[transparent] md:right-[30px] md:top-4 md:w-[calc(100vw_-_8%)] lg:w-[calc(100vw_-_6%)] xl:top-[20px] xl:w-[calc(100vw_-_350px)] 2xl:w-[calc(100vw_-_365px)]">
                <div className="ml-[6px]">
                    <div className="h-6 w-[224px] pt-1">
                        <Link
                            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                            to="#"
                        >
                            {t('Pages')}
                            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
                                {' '}
                                /{' '}
                            </span>
                        </Link>
                        <Link
                            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                            to="#"
                        >
                            {t(brandText)}
                        </Link>
                    </div>
                    <div className="shrink text-[20px] capitalize text-navy-700 dark:text-white sm:text-[33px]">
                        <Link
                            to="#"
                            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
                        >
                            {t(brandText)}
                        </Link>
                    </div>
                </div>

                <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:w-[200px] xl:gap-2">
                    <BsJustify
                        className="dark:text-whit mobile-Menu-Icon h-5 w-5 text-gray-600"
                        onClick={onOpenSidenav}
                    />
                    <div>
                        <select
                            className="h-[30px] w-full rounded-md border"
                            value={language}
                            onChange={handleLanguageChange}
                        >
                            <option value={'en'}>en</option>
                            <option value={'kr'}>kr</option>
                        </select>
                    </div>

                    <div
                        className="cursor-pointer text-gray-600"
                        onClick={() => {
                            if (darkMode) {
                                document.body.classList.remove('dark')
                                setDarkMode(false)
                                dispatch(toggleTheme(false))
                                localStorage.removeItem('darkMode')
                            } else {
                                document.body.classList.add('dark')
                                setDarkMode(true)
                                dispatch(toggleTheme(true))
                                localStorage.setItem('darkMode', true)
                            }
                        }}
                    >
                        {darkMode ? (
                            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
                        ) : (
                            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
                        )}
                    </div>
                    {/* Profile & Dropdown */}
                    <Dropdown
                        button={
                            <img
                                className="h-10 w-10 cursor-pointer rounded-full object-contain"
                                src={LogoImage}
                                alt="avatar"
                            />
                        }
                        children={
                            <div className="flex h-max w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                                <div className="ml-4 mt-3">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold capitalize text-navy-700 dark:text-white">
                                            👋 Hey, {user?.name}
                                        </p>{' '}
                                    </div>
                                </div>
                                <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20" />

                                <div className="flex flex-col">
                                    <div
                                        className="cursor-pointer p-[10px] text-sm font-medium text-red-500 hover:text-red-500 hover:backdrop-brightness-90"
                                        onClick={() => {
                                            reset()
                                            onOpen()
                                        }}
                                    >
                                        {t('ChangePassword')}
                                    </div>
                                    <div
                                        onClick={logout}
                                        className="cursor-pointer p-[10px] text-sm font-medium text-red-500 hover:text-red-500 hover:backdrop-brightness-90"
                                    >
                                        {t('LogOut')}
                                    </div>
                                </div>
                            </div>
                        }
                        classNames={'py-2 top-8 -left-[180px] w-max'}
                    />
                </div>
            </nav>
            <FormProvider {...method}>
                <form>
                    <CustomModal
                        open={isOpen}
                        onClose={onClose}
                        title={t('ChangePassword')}
                        footerComponent={
                            <>
                                <Button
                                    type="submit"
                                    className="mr-2 !bg-primary-gradient font-bold text-[#000] shadow-btnShadow"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    {t('Submit')}
                                </Button>
                                <Button
                                    onClick={() => {
                                        onClose()
                                        reset()
                                    }}
                                >
                                    {t('Close')}
                                </Button>
                            </>
                        }
                        scrollBehavior="inside"
                        isCentered
                    >
                        <div>
                            <div className="mb-3">
                                <CustomInputBox
                                    label={t('OldPassword')}
                                    placeholder={t('enterTheOldPassword')}
                                    type="password"
                                    name="old_password"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: t(
                                                'pleaseEnterTheOldPassword',
                                            ),
                                        },
                                        validate: (value) => {
                                            return !!value.trim()
                                        },
                                    }}
                                    state={errors?.old_password ? 'error' : ''}
                                />
                                {errors?.old_password && (
                                    <span className="ml-2 text-sm text-red-500">
                                        <ErrorMessage
                                            errors={errors}
                                            name="old_password"
                                            message={
                                                errors?.old_password?.message
                                            }
                                        />
                                    </span>
                                )}
                            </div>
                            <div className="mb-3">
                                <CustomInputBox
                                    label={t('NewPassword')}
                                    placeholder={t('enterTheNewPassword')}
                                    type="password"
                                    name="new_password"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: t(
                                                'pleaseEnterTheNewPassword',
                                            ),
                                        },
                                        validate: (value) => {
                                            return !!value.trim()
                                        },
                                    }}
                                    state={errors?.new_password ? 'error' : ''}
                                />
                                {errors?.new_password && (
                                    <span className="ml-2 text-sm text-red-500">
                                        <ErrorMessage
                                            errors={errors}
                                            name="new_password"
                                            message={
                                                errors?.new_password?.message
                                            }
                                        />
                                    </span>
                                )}
                            </div>
                            <div>
                                <CustomInputBox
                                    label={t('ConfirmPassword')}
                                    placeholder={t('enterTheConfirmPassword')}
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
                                    state={errors?.c_password ? 'error' : ''}
                                />
                                {errors?.c_password && (
                                    <span className="ml-2 text-sm text-red-500">
                                        <ErrorMessage
                                            errors={errors}
                                            name="c_password"
                                            message={
                                                errors?.c_password?.message
                                            }
                                        />
                                    </span>
                                )}
                            </div>
                        </div>
                    </CustomModal>
                </form>
            </FormProvider>
        </div>
    )
}

export default Navbar
