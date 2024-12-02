import React from 'react'
import { Card } from '../../../components'
import { Bar } from 'react-chartjs-2'
import {
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    Title,
    Tooltip,
    Chart as ChartJS,
} from 'chart.js'
import { useTranslation } from 'react-i18next'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function WeeklyRegisterUsers({ dates, totalUsers }) {
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
                borderRadius: 15,
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
                    color: '#A3AED0',
                },
                ticks: {
                    color: '#A3AED0',
                },
            },
            y: {
                grid: {
                    display: false,
                    color: '#A3AED0',
                },
                ticks: {
                    color: '#A3AED0',
                    stepSize: 1,
                },
            },
        },
    }
    return (
        <Card extra="pb-7 p-5">
            <div className="flex flex-row justify-between">
                <div className="ml-1 pt-2">
                    <p className="text-[20px] font-medium leading-4 text-gray-600">
                        {t('WeeklyRegisterUsers')}
                    </p>
                </div>
            </div>

            <div className="h-[300px] w-full pb-0 pt-10">
                {totalUsers.length ? (
                    <Bar options={options} data={data} />
                ) : null}
            </div>
        </Card>
    )
}

export default WeeklyRegisterUsers
