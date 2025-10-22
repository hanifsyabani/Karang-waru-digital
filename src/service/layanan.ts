import axios from "axios";



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetAllLayanan() {
  try {
    const res = await axios.get(`${API_URL}/layanan`, {
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


export async function GetLayananByID(id :string) {
  try {
    const res = await axios.get(`${API_URL}/layanan/${id}`, {
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

export async function PostLayanan(data :any) {
  try {
    const res = await axios.post(`${API_URL}/layanan`, data, {
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
export async function PutLayanan(data :any, id:string) {
  try {
    const res = await axios.put(`${API_URL}/layanan/${id}`, data, {
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
export async function DeleteLayanan(id:string) {
  try {
    const res = await axios.delete(`${API_URL}/layanan/${id}`, {
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