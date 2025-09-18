'use client'

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit, MapPin, Users, Building, Clock, Phone, Mail } from 'lucide-react';

export default function ProfilDashboard() {
  const [activeTab, setActiveTab] = useState('informasi-umum');
  const [profilData, setProfilData] = useState({
    alamat: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    kodePos: '',
    jumlahPenduduk: 0,
    jumlahLaki: 0,
    jumlahPerempuan: 0,
    jumlahKK: 0,
    luasWilayahKm2: 0,
    luasWilayahHa: 0,
    tahunPembentukan: '',
    telepon: '',
    email: '',
    jamPelayanan: {
      senin: { buka: '08:00', tutup: '16:00' },
      selasa: { buka: '08:00', tutup: '16:00' },
      rabu: { buka: '08:00', tutup: '16:00' },
      kamis: { buka: '08:00', tutup: '16:00' },
      jumat: { buka: '08:00', tutup: '16:00' },
      sabtu: { buka: '08:00', tutup: '12:00' },
      minggu: { buka: '', tutup: '' }
    }
  });

  const [batasWilayah, setBatasWilayah] = useState([
    { arah: 'Utara', desaBatas: '' },
    { arah: 'Selatan', desaBatas: '' },
    { arah: 'Timur', desaBatas: '' },
    { arah: 'Barat', desaBatas: '' }
  ]);

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

  const [sejarahData, setSejarahData] = useState('');
  const [visiData, setVisiData] = useState('');
  const [misiData, setMisiData] = useState(['']);
  const [strukturPemerintahan, setStrukturPemerintahan] = useState([]);

  const tabs = [
    { id: 'informasi-umum', label: 'Informasi Umum', icon: Building },
    { id: 'geografis', label: 'Geografis', icon: MapPin },
    { id: 'demografis', label: 'Demografis', icon: Users },
    { id: 'sejarah', label: 'Sejarah', icon: Edit },
    { id: 'visi-misi', label: 'Visi & Misi', icon: Edit },
    { id: 'struktur', label: 'Struktur Pemerintahan', icon: Users }
  ];

  const handleProfilChange = (field, value) => {
    setProfilData(prev => ({ ...prev, [field]: value }));
  };

  const handleJamPelayananChange = (hari, field, value) => {
    setProfilData(prev => ({
      ...prev,
      jamPelayanan: {
        ...prev.jamPelayanan,
        [hari]: { ...prev.jamPelayanan[hari], [field]: value }
      }
    }));
  };

  const handleBatasWilayahChange = (index, field, value) => {
    setBatasWilayah(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleKomposisiChange = (index, field, value) => {
    setKomposisiPenduduk(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleMataPencaharianChange = (index, field, value) => {
    setMataPencaharian(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleFasilitasChange = (index, field, value) => {
    setFasilitasUmum(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const addMisi = () => {
    setMisiData(prev => [...prev, '']);
  };

  const removeMisi = (index) => {
    setMisiData(prev => prev.filter((_, i) => i !== index));
  };

  const handleMisiChange = (index, value) => {
    setMisiData(prev => prev.map((item, i) => i === index ? value : item));
  };

  const addStrukturPemerintahan = () => {
    setStrukturPemerintahan(prev => [...prev, {
      nama: '',
      jabatan: '',
      nip: '',
      foto: null,
      pendidikan: '',
      alamat: ''
    }]);
  };

  const removeStrukturPemerintahan = (index) => {
    setStrukturPemerintahan(prev => prev.filter((_, i) => i !== index));
  };

  const handleStrukturChange = (index, field, value) => {
    setStrukturPemerintahan(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleSave = async () => {
    const data = {
      profilData,
      batasWilayah,
      komposisiPenduduk,
      mataPencaharian,
      fasilitasUmum,
      sejarahData,
      visiData,
      misiData,
      strukturPemerintahan
    };

    console.log('Saving data:', data);
    // Implement API call to save data
    alert('Data berhasil disimpan!');
  };

  const renderInformasiUmum = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Informasi Umum Desa</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
          <textarea
            value={profilData.alamat}
            onChange={(e) => handleProfilChange('alamat', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Masukkan alamat lengkap desa"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan</label>
            <input
              type="text"
              value={profilData.kecamatan}
              onChange={(e) => handleProfilChange('kecamatan', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nama kecamatan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kabupaten</label>
            <input
              type="text"
              value={profilData.kabupaten}
              onChange={(e) => handleProfilChange('kabupaten', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nama kabupaten"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
            <input
              type="text"
              value={profilData.provinsi}
              onChange={(e) => handleProfilChange('provinsi', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nama provinsi"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
            <input
              type="text"
              value={profilData.kodePos}
              onChange={(e) => handleProfilChange('kodePos', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Kode pos"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tahun Pembentukan</label>
          <input
            type="number"
            value={profilData.tahunPembentukan}
            onChange={(e) => handleProfilChange('tahunPembentukan', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tahun pembentukan desa"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telepon</label>
            <input
              type="text"
              value={profilData.telepon}
              onChange={(e) => handleProfilChange('telepon', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nomor telepon"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profilData.email}
              onChange={(e) => handleProfilChange('email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email resmi desa"
            />
          </div>
        </div>
      </div>

      {/* Jam Pelayanan */}
      <div>
        <h4 className="text-lg font-medium text-gray-800 mb-3">Jam Pelayanan</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(profilData.jamPelayanan).map((hari) => (
            <div key={hari} className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-700 mb-2 capitalize">{hari}</h5>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  value={profilData.jamPelayanan[hari].buka}
                  onChange={(e) => handleJamPelayananChange(hari, 'buka', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="time"
                  value={profilData.jamPelayanan[hari].tutup}
                  onChange={(e) => handleJamPelayananChange(hari, 'tutup', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGeografis = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Geografis</h3>

      {/* Luas Wilayah */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Luas Wilayah (Km²)</label>
          <input
            type="number"
            step="0.01"
            value={profilData.luasWilayahKm2}
            onChange={(e) => handleProfilChange('luasWilayahKm2', parseFloat(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Luas dalam kilometer persegi"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Luas Wilayah (Ha)</label>
          <input
            type="number"
            value={profilData.luasWilayahHa}
            onChange={(e) => handleProfilChange('luasWilayahHa', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Luas dalam hektare"
          />
        </div>
      </div>

      {/* Batas Wilayah */}
      <div>
        <h4 className="text-lg font-medium text-gray-800 mb-3">Batas Wilayah</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {batasWilayah.map((batas, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sebelah {batas.arah}</label>
              <input
                type="text"
                value={batas.desaBatas}
                onChange={(e) => handleBatasWilayahChange(index, 'desaBatas', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Desa/wilayah sebelah ${batas.arah.toLowerCase()}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDemografis = () => (
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
              value={profilData.jumlahPenduduk}
              onChange={(e) => handleProfilChange('jumlahPenduduk', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Laki-laki</label>
            <input
              type="number"
              value={profilData.jumlahLaki}
              onChange={(e) => handleProfilChange('jumlahLaki', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Perempuan</label>
            <input
              type="number"
              value={profilData.jumlahPerempuan}
              onChange={(e) => handleProfilChange('jumlahPerempuan', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah KK</label>
            <input
              type="number"
              value={profilData.jumlahKK}
              onChange={(e) => handleProfilChange('jumlahKK', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Komposisi Penduduk */}
      <div>
        <h4 className="text-lg font-medium text-gray-800 mb-3">Komposisi Penduduk</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {komposisiPenduduk.map((komposisi, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{komposisi.kategori}</label>
              <input
                type="number"
                value={komposisi.jumlah}
                onChange={(e) => handleKomposisiChange(index, 'jumlah', parseInt(e.target.value))}
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
                onChange={(e) => handleMataPencaharianChange(index, 'persentase', parseFloat(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Persentase (%)"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fasilitas Umum */}
      <div>
        <h4 className="text-lg font-medium text-gray-800 mb-3">Fasilitas Umum</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fasilitasUmum.map((fasilitas, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{fasilitas.jenis}</label>
              <input
                type="number"
                value={fasilitas.jumlah}
                onChange={(e) => handleFasilitasChange(index, 'jumlah', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Jumlah"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSejarah = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Sejarah Desa</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sejarah Desa</label>
        <textarea
          value={sejarahData}
          onChange={(e) => setSejarahData(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={12}
          placeholder="Tuliskan sejarah lengkap desa, mulai dari asal usul, tokoh penting, peristiwa bersejarah, hingga perkembangan desa..."
        />
      </div>
    </div>
  );

  const renderVisiMisi = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Visi dan Misi</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Visi</label>
        <textarea
          value={visiData}
          onChange={(e) => setVisiData(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          placeholder="Tuliskan visi desa..."
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">Misi</label>
          <button
            onClick={addMisi}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Tambah Misi
          </button>
        </div>

        <div className="space-y-3">
          {misiData.map((misi, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex-1">
                <textarea
                  value={misi}
                  onChange={(e) => handleMisiChange(index, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder={`Misi ${index + 1}...`}
                />
              </div>
              {misiData.length > 1 && (
                <button
                  onClick={() => removeMisi(index)}
                  className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStruktur = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Struktur Pemerintahan</h3>
        <button
          onClick={addStrukturPemerintahan}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Pejabat
        </button>
      </div>

      <div className="space-y-4">
        {strukturPemerintahan.map((pejabat, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-medium text-gray-800">Pejabat {index + 1}</h4>
              <button
                onClick={() => removeStrukturPemerintahan(index)}
                className="text-red-600 hover:text-red-800 focus:outline-none"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleStrukturChange(index, 'foto', e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        {strukturPemerintahan.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Belum ada data struktur pemerintahan</p>
            <p className="text-sm">Klik "Tambah Pejabat" untuk menambahkan data</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'informasi-umum':
        return renderInformasiUmum();
      case 'geografis':
        return renderGeografis();
      case 'demografis':
        return renderDemografis();
      case 'sejarah':
        return renderSejarah();
      case 'visi-misi':
        return renderVisiMisi();
      case 'struktur':
        return renderStruktur();
      default:
        return renderInformasiUmum();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kelola Profil Desa</h1>
              <p className="text-sm text-gray-600 mt-1">
                Kelola informasi lengkap profil Desa Karang Waru
              </p>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Save className="h-5 w-5 mr-2" />
              Simpan Semua Data
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap flex items-center py-4 px-4 border-b-2 font-medium text-sm transition-colors`}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 sm:p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Quick Stats Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ringkasan Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-900">Total Penduduk</p>
                <p className="text-2xl font-bold text-blue-600">
                  {profilData.jumlahPenduduk.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <Building className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-900">Jumlah KK</p>
                <p className="text-2xl font-bold text-green-600">
                  {profilData.jumlahKK.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <MapPin className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-purple-900">Luas Wilayah</p>
                <p className="text-2xl font-bold text-purple-600">
                  {profilData.luasWilayahKm2} Km²
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-orange-50 rounded-lg">
              <Clock className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-orange-900">Tahun Berdiri</p>
                <p className="text-2xl font-bold text-orange-600">
                  {profilData.tahunPembentukan || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Kontak Desa</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Telepon</p>
                <p className="text-sm text-gray-600">{profilData.telepon || 'Belum diisi'}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">{profilData.email || 'Belum diisi'}</p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Alamat</p>
                <p className="text-sm text-gray-600">
                  {profilData.alamat ?
                    `${profilData.alamat}, ${profilData.kecamatan}, ${profilData.kabupaten}` :
                    'Belum diisi'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
        