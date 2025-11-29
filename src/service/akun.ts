'use server'

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GetAllAkun() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value;
  try {
    const res = await axios.get(`${API_URL}/users`, {
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


