import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import type { DecisionsData } from "../../types/stats"
import { getPieChart } from "../../api/functionsForRequests"

type Period = "today" | "week" | "month" | "custom"

const COLORS = ["#8bc48a", "#f5a6aa", "#f3c78b"] // мягкие спокойные цвета

const PieChartDecisions = () => {
    const [period, setPeriod] = useState<Period>("week")
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

    const chartData = data
        ? [
            { name: "Одобрено", value: data.approved },
            { name: "Отклонено", value: data.rejected },
            { name: "На доработку", value: data.requestChanges },
        ]
        : []

    if (isLoading) return <div className="chartText">График решений загружается...</div>
    if (!data) return <div className="chartText">Нет данных для графика</div>

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
                <PieChart width={360} height={260}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
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
        </div>
    )
}

export default PieChartDecisions