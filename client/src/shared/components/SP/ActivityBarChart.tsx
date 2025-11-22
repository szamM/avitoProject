import { useEffect, useState } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts"
import type { ActivityData } from "../../types/stats"
import { getActivityChart } from "../../api/functionsForRequests"

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
        return <div className="chartText">График активности: данные загружаются…</div>
    }

    if (!data.length) {
        return <div className="chartText">График активности: данных нет</div>
    }

    return (
        <BarChart width={500} height={260} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="approved" stackId="a" fill="#8bc48a" />
            <Bar dataKey="rejected" stackId="a" fill="#f5a6aa" />
            <Bar dataKey="requestChanges" stackId="a" fill="#f3c78b" />
        </BarChart>
    )
}

export default ActivityBarChart