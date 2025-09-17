'use client'

import Loader from "@/components/ui/loader"
import { GetAllAkun } from "@/service/akun"
import { useQuery } from "@tanstack/react-query"
import { ColumnAkun, getColumns } from "./columns-akun"
import { DataTable } from "@/components/ui/data-tabe"
import HeaderDashboard from "../header"


export default function TableAkun() {

  const { data: dataAkun, isLoading: isLoadingAkun } = useQuery({
    queryFn: () => GetAllAkun(),
    queryKey: ['akun'],
  })


  const formattedAkun: ColumnAkun[] = dataAkun?.data.map((item :any) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role
  }))

  if (isLoadingAkun) return <Loader />
  return (
    <div>
      <HeaderDashboard/>
      <DataTable data={formattedAkun} columns={getColumns()} filterKey="name"/>
    </div>
  )
}
