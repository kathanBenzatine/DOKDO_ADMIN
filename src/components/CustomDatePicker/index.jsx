import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useFormContext } from 'react-hook-form'

export default function CustomDatePicker(props) {
    const {
        label,
        name,
        rules,
        placeholder,
        state,
        disabled,
        showTime=false,
        ...other
    } = props
    const { control } = useFormContext()

    return showTime === true ? (
        <div>
            <label className="ml-1.5 text-sm font-bold text-navy-700 dark:text-white">
                {label}
                {rules?.required && (
                    <span className="ml-1 text-red-400">*</span>
                )}
            </label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <DatePicker
                        showTimeInput
                        timeInputLabel="Enter Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        placeholderText={placeholder}
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                            disabled
                                ? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
                                : state === 'error'
                                  ? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
                                  : state === 'success'
                                    ? 'border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400'
                                    : 'border-gray-200 dark:!border-white/10 dark:text-white'
                        }`}
                        disabled={disabled}
                        {...other}
                    />
                )}
            />
        </div>
    ) : (
        <div>
            <label className="ml-1.5 text-sm font-bold text-navy-700 dark:text-white">
                {label}
                {rules?.required && (
                    <span className="ml-1 text-red-400">*</span>
                )}
            </label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        placeholderText={placeholder}
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                            disabled
                                ? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
                                : state === 'error'
                                  ? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
                                  : state === 'success'
                                    ? 'border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400'
                                    : 'border-gray-200 dark:!border-white/10 dark:text-white'
                        }`}
                        disabled={disabled}
                        {...other}
                    />
                )}
            />
        </div>
    )
}
