import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import type { DecisionsData } from '../../types/stats'
import {getPieChart} from '../../api/functionsForRequests'



type Period = 'today' | 'week' | 'month' | 'custom'

const PieChartDecisions = () => {
    const [period, setPeriod] = useState<Period>('week') // например
    const [data, setData] = useState<DecisionsData | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true)
                const res = await getPieChart(period)
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
            ? [
                { name: 'Одобрено', value: data.approved },
                { name: 'Отклонено', value: data.rejected },
                { name: 'На доработку', value: data.requestChanges },
            ]
            : []
    const COLORS = ['#4caf50', '#f44336', '#ff9800']
    if (isLoading) return <div>График решений загружается...</div>
    if (!data) return <div>Нет данных для графика</div>

    return (
        <div>
            <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as Period)}
            >
                <option value="today">Сегодня</option>
                <option value="week">Неделя</option>
                <option value="month">Месяц</option>
            </select>

            <PieChart width={400} height={300}>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {chartData.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    )
}

export default PieChartDecisions;