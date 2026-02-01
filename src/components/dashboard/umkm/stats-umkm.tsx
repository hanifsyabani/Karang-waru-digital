'use client'


import Loader from '@/components/ui/loader'
import { GetAllUmkm, GetCountStatus } from '@/service/umkm'
import { useQuery } from '@tanstack/react-query'
import { Check, Eye, Filter } from 'lucide-react'

export default function StatsUmkm() {

    const { data: dataCountStatus, isLoading: isLoadingCountStatus } = useQuery({
        queryFn: () => GetCountStatus(),
        queryKey: ['countStatus']
    })

    const total = dataCountStatus ? dataCountStatus.data.verified + dataCountStatus.data.unverified : 0

    if (isLoadingCountStatus) return <Loader />
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-blue-100 text-sm font-medium">Total UMKM</h3>
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Eye size={20} />
                    </div>
                </div>
                <p className="text-4xl font-bold mb-1">{total}</p>
                <p className="text-blue-100 text-sm">Terdaftar di sistem</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-green-100 text-sm font-medium">Terverifikasi</h3>
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Check size={20} />
                    </div>
                </div>
                <p className="text-4xl font-bold mb-1">
                    {dataCountStatus ? dataCountStatus.data.verified : 0}
                </p>
                <p className="text-green-100 text-sm">UMKM aktif</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-orange-100 text-sm font-medium">Menunggu Verifikasi</h3>
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Filter size={20} />
                    </div>
                </div>
                <p className="text-4xl font-bold mb-1">
                    {dataCountStatus ? dataCountStatus.data.unverified : 0}
                </p>
                <p className="text-orange-100 text-sm">Perlu ditinjau</p>
            </div>
        </div>
    )
}
