'use client';

import { Eye, Filter, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { GetAllUmkm } from '@/service/umkm';
import Loader from '@/components/ui/loader';
import ModalUmkm from './modal-umkm';
import { ColumnUmkm, getColumns } from './column-umkm';
import { DataTable } from '@/components/ui/data-tabe';

export default function UmkmView() {

  const { data: dataUmkm, isLoading: isLoadingUmkm, refetch } = useQuery({
    queryFn: () => GetAllUmkm(),
    queryKey: ['umkm']
  })

  const formattedUmkm: ColumnUmkm[] = Array.isArray(dataUmkm?.data) ? dataUmkm?.data.map((item: any) => ({
    id: item.id,
    nama_usaha: item.nama_usaha,
    kategori: item.kategori,
    gambar: item.gambar,
    pemilik: item.pemilik,
    deskripsi: item.deskripsi,
    status: item.status,
    date: item.created_at
  })) : []

  if (isLoadingUmkm) return <Loader />

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
            <ModalUmkm refetch={refetch} task='add' />
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
            <p className="text-4xl font-bold mb-1">{dataUmkm?.data?.length}</p>
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
              {dataUmkm?.data?.filter((u: any) => u.status === 'verified').length}
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
              {dataUmkm?.data?.filter((u: any) => u.status === 'unverified').length}
            </p>
            <p className="text-orange-100 text-sm">Perlu ditinjau</p>
          </div>
        </div>

        <div>
          <DataTable data={formattedUmkm} columns={getColumns(refetch)} filterKey='nama_usaha' />
        </div>
      </div>
    </div>
  );
}