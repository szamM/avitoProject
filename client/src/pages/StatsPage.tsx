import { Link } from "react-router-dom"
import Metrics from "../shared/components/SP/Metrics"
import ActivityBarChart from "../shared/components/SP/ActivityBarChart"
import PieChartDecisions from "../shared/components/SP/PieChartDecisions"
import CategoriesGraph from "../shared/components/SP/CategoriesGraph"
import "./stats.css"

const StatsPage = () => {
    return (
        <div className="statsPage">
            <header className="statsHeader">
                <h1 className="statsTitle">Статистика модератора</h1>
                <Link to="/list" className="statsButton">
                    К списку объявлений
                </Link>
            </header>

            <div className="statsGrid">
                <section className="statsCard">
                    <h2 className="statsCardTitle">Общая статистика</h2>
                    <Metrics />
                </section>

                <section className="statsCard">
                    <h2 className="statsCardTitle">Активность по дням за неделю</h2>
                    <div className="chartBlock">
                        <div className="chartContainer">
                            <ActivityBarChart />
                        </div>
                    </div>
                </section>

                <section className="statsCard">
                    <h2 className="statsCardTitle">Распределение решений</h2>
                    <PieChartDecisions />
                </section>

                <section className="statsCard">
                    <h2 className="statsCardTitle">Категории проверенных объявлений</h2>
                    <CategoriesGraph />
                </section>
            </div>
        </div>
    )
}

export default StatsPage