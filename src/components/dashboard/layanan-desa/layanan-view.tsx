'use client';


import { useState } from 'react';
import { FileText, Settings } from 'lucide-react';

import ModalLayanan from './modal-layanan';
import { GetAllLayanan } from '@/service/layanan';
import { useQuery } from '@tanstack/react-query';
import { ColumnLayanan, getColumns } from './column-layanan';
import Loader from '@/components/ui/loader';
import { DataTable } from '@/components/ui/data-tabe';

export default function LayananView() {
  const [activeTab, setActiveTab] = useState('konten');

  const { data: dataLayanan, isLoading: isLoadingLayanan, refetch } = useQuery({
    queryFn: () => GetAllLayanan(),
    queryKey: ['layanan'],
  })

  const formattedLayanan: ColumnLayanan[] = Array.isArray(dataLayanan?.data) ? dataLayanan.data.map((item: any) => ({
    id : item.id,
    service_name : item.service_name,
    description : item.description,
    category : item.category,
    status : item.status,
    image : item.image,
    estimated_time : item.estimated_time,
    cost : item.cost,
    created_at : item.created_at,
  })) : [];



  if (isLoadingLayanan) return <Loader />

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Layanan Desa</h1>
          <p className="text-gray-600 mt-2">Kelola konten layanan untuk landing page dan layanan aktif desa</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('konten')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === 'konten'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <FileText className="w-5 h-5" />
              Konten Landing Page
            </button>
            <button
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === 'layanan'
                ? 'border-b-2 border-green-500 text-green-600'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <Settings className="w-5 h-5" />
              Layanan Aktif
            </button>
          </div>
        </div>

        <div className="flex justify-end items-center mb-6">
          <ModalLayanan refetch={refetch} task='add' />
        </div>

        {activeTab === 'konten' && (
          <>  
            <DataTable data={formattedLayanan} columns={getColumns(refetch)} filterKey="service_name"/>
          </>
        )}


      </div>
    </div>
  );
}