import Card from "../shared/components/lp/Card";
import Filter from "../shared/components/lp/Filter";
import Pagination from "../shared/components/lp/Pagination";
import {useState, useEffect} from "react";
import type {Advertisement} from "../shared/types/ad.ts";
import type {PaginationType} from "../shared/types/pagination.ts";
import {getAds} from "../shared/api/functionsForRequests.ts";
import { useFilters } from '../shared/context/FiltersContext'
import {Link} from "react-router-dom";



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
            try{
            const data = await getAds({page: currentPage, limit: 10, ...filters})
            setAds(data.ads)
            setPagination(data.pagination)
            }
            catch (error){
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }

        }
        load()

    }, [currentPage, filters]);
    return (
        <div>
            <Link to={`/stats`}>Узнать статистику</Link>
            <header> Заголовок </header>
            <Filter filters={filters}
                    onChange={(next) => {
                        setFilters(next)
                        setCurrentPage(1)
                    }}
                    onReset={() => {
                        resetFilters()
                        setCurrentPage(1)
                    }}/>
            {isLoading && (<div>Данные загружаются</div>)}

            {!isLoading && (ads.map((item, index) =>
                (<Card key={item.id} advert={item} ids={ids} index={index}/>)))}
            <Pagination currentPage={currentPage} totalPages={pagination?.totalPages ?? 1} onPageChange={setCurrentPage}/>
        </div>

    )
}

export default ListPage