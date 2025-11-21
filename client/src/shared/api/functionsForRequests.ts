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

type ApplyResponse = {
    message: string,
    ad: Advertisement
}

type rejectInfo = {
    reason: string,
    comment?: string
}

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