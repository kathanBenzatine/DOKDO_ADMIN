import React from 'react'
import Select from 'react-select'
import { SelectStyles } from './SelectStyles'

function CustomSelect({ options, label, required, className, ...other }) {
    return (
        <div>
            {label && (
                <label
                    className={`mb-2 ml-1.5 inline-block text-sm font-bold text-navy-700 dark:text-white`}
                >
                    {label}
                    {required && <span className="ml-1 text-red-400">*</span>}
                </label>
            )}
            <Select
                options={options}
                className={`rounded-[10px] border-[1px] border-solid border-gray-200 ${className}`}
                styles={SelectStyles}
                {...other}
            />
        </div>
    )
}

export default CustomSelect
