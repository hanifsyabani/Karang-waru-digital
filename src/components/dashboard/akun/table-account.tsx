'use client'

import Loader from "@/components/ui/loader"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { ColumnAccount, getColumns } from "./columns-account"
import { DataTable } from "@/components/ui/data-tabe"
import HeaderDashboard from "../header"
import { GetAccounts } from "@/service/account"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounced"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

const LIMIT = 10

export default function TableAccount() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 500)

  const { data: dataAkun, isLoading: isLoadingAkun, refetch } = useQuery({
    queryFn: () => GetAccounts({
      page,
      query: debouncedSearch,
      limit: LIMIT,
    }),
    queryKey: ['dataAccount', debouncedSearch, page, LIMIT],
    placeholderData: keepPreviousData
  })
  const { data: dataAllAkun, isLoading: isLoadingAllAkun, refetch: refetchAll } = useQuery({
    queryFn: () => GetAccounts({}),
    queryKey: ['dataAccount'],
  })

  const totalPage = dataAllAkun ? Math.ceil(dataAllAkun.data.length / LIMIT) : 1

  const formattedAkun: ColumnAccount[] = dataAkun?.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role
  }))

  if (isLoadingAkun || isLoadingAllAkun) return <Loader />
  return (
    <>
      <HeaderDashboard refetch={refetch} refetchAll={refetchAll} />
      <div className="flex items-center  px-2 py-4">
        <Input
          placeholder={`Cari berdasarkan nama atau email...`}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <DataTable data={formattedAkun} columns={getColumns({ refetch, refetchAll })} />

      {dataAkun && dataAkun.data.length > 0 && (
        <Pagination className="my-4">
          <PaginationContent >
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  className='text-primary cursor-pointer'
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                />
              </PaginationItem>
            )}
            {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p} onClick={() => setPage(p)} className='cursor-pointer'>
                <PaginationLink isActive={p === page} className="hover:bg-primary">{p}</PaginationLink>
              </PaginationItem>
            ))}
            {page !== totalPage && (
              <PaginationItem>
                <PaginationNext
                  className='text-primary cursor-pointer'
                  onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}
