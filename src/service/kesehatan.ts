"use server"

import axios from "axios";
import { cookies } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetAllLayananKesehatan() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.get(`${API_URL}/kesehatan/layanan`, {
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


export async function GetLayananKesehatanByID(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.get(`${API_URL}/kesehatan/layanan/${id}`, {
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

export async function PostLayananKesehatan(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.post(`${API_URL}/kesehatan/layanan`, data, {
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
export async function PutLayananKesehatan(data: any, id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.put(`${API_URL}/kesehatan/layanan/${id}`, data, {
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
export async function DeleteLayananKesehatan(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.delete(`${API_URL}/kesehatan/layanan/${id}`, {
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


export async function GetAllFasilitasKesehatan() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.get(`${API_URL}/kesehatan/fasilitas`, {
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


export async function GetFasilitasKesehatanByID(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.get(`${API_URL}/kesehatan/fasilitas/${id}`, {
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

export async function PostFasilitasKesehatan(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  
  try {
    const res = await axios.post(`${API_URL}/kesehatan/fasilitas`, data, {
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
export async function PutFasilitasKesehatan(data: any, id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.put(`${API_URL}/kesehatan/fasilitas/${id}`, data, {
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
export async function DeleteFasilitasKesehatan(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.delete(`${API_URL}/kesehatan/fasilitas/${id}`, {
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