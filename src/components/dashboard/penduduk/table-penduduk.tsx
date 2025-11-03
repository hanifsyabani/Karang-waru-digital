'use client'

import Loader from '@/components/ui/loader';
import { DeletePenduduk, GetAllPenduduk } from '@/service/penduduk';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, MapPin, Trash } from 'lucide-react'
import ModalPenduduk from './modal-penduduk';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ModalDelete from '../modal-delete';
import { Button } from '@/components/ui/button';

export default function TablePenduduk() {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { data: dataPenduduk, isLoading: isLoadingPenduduk, refetch } = useQuery({
        queryFn: () => GetAllPenduduk(),
        queryKey: ['penduduk'],
    })

    const { mutate: deletePenduduk } = useMutation({
        mutationFn: (id: string) => DeletePenduduk(id),
        onSuccess: () => {
            setIsLoading(false)
            toast.success('Apbd Berhasil Dihapus', {
                theme: "colored"
            })
            setIsOpen(false)
            refetch()
        },
        onError: () => {
            setIsLoading(false)
            toast.error('Apbd Gagal Dihapus', {
                theme: "colored"
            })
        }
    })

    if (isLoadingPenduduk) return <Loader />

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-emerald-600 to-green-700 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">NIK</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Nama Lengkap</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Jenis Kelamin</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Tempat, Tgl Lahir</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Alamat</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {dataPenduduk?.data && dataPenduduk.data.length > 0 ? (
                            dataPenduduk.data.map((penduduk: any) => (
                                <tr
                                    key={penduduk.id}
                                    className="hover:bg-emerald-50/50 transition-colors duration-150"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        {penduduk.nik}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {penduduk.nama_lengkap}
                                                </p>
                                                <p className="text-xs text-gray-500">{penduduk.pekerjaan}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {penduduk.jenis_kelamin}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {penduduk.tempat_lahir},{" "}
                                        {new Date(penduduk.tanggal_lahir).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <div className="flex items-start gap-1">
                                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <span>
                                                {penduduk.alamat}, RT {penduduk.rt}/RW {penduduk.rw}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                                            {penduduk.status_kependudukan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <ModalPenduduk task="detail" id={penduduk.id} refetch={refetch} />
                                            <ModalPenduduk task="edit" id={penduduk.id} refetch={refetch} />

                                            <Button
                                                className="bg-red-500 text-white hover:bg-red-800 cursor-pointer"
                                                onClick={() => setIsOpen(true)}
                                            >
                                                <Trash />
                                            </Button>

                                            <ModalDelete
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                onDelete={() => deletePenduduk(penduduk.id)}
                                                title="Penduduk"
                                                isOpen={isOpen}
                                                setIsOpen={setIsOpen}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="text-center text-gray-500 py-6 font-medium text-sm"
                                >
                                    Data Tidak Ditemukan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-700">
                    Menampilkan <span className="font-semibold">{dataPenduduk?.data?.length || 0}</span> dari <span className="font-semibold">{dataPenduduk?.data?.length || 0}</span> data
                </p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200">1</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200">2</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200">3</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center gap-2">
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
