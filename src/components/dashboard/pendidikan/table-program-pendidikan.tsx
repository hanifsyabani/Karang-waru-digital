'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import {  GetProgramPendidikan } from '@/service/education';
import Loader from '@/components/ui/loader';
import { DataTable } from '@/components/ui/data-tabe';
import { ColumnProgramPendidikan, getColumns } from './column-program-pendidikan';
import ModalProgramPendidikan from './modal-program-pendidikan';
export default function TableProgramPendidikan() {

  const { data: dataProgramPendidikan, isLoading: isLoadingProgramPendidikan, refetch } = useQuery({
    queryFn: () => GetProgramPendidikan(),
    queryKey: ["dataProgramPendidikan"]
  })

  const formattedProgramPendidikan: ColumnProgramPendidikan[] = Array.isArray(dataProgramPendidikan?.data)
    ? dataProgramPendidikan.data.map((item: any) => ({
      id: item.id,
      nama_program : item.nama_program,
      deskripsi : item.deskripsi,
      tanggal_selesai : item.tanggal_selesai,
      tanggal_mulai : item.tanggal_mulai,
      status : item.status
    })) : []

  if (isLoadingProgramPendidikan) return <Loader />

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-primary py-4 text-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Program Pendidikan</CardTitle>
            <CardDescription className="text-emerald-50">Program pendidikan di Desa Karang Waru</CardDescription>
          </div>
          <ModalProgramPendidikan refetch={refetch} task="add" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <DataTable data={formattedProgramPendidikan} columns={getColumns(refetch)}/>
      </CardContent>
    </Card>
  )
}
