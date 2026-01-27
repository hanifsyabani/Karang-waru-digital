'use server';

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetAllPenduduk() {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value;
    try {
        const res = await axios.get(`${API_URL}/penduduk`, {
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


export async function GetPendudukByID(id: string) {
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

export async function PostPenduduk(data: any) {
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
export async function PutPenduduk(data: any, id: string) {
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
export async function DeletePenduduk(id: string) {
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