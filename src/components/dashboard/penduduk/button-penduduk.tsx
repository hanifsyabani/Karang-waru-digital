'use client'

import { Download } from "lucide-react";
import ModalPenduduk from "./modal-penduduk";
import { GetAllPenduduk } from "@/service/penduduk";
import { useQuery } from "@tanstack/react-query";

export default function ButtonPenduduk() {
    const { data: dataPenduduk, isLoading: isLoadingPenduduk, refetch } = useQuery({
        queryFn: () => GetAllPenduduk(),
        queryKey: ['penduduk'],
    })

    void dataPenduduk; 

    if (isLoadingPenduduk) return <div className="loader" />

    return (
        <div className="flex items-center gap-3">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
            </button>
            <ModalPenduduk task='add' refetch={refetch} />
        </div>
    )
}
