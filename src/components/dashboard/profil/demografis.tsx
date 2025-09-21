'use client'

import React, { useState } from 'react'

export default function Demografis() {
    const [komposisiPenduduk, setKomposisiPenduduk] = useState([
        { kategori: 'Balita', jumlah: 0 },
        { kategori: 'Anak-anak', jumlah: 0 },
        { kategori: 'Dewasa', jumlah: 0 },
        { kategori: 'Lansia', jumlah: 0 }
    ]);

    const [mataPencaharian, setMataPencaharian] = useState([
        { jenis: 'Pertanian', persentase: 0 },
        { jenis: 'Perdagangan', persentase: 0 },
        { jenis: 'Jasa', persentase: 0 },
        { jenis: 'Industri Kecil', persentase: 0 }
    ]);

    const [fasilitasUmum, setFasilitasUmum] = useState([
        { jenis: 'Sekolah', jumlah: 0 },
        { jenis: 'Puskesmas', jumlah: 0 },
        { jenis: 'Masjid', jumlah: 0 },
        { jenis: 'Pasar Tradisional', jumlah: 0 },
        { jenis: 'Pos Keamanan', jumlah: 0 },
        { jenis: 'Balai Desa', jumlah: 0 }
    ]);


    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Demografis</h3>

            {/* Data Penduduk */}
            <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Data Penduduk</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Penduduk</label>
                        <input
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Laki-laki</label>
                        <input
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Perempuan</label>
                        <input
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah KK</label>
                        <input
                            type="number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Komposisi Penduduk</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {komposisiPenduduk.map((komposisi, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">{komposisi.kategori}</label>
                            <input
                                type="number"
                                value={komposisi.jumlah}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Jumlah"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mata Pencaharian */}
            <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Mata Pencaharian</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mataPencaharian.map((mata, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">{mata.jenis}</label>
                            <input
                                type="number"
                                step="0.01"
                                value={mata.persentase}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Persentase (%)"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Fasilitas Umum</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fasilitasUmum.map((fasilitas, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">{fasilitas.jenis}</label>
                            <input
                                type="number"
                                value={fasilitas.jumlah}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Jumlah"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
