'use client';


import { useState } from 'react';

import ModalLayanan from './modal-service-village';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { ColumnLayanan, getColumns } from './column-layanan';
import Loader from '@/components/ui/loader';
import { DataTable } from '@/components/ui/data-tabe';
import { LayananDesa } from '@/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Grid, List, Pen, Trash } from 'lucide-react';
import { DeleteLayanan, GetAllServiceVillage } from '@/service/service';
import { useDebounce } from '@/hooks/use-debounced';
import ModalDelete from '../modal-delete';
import { toast } from 'react-toastify';
import Link from 'next/link';

const LIMIT = 10;

export default function ListServiceVillage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isLoading, setISLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { mutate: deleteLayanan } = useMutation({
    mutationFn: (id: string) => DeleteLayanan(id),
    onSuccess: () => {
      setISLoading(false)
      toast.success('Layanan Berhasil Dihapus', {
        theme: "colored"
      })
      setIsOpen(false)
      refetch()
    },
    onError: () => {
      setISLoading(false)
      toast.error('Layanan Gagal Dihapus', {
        theme: "colored"
      })
    }
  })


  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: dataLayanan, isLoading: isLoadingLayanan, refetch } = useQuery({
    queryFn: () => GetAllServiceVillage({
      search: debouncedSearchTerm,
      page: page,
      limit: LIMIT,
    }),
    queryKey: ['layanan', debouncedSearchTerm, page, LIMIT],
    placeholderData: keepPreviousData
  })

  const formattedLayanan: ColumnLayanan[] = dataLayanan?.data.map((layanan: any) => ({
    id: layanan.id,
    service_name: layanan.service_name,
    description: layanan.description,
    category: layanan.category,
    estimated_time: layanan.estimated_time,
    cost: layanan.cost,
    status: layanan.status,
    image: layanan.image,
    created_at: layanan.created_at,
  })) || [];

  if (isLoadingLayanan) return <Loader />

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-end items-center mb-6">
          <ModalLayanan refetch={refetch} task='add' />
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari layanan berdasarkan nama atau deskripsi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-11 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg cursor-pointer border transition-all ${viewMode === "grid"
                  ? "bg-blue-50 border-green-600 text-green-600"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <Grid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg cursor-pointer border transition-all ${viewMode === "list"
                  ? "bg-blue-50 border-green-600 text-green-600"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <List />
              </button>
            </div>
          </div>

          {/* Category Pills */}
          {/* <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as string)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category === "all" ? "Semua Kategori" : category}
              </button>
            ))}
          </div> */}
        </div>
        {/* Services Grid/List */}
        {(dataLayanan.data ?? []).length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {dataLayanan.data.map((service: LayananDesa) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <Link href={`/admin/layanan-desa/${service.slug}`}>
                    <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-600 relative">
                      {service.image ? (
                        <Image
                          width={500}
                          height={200}
                          src={service.image}
                          alt={service.service_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}

                      <div className="absolute top-3 right-3">
                        <Badge className={`px-3 py-1 rounded-full text-xs font-semibold ${service.status === "published"
                          ? "bg-green-700 text-white"
                          : "bg-gray-500 text-white"
                          }`}>
                          {service.status === "published" ? "Aktif" : "Tidak Aktif"}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='px-5 pt-2'>
                      {/* Category */}
                      {service.category && (
                        <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
                          {service.category}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                        {service.service_name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                        {service.description || "Tidak ada deskripsi"}
                      </p>

                      {/* Details */}
                      <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                        {service.estimated_time && (
                          <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{service.estimated_time}</span>
                          </div>
                        )}
                        {service.cost && (
                          <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold">{service.cost === "0" || service.cost === "gratis" ? "Gratis" : `Rp ${service.cost}`}</span>
                          </div>
                        )}
                      </div>


                    </div>
                  </Link>
                  <div className="flex gap-2 px-5 pb-2">
                    <ModalLayanan refetch={refetch} task='edit' id={service.id} />
                    <button onClick={() => {
                      setSelectedId(service.id);
                      setIsOpen(true);
                    }} className="bg-red-50 hover:bg-red-100 cursor-pointer text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                      <Trash size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='bg-white p-4'>
              <DataTable data={formattedLayanan} columns={getColumns(refetch)} />
            </div>
          )
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada layanan ditemukan</h3>
            <p className="text-gray-500 mb-4">Coba ubah filter atau kata kunci pencarian Anda</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {selectedId && (
        <ModalDelete
          isLoading={isLoading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title='layanan'
          setIsLoading={setISLoading}
          onDelete={() => deleteLayanan(selectedId)}
        />
      )}

    </div>
  );
}