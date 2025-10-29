'use client'

import { useState } from "react";

import { Plus, TrendingUp, TrendingDown, DollarSign, } from 'lucide-react';
import { formatCurrency } from "@/lib/utils";
import TableApbd from "./table-apbd";


export default function ApbdView() {

    const [activeTab, setActiveTab] = useState('dashboard');

    // Data dummy
    const summaryData = {
        totalPendapatan: 2500000000,
        totalBelanja: 2300000000,
        surplus: 200000000,
        tahun: 2024
    };


    return (
        <div>
            <div className="bg-white ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'dashboard' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <TrendingUp className="text-green-600" size={24} />
                                    </div>
                                    <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                        Tahun {summaryData.tahun}
                                    </span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Pendapatan</h3>
                                <p className="text-2xl font-bold text-gray-800">{formatCurrency(summaryData.totalPendapatan)}</p>
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
                                <p className="text-2xl font-bold text-gray-800">{formatCurrency(summaryData.totalBelanja)}</p>
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
                                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(summaryData.surplus)}</p>
                            </div>
                        </div>
                        {/* Chart Placeholder */}
                        <div className="bg-white rounded-xl shadow-sm  p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Grafik Pendapatan & Belanja</h3>
                            <div className="h-64 flex items-center justify-center  rounded-lg">
                                <p className="text-gray-400">Grafik akan ditampilkan di sini</p>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'data' && (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Data APBD Desa</h2>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                            >
                                <Plus size={18} />
                                Tambah Data
                            </button>
                        </div>

                        <TableApbd />
                    </>
                )}
            </main>
        </div>
    )
}
