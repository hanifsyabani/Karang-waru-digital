'use client'

import Loader from '@/components/ui/loader';
import {  GetCountNewsByCategory } from '@/service/news';
import { useQuery } from '@tanstack/react-query';
import { Building2,   Component,  Cross,  FileText, Newspaper, ShieldCheck,  } from 'lucide-react';

export default function StatsNews() {

    
    const { data: dataCountNews, isLoading: isLoadingCountNews } = useQuery({
        queryFn: () => GetCountNewsByCategory(),
        queryKey: ['count-news']
    })

    const stats = [
        {
            label: "Total Berita",
            value: dataCountNews?.data?.total,
            icon: FileText,
            color: "bg-gradient-to-br from-blue-500 to-blue-600"
        },
        {
            label: "Pendidikan",
            value: dataCountNews?.data?.pendidikan,
            icon: Newspaper,
            color: "bg-gradient-to-br from-green-500 to-green-600"
        },
        {
            label: "Infrastruktur",
            value: dataCountNews?.data?.infrastruktur,
            icon: Building2,
            color: "bg-gradient-to-br from-orange-500 to-orange-600"
        },
        {
            label: "Kegiatan",
            value: dataCountNews?.data?.kegiatan,
            icon: ShieldCheck,
            color: "bg-gradient-to-br from-yellow-500 to-yellow-600"
        },
        {
            label: "Kesehatan",
            value: dataCountNews?.data?.kesehatan,
            icon: Cross,
            color: "bg-gradient-to-br from-green-500 to-green-600"
        },
        {
            label: "Umum",
            value: dataCountNews?.data?.umum,
            icon: Component,
            color: "bg-gradient-to-br from-red-500 to-red-600"
        },

    ];

    if ( isLoadingCountNews) return <Loader />

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                            <stat.icon size={24} className="text-white" />
                        </div>

                    </div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
            ))}
        </div>
    )
}
