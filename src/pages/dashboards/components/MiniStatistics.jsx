import { useTranslation } from 'react-i18next'

const MiniStatistics = (props) => {
    const {
        bgColor,
        icon,
        title,
        value,
        cardBg,
        titleColor,
        valueColor,
        detailColor,
        iconColor,
        isWeek,
        valueLabel,
    } = props
    const { t } = useTranslation()
    return (
        <div
            className={`flex ${cardBg} justify-between rounded-[20px] bg-clip-border p-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none`}
        >
            <div className='my-auto mx-0'>
                <p className={`text-2xl font-bold ${valueColor} `}>
                    {value} {valueLabel}
                </p>
                <h5 className={`text-sm font-medium ${titleColor} `}>
                    {title}
                </h5>
                {isWeek && (
                    <div className="mt-1 flex items-center gap-1 text-sm text-navy-700">
                        <div className={`flex items-center gap-1 font-bold`}>
                            <p
                                className={`font-medium text-gray-600 ${detailColor} `}
                            >
                                {t('ThisWeek')}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div
                className={`flex items-center ${bgColor} h-20 w-20 justify-center rounded-full ${iconColor} `}
            >
                {icon}
            </div>
        </div>
    )
}

export default MiniStatistics
