import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetAllUmkm() {
  try {
    const res = await axios.get(`${API_URL}/umkm`, {
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


export async function GetUmkmByID(id :string) {
  try {
    const res = await axios.get(`${API_URL}/umkm/${id}`, {
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

export async function PostUmkm(data :any) {
  try {
    const res = await axios.post(`${API_URL}/umkm`, data, {
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
export async function PutUmkm(data :any, id:string) {
  try {
    const res = await axios.put(`${API_URL}/umkm/${id}`, data, {
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
export async function DeleteUmkm(id:string) {
  try {
    const res = await axios.delete(`${API_URL}/umkm/${id}`, {
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