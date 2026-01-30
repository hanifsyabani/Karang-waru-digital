'use client'

import Loader from '@/components/ui/loader';
import { GetAllBerita } from '@/service/news';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { CheckCircle, Clock, FileText, TrendingUp } from 'lucide-react';

export default function StatsNews() {

    const { data: dataAllBerita, isLoading: isLoadingAllBerita } = useQuery({
        queryFn: () => GetAllBerita(),
        queryKey: ['berita']
    })

    const totalBerita = dataAllBerita?.data.length || 0;
    const totalPublished = dataAllBerita?.data.filter((item: any) => item.status === 'published').length || 0;
    const totalDraft = dataAllBerita?.data.filter((item: any) => item.status === 'draft').length || 0;

    const berita = dataAllBerita?.data || [];
    const beritaPublished = dataAllBerita?.data.filter((item: any) => item.status === 'published') || [];
    const beritaDraft = dataAllBerita?.data.filter((item: any) => item.status === 'draft') || [];
    const now = dayjs();
    const lastWeek = now.subtract(7, "day");

    // Hitung total berita minggu ini & minggu lalu
    function calcTotalNow(berita: any[]) {
        const totalNow = berita.filter((b: any) =>
            dayjs(b.createdAt).isAfter(lastWeek)
        ).length;
        return totalNow;
    }

    function calcTotalLast(berita: any[]) {
        const totalLast = berita.filter((b: any) =>
            dayjs(b.createdAt).isBefore(lastWeek) &&
            dayjs(b.createdAt).isAfter(lastWeek.subtract(7, "day"))
        ).length;
        return totalLast;
    }

    // Fungsi helper untuk growth
    const calcGrowth = (nowVal: number, lastVal: number) => {
        if (lastVal === 0) return "+100%";
        const diff = ((nowVal - lastVal) / lastVal) * 100;
        const sign = diff >= 0 ? "+" : "";
        return `${sign}${diff.toFixed(1)}%`;
    };



    if (isLoadingAllBerita) return <Loader />

    const stats = [
        {
            label: "Total Berita",
            value: totalBerita,
            change: calcGrowth(calcTotalNow(berita), calcTotalLast(berita)),
            icon: FileText,
            color: "bg-gradient-to-br from-blue-500 to-blue-600"
        },
        {
            label: "Artikel Published",
            value: totalPublished,
            change: calcGrowth(calcTotalNow(beritaPublished), calcTotalLast(beritaPublished)),
            icon: CheckCircle,
            color: "bg-gradient-to-br from-green-500 to-green-600"
        },
        {
            label: "Total Views",
            value: "45.2K",
            change: "+23%",
            icon: TrendingUp,
            color: "bg-gradient-to-br from-purple-500 to-purple-600"
        },
        {
            label: "Draft Articles",
            value: totalDraft,
            change: calcGrowth(calcTotalNow(beritaDraft), calcTotalLast(beritaDraft)),
            icon: Clock,
            color: "bg-gradient-to-br from-orange-500 to-orange-600"
        }
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                            <stat.icon size={24} className="text-white" />
                        </div>
                        <span className={`text-sm font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                            {stat.change}
                        </span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
            ))}
        </div>
    )
}
