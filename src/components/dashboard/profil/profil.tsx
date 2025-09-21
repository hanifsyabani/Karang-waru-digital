'use client'

import React, { useState } from 'react';
import { Edit, MapPin, Users, Building, Clock, Phone, Mail, Save } from 'lucide-react';
import Geografis from './geografis';
import Demografis from './demografis';
import Sejarah from './sejarah';
import VisiMisi from './visi-misi';
import StrukturPemerintahan from './struktur-pemerintahan';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';

export default function ProfilDashboard() {
  const [activeTab, setActiveTab] = useState('informasi-umum');

  const tabs = [
    { id: 'informasi-umum', label: 'Informasi Umum', icon: Building },
    { id: 'geografis', label: 'Geografis', icon: MapPin },
    { id: 'demografis', label: 'Demografis', icon: Users },
    { id: 'sejarah', label: 'Sejarah', icon: Edit },
    { id: 'visi-misi', label: 'Visi & Misi', icon: Edit },
    { id: 'struktur', label: 'Struktur Pemerintahan', icon: Users }
  ];

  const renderInformasiUmum = () => {
    const {} = useMutation({
      
    })
    return (

      <form className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Informasi Umum Desa</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Alamat</Label>
            <Textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={3}
              placeholder="Masukkan alamat lengkap desa"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan</Label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Nama kecamatan"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Kabupaten</Label>
              <Input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
                placeholder="Nama kabupaten"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</Label>
              <Input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
                placeholder="Nama provinsi"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</Label>
              <Input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
                placeholder="Kode pos"
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Tahun Pembentukan</Label>
            <Input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
              placeholder="Tahun pembentukan desa"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Telepon</Label>
              <Input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
                placeholder="Nomor telepon"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Email</Label>
              <Input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email resmi desa"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-3">Jam Pelayanan</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-700 mb-2 capitalize"></h5>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <Input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <Button className='cursor-pointer'>
            <Save />Simpan
          </Button>
        </div>
      </form>
    )
  }



  const renderTabContent = () => {
    switch (activeTab) {
      case 'informasi-umum':
        return renderInformasiUmum();
      case 'geografis':
        return <Geografis />;
      case 'demografis':
        return <Demografis />;
      case 'sejarah':
        return <Sejarah />;
      case 'visi-misi':
        return <VisiMisi />;
      case 'struktur':
        return <StrukturPemerintahan />;
      default:
        return renderInformasiUmum();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kelola Profil Desa</h1>
              <p className="text-sm text-gray-600 mt-1">
                Kelola informasi lengkap profil Desa Karang Waru
              </p>
            </div>
          </div>
        </div>
      </div>

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
                    ? 'border-green-500 text-primary bg-green-50'
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 sm:p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ringkasan Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-900">Total Penduduk</p>
                <p className="text-2xl font-bold text-blue-600">
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <Building className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-900">Jumlah KK</p>
                <p className="text-2xl font-bold text-green-600">
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <MapPin className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-purple-900">Luas Wilayah</p>
                <p className="text-2xl font-bold text-purple-600">
                  Km²
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-orange-50 rounded-lg">
              <Clock className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-orange-900">Tahun Berdiri</p>
                <p className="text-2xl font-bold text-orange-600">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Kontak Desa</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Telepon</p>
                <p className="text-sm text-gray-600"> 'Belum diisi</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">Belum diisi</p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Alamat</p>
                <p className="text-sm text-gray-600">
                  'Belum diisi'
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
