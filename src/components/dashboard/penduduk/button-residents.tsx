'use client'

import { Download } from "lucide-react";
import ModalPenduduk from "./modal-residents";
import { useQueryClient } from "@tanstack/react-query";

export default function ButtonResidents() {
    const queryClient = useQueryClient()
    return (
        <div className="flex items-center gap-3">
            <div className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
            </div>
            <ModalPenduduk task='add' refetch={() => {
                queryClient.invalidateQueries({queryKey: ['penduduk']})
            }} />
        </div>
    )
}
