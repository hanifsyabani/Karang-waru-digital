'use client';

import Loader from "@/components/ui/loader";
import { GetCountResidents } from "@/service/resident";
import { useQuery } from "@tanstack/react-query";
import { Home, Users } from "lucide-react";

export default function StatResidents() {

    const { data: dataCountResidents, isLoading: isLoadingCountResidents, } = useQuery({
        queryFn: () => GetCountResidents(),
        queryKey: ['countPenduduk'],
    })
    const stats = [
        { label: 'Total Penduduk', value: dataCountResidents?.data.total, icon: Users, color: 'bg-emerald-500', change: '+12' },
        { label: 'Laki-laki', value: dataCountResidents?.data.male, icon: Users, color: 'bg-blue-500', change: '+5' },
        { label: 'Perempuan', value: dataCountResidents?.data.female, icon: Users, color: 'bg-pink-500', change: '+7' },
        { label: 'Kartu Keluarga', value: dataCountResidents?.data.family_card_count, icon: Home, color: 'bg-amber-500', change: '+3' }
    ];

    if (isLoadingCountResidents) return <Loader />
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                            <p className="text-emerald-600 text-sm mt-2 font-medium">{stat.change} bulan ini</p>
                        </div>
                        <div className={`${stat.color} p-4 rounded-2xl shadow-lg`}>
                            <stat.icon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
