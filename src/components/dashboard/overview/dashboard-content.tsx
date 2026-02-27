"use client";

import dynamic from "next/dynamic";
import StatCards from "./stat-cards";
import { useQuery } from "@tanstack/react-query";
import { GetDashboardSummary } from "@/service/dashboard";
import Loader from "@/components/ui/loader";

const PopulationChart = dynamic(() => import("./population-chart"), { ssr: false });
const ServiceChart = dynamic(() => import("./service-chart"), { ssr: false });
const ApbdChart = dynamic(() => import("./apbd-chart"), { ssr: false });
const NewsUmkmChart = dynamic(() => import("./news-umkm-chart"), { ssr: false });
const EducationChart = dynamic(() => import("./education-chart"), { ssr: false });


export default function DashboardContent() {
    
    const {data: dashboardData, isLoading: isLoadingDashboard} = useQuery({
        queryKey: ["dashboard-summary"],
        queryFn: () => GetDashboardSummary(),
    })

    if(isLoadingDashboard) return <Loader/>

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Ringkasan data Desa Karang Waru
                </p>
            </div>

            {/* Stat Cards */}
            <StatCards data={dashboardData} />

            {/* Row: Population + Service */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PopulationChart data={dashboardData} />
                <ServiceChart data={dashboardData} />
            </div>

            {/* APBD */}
            <ApbdChart data={dashboardData} />

            {/* News & UMKM */}
            <NewsUmkmChart data={dashboardData} />

            {/* Education */}
            <EducationChart data={dashboardData} />
        </div>
    );
}
