'use client'

import { X } from "lucide-react";
import { useState } from "react";

export default function ModalLayananKesehatan() {
      const [modalType, setModalType] = useState('');

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                    </h2>
                    <button  className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    {modalType.includes('Layanan') ? (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Program</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    placeholder="Masukkan nama program"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Program</label>
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                                    <option>Pilih Jenis</option>
                                    <option>Imunisasi</option>
                                    <option>Posyandu</option>
                                    <option>Posbindu</option>
                                    <option>Cek Kesehatan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    placeholder="Masukkan deskripsi program"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Fasilitas</label>
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                                    <option>Pilih Fasilitas</option>
                                    {fasilitasList.map(f => (
                                        <option key={f.id} value={f.id}>{f.namaFasilitas}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Jadwal</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    placeholder="Contoh: Setiap Selasa, 08:00-11:00"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Fasilitas</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    placeholder="Masukkan nama fasilitas"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Fasilitas</label>
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
                                    <option>Pilih Jenis</option>
                                    <option>Puskesmas</option>
                                    <option>Posyandu</option>
                                    <option>Klinik</option>
                                    <option>Apotek</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    placeholder="Masukkan alamat lengkap"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Penanggung Jawab</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    placeholder="Nama penanggung jawab"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    placeholder="Contoh: 081234567890"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Jam Operasional</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    placeholder="Contoh: Senin-Jumat, 08:00-16:00"
                                />
                            </div>
                        </>
                    )}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
