'use client'

import React, { useState } from 'react';
import {
    LayoutDashboard,
    FileText,
    TrendingUp,
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    Eye,
    Calendar,
    Tag,
    CheckCircle,
    Clock,
    XCircle,
    Menu,
    Bell,
    User
} from 'lucide-react';
import { tabBerita } from '@/lib/items';

export default function BeritaView() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [selectedBerita, setSelectedBerita] = useState(null);

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

    const filteredBerita = beritaData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (berita) => {
        setSelectedBerita(berita);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            console.log('Delete berita:', id);
        }
    };

    const handleSave = () => {
        console.log('Saving berita...');
        setShowModal(false);
        setSelectedBerita(null);
    };

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

            <main className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === 'dashboard' && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
                            <p className="text-gray-600 mt-2">Selamat datang kembali! Berikut ringkasan aktivitas hari ini.</p>
                        </div>

                        {/* Stats Grid */}
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

                        {/* Recent Activity */}
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
                    <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">Kelola Berita</h2>
                                <p className="text-gray-600 mt-2">Manage and organize your news articles</p>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedBerita(null);
                                    setShowModal(true);
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all"
                            >
                                <Plus size={20} />
                                Tambah Berita
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Cari berita berdasarkan judul atau kategori..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Filter className="text-gray-400" size={20} />
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                    >
                                        <option value="all">Semua Status</option>
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Judul</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Kategori</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Penulis</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tanggal</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredBerita.map(item => (
                                            <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-gray-800 max-w-xs">{item.title}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-lg text-sm font-semibold">
                                                        <Tag size={14} />
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-700 font-medium">{item.writer}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Calendar size={16} />
                                                        <span className="text-sm">{item.date}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-bold shadow-sm ${item.status === 'published'
                                                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                                                        : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                                                        }`}>
                                                        {item.status === 'published' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                                        {item.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                            <Eye size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                                <h3 className="text-2xl font-bold text-white">
                                    {selectedBerita ? 'Edit Berita' : 'Tambah Berita Baru'}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedBerita(null);
                                    }}
                                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-colors"
                                >
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita *</label>
                                    <input
                                        type="text"
                                        defaultValue={selectedBerita?.title}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Masukkan judul berita yang menarik"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Kategori *</label>
                                        <select
                                            defaultValue={selectedBerita?.category}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                                        >
                                            <option value="">Pilih Kategori</option>
                                            <option>Teknologi</option>
                                            <option>Ekonomi</option>
                                            <option>Budaya</option>
                                            <option>Pendidikan</option>
                                            <option>Politik</option>
                                            <option>Olahraga</option>
                                            <option>Bisnis</option>
                                            <option>Kesehatan</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Status *</label>
                                        <select
                                            defaultValue={selectedBerita?.status}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Penulis *</label>
                                        <input
                                            type="text"
                                            defaultValue={selectedBerita?.writer}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Nama penulis"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal *</label>
                                        <input
                                            type="date"
                                            defaultValue={selectedBerita?.date}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Gambar</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                                        <input
                                            type="file"
                                            className="hidden"
                                            id="image-upload"
                                            accept="image/*"
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <div className="text-gray-500">
                                                <FileText size={40} className="mx-auto mb-2 text-gray-400" />
                                                <p className="font-semibold">Klik untuk upload gambar</p>
                                                <p className="text-sm">PNG, JPG atau JPEG (Max. 5MB)</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Konten Berita *</label>
                                    <textarea
                                        rows={6}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Tulis konten berita di sini..."
                                    ></textarea>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => {
                                            setShowModal(false);
                                            setSelectedBerita(null);
                                        }}
                                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all"
                                    >
                                        {selectedBerita ? 'Update Berita' : 'Simpan Berita'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}