import {useEffect, useState} from "react";
import {getStatsSummary} from "../../api/functionsForRequests.ts";
import type {Period, StatsSummary} from "../../types/stats.ts";


const Metrics = () => {
    const [period, setPeriod] = useState<Period>("today");
    const [info, setInfo] = useState<StatsSummary | undefined>(undefined);
    function getTotalForPeriod(info: StatsSummary, period: Period) {
        switch (period) {
            case 'today':
                return info.totalReviewedToday
            case 'week':
                return info.totalReviewedThisWeek
            case 'month':
                return info.totalReviewedThisMonth
            default:
                return info.totalReviewed
        }
    }
    useEffect(() => {
        async function load(){
            try{
                const info = await getStatsSummary(period)
                setInfo(info)
            }
            catch (error){
                console.log(error)
            }
        }
        load()
    }, [period])
    return <div>
        <select
            value={period}
            onChange={(e) => {setPeriod(e.target.value as Period)}}>
            <option value="today">Сегодня</option>
            <option value="week">За неделю</option>
            <option value="month">За месяц</option>
        </select>
        {info && (
        <div>Всего проверено: {getTotalForPeriod(info, period)}</div>
        )}
        <div> Процент одобренных: {info?.approvedPercentage}</div>
        <div> Процент отклоненных: {info?.rejectedPercentage}</div>
        <div> Среднее время на проверку одного объявления: {info?.averageReviewTime}</div>
    </div>
}

export default Metrics