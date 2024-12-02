// Custom components
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

/**
 * @typedef {Object} InputProps
 * @property {string} label - The label for the input field.
 * @property {string} type - The type of the input field (e.g., "text", "password", "email").
 * @property {string} name - The name of the input field.
 * @property {string} [placeholder] - The placeholder text for the input field (optional).
 * @property {Omit<import('react-hook-form').RegisterOptions<import('react-hook-form').FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">} [rules] - The rules for validation (optional).
 * @property {string} [state] -  error or success (optional)
 */

/**
 * Custom input box component.
 * @param {InputProps & React.HTMLAttributes<HTMLInputElement>} props - The props for the input box.
 */

function CustomInputBox(props) {
    const { label, type, placeholder, state, disabled, rules, name, ...other } =
        props

    const { control } = useFormContext()
    return (
        <div>
            <label
                className={`ml-1.5 text-sm font-bold text-navy-700 dark:text-white`}
            >
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
                    <input
                        type={type}
                        {...field}
                        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                            disabled === true
                                ? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
                                : state === 'error'
                                  ? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
                                  : state === 'success'
                                    ? 'border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400'
                                    : 'border-gray-200 dark:!border-white/10 dark:text-white'
                        }`}
                        placeholder={placeholder}
                        disabled={disabled}
                        {...other}
                    />
                )}
            />
        </div>
    )
}

export default CustomInputBox
