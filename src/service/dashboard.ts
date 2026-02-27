'use server';

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export async function GetDashboardSummary() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value;
    try {
        const res = await axios.get(`${API_URL}/dashboard/summary`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch dashboard summary");
    }
}
