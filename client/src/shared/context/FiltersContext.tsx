import type {AdFilters} from "../types/ad.ts";


const initialFilters: AdFilters = {
    status: [],
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    maxPrice: undefined,
    minPrice: undefined,
    categoryId: undefined,
}

import { createContext, useState, useContext, type ReactNode } from 'react'
export const FiltersProvider = ({ children }: { children: ReactNode }) => {
    const [filters, setFilters] = useState<AdFilters>(initialFilters)

    const resetFilters = () => {
        setFilters(initialFilters)
    }

    const value: FiltersContextValue = {
        filters,
        setFilters,
        resetFilters,
    }

    return (
        <FiltersContext.Provider value={value}>
            {children}
        </FiltersContext.Provider>
    )
}

type FiltersContextValue = {
    filters: AdFilters
    setFilters: (next: AdFilters) => void
    resetFilters: () => void // по желанию, для кнопки "Сброс"
}

export const FiltersContext = createContext<FiltersContextValue | null>(null)

export const useFilters = () => {
    const ctx = useContext(FiltersContext)
    if (!ctx) {
        throw new Error('useFilters должен вызываться внутри FiltersProvider')
    }
    return ctx
}