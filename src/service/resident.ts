'use server';

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetResidents(params? : {
    search?: string,
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
}) {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value;
    try {
        const res = await axios.get(`${API_URL}/penduduk`, {
            params: {
                query: params?.search,
                page: params?.page,
                limit: params?.limit,
                sortBy: params?.sortBy,
                sortOrder: params?.sortOrder,
            },
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}


export async function GetResidentByID(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value;
    try {
        const res = await axios.get(`${API_URL}/penduduk/${id}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export async function GetCountResidents() {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value;
    try {
        const res = await axios.get(`${API_URL}/penduduk/count`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

export async function PostResident(data: any) {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value;
    try {
        const res = await axios.post(`${API_URL}/penduduk`, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export async function PutResident(data: any, id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value;
    try {
        const res = await axios.put(`${API_URL}/penduduk/${id}`, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export async function DeleteResident(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value;
    try {
        const res = await axios.delete(`${API_URL}/penduduk/${id}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}