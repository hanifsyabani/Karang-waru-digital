'use client'

import Loader from '@/components/ui/loader';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowUp, ArrowUpDown, Trash } from 'lucide-react'
import ModalPenduduk from './modal-residents';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ModalDelete from '../modal-delete';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/use-debounced';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { DeleteResident, GetCountResidents, GetResidents } from '@/service/resident';
import { Input } from '@/components/ui/input';

const LIMIT = 10
const SORT_OPTIONS = [
    { value: "created_at", label: "Tanggal" },
]

export default function TableResidents() {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState('created_at')
    const [sortOrder, setSortOrder] = useState('desc')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const debouncedSearch = useDebounce(searchQuery, 500)

    const handleSortChange = (newSortBy: string) => {
        setPage(1)
        // klo klik lagi ubah sortOrder aja
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            // klo ga sama baru default desc 
        } else {
            setSortBy(newSortBy)
            setSortOrder("desc")
        }
    }

    const { data: dataPenduduk, isLoading: isLoadingPenduduk, refetch } = useQuery({
        queryFn: () => GetResidents({
            search: debouncedSearch,
            page: page,
            limit: LIMIT,
            sortBy: sortBy,
            sortOrder: sortOrder,
        }),
        queryKey: ['penduduk', page, debouncedSearch, sortBy, sortOrder, LIMIT],
        placeholderData: keepPreviousData
    })
    const { data: dataCountPenduduk, isLoading: isLoadingCountPenduduk, } = useQuery({
        queryFn: () => GetCountResidents(),
        queryKey: ['countPenduduk'],
    })

    const totalPage = dataCountPenduduk ? Math.ceil(dataCountPenduduk.data.total / LIMIT) : 1

    const { mutate: deletePenduduk } = useMutation({
        mutationFn: (id: string) => DeleteResident(id),
        onSuccess: () => {
            setIsLoading(false)
            toast.success('Penduduk Berhasil Dihapus', {
                theme: "colored"
            })
            setIsOpen(false)
            refetch()
        },
        onError: () => {
            setIsLoading(false)
            toast.error('Penduduk Gagal Dihapus', {
                theme: "colored"
            })
        }
    })

    if (isLoadingPenduduk || isLoadingCountPenduduk) return <Loader />

    return (
        <>
            <div className='flex justify-between'>
                <div className='w-1/2'>
                    <Input
                        placeholder="Cari berdasarkan nama dan NIK ..."
                        className='bg-white'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-1 px-4 py-2">
                    {SORT_OPTIONS.map((option) => {
                        const isActive = sortBy === option.value
                        const Icon = isActive
                            ? (sortOrder === "asc" ? ArrowUp : ArrowDown)
                            : ArrowUpDown

                        return (
                            <Button
                                key={option.value}
                                size="sm"
                                variant={isActive ? "default" : "ghost"}
                                className={`flex items-center cursor-pointer gap-1.5 transition-all
                                    ${isActive
                                        ? "bg-green-700 hover:bg-green-800 text-white"
                                        : "hover:bg-green-50 text-muted-foreground hover:text-green-600"
                                    }`}
                                onClick={() => handleSortChange(option.value)}
                            >
                                {option.label}
                                <Icon className="w-3.5 h-3.5" />
                            </Button>
                        )
                    })}
                </div>
            </div>
            <div className="relative w-full overflow-x-auto mt-4 bg-white">
                <Table  >
                    <TableHeader className="bg-gradient-to-r from-emerald-600 to-green-700 text-white">
                        <TableRow>
                            <TableHead className="px-6 py-4 text-left text-sm font- text-white">NIK</TableHead>
                            <TableHead className="px-6 py-4 text-left text-sm font- text-white">Nama Lengkap</TableHead>
                            <TableHead className="px-6 py-4 text-left text-sm font- text-white">Jenis Kelamin</TableHead>
                            <TableHead className="px-6 py-4 text-left text-sm font- text-white">Tempat, Tgl Lahir</TableHead>
                            <TableHead className="px-6 py-4 text-left text-sm font- text-white">Status</TableHead>
                            <TableHead className="px-6 py-4 text-center text-sm font- text-white">Aksi</TableHead>
                        </TableRow>
                    </TableHeader >
                    <TableBody>
                        {(dataPenduduk?.data ?? []).length > 0 ? (
                            dataPenduduk.data.map((penduduk: any) => (
                                <TableRow
                                    key={penduduk.id}
                                    className="hover:bg-emerald-50/50 transition-colors duration-150"
                                >
                                    <TableCell className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        {penduduk.nik}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {penduduk.nama_lengkap}
                                                </p>
                                                <p className="text-xs text-gray-500">{penduduk.pekerjaan}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-gray-700">
                                        {penduduk.jenis_kelamin}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-gray-700">
                                        {penduduk.tempat_lahir},{" "}
                                        {new Date(penduduk.tanggal_lahir).toLocaleDateString("id-ID")}
                                    </TableCell>

                                    <TableCell className="px-6 py-4">
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                                            {penduduk.status_kependudukan}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <ModalPenduduk task="detail" id={penduduk.id} refetch={refetch} />
                                            <ModalPenduduk task="edit" id={penduduk.id} refetch={refetch} />

                                            <Button
                                                className="bg-red-500 text-white hover:bg-red-800 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedId(penduduk.id)
                                                    setIsOpen(true)
                                                }}
                                            >
                                                <Trash />
                                            </Button>


                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center text-gray-500 py-6 font-medium text-sm"
                                >
                                    Data Tidak Ditemukan
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {(dataPenduduk?.data ?? []).length > 0 && (
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
                                    <PaginationLink isActive={p === page} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200">{p}</PaginationLink>
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
                )
                }
            </div>


            {selectedId && (
                <ModalDelete
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    onDelete={() => deletePenduduk(selectedId)}
                    title="Penduduk"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            )}
        </ >
    )
}
