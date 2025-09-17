import axios from "axios";
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function Login(data: LoginData) {
  try {
    const res = await axios.post(`${API_URL}/login`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
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
