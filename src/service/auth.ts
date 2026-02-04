'use server'
import axios from "axios";
import { cookies } from "next/headers";
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const API_URL = process.env.API_URL;

export async function Login(data: LoginData) {
  try {
    const res = await axios.post(`${API_URL}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
    
    const token = res.data?.access_token;

    if (!token) {
      return { success: false, error: "Token tidak ditemukan" };
    }

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,     // WAJIB untuk security
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 1 hari
    });

    return { success: true };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function Logout() {
  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function Register(data: RegisterData) {
  try {
    const res = await axios.post(`${API_URL}/register`, data, {
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

