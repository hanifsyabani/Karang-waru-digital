'use client'

import React, { useState } from 'react';
import {  Calendar, Building2, Heart } from 'lucide-react';
import StatsCardKesehatan from './stats-card-kesehatan';
import LayananKesehatan from './layanan-kesehatan';
import FasilitasKesehatan from './fasilitas-kesehatan';

export default function Kesehatan() {
  const [activeTab, setActiveTab] = useState('layanan');

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCardKesehatan title='Layanan' value={0} icon={Calendar} />

          <StatsCardKesehatan title='Fasilitas' value={0} icon={Building2} />

          <StatsCardKesehatan title='Program Kesehatan' value={0} icon={Heart} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('layanan')}
              className={`flex-1 px-6 py-4 font-semibold cursor-pointer transition-all ${activeTab === 'layanan'
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
              className={`flex-1 px-6 py-4 font-semibold cursor-pointer transition-all ${activeTab === 'fasilitas'
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


          {activeTab === 'layanan' ? (
            <LayananKesehatan />
          ) : (
            <FasilitasKesehatan />
          )}
        </div>
      </div>
    </div>
  );
};
