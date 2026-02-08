'use server';

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export async function GetAllUmkm(params?: {
  search?: string,
  page?: number,
  limit?: number,
  sortBy?: string,
  status?: string,
  sortOrder?: "asc" | "desc",
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  try {
    const res = await axios.get(`${API_URL}/umkm`, {
      params: {
        search: params?.search,
        page: params?.page,
        limit: params?.limit,
        sortBy: params?.sortBy,
        sortOrder: params?.sortOrder,
        status: params?.status,
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


export async function GetUmkmByID(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  try {
    const res = await axios.get(`${API_URL}/umkm/${id}`, {
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
export async function GetCountStatus() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  try {
    const res = await axios.get(`${API_URL}/umkm/count-status`, {
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

export async function PostUmkm(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  try {
    const res = await axios.post(`${API_URL}/umkm`, data, {
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
export async function PutUmkm(data: any, id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  try {
    const res = await axios.put(`${API_URL}/umkm/${id}`, data, {
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
export async function DeleteUmkm(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  try {
    const res = await axios.delete(`${API_URL}/umkm/${id}`, {
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