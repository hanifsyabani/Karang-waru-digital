'use client'

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Phone, Clock, Calendar, Building2, Heart, Search, Filter, } from 'lucide-react';
import StatsCardKesehatan from './stats-card-kesehatan';

export default function Kesehatan() {
  const [activeTab, setActiveTab] = useState('layanan');

  const [searchTerm, setSearchTerm] = useState('');
  const [filterJenis, setFilterJenis] = useState('all');

  // Sample data
  const [layananList, setLayananList] = useState([
    {
      id: 1,
      namaProgram: 'Imunisasi Balita',
      deskripsi: 'Program imunisasi rutin untuk balita usia 0-5 tahun',
      jenisProgram: 'Imunisasi',
      fasilitasId: 1,
      namaFasilitas: 'Posyandu Melati',
      jadwal: 'Setiap Selasa, 08:00-11:00'
    },
    {
      id: 2,
      namaProgram: 'Posyandu Lansia',
      deskripsi: 'Pemeriksaan kesehatan rutin untuk lansia',
      jenisProgram: 'Posyandu',
      fasilitasId: 2,
      namaFasilitas: 'Puskesmas Karang Waru',
      jadwal: 'Setiap Kamis, 07:00-10:00'
    },
    {
      id: 3,
      namaProgram: 'Cek Kesehatan Gratis',
      deskripsi: 'Pemeriksaan kesehatan gratis untuk warga',
      jenisProgram: 'Cek Kesehatan',
      fasilitasId: 2,
      namaFasilitas: 'Puskesmas Karang Waru',
      jadwal: 'Setiap hari, 08:00-14:00'
    }
  ]);

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




  const filteredLayanan = layananList.filter(item => {
    const matchSearch = item.namaProgram.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterJenis === 'all' || item.jenisProgram === filterJenis;
    return matchSearch && matchFilter;
  });

  const filteredFasilitas = fasilitasList.filter(item => {
    const matchSearch = item.namaFasilitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterJenis === 'all' || item.jenis === filterJenis;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCardKesehatan title='Layanan' value={fasilitasList} icon={Calendar} />

          <StatsCardKesehatan title='Fasilitas' value={layananList} icon={Building2} />

          <StatsCardKesehatan title='Program Kesehatan' value={layananList} icon={Heart} />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('layanan')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${activeTab === 'layanan'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Layanan Kesehatan</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('fasilitas')}
              className={`flex-1 px-6 py-4 font-semibold transition-all ${activeTab === 'fasilitas'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Fasilitas Kesehatan</span>
              </div>
            </button>
          </div>

          <div className="p-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterJenis}
                    onChange={(e) => setFilterJenis(e.target.value)}
                    className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white"
                  >
                    <option value="all">Semua Jenis</option>
                    {activeTab === 'layanan' ? (
                      <>
                        <option value="Imunisasi">Imunisasi</option>
                        <option value="Posyandu">Posyandu</option>
                        <option value="Posbindu">Posbindu</option>
                        <option value="Cek Kesehatan">Cek Kesehatan</option>
                      </>
                    ) : (
                      <>
                        <option value="Puskesmas">Puskesmas</option>
                        <option value="Posyandu">Posyandu</option>
                        <option value="Klinik">Klinik</option>
                        <option value="Apotek">Apotek</option>
                      </>
                    )}
                  </select>
                </div>
                <button
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tambah Data</span>
                </button>
              </div>
            </div>

            {/* Content */}
            {activeTab === 'layanan' ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredLayanan.map((layanan) => (
                  <div
                    key={layanan.id}
                    className="bg-gradient-to-r from-white to-green-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                            {layanan.jenisProgram}
                          </span>
                          <h3 className="text-xl font-bold text-gray-800">{layanan.namaProgram}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{layanan.deskripsi}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center text-gray-700">
                            <Building2 className="w-5 h-5 text-green-600 mr-2" />
                            <span className="text-sm">{layanan.namaFasilitas}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Clock className="w-5 h-5 text-green-600 mr-2" />
                            <span className="text-sm">{layanan.jadwal}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFasilitas.map((fasilitas) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
