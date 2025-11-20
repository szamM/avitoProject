import type {AdFilters} from "../../types/ad.ts";


type FilterProps = {
    filters: AdFilters
    onChange: (next: AdFilters) => void
    onReset: () => void
}

const Filter = ({filter}: FilterProps) => {
    return <div>Фильтры:

    </div>
}

export default Filter