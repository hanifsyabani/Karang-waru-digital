'use client'

import React, { useState } from 'react';
import { Edit, MapPin, Users, Building, Clock, Phone, Mail } from 'lucide-react';
import Geografis from './geografis';
import Demografis from './demografis';
import Sejarah from './sejarah';
import VisiMisi from './visi-misi';
import StrukturPemerintahan from './struktur-pemerintahan';
import InfoUmum from './info-umum';




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





  const renderTabContent = () => {
    switch (activeTab) {
      case 'informasi-umum':
        return <InfoUmum />;
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
        return <InfoUmum/>;
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
