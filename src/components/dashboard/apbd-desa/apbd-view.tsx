'use client'

import { useState } from "react";

import { TrendingUp, TrendingDown, DollarSign, Download, } from 'lucide-react';
import { formatCurrency } from "@/lib/utils";
import TableApbd from "./table-apbd";
import ModalApbd from "./modal-apbd";
import { useQuery } from "@tanstack/react-query";
import { GetAllApbd } from "@/service/apbd";
import Loader from "@/components/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function ApbdView() {

    const [activeTab, setActiveTab] = useState('dashboard');
    const currentYear = new Date().getFullYear();

    const [yearChoosen, setYearChosen] = useState(currentYear.toString());

    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => currentYear - i);

    const { data: dataApbd, isLoading: isLoadingApbd, refetch } = useQuery({
        queryFn: () => GetAllApbd(),
        queryKey: ['allApbd'],
    })

    const apbdList = dataApbd?.data || [];
    const filterByYear = apbdList.find((item: any) => item.tahun.toString() === yearChoosen);

    if (isLoadingApbd) return <Loader />
    return (
        <div>
            <div className="flex items-center justify-end gap-3 py-4">
                <Select onValueChange={(value) => setYearChosen(value)} defaultValue={yearChoosen}>
                    <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Pilih Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year) => (
                            <SelectItem value={year.toString()} key={year} className="hover:bg-primary cursor-pointer hover:text-white" >
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                    <Download size={18} />
                    Export
                </button>
            </div>
            <div className="bg-white ">
                <div className=" mx-auto px-4 lg:px-8">
                    <nav className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition ${activeTab === 'dashboard'
                                ? 'border-green-600 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('data')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition ${activeTab === 'data'
                                ? 'border-green-600 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Data APBD
                        </button>
                    </nav>
                </div>
            </div>

            {activeTab === 'dashboard' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <TrendingUp className="text-green-600" size={24} />
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                    Tahun {filterByYear?.tahun || yearChoosen}
                                </span>
                            </div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Pendapatan</h3>
                            <p className="text-2xl font-bold text-gray-800">{formatCurrency(filterByYear?.total_pendapatan || 0)}</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm  p-6 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-red-100 rounded-lg">
                                    <TrendingDown className="text-red-600" size={24} />
                                </div>
                                <span className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                                    Belanja
                                </span>
                            </div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Belanja</h3>
                            <p className="text-2xl font-bold text-gray-800">{formatCurrency(filterByYear?.total_belanja || 0)}</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm  p-6 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-emerald-100 rounded-lg">
                                    <DollarSign className="text-emerald-600" size={24} />
                                </div>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                    Surplus
                                </span>
                            </div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Surplus / Defisit</h3>
                            <p className="text-2xl font-bold text-emerald-600">{formatCurrency(filterByYear?.surplus_defisit || 0)}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm  p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Grafik Pendapatan & Belanja</h3>
                        <div className="h-64 flex items-center justify-center  rounded-lg">
                            <p className="text-gray-400">Grafik akan ditampilkan di sini</p>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'data' && (
                <div className="bg-white p-4 w-full rounded-lg shadow-sm">
                    <div className="flex justify-end mb-4 ">
                        <ModalApbd refetch={refetch} task="add" />
                    </div>

                    <div className="rounded-xl shadow-sm w-full overflow-x-auto">
                        <TableApbd refetch={refetch} data={dataApbd?.data} />
                    </div>
                </div>
            )}
        </div>
    )
}
