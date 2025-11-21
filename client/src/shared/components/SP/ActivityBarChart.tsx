import {useEffect, useState} from "react";
import type {ActivityData} from "../../types/stats.ts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import {getActivityChart} from "../../api/functionsForRequests.ts";



const ActivityBarChart = () => {
    const period = "week"
    const [data, setData] = useState<ActivityData[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setIsLoading(true)
                const result = await getActivityChart(period)
                if (!cancelled) {
                    setData(result)
                }
            } catch (error) {
                console.error(error)
            } finally {
                if (!cancelled) {
                    setIsLoading(false)
                }
            }
        }

        load()

        return () => {
            cancelled = true
        }
    }, [period])
    const chartData = data.map((item) => ({
        ...item,
        label: new Date(item.date).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
        }),
    }))

    if (isLoading) {
        return <div>График активности: данные загружаются…</div>
    }

    if (!data.length) {
        return <div>График активности: данных нет</div>
    }

    return (
        <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="approved" stackId="a" fill="#4caf50" />
            <Bar dataKey="rejected" stackId="a" fill="#f44336" />
            <Bar dataKey="requestChanges" stackId="a" fill="#ff9800" />
        </BarChart>
    )
}

export default ActivityBarChart