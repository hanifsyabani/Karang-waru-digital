'use server'

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function GetInfoUmum() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.get(`${API_URL}/profil-desa`, {
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

export async function PostInfoUmum(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.post(`${API_URL}/profil-desa`, data, {
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
export async function PutInfoUmum(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.put(`${API_URL}/profil-desa`, data, {
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



export async function GetDemografis() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.get(`${API_URL}/demografis`, {
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

export async function PostDemografis(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.post(`${API_URL}/demografis`, data, {
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
export async function PutDemografis(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.put(`${API_URL}/demografis`, data, {
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


export async function GetSejarah() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.get(`${API_URL}/sejarah`, {
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

export async function PostSejarah(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.post(`${API_URL}/sejarah`, data, {
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
export async function PutSejarah(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.put(`${API_URL}/sejarah`, data, {
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


export async function GetVisiMisi() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.get(`${API_URL}/visi-misi`, {
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

export async function PostVisiMisi(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.post(`${API_URL}/visi-misi`, data, {
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
export async function PutVisiMisi(data: any) {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.put(`${API_URL}/visi-misi`, data, {
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