'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import OverviewStats from './overview-stats';
import TableLembagaPendidikan from './table-lembaga-pendidikan';
import TableStatistikPendidikan from './table-statistik-pendidikan';
import TableProgramPendidikan from './table-program-pendidikan';
import ListDokumentasi from './list-dokumentasi';
import { useQuery } from '@tanstack/react-query';
import { GetLembagaPendidikan, GetProgramPendidikan, GetStatistikPendidikan } from '@/service/pendidikan';
import Loader from '@/components/ui/loader';

export default function PendidikanView() {
    const [activeTab, setActiveTab] = useState('overview');

    const { data: dataLembagaPendidikan, isLoading: isLoadingLembagaPendidikan } = useQuery({
        queryKey: ['dataLembagaPendidikan'],
        queryFn: () => GetLembagaPendidikan()
    })
    const { data: dataStatistikPendidikan, isLoading: isLoadingStatistikPendidikan } = useQuery({
        queryKey: ['dataStatistikPendidikan'],
        queryFn: () => GetStatistikPendidikan()
    })
    const { data: dataProgramPendidikan, isLoading: isLoadingProgramPendidikan } = useQuery({
        queryKey: ['dataProgramPendidikan'],
        queryFn: () => GetProgramPendidikan()
    })

    const sdStudents = dataStatistikPendidikan?.data ? dataStatistikPendidikan.data.reduce((acc: number, curr: any) => acc + curr.sd, 0) : 0;
    const smpStudents = dataStatistikPendidikan?.data ? dataStatistikPendidikan.data.reduce((acc: number, curr: any) => acc + curr.smp, 0) : 0;
    const smaStudents = dataStatistikPendidikan?.data ? dataStatistikPendidikan.data.reduce((acc: number, curr: any) => acc + curr.sma, 0) : 0;
    const perguruanTinggiStudents = dataStatistikPendidikan?.data ? dataStatistikPendidikan.data.reduce((acc: number, curr: any) => acc + curr.perguruan_tinggi, 0) : 0;
    const tidakSekolahStudents = dataStatistikPendidikan?.data ? dataStatistikPendidikan.data.reduce((acc: number, curr: any) => acc + curr.tidak_sekolah, 0) : 0;

    const programData = [
        { id: 1, nama: 'Beasiswa Pendidikan Desa', status: 'Aktif', tanggalMulai: '2024-01-15', tanggalSelesai: '2024-12-31' },
        { id: 2, nama: 'Pelatihan Literasi Digital', status: 'Aktif', tanggalMulai: '2024-03-01', tanggalSelesai: '2024-11-30' },
        { id: 3, nama: 'Pembangunan Perpustakaan Desa', status: 'Selesai', tanggalMulai: '2023-06-01', tanggalSelesai: '2024-02-28' },
    ];

    if (isLoadingLembagaPendidikan || isLoadingStatistikPendidikan || isLoadingProgramPendidikan) return <Loader />

    return (
        <>
            <OverviewStats dataLembagaPendidikan={dataLembagaPendidikan} dataStatistikPendidikan={dataStatistikPendidikan} dataProgramPendidikan={dataProgramPendidikan} />
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 mt-4">
                <TabsList className="bg-white shadow-md rounded-xl p-1 grid grid-cols-5 w-full max-w-3xl">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="lembaga" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
                        Lembaga
                    </TabsTrigger>
                    <TabsTrigger value="statistik" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
                        Statistik
                    </TabsTrigger>
                    <TabsTrigger value="program" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
                        Program
                    </TabsTrigger>
                    <TabsTrigger value="dokumentasi" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg">
                        Dokumentasi
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="shadow-lg border-0">
                            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-t-xl">
                                <CardTitle>Distribusi Pendidikan</CardTitle>
                                <CardDescription className="text-emerald-50">Data tahun 2024</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {[
                                        { label: 'Perguruan Tinggi', value: perguruanTinggiStudents, percentage: 11 },
                                        { label: 'SMA/SMK', value: smaStudents, percentage: 20 },
                                        { label: 'SMP', value: smpStudents, percentage: 28 },
                                        { label: 'SD', value: sdStudents, percentage: 39 },
                                        { label: 'Tidak Sekolah', value: tidakSekolahStudents, percentage: 2 },
                                    ].map((item, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium text-gray-700">{item.label}</span>
                                                <span className="text-gray-500">{item.value} orang ({item.percentage}%)</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${item.percentage * 2.5}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg border-0">
                            <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-xl">
                                <CardTitle>Program Pendidikan Aktif</CardTitle>
                                <CardDescription className="text-teal-50">Sedang berjalan</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {programData.filter(p => p.status === 'Aktif').map((program) => (
                                        <div key={program.id} className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-800">{program.nama}</h4>
                                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{program.tanggalMulai} - {program.tanggalSelesai}</span>
                                                    </div>
                                                </div>
                                                <Badge className="bg-emerald-500 text-white">{program.status}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="shadow-lg border-0">
                        <CardHeader className="bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-t-xl">
                            <CardTitle>Capaian Pendidikan</CardTitle>
                            <CardDescription className="text-green-50">Indikator kualitas pendidikan desa</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border-2 border-emerald-200">
                                    <p className="text-sm text-gray-500 mb-2">Tingkat Partisipasi</p>
                                    <p className="text-4xl font-bold text-emerald-600">96.8%</p>
                                    <p className="text-xs text-gray-500 mt-2">APS 2024</p>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
                                    <p className="text-sm text-gray-500 mb-2">Angka Melek Huruf</p>
                                    <p className="text-4xl font-bold text-green-600">94.5%</p>
                                    <p className="text-xs text-gray-500 mt-2">Usia 15+ tahun</p>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-lime-50 rounded-xl border-2 border-teal-200">
                                    <p className="text-sm text-gray-500 mb-2">Jumlah Lulusan</p>
                                    <p className="text-4xl font-bold text-teal-600">892</p>
                                    <p className="text-xs text-gray-500 mt-2">Tahun 2024</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="lembaga">
                    <TableLembagaPendidikan />
                </TabsContent>

                <TabsContent value="statistik">
                    <TableStatistikPendidikan />
                </TabsContent>

                <TabsContent value="program">
                    <TableProgramPendidikan />
                </TabsContent>

                <TabsContent value="dokumentasi">
                    <ListDokumentasi />
                </TabsContent>
            </Tabs>
        </>
    )
}
