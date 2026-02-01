'use client';

import { useQuery } from '@tanstack/react-query';
import { GetAllUmkm, GetCountStatus } from '@/service/umkm';
import Loader from '@/components/ui/loader';
import ModalUmkm from './modal-umkm';
import { ColumnUmkm, getColumns } from './column-umkm';
import { DataTable } from '@/components/ui/data-tabe';
import { useState } from 'react';
import { useDebounce } from '@/hooks/use-debounced';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PaginationComponent from '@/components/pagination';

const LIMIT = 10

export default function TableUmkm() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [statusFilter, setStatusFilter] = useState('');

  const { data: dataCountStatus, isLoading: isLoadingCountStatus } = useQuery({
    queryFn: () => GetCountStatus(),
    queryKey: ['countStatus']
  })
  const total = dataCountStatus ? dataCountStatus.data.verified + dataCountStatus.data.unverified : 0;
  const totalPage = dataCountStatus ? Math.ceil(total / LIMIT) : 1;

  const { data: dataUmkm, isLoading: isLoadingUmkm, refetch } = useQuery({
    queryFn: () => GetAllUmkm({
      page,
      search: debouncedSearch,
      limit: LIMIT,
      status: statusFilter === 'all' ? '' : statusFilter
    }),
    queryKey: ['dataUmkm', page, debouncedSearch, LIMIT, statusFilter],
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

  if (isLoadingUmkm || isLoadingCountStatus) return <Loader />

  return (

    <div className='bg-white p-4'>
      <div className='flex justify-between my-4'>
        <Input
          placeholder={`Cari berdasarkan nama usaha.`}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="max-w-sm"
        />
        <div className='flex items-center gap-2'>
          <Select onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className='hover:bg-neutral-200 cursor-pointer'>Semua</SelectItem>
              <SelectItem value="verified" className='hover:bg-neutral-200 cursor-pointer'>Terverifikasi</SelectItem>
              <SelectItem value="unverified" className='hover:bg-neutral-200 cursor-pointer'>Menunggu Verifikasi</SelectItem>
            </SelectContent>
          </Select>
          <ModalUmkm refetch={refetch} task='add' />
        </div>
      </div>

      <DataTable data={formattedUmkm} columns={getColumns(refetch)} />

      {dataUmkm && dataUmkm.data.length > 0 && (
        <PaginationComponent
          page={page}
          setPage={setPage}
          totalPage={totalPage}
        />
      )}
    </div>
  );
}