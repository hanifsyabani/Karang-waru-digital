import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function GetInfoUmum() {
  try {
    const res = await axios.get(`${API_URL}/profil-desa`, {
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

export async function PostInfoUmum(data :any) {
  try {
    const res = await axios.post(`${API_URL}/profil-desa`, data, {
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
export async function PutInfoUmum(data :any) {
  try {
    const res = await axios.put(`${API_URL}/profil-desa`, data, {
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