'use client'

import React, { useState } from 'react';
import {
    FileText,
    TrendingUp,
    Tag,
    CheckCircle,
    Clock,

} from 'lucide-react';
import { tabBerita } from '@/lib/items';
import TableBerita from './table-berita';

export default function BeritaView() {
    const [activeTab, setActiveTab] = useState('dashboard');

    // Sample data
    const beritaData = [
        {
            id: 1,
            title: "Peluncuran Teknologi AI Terbaru di Indonesia",
            category: "Teknologi",
            writer: "Ahmad Rizki",
            date: "2025-10-04",
            status: "published",
            image: "tech-ai.jpg"
        },
        {
            id: 2,
            title: "Pertumbuhan Ekonomi Digital Meningkat 25%",
            category: "Ekonomi",
            writer: "Siti Nurhaliza",
            date: "2025-10-03",
            status: "published",
            image: "ekonomi.jpg"
        },
        {
            id: 3,
            title: "Festival Budaya Nusantara 2025",
            category: "Budaya",
            writer: "Budi Santoso",
            date: "2025-10-02",
            status: "draft",
            image: "budaya.jpg"
        },
        {
            id: 4,
            title: "Inovasi Pendidikan Era Digital",
            category: "Pendidikan",
            writer: "Dewi Lestari",
            date: "2025-10-01",
            status: "published",
            image: "pendidikan.jpg"
        },
        {
            id: 5,
            title: "Perkembangan Startup Indonesia 2025",
            category: "Bisnis",
            writer: "Andi Wijaya",
            date: "2025-09-30",
            status: "draft",
            image: "startup.jpg"
        }
    ];

    const stats = [
        {
            label: "Total Berita",
            value: "1,284",
            change: "+12%",
            icon: FileText,
            color: "bg-gradient-to-br from-blue-500 to-blue-600"
        },
        {
            label: "Artikel Published",
            value: "956",
            change: "+8%",
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
            value: "328",
            change: "-5%",
            icon: Clock,
            color: "bg-gradient-to-br from-orange-500 to-orange-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-2">
                        {tabBerita.map((tab) => (
                            <button
                                key={tab.title}
                                onClick={() => setActiveTab(tab.active)}
                                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all relative ${activeTab === tab.active
                                    ? 'text-primary'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.title}
                                {activeTab === tab.active && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-lg"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-5 ">
                {activeTab === 'dashboard' && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
                            <p className="text-gray-600 mt-2">Selamat datang kembali! Berikut ringkasan aktivitas hari ini.</p>
                        </div>

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

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Aktivitas Terbaru</h3>
                                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                    Lihat Semua
                                </button>
                            </div>
                            <div className="space-y-3">
                                {beritaData.slice(0, 5).map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                                                <FileText className="text-white" size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-sm text-gray-600 flex items-center gap-1">
                                                        <Tag size={14} />
                                                        {item.category}
                                                    </span>
                                                    <span className="text-sm text-gray-500">•</span>
                                                    <span className="text-sm text-gray-600">{item.writer}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm ${item.status === 'published'
                                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                                            : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                                            }`}>
                                            {item.status.toUpperCase()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'kelola-berita' && (
                    <TableBerita />
                )}

            </main>
        </div>
    );
}