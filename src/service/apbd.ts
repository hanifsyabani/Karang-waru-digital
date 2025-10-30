import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetAllApbd() {
  try {
    const res = await axios.get(`${API_URL}/apbd`, {
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


export async function GetApbdByID(id :string) {
  try {
    const res = await axios.get(`${API_URL}/apbd/${id}`, {
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

export async function PostApbd(data :any) {
  try {
    const res = await axios.post(`${API_URL}/apbd`, data, {
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
export async function PutApbd(data :any, id:string) {
  try {
    const res = await axios.put(`${API_URL}/apbd/${id}`, data, {
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
export async function DeleteApbd(id:string) {
  try {
    const res = await axios.delete(`${API_URL}/apbd/${id}`, {
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