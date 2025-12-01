'use client'

import { Clock, Edit2, MapPin, Phone, Trash2 } from 'lucide-react'
import ModalFasilitasKesehatan from './modal-fasilitas-kesehatan';
import { useQuery } from '@tanstack/react-query';
import { GetAllFasilitasKesehatan } from '@/service/kesehatan';
import Loader from '@/components/ui/loader';

export default function FasilitasKesehatan() {

    const { data: dataFasilitasKesehatan, isLoading: isLoadingFasilitasKesehatan, refetch } = useQuery({
        queryKey: ['fasilitas-kesehatan'],
        queryFn: () => GetAllFasilitasKesehatan(),
    })

    if (isLoadingFasilitasKesehatan) return <Loader />

    return (
        <div className='px-4 py-3'>
            <div className="flex justify-end my-4">
                <ModalFasilitasKesehatan refetch={refetch} task="add" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dataFasilitasKesehatan?.data ? (
                    dataFasilitasKesehatan?.data.map((fasilitas : any) => (
                        <div
                            key={fasilitas.id}
                            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        {fasilitas.jenis}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-800 mt-2">{fasilitas.namaFasilitas}</h3>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start text-gray-700">
                                    <MapPin className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{fasilitas.alamat}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Phone className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-sm">{fasilitas.no_telepon}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Clock className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-sm">{fasilitas.jam_operasional}</span>
                                </div>
                                <div className="pt-3 border-t border-gray-200">
                                    <p className="text-sm text-gray-500">Penanggung Jawab:</p>
                                    <p className="text-sm font-semibold text-gray-800">{fasilitas.penanggung_jawab}</p>
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
