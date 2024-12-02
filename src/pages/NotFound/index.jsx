import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
        <div>
            <div className="bg-lightPrimary dark:bg-[#0b14374d]">
                <div className="m-auto flex h-[calc(100vh_-_200px)] w-9/12 items-center justify-center py-16">
                    <div className="overflow-hidden bg-white drop-shadow-lg dark:bg-[#0b14374d] dark:shadow-lg dark:shadow-gray-400 sm:rounded-lg">
                        <div className="p-[30px] text-center">
                            <h1 className="text-5xl font-bold text-navy-700 dark:text-white sm:text-7xl lg:text-9xl">
                                4<span className="text-gray-600">0</span>4
                            </h1>
                            <h1 className="py-8 text-4xl font-medium text-gray-600 sm:text-5xl">
                                oops! Page not found
                            </h1>
                            <button
                                className="bg-primary-gradient dark:bg-dark-primary-gradient rounded-xl px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#504CF3]/50"
                                onClick={() => {
                                    navigate(-1)
                                }}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
