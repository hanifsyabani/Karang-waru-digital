'use server'

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export async function GetAccounts(params?: {
  query?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  try {
    const res = await axios.get(`${API_URL}/users`, {
      params: {
        query: params?.query,
        page: params?.page,
        limit: params?.limit,
        sortBy: params?.sortBy,
        sortOrder: params?.sortOrder
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
export async function GetAccountById(userId: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  try {
    const res = await axios.get(`${API_URL}/users/${userId}`, {
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
export async function DeleteAccount(userId: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  try {
    await axios.delete(`${API_URL}/users/${userId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}


export async function PostAccount(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  
  try {
    const res = await axios.post(`${API_URL}/users`, data, {
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
export async function PutAccount(data: any, userId: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  try {
    const res = await axios.put(`${API_URL}/users/${userId}`, data, {
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

export async function GetProfile() {

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  try {
    const res = await axios.get(`${API_URL}/me`, {
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
