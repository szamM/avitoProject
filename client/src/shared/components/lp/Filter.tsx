import type {AdFilters} from "../../types/ad.ts";
import {useState, useEffect} from "react";

type FilterProps = {
    filters: AdFilters
    onChange: (next: AdFilters) => void
    onReset: () => void
}


type AdStatus = 'pending' | 'approved' | 'rejected' | 'draft'


const Filter = ({filters, onChange, onReset}: FilterProps) => {
    const [minPr, setMinPrice] = useState(filters.minPrice);
    const [maxPr, setMaxPrice] = useState(filters.maxPrice);
    const [sortBy, setSortBy] = useState(filters.sortBy);
    const [sortOrder, setSortOrder] = useState(filters.sortOrder);
    const [search, setSearch] = useState(filters.search);
    const [categoryId, setCategoryId] = useState(filters.categoryId);
    const [status, setStatus] = useState<AdStatus[]>(filters.status);
    const handleChange = () =>{
        onChange({minPrice: minPr, maxPrice: maxPr, categoryId: categoryId, search: search, sortBy: sortBy, sortOrder: sortOrder, status: status});
    }
    const handleReset = () =>{
        onReset();
    }
    const toggleStatus = (value: AdStatus) =>{
        const isActive = status.includes(value);
        const nextStatuses = isActive
            ? status.filter((s) => s !== value)
            : [...status, value]

        setStatus(nextStatuses)
    }
    useEffect(() => {
        setMinPrice(filters.minPrice)
        setMaxPrice(filters.maxPrice)
        setSortBy(filters.sortBy)
        setSortOrder(filters.sortOrder)
        setSearch(filters.search)
        setCategoryId(filters.categoryId)
        setStatus(filters.status)
    }, [filters])
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={status.includes('pending')}
                    onChange={() => toggleStatus('pending')}
                />
                Pending
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={status.includes('approved')}
                    onChange={() => toggleStatus('approved')}
                />
                Approved
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={status.includes('rejected')}
                    onChange={() => toggleStatus('rejected')}
                />
                Rejected
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={status.includes('draft')}
                    onChange={() => toggleStatus('draft')}
                />
                Draft
            </label>
            <input
                // id={"1"}
                type="number"
                value={minPr ?? ""}
                placeholder="Минимальная цена:"
                onChange={(e) => {
                    const value = e.target.value;
                    setMinPrice(value === '' ? undefined : Number(value))
                }}
            />
            <input
                // id={"2"}
                type="number"
                value={maxPr ?? ""}
                placeholder="Максимальная цена:"
                onChange={(e) => {
                    const value = e.target.value;
                    setMaxPrice(value === '' ? undefined : Number(value))
                }}
            />
            <input
                // id={"2"}
                type="text"
                value={search}
                placeholder="Поиск по названию"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <select
            value={sortBy}
            onChange={(e) => {setSortBy(e.target.value as 'createdAt' | 'price' | 'priority')}}>
                <option value="createdAt">По дате</option>
                <option value="price">По цене</option>
                <option value="priority">По приоритету</option>
            </select>
            <select
                value={sortOrder}
                onChange={(e) => {setSortOrder(e.target.value as 'asc' | 'desc')}}>
                <option value="asc">Возрастание</option>
                <option value="desc">Убывание</option>
            </select>
            <select
                value={categoryId ?? ''}
                onChange={(event) => {
                    const value = event.target.value
                    const nextCategoryId = value === '' ? undefined : Number(value)
                    setCategoryId(nextCategoryId);
                }}>
                <option value="">Все категории</option>
                <option value="1">Недвижимость</option>
                <option value="2">Транспорт</option>
                <option value="3">Работа</option>
                <option value="4">Услуги</option>
                <option value="5">Животные</option>
                <option value="6">Мода</option>
                <option value="7">Детское</option>
            </select>
            <button type={"button"} onClick={handleChange}>Применить фильтр</button>
            <button type={"button"} onClick={handleReset}>Сбросить фильтр</button>
        </div>
        )

}

export default Filter