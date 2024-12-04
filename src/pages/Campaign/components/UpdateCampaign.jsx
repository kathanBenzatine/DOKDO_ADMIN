import React, { useEffect, useState, useRef } from 'react'
import {
    CustomInputBox,
    CustomModal,
    CustomDatePicker,
    CustomSelect,
} from '../../../components'
import { GrUpload } from 'react-icons/gr'
import { ErrorMessage } from '@hookform/error-message'
import { useDispatch, useSelector } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
    setAddCampaignFlag,
    addCampaignAction,
    editCampaignAction,
} from '../../../store/action/campaignListReducer'
import { toastError } from '../../../utils/toaster'
import '../Campaign.css'

export default function UpdateCampaign({
    isOpen,
    onOpen,
    onClose,
    UpdateParams,
    setUpdateParams,
}) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const CampaignData = useSelector((state) => state.campaign)
    const imgInputRef = useRef(null)
    const handleImgClick = () => {
        imgInputRef.current.click()
    }
    const method = useForm({
        defaultValues: { reward_type: { value: 'USDT', label: 'USDT' } },
    })

    const {
        formState: { errors },
        reset,
        handleSubmit,
        watch,
        setValue,
        register,
        setError,
        getValues,
        clearErrors,
    } = method

    const startDate = watch('start_date')
    const LogoImgw = watch('logo')
    useEffect(() => {
        if (LogoImgw) {
            clearErrors('logo')
        }

        // console.log(LogoImgw, 'logo img', errors?.logo, 'errror of logo')
    }, [LogoImgw, errors])

    const onSubmit = (data) => {
        const formData = new FormData()

        formData.append('name', data?.name || '')
        formData.append('start_date', data?.start_date || '')
        formData.append('end_date', data?.end_date || '')
        formData.append('reward_type', data?.reward_type?.value || '')
        formData.append('reward_value', data?.reward_value || '')
        formData.append('logo', data?.logo || '')
        if (UpdateParams?.status == 'edit') {
            formData.append('campaign_id', UpdateParams?.campaign_id)

            dispatch(editCampaignAction(formData))
        } else {
            dispatch(addCampaignAction(formData))
        }
    }

    const handleImgChange = (event) => {
        const fileInput = event.target
        const file = fileInput.files[0]

        if (file && file.type.startsWith('image/')) {
            setValue('logo', file)
            clearErrors('logo')

            fileInput.value = ''
        } else {
            toastError('Non-image file not allowed')
        }
    }
    
    useEffect(() => {
        setValue('name', UpdateParams?.name || '')
        setValue('start_date', UpdateParams?.start_date || '')
        setValue('end_date', UpdateParams?.end_date || '')
        setValue(
            'reward_type',
            UpdateParams?.reward_type
                ? {
                      value: UpdateParams?.reward_type,
                      label: UpdateParams?.reward_type,
                  }
                : { value: 'USDT', label: 'USDT' },
        )
        setValue('reward_value', UpdateParams?.reward_value || '')
        setValue('logo', UpdateParams?.logo)

        if (UpdateParams?.status == 'add') {
            reset()
        }
    }, [UpdateParams])

    return (
        <FormProvider {...method}>
            <form>
                <CustomModal
                    open={isOpen}
                    onClose={onClose}
                    title={`${UpdateParams?.status == 'edit' ? `Edit` : `Add`} Campaign`}
                    footerComponent={
                        <>
                            <button
                                onClick={handleSubmit(onSubmit)}
                                type="submit"
                                className="mr-2 w-25p rounded-xl bg-secondaryBlack py-3 font-bold text-white hover:bg-primary active:bg-primary dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
                            >
                                {UpdateParams?.status == 'edit'
                                    ? `Edit`
                                    : `Add`}
                            </button>
                            <button
                                className="mr-2 w-25p rounded-xl bg-secondaryBlack py-3 font-bold text-white hover:bg-primary active:bg-primary dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
                                onClick={() => {
                                    onClose()
                                    reset()
                                    dispatch(setAddCampaignFlag())
                                }}
                            >
                                {t('Close')}
                            </button>
                        </>
                    }
                    scrollBehavior="inside"
                    isCentered
                >
                    <div>
                        <div className="mb-3">
                            <CustomInputBox
                                label={`Name`}
                                placeholder={`enter name`}
                                type="text"
                                name="name"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'please enter a campaign name',
                                    },
                                    // validate: (value) => {
                                    //     return !!value.trim()
                                    // },
                                }}
                                state={errors?.name ? 'error' : ''}
                            />
                            {errors?.name && (
                                <span className="ml-2 text-sm text-red-500">
                                    <ErrorMessage
                                        errors={errors}
                                        name="name"
                                        message={errors?.name?.message}
                                    />
                                </span>
                            )}
                        </div>
                        <div className="mb-3">
                            <CustomDatePicker
                                showTime={true}
                                label={`Start Date`}
                                placeholder={`start date`}
                                name="start_date"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'please select a start date',
                                    },
                                }}
                                state={errors?.start_date ? 'error' : ''}
                            />

                            {errors?.start_date && (
                                <span className="ml-2 text-sm text-red-500">
                                    <ErrorMessage
                                        errors={errors}
                                        name="start_date"
                                        message={errors?.start_date?.message}
                                    />
                                </span>
                            )}
                        </div>
                        <div className="mb-3">
                            <CustomDatePicker
                                excludeDateIntervals={[
                                    {
                                        start: new Date(0),
                                        end: new Date(startDate),
                                    },
                                ]}
                                showTime={true}
                                label={`End Date`}
                                placeholder={`end date`}
                                name="end_date"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'please select a end date',
                                    },
                                }}
                                state={errors?.end_date ? 'error' : ''}
                            />

                            {errors?.end_date && (
                                <span className="ml-2 text-sm text-red-500">
                                    <ErrorMessage
                                        errors={errors}
                                        name="end_date"
                                        message={errors?.end_date?.message}
                                    />
                                </span>
                            )}
                        </div>
                        <div className="mb-3">
                            <CustomSelect
                                label={`Reward Type`}
                                placeholder={`reward type`}
                                name="reward_type"
                                options={[
                                    { value: 'USDT', label: 'USDT' },
                                    { value: 'Reffels', label: 'Reffels' },
                                ]}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'please select a reward type',
                                    },
                                }}
                                state={errors?.reward_type ? 'error' : ''}
                            />

                            {errors?.reward_type && (
                                <span className="ml-2 text-sm text-red-500">
                                    <ErrorMessage
                                        errors={errors}
                                        name="reward_type"
                                        message={errors?.reward_type?.message}
                                    />
                                </span>
                            )}
                        </div>
                        <div className="mb-3">
                            <CustomInputBox
                                label={`Reward Value`}
                                placeholder={`reward value`}
                                type="number"
                                name="reward_value"
                                rules={{
                                    required: {
                                        value: true,

                                        message:
                                            'please enter a numeric reward value',
                                    },
                                    pattern: /^([0-9e]*)$/i,
                                    // validate: (value) => {
                                    //     return !!value.trim()
                                    // },
                                }}
                                state={errors?.reward_value ? 'error' : ''}
                            />
                            {errors?.reward_value && (
                                <span className="ml-2 text-sm text-red-500">
                                    <ErrorMessage
                                        errors={errors}
                                        name="reward_value"
                                        message={errors?.reward_value?.message}
                                    />
                                </span>
                            )}
                        </div>

                        <div className="uploading-class mb-3">
                            <div
                                className="img-upload cursor-pointer"
                                onClick={handleImgClick}
                            >
                                <button className="upload-btn">
                                    <GrUpload />
                                </button>
                            </div>

                            <span className="ml-1 mt-4 text-red-400">*</span>

                            {LogoImgw && (
                                <div className="logo-class ml-2 mt-5">
                                    {typeof LogoImgw === 'string' &&
                                    UpdateParams?.status == 'edit' ? (
                                        <img
                                            src={LogoImgw}
                                            alt="Image LogoImg"
                                            className="image-LogoImg w-100p h-100p"
                                        />
                                    ) : (
                                        <img
                                            src={URL.createObjectURL(LogoImgw)}
                                            alt="Image LogoImg"
                                            className="image-LogoImg w-100p h-100p"
                                        />
                                    )}
                                    <button
                                        onClick={() => {
                                            setValue('logo', null)
                                            // setLogoImg(null)
                                            setError('logo', {
                                                type: 'custom',
                                                message:
                                                    'please add a logo image',
                                            })
                                        }}
                                        className="remove-button ml-1 mt-4"
                                    >
                                        ✖
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                id="file-input"
                                className="logo"
                                accept="image/*"
                                ref={imgInputRef}
                                onChange={handleImgChange}
                            />

                            {errors?.logo && (
                                <span className="ml-2 mt-4 text-sm text-red-500">
                                    {errors.logo.message}
                                </span>
                            )}
                        </div>
                    </div>
                </CustomModal>
            </form>
        </FormProvider>
    )
}
