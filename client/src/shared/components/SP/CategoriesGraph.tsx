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
import type { CategoriesChart, Period } from "../../types/stats"
import { getCategories } from "../../api/functionsForRequests"

const CategoriesGraph = () => {
    const [period, setPeriod] = useState<Period>("week")
    const [data, setData] = useState<CategoriesChart | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true)
                const res = await getCategories(period)
                setData(res)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        load()
    }, [period])

    const chartData = data
        ? Object.entries(data).map(([category, value]) => ({
            category,
            value,
        }))
        : []

    if (isLoading) {
        return <div className="chartText">График по категориям загружается...</div>
    }

    if (!data) {
        return <div className="chartText">Нет данных по категориям</div>
    }

    return (
        <div className="chartBlock">
            <div className="chartControls">
                <label className="chartLabel">
                    Период:
                    <select
                        className="chartSelect"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as Period)}
                    >
                        <option value="today">Сегодня</option>
                        <option value="week">Неделя</option>
                        <option value="month">Месяц</option>
                    </select>
                </label>
            </div>

            <div className="chartContainer">
                <BarChart width={500} height={260} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="value"
                        name="Проверено объявлений"
                        fill="#93b4f4" // более мягкий синий
                    />
                </BarChart>
            </div>
        </div>
    )
}

export default CategoriesGraph