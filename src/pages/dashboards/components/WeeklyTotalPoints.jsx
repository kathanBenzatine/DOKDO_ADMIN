import React from 'react'
import { Card } from '../../../components'
import { Line } from 'react-chartjs-2'
import {
    CategoryScale,
    Legend,
    LinearScale,
    Title,
    Tooltip,
    Chart as ChartJS,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js'
import { useTranslation } from 'react-i18next'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
)

function WeeklyTotalPoints({ dates, totalUsers }) {
    const { t } = useTranslation()
    const data = {
        labels: dates,
        datasets: [
            {
                data: totalUsers,
                backgroundColor: (context) => {
                    const chart = context.chart
                    const { ctx, chartArea } = chart

                    if (!chartArea) return null // Wait until chartArea is ready
                    const gradient = ctx.createLinearGradient(
                        chartArea.left,
                        0,
                        chartArea.right,
                        0,
                    )
                    gradient.addColorStop(1, '#30FC7B')
                    gradient.addColorStop(0, '#C6E238')
                    return gradient
                },
                borderColor: (context) => {
                    const chart = context.chart
                    const { ctx, chartArea } = chart

                    if (!chartArea) return null // Wait until chartArea is ready
                    const gradient = ctx.createLinearGradient(
                        chartArea.left,
                        0,
                        chartArea.right,
                        0,
                    )
                    gradient.addColorStop(1, '#30FC7B')
                    gradient.addColorStop(0, '#C6E238')
                    return gradient
                },
                borderWidth: 2,
                fill: true,
            },
        ],
    }
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    color: '#A3AED0',
                },
            },
            y: {
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    color: '#A3AED0',
                },
            },
        },
    }
    return (
        <Card extra="pb-7 p-5">
            <div className="flex flex-row justify-between">
                <div className="ml-1 pt-2">
                    <p className="text-[20px] font-medium leading-4 text-gray-600">
                        {t('WeeklyBIPPoints')}
                    </p>
                </div>
            </div>

            <div className="h-[300px] w-full pb-0 pt-10">
                {totalUsers.length ? (
                    <Line options={options} data={data} />
                ) : null}
            </div>
        </Card>
    )
}

export default WeeklyTotalPoints
