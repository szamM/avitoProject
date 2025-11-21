import Metrics from "../shared/components/SP/Metrics.tsx";
import ActivityBarChart from "../shared/components/SP/ActivityBarChart.tsx";
import PieChartDecisions from "../shared/components/SP/PieChartDecisions.tsx";
import CategoriesGraph from "../shared/components/SP/CategoriesGraph.tsx";
import {Link} from "react-router-dom";


const StatsPage = () => {

    return <div>
        <Link to={"/list"}>Вернуться к списку</Link>
        <Metrics/>
        <ActivityBarChart/>
        <PieChartDecisions />
        <CategoriesGraph />
    </div>
}

export default StatsPage