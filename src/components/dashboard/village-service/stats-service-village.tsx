'use client'


import Loader from "@/components/ui/loader";
import { GetAllServiceVillage } from "@/service/service";
import { LayananDesa } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function StatsServiceVillage() {

    const { data: dataAllLayanan, isLoading: isLoadingLayanan, refetch } = useQuery({
        queryFn: () => GetAllServiceVillage(),
        queryKey: ['layanan'],
    })


    const stats = {
        total: dataAllLayanan?.data.length,
        active: dataAllLayanan?.data.filter((s : LayananDesa) => s.status === "active").length,
        inactive: dataAllLayanan?.data.filter((s : LayananDesa) => s.status !== "active").length,
    };

    if (isLoadingLayanan) return <Loader />

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Total Layanan</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Layanan Aktif</p>
                        <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Tidak Aktif</p>
                        <p className="text-3xl font-bold text-gray-600">{stats.inactive}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
