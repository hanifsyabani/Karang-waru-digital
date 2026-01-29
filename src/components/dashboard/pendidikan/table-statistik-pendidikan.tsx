'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import {  GetStatistikPendidikan } from '@/service/education';
import Loader from '@/components/ui/loader';
import { DataTable } from '@/components/ui/data-tabe';
import ModalStatistikPendidikan from './modal-statistik-pendidikan';
import { ColumnStatistikPendidikan, getColumns } from './column-statistik-pendidikan';
export default function TableStatistikPendidikan() {

  const { data: dataStatistikPendidikan, isLoading: isLoadingStatistikPendidikan, refetch } = useQuery({
    queryFn: () => GetStatistikPendidikan(),
    queryKey: ["dataStatistikPendidikan"]
  })

  const formattedStatistikPendidikan: ColumnStatistikPendidikan[] = Array.isArray(dataStatistikPendidikan?.data)
    ? dataStatistikPendidikan.data.map((item: any) => ({
      id: item.id,
      tahun : item.tahun,
      tidak_sekolah : item.tidak_sekolah,
      sd : item.sd,
      smp : item.smp,
      sma : item.sma,
      perguruan_tinggi : item.perguruan_tinggi
    })) : []

  if (isLoadingStatistikPendidikan) return <Loader />

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-primary py-4 text-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Statistik Pendidikan</CardTitle>
            <CardDescription className="text-emerald-50">Statistik pendidikan di Desa Karang Waru</CardDescription>
          </div>
          <ModalStatistikPendidikan refetch={refetch} task="add" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <DataTable data={formattedStatistikPendidikan} columns={getColumns(refetch)} />
      </CardContent>
    </Card>
  )
}
