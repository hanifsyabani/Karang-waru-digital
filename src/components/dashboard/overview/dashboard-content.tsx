"use client";

import dynamic from "next/dynamic";
import StatCards from "./stat-cards";
import { useQuery } from "@tanstack/react-query";
import { GetDashboardSummary } from "@/service/dashboard";
import Loader from "@/components/ui/loader";
import ApbdChart from "./apbd-chart";

const PopulationChart = dynamic(() => import("./population-chart"), { ssr: false });
const ServiceChart = dynamic(() => import("./service-chart"), { ssr: false });
const NewsUmkmChart = dynamic(() => import("./news-umkm-chart"), { ssr: false });
const EducationChart = dynamic(() => import("./education-chart"), { ssr: false });


export default function DashboardContent() {

    const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
        queryKey: ["dashboard-summary"],
        queryFn: () => GetDashboardSummary(),
    })

    if (isLoadingDashboard) return <Loader />

    return (
        <div className="space-y-5">
            {/* Stat Cards */}
            <StatCards data={dashboardData.data} />

            {/* Row: Population + Service */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PopulationChart data={dashboardData.data} />
                <ServiceChart data={dashboardData.data} />
            </div>

            {/* APBD */}
            <ApbdChart data={dashboardData.data} />

            {/* News & UMKM */}
            <NewsUmkmChart data={dashboardData.data} />

            {/* Education */}
            <EducationChart data={dashboardData.data} />
        </div>
    );
}
