import axios from "axios";



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetAllAkun() {
  try {
    const res = await axios.get(`${API_URL}/users`, {
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


