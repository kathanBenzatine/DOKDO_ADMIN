import React from 'react'
import { DebounceInput } from 'react-debounce-input'
import { MdSearch } from 'react-icons/md'

function DebounceInputBox({
    placeholder,
    onSearch,
    showIcon,
    icon,
    className,
    value,
    errorClassName,
    ...other
}) {
    return (
        <div className="flex flex-col space-y-2">
            <div
                className={`border-inherit ${errorClassName} flex items-center rounded-xl border`}
            >
                <div
                    className={`flex h-[38px] flex-grow items-center rounded-xl text-sm text-gray-600 dark:!bg-navy-900 dark:text-white`}
                >
                    <MdSearch className="ml-2 mr-2 h-[25px] w-[25px]" />
                    <DebounceInput
                        value={value}
                        type="text"
                        className={`block w-full pr-3 text-sm text-navy-700 outline-none dark:!bg-navy-900 dark:text-white ${className}`}
                        placeholder={placeholder}
                        debounceTimeout={300}
                        onChange={(e) => onSearch(e.target.value)}
                        {...other}
                    />
                </div>
            </div>
        </div>
    )
}

export default DebounceInputBox
