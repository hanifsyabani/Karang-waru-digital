'use client';

import { Building2, Clock, Trash } from "lucide-react";
import ModalLayananKesehatan from "./modal-layanan-kesehatan";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DeleteLayananKesehatan, GetAllLayananKesehatan } from "@/service/kesehatan";
import Loader from "@/components/ui/loader";
import ModalDelete from "../modal-delete";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LayananKesehatan() {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { data: dataLayananKesehatan, isLoading: isLoadingLayananKesehatan, refetch } = useQuery({
        queryKey: ['layanan-kesehatan'],
        queryFn: () => GetAllLayananKesehatan(),
    })

    const { mutate: deleteLayananKesehatan } = useMutation({
        mutationFn: (id: string) => DeleteLayananKesehatan(id),
        onSuccess: () => {
            setIsLoading(false)
            setIsOpen(false)
            toast.success('Layanan Kesehatan Berhasil Dihapus', {
                theme: "colored"
            })
            setIsOpen(false)
            refetch()
        },
        onError: () => {
            setIsLoading(false)
            toast.error("Hapus Layanan Kesehatan Gagal", {
                theme: "colored"
            })
        }
    })

    if (isLoadingLayananKesehatan) return <Loader />

    return (
        <div className="px-4 py-6">
            <div className="flex justify-end my-4">
                <ModalLayananKesehatan refetch={refetch} task="add" />
            </div>

            <div className="grid grid-cols-1 gap-6">
                {dataLayananKesehatan?.data ? (
                    dataLayananKesehatan?.data.map((layanan: any) => (
                        <div
                            key={layanan.id}
                            className="bg-gradient-to-r from-white to-green-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            {layanan.jenis_program}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-800">{layanan.nama_program}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">{layanan.deskripsi}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex items-center text-gray-700">
                                            <Building2 className="w-5 h-5 text-green-600 mr-2" />
                                            <span className="text-sm">{layanan.fasilitas}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <Clock className="w-5 h-5 text-green-600 mr-2" />
                                            <span className="text-sm">{layanan.jadwal}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <ModalLayananKesehatan refetch={refetch} task="edit" id={layanan.id} />
                                    <Button className="bg-red-500 text-white hover:bg-red-800 cursor-pointer" onClick={() => setIsOpen(true)}>
                                        <Trash />
                                    </Button>
                                    <ModalDelete
                                        title="Layanan Kesehatan"
                                        onDelete={() => deleteLayananKesehatan(layanan.id)}
                                        isLoading={isLoading}
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        setIsLoading={setIsLoading}
                                    />
                                </div>
                            </div>
                        </div>
                    ))

                ) : (
                    <>Data Tidak Tersedia</>
                )}
            </div>
        </div>
    )
}
