'use client';


import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Filter, X, Check, Upload, ChevronLeft, ChevronRight } from 'lucide-react';

export default function UmkmView() {
  const [umkmData, setUmkmData] = useState([
    {
      id: 1,
      namaUsaha: 'Warung Sari Rasa',
      kategori: 'Kuliner',
      deskripsi: 'Warung makan tradisional dengan menu khas desa',
      gambar: '/desa-main.png',
      pemilik: 'Ibu Siti Aminah',
      status: 'Terverifikasi',
      slug: 'warung-sari-rasa',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      namaUsaha: 'Kerajinan Bambu Jaya',
      kategori: 'Kerajinan',
      deskripsi: 'Produksi kerajinan tangan dari bambu berkualitas',
      gambar: '/desa-main.png',
      pemilik: 'Pak Budi Santoso',
      status: 'Terverifikasi',
      slug: 'kerajinan-bambu-jaya',
      createdAt: '2024-02-20'
    },
    {
      id: 3,
      namaUsaha: 'Toko Kelontong Berkah',
      kategori: 'Perdagangan',
      deskripsi: 'Toko kelontong lengkap kebutuhan sehari-hari',
      gambar: '/desa-main.png',
      pemilik: 'Ibu Sari Wulandari',
      status: 'Belum Terverifikasi',
      slug: 'toko-kelontong-berkah',
      createdAt: '2024-03-10'
    },
    {
      id: 4,
      namaUsaha: 'Jasa Konveksi Maju',
      kategori: 'Jasa',
      deskripsi: 'Layanan jahit dan konveksi pakaian',
      gambar: '/desa-main.png',
      pemilik: 'Pak Ahmad Hidayat',
      status: 'Terverifikasi',
      slug: 'jasa-konveksi-maju',
      createdAt: '2024-01-28'
    },
    {
      id: 5,
      namaUsaha: 'Tani Organik Sejahtera',
      kategori: 'Pertanian',
      deskripsi: 'Produksi sayuran organik tanpa pestisida',
      gambar: '/desa-main.png',
      pemilik: 'Ibu Dewi Lestari',
      status: 'Belum Terverifikasi',
      slug: 'tani-organik-sejahtera',
      createdAt: '2024-03-05'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedUmkm, setSelectedUmkm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    namaUsaha: '',
    kategori: '',
    deskripsi: '',
    gambar: '',
    pemilik: '',
    status: 'Belum Terverifikasi'
  });

  const kategoriOptions = ['Kuliner', 'Kerajinan', 'Perdagangan', 'Jasa', 'Pertanian', 'Lainnya'];





  const filteredData = umkmData.filter(umkm => {
    const matchSearch = umkm.namaUsaha.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       umkm.pemilik.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'Semua' || umkm.status === filterStatus;
    const matchKategori = filterKategori === 'Semua' || umkm.kategori === filterKategori;
    return matchSearch && matchStatus && matchKategori;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Kelola UMKM Desa
              </h1>
              <p className="text-slate-600">Desa Karang Waru</p>
            </div>
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Tambah UMKM
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-blue-100 text-sm font-medium">Total UMKM</h3>
              <div className="bg-white/20 p-2 rounded-lg">
                <Eye size={20} />
              </div>
            </div>
            <p className="text-4xl font-bold mb-1">{umkmData.length}</p>
            <p className="text-blue-100 text-sm">Terdaftar di sistem</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-green-100 text-sm font-medium">Terverifikasi</h3>
              <div className="bg-white/20 p-2 rounded-lg">
                <Check size={20} />
              </div>
            </div>
            <p className="text-4xl font-bold mb-1">
              {umkmData.filter(u => u.status === 'Terverifikasi').length}
            </p>
            <p className="text-green-100 text-sm">UMKM aktif</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-orange-100 text-sm font-medium">Menunggu Verifikasi</h3>
              <div className="bg-white/20 p-2 rounded-lg">
                <Filter size={20} />
              </div>
            </div>
            <p className="text-4xl font-bold mb-1">
              {umkmData.filter(u => u.status === 'Belum Terverifikasi').length}
            </p>
            <p className="text-orange-100 text-sm">Perlu ditinjau</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari nama usaha atau pemilik..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option>Semua</option>
              {kategoriOptions.map(k => <option key={k}>{k}</option>)}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option>Semua</option>
              <option>Terverifikasi</option>
              <option>Belum Terverifikasi</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Nama Usaha</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Pemilik</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tanggal Daftar</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.map((umkm) => (
                  <tr key={umkm.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={umkm.gambar} alt={umkm.namaUsaha} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold text-slate-800">{umkm.namaUsaha}</p>
                          <p className="text-sm text-slate-500">{umkm.deskripsi.substring(0, 40)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        {umkm.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{umkm.pemilik}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        umkm.status === 'Terverifikasi' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {umkm.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{umkm.createdAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
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

          <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Menampilkan {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredData.length)} dari {filteredData.length} data
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 hover:bg-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-slate-800">
                {modalMode === 'add' ? 'Tambah UMKM Baru' : 'Edit Data UMKM'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Usaha *
                </label>
                <input
                  type="text"
                  value={formData.namaUsaha}
                  onChange={(e) => setFormData({...formData, namaUsaha: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Contoh: Warung Sari Rasa"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Kategori *
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Pilih Kategori</option>
                  {kategoriOptions.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Pemilik *
                </label>
                <input
                  type="text"
                  value={formData.pemilik}
                  onChange={(e) => setFormData({...formData, pemilik: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Contoh: Ibu Siti Aminah"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Deskripsi *
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Jelaskan tentang usaha ini..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  URL Gambar
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.gambar}
                    onChange={(e) => setFormData({...formData, gambar: e.target.value})}
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="/path/to/image.png"
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Upload size={18} />
                    Upload
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status Verifikasi *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="Belum Terverifikasi">Belum Terverifikasi</option>
                  <option value="Terverifikasi">Terverifikasi</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg font-medium"
                >
                  {modalMode === 'add' ? 'Tambah UMKM' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}