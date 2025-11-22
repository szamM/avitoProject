import { Link } from "react-router-dom"
import Card from "../shared/components/lp/Card";
import Filter from "../shared/components/lp/Filter";
import "../shared/components/lp/pagination.css";
import {useState, useEffect} from "react";
import type {Advertisement} from "../shared/types/ad.ts";
import type {PaginationType} from "../shared/types/pagination.ts";
import {getAds} from "../shared/api/functionsForRequests.ts";
import { useFilters } from '../shared/context/FiltersContext'
import Avito_logo from "../assets/Avito_logo.svg";
import Pagination from "../shared/components/lp/Pagination.tsx";

const ListPage = () => {
    const [ads, setAds] = useState<Advertisement[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<PaginationType | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { filters, setFilters, resetFilters } = useFilters()
    const ids = ads.map(ad => ad.id)

    useEffect(() => {
        async function load() {
            setIsLoading(true);
            try {
                const data = await getAds({ page: currentPage, limit: 10, ...filters })
                setAds(data.ads)
                setPagination(data.pagination)
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        load()
    }, [currentPage, filters]);

    return (
        <div className="listPage">
            <header className="listHeader">
                <div className="listHeader-top">
                    <div className="listHeader-left">
                        <img src={Avito_logo} className="logoImage" />
                        <span className="listHeader-title">Модерация объявлений</span>
                    </div>

                    <Link to="/stats" className="statsButton">
                        Узнать статистику
                    </Link>
                </div>

                <div className="filterBar">
                    <Filter
                        filters={filters}
                        onChange={(next) => {
                            setFilters(next)
                            setCurrentPage(1)
                        }}
                        onReset={() => {
                            resetFilters()
                            setCurrentPage(1)
                        }}
                    />
                </div>
            </header>

            {isLoading && (<div>Данные загружаются…</div>)}

            {!isLoading && ads.map((item, index) => (
                <Card key={item.id} advert={item} ids={ids} index={index} />
            ))}

            <div className="pagination">
                <Pagination
                    currentPage={currentPage}
                    totalPages={pagination?.totalPages ?? 1}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ListPage