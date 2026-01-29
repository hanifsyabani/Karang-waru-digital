'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { GetLembagaPendidikan } from '@/service/education';
import ModalLembagaPendidikan from './modal-lembaga-pendidikan';
import Loader from '@/components/ui/loader';
import { ColumnLembagaPendidikan, getColumns } from './column-lembaga-pendidikan';
import { DataTable } from '@/components/ui/data-tabe';
export default function TableLembagaPendidikan() {

  const { data: dataLembagaPendidikan, isLoading: isLoadingLembagaPendidikan, refetch } = useQuery({
    queryFn: () => GetLembagaPendidikan(),
    queryKey: ["dataLembagaPendidikan"]
  })

  const formattedLembagaPendidikan: ColumnLembagaPendidikan[] = Array.isArray(dataLembagaPendidikan?.data)
    ? dataLembagaPendidikan.data.map((item: any) => ({
      id: item.id,
      nama_sekolah: item.nama_sekolah,
      jenjang_pendidikan: item.jenjang_pendidikan,
      alamat: item.alamat,
      latitude: item.latitude,
      longitude: item.longitude,
      jumlah_siswa: item.jumlah_siswa,
      jumlah_guru: item.jumlah_guru,
      jumlah_staf: item.jumlah_staf,
      kontak: item.kontak
    })) : []

  if (isLoadingLembagaPendidikan) return <Loader />

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-primary py-4 text-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lembaga Pendidikan</CardTitle>
            <CardDescription className="text-emerald-50">Daftar sekolah dan lembaga pendidikan di Desa Karang Waru</CardDescription>
          </div>
          <ModalLembagaPendidikan refetch={refetch} task="add" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <DataTable data={formattedLembagaPendidikan} columns={getColumns(refetch)}/>
      </CardContent>
    </Card>
  )
}
