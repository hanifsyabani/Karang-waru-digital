'use client'

import { Card, CardContent } from "@/components/ui/card";

import { BookOpen, School, TrendingUp, Users } from "lucide-react";

export default function OverviewStats({ dataLembagaPendidikan, dataStatistikPendidikan, dataProgramPendidikan }: any) {

    const totalStudents = dataStatistikPendidikan?.data ? dataStatistikPendidikan.data.reduce((acc: number, curr: any) => acc + curr.sd + curr.smp + curr.sma, 0) : 0;

    const overviewStats = [
        { title: 'Total Lembaga', value: dataLembagaPendidikan?.data.length, icon: School, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Total Siswa', value: totalStudents, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
        { title: 'Program Aktif', value: dataProgramPendidikan?.data.length, icon: BookOpen, color: 'text-teal-600', bg: 'bg-teal-50' },
        { title: 'Tingkat Literasi', value: '94.5%', icon: TrendingUp, color: 'text-lime-600', bg: 'bg-lime-50' },
    ];


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {overviewStats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className="text-3xl font-bold mt-2 text-gray-800">{stat.value}</p>
                            </div>
                            <div className={`p-4 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
