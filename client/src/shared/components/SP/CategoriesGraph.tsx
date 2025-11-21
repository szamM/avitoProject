import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import type { CategoriesChart, Period } from '../../types/stats'
import { getCategories } from '../../api/functionsForRequests'

const CategoriesGraph = () => {
    const [period, setPeriod] = useState<Period>('week')   // или 'month', как хочешь
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
    const chartData =
        data
            ? Object.entries(data).map(([category, value]) => ({
                category,
                value,
            }))
            : []
    if (isLoading) {
        return <div>График по категориям загружается...</div>
    }

    if (!data) {
        return <div>Нет данных по категориям</div>
    }

    return (
        <div>
            {/* селект периода, как в Metrics / PieChart */}
            <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as Period)}
            >
                <option value="today">Сегодня</option>
                <option value="week">Неделя</option>
                <option value="month">Месяц</option>
            </select>

            <BarChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Проверено объявлений" fill="#2196f3" />
            </BarChart>
        </div>
    )
}

export default CategoriesGraph;