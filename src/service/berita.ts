import axios from "axios";



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetAllBerita() {
  try {
    const res = await axios.get(`${API_URL}/berita`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function PostBerita(data :any) {
  try {
    const res = await axios.post(`${API_URL}/berita`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
export async function PutBerita(data :any) {
  try {
    const res = await axios.put(`${API_URL}/berita`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}