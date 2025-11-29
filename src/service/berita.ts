'use server'

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetAllBerita() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.get(`${API_URL}/berita`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}


export async function GetBeritaByID(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.get(`${API_URL}/berita/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function PostBerita(data: any) {
      const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.post(`${API_URL}/berita`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function PutBerita(data: any, id: string) {
      const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.put(`${API_URL}/berita/${id}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function DeleteBerita(id: string) {
      const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.delete(`${API_URL}/berita/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}