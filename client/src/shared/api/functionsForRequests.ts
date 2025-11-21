import {http} from './http.ts';
import type {AdStatus, Advertisement} from "../types/ad.ts";
import type {PaginationType} from "../types/pagination.ts";
import type {ActivityData, CategoriesChart, DecisionsData, StatsSummary} from "../types/stats.ts";
// import type {ActivityData, CategoryChartItem, DecisionsData, StatsSummary} from "../types/stats.ts";

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

type ApplyResponse = {
    message: string,
    ad: Advertisement
}

type rejectInfo = {
    reason: string,
    comment?: string
}

type Period = "today" | "week" | "month" | "custom";


export async  function getAds(params: GetAdsParams): Promise<GetAdsResponse> {
    const response = await http.get<GetAdsResponse>('/ads', {
        params})
    return response.data;
}

export async function getAdById(id: number): Promise<Advertisement> {
    const response = await http.get<Advertisement>(`/ads/${id}`)
    return response.data;
}

export async function approveAd(id: number): Promise<ApplyResponse> {
    const response = await http.post<ApplyResponse>(`/ads/${id}/approve`)
    return response.data;
}

export async function rejectAd(id: number, rejectInfo: rejectInfo): Promise<ApplyResponse> {
    const response = await http.post<ApplyResponse>(`/ads/${id}/reject`, rejectInfo)
    return response.data;
}

export async function requestChangesAd(id: number, rejectInfo: rejectInfo): Promise<ApplyResponse> {
    const response = await http.post<ApplyResponse>(`/ads/${id}/request-changes`, rejectInfo)
    return response.data;
}


export async function getStatsSummary(period: Period): Promise<StatsSummary> {
    const response = await http.get<StatsSummary>(`/stats/summary`, { params: { period } })
    return response.data;
}

export async function getActivityChart(period: Period): Promise<ActivityData[]> {
    const response = await http.get<ActivityData[]>(`/stats/chart/activity`, { params: { period } })
    return response.data;
}

export async function getPieChart(period: Period): Promise<DecisionsData> {
    const response = await http.get<DecisionsData>(`/stats/chart/decisions`, { params: { period } })
    return response.data;
}

export async function getCategories(period: Period): Promise<CategoriesChart> {
    const response = await http.get<CategoriesChart>(`/stats/chart/categories`, { params: { period } })
    return response.data;
}
