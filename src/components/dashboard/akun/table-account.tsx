'use client'

import Loader from "@/components/ui/loader"
import { useQuery } from "@tanstack/react-query"
import { ColumnAccount, getColumns } from "./columns-account"
import { DataTable } from "@/components/ui/data-tabe"
import HeaderDashboard from "../header"
import { GetAccounts } from "@/service/akun"
import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"


export default function TableAccount() {
  const [page, setPage] = useState(1)

  const { data: dataAkun, isLoading: isLoadingAkun, refetch } = useQuery({
    queryFn: () => GetAccounts({
      page,
    }),
    queryKey: ['akun',],
  })


  const formattedAkun: ColumnAccount[] = dataAkun?.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role
  }))

  if (isLoadingAkun) return <Loader />
  return (
    <>
      <HeaderDashboard />
      <DataTable data={formattedAkun} columns={getColumns({ refetch })} filterKey="name" />

      <div className="flex gap-8 mt-4 justify-center">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 border"
        >
          <ArrowLeft/>
        </button>

        <span>{page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border"
        >
          <ArrowRight/>
        </button>
      </div>
    </>
  )
}
