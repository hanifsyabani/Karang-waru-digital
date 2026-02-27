"use client";

import { Users, Newspaper, Store, FileText, ClipboardList, GraduationCap, Stethoscope } from "lucide-react";
import CountUp from "react-countup";

interface StatCardsProps {
    data: {
        penduduk?: { total?: number };
        berita?: { total?: number };
        umkm?: { total?: number };
        layanan?: { total_services?: number; total_submissions?: number };
        total_lembaga_pendidikan?: number;
        kesehatan?: { total_fasilitas?: number };
        total_users?: number;
    };
}

const cards = [
    {
        key: "penduduk",
        label: "Total Penduduk",
        note: "Jiwa",
        icon: Users,
        gradient: "from-emerald-500 to-teal-600",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        getValue: (d: any) => d?.penduduk?.total ?? 0,
    },
    {
        key: "berita",
        label: "Total Berita",
        note: "Artikel",
        icon: Newspaper,
        gradient: "from-blue-500 to-indigo-600",
        bg: "bg-blue-50",
        text: "text-blue-700",
        getValue: (d: any) => d?.berita?.total ?? 0,
    },
    {
        key: "umkm",
        label: "Total UMKM",
        note: "Unit Usaha",
        icon: Store,
        gradient: "from-amber-500 to-orange-600",
        bg: "bg-amber-50",
        text: "text-amber-700",
        getValue: (d: any) => d?.umkm?.total ?? 0,
    },
    {
        key: "layanan",
        label: "Layanan Desa",
        note: "Tersedia",
        icon: FileText,
        gradient: "from-violet-500 to-purple-600",
        bg: "bg-violet-50",
        text: "text-violet-700",
        getValue: (d: any) => d?.layanan?.total_services ?? 0,
    },
    {
        key: "pengajuan",
        label: "Pengajuan",
        note: "Total Surat",
        icon: ClipboardList,
        gradient: "from-rose-500 to-pink-600",
        bg: "bg-rose-50",
        text: "text-rose-700",
        getValue: (d: any) => d?.layanan?.total_submissions ?? 0,
    },
    {
        key: "pendidikan",
        label: "Lembaga Pendidikan",
        note: "Institusi",
        icon: GraduationCap,
        gradient: "from-cyan-500 to-sky-600",
        bg: "bg-cyan-50",
        text: "text-cyan-700",
        getValue: (d: any) => d?.total_lembaga_pendidikan ?? 0,
    },
    {
        key: "kesehatan",
        label: "Fasilitas Kesehatan",
        note: "Fasilitas",
        icon: Stethoscope,
        gradient: "from-lime-500 to-green-600",
        bg: "bg-lime-50",
        text: "text-lime-700",
        getValue: (d: any) => d?.kesehatan?.total_fasilitas ?? 0,
    },
];

export default function StatCards({ data }: StatCardsProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {cards.map((card) => {
                const Icon = card.icon;
                const value = card.getValue(data);
                return (
                    <div
                        key={card.key}
                        className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-4 group hover:shadow-md transition-all duration-300"
                    >
                        {/* Gradient accent */}
                        <div
                            className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradient}`}
                        />

                        <div className="flex flex-col gap-3">
                            <div
                                className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}
                            >
                                <Icon className={`w-5 h-5 ${card.text}`} />
                            </div>

                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    <CountUp end={value} duration={1.8} separator="." />
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
                                <p className="text-[10px] text-gray-400">{card.note}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
