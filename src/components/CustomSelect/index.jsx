import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Select from 'react-select'
import { SelectStyles } from './SelectStyles'

/**
 * @typedef {Object} SelectProps
 * @property {string} label - The label for the select field.
 * @property {Array} options - The options for the select dropdown.
 * @property {string} name - The name of the select field.
 * @property {boolean} [required] - Whether the field is required (optional).
 * @property {Object} [rules] - Validation rules for react-hook-form (optional).
 * @property {string} [state] - Error or success state for styling (optional).
 * @property {boolean} [disabled] - Whether the select is disabled (optional).
 */

/**
 * Custom select component.
 * @param {SelectProps & import('react-select').Props} props - Props for the select component.
 */
function CustomSelect(props) {
    const { label, options, name, required, rules, state, disabled, ...other } = props

    const { control } = useFormContext()

    return (
        <div>
            {label && (
                <label
                    className={`ml-1.5 text-sm font-bold text-navy-700 dark:text-white`}
                >
                    {label}
                    {required && <span className="ml-1 text-red-400">*</span>}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Select
                        {...field}
                       
                        options={options}
                        isDisabled={disabled}
                        classNamePrefix="react-select" // Use to scope styles
                        className={`mt-2 rounded-[10px] border-[1px] border-solid ${
                            disabled
                                ? 'border-gray-100 dark:border-gray-600'
                                : state === 'error'
                                ? 'border-red-500 dark:border-red-400'
                                : state === 'success'
                                ? 'border-green-500 dark:border-green-400'
                                : 'border-gray-200 dark:border-white/10'
                        }`}
                        styles={SelectStyles}
                        {...other}
                    />
                )}
            />
        </div>
    )
}

export default CustomSelect
