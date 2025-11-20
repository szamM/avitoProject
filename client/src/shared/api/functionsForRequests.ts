import {http} from './http.ts';
import type {AdStatus, Advertisement} from "../types/ad.ts";
import type {PaginationType} from "../types/pagination.ts";

type GetAdsParams = {
    page?: number,
    limit?: number,
    status?: AdStatus[],
    categoryId?: number,
    minPrice?: number,
    maxPrice?: number,
    search?: string,
    sortBy?: 'createdAt' | 'price' | 'priority',
    sortOrder?: 'asc' | 'desc'
}

type GetAdsResponse = {
    ads: Advertisement[],
    pagination: PaginationType;
}

export async  function getAds(params: GetAdsParams): Promise<GetAdsResponse> {
    const response = await http.get<GetAdsResponse>('/ads', {
        params})
    return response.data;
}

