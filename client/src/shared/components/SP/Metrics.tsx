import { useEffect, useState } from "react"
import { getStatsSummary } from "../../api/functionsForRequests"
import type { Period, StatsSummary } from "../../types/stats"

const Metrics = () => {
    const [period, setPeriod] = useState<Period>("today")
    const [info, setInfo] = useState<StatsSummary | undefined>(undefined)

    function getTotalForPeriod(info: StatsSummary, period: Period) {
        switch (period) {
            case "today":
                return info.totalReviewedToday
            case "week":
                return info.totalReviewedThisWeek
            case "month":
                return info.totalReviewedThisMonth
            default:
                return info.totalReviewed
        }
    }

    useEffect(() => {
        async function load() {
            try {
                const data = await getStatsSummary(period)
                setInfo(data)
            } catch (error) {
                console.log(error)
            }
        }
        load()
    }, [period])

    return (
        <div className="metrics">
            <div className="metricsControls">
                <label className="metricsLabel">
                    Период:
                    <select
                        className="metricsSelect"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as Period)}
                    >
                        <option value="today">Сегодня</option>
                        <option value="week">За неделю</option>
                        <option value="month">За месяц</option>
                    </select>
                </label>
            </div>

            <div className="metricsRows">
                {info && (
                    <div className="metricsRow metricsRow--total">
                        <span className="metricsName">Всего проверено</span>
                        <span className="metricsValue">
                            {getTotalForPeriod(info, period)}
                        </span>
                    </div>
                )}

                <div className="metricsRow">
                    <span className="metricsName">Процент одобренных</span>
                    <span className="metricsValue">
                        {info?.approvedPercentage}%
                    </span>
                </div>

                <div className="metricsRow">
                    <span className="metricsName">Процент отклонённых</span>
                    <span className="metricsValue">
                        {info?.rejectedPercentage}%
                    </span>
                </div>

                <div className="metricsRow">
                    <span className="metricsName">
                        Среднее время на проверку (сек.)
                    </span>
                    <span className="metricsValue">
                        {info?.averageReviewTime}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Metrics