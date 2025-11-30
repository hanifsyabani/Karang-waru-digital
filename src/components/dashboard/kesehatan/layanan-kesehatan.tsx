'use client';

import { Building2, Clock, Edit2, Trash2 } from "lucide-react";
import ModalLayananKesehatan from "./modal-layanan-kesehatan";
import { useQuery } from "@tanstack/react-query";
import { GetAllLayananKesehatan } from "@/service/kesehatan";
import Loader from "@/components/ui/loader";

export default function LayananKesehatan() {

    const { data: dataLayananKesehatan, isLoading: isLoadingLayananKesehatan, refetch } = useQuery({
        queryKey: ['layanan-kesehatan'],
        queryFn: () => GetAllLayananKesehatan(),
    })

    if (isLoadingLayananKesehatan) return <Loader />

    return (
        <div className="px-4">
            <div className="flex justify-end">
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
                                            {layanan.jenisProgram}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-800">{layanan.namaProgram}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">{layanan.deskripsi}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex items-center text-gray-700">
                                            <Building2 className="w-5 h-5 text-green-600 mr-2" />
                                            <span className="text-sm">{layanan.namaFasilitas}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <Clock className="w-5 h-5 text-green-600 mr-2" />
                                            <span className="text-sm">{layanan.jadwal}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button
                                        className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
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
