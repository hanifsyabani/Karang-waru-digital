'use client'

import { Clock, Edit2, MapPin, Phone, Trash2 } from 'lucide-react'
import { useState } from 'react';

export default function FasilitasKesehatan() {
    const [fasilitasList, setFasilitasList] = useState([
        {
            id: 1,
            namaFasilitas: 'Posyandu Melati',
            jenis: 'Posyandu',
            alamat: 'RT 02/RW 01, Desa Karang Waru',
            penanggungJawab: 'Ibu Siti Aminah',
            noTelepon: '081234567890',
            jamOperasional: 'Selasa & Jumat, 08:00-11:00'
        },
        {
            id: 2,
            namaFasilitas: 'Puskesmas Karang Waru',
            jenis: 'Puskesmas',
            alamat: 'Jl. Raya Karang Waru No. 123',
            penanggungJawab: 'dr. Budi Santoso',
            noTelepon: '0271-123456',
            jamOperasional: 'Senin-Sabtu, 07:00-20:00'
        },
        {
            id: 3,
            namaFasilitas: 'Apotek Sehat',
            jenis: 'Apotek',
            alamat: 'Jl. Raya Karang Waru No. 45',
            penanggungJawab: 'Apt. Sarah Wijaya',
            noTelepon: '081298765432',
            jamOperasional: 'Setiap hari, 08:00-21:00'
        }
    ]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fasilitasList.map((fasilitas) => (
                <div
                    key={fasilitas.id}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                                {fasilitas.jenis}
                            </span>
                            <h3 className="text-xl font-bold text-gray-800 mt-2">{fasilitas.namaFasilitas}</h3>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-start text-gray-700">
                            <MapPin className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{fasilitas.alamat}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <Phone className="w-5 h-5 text-green-600 mr-2" />
                            <span className="text-sm">{fasilitas.noTelepon}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <Clock className="w-5 h-5 text-green-600 mr-2" />
                            <span className="text-sm">{fasilitas.jamOperasional}</span>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                            <p className="text-sm text-gray-500">Penanggung Jawab:</p>
                            <p className="text-sm font-semibold text-gray-800">{fasilitas.penanggungJawab}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
