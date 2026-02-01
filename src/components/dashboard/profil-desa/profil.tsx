'use client'

import { useState } from 'react';
import { Edit, Users, Building } from 'lucide-react';
import Demografis from './demografis';
import Sejarah from './sejarah';
import VisiMisi from './visi-misi';
import InfoUmum from './info-umum';
import StatsProfileVillage from './stats-profile-village';
import { GetInfoUmum } from '@/service/profile-village';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/ui/loader';

export default function ProfilDashboard() {
  const [activeTab, setActiveTab] = useState('informasi-umum');

  const { data: dataInfoUmum, isLoading: isLoadingInfoUmum, refetch } = useQuery({
    queryFn: () => GetInfoUmum(),
    queryKey: ['info-umum'],
  })

  const tabs = [
    { id: 'informasi-umum', label: 'Informasi Umum', icon: Building },
    { id: 'demografis', label: 'Demografis', icon: Users },
    { id: 'sejarah', label: 'Sejarah', icon: Edit },
    { id: 'visi-misi', label: 'Visi & Misi', icon: Edit },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'informasi-umum':
        return <InfoUmum dataInfoUmum={dataInfoUmum} refetch={refetch} />;
      case 'demografis':
        return <Demografis />;
      case 'sejarah':
        return <Sejarah />;
      case 'visi-misi':
        return <VisiMisi />;
      default:
        return "";
    }
  };
  if (isLoadingInfoUmum) return <Loader />

  return (
    <div className="min-h-screen bg-gray-50">
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
                    } whitespace-nowrap cursor-pointer flex items-center py-4 px-4 border-b-2 font-medium text-sm transition-colors`}
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

      <StatsProfileVillage dataInfoUmum={dataInfoUmum} />
    </div>
  );
}
