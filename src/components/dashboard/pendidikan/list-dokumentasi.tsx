'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, FileText, Trash2 } from 'lucide-react'
import React from 'react'
import ModalDokumentasiPendidikan from './modal-dokumentasi-pendidikan'
import { GetDokumentasiPendidikan } from '@/service/education'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/components/ui/loader'

export default function ListDokumentasi() {

      const { data: dataDokumentasiPendidikan, isLoading: isLoadingDokumentasiPendidikan, refetch } = useQuery({
    queryFn: () => GetDokumentasiPendidikan(),
    queryKey: ["dataDokumentasiPendidikan"]
  })


  if (isLoadingDokumentasiPendidikan) return <Loader />
    return (
        <Card className="shadow-lg border-0">
            <CardHeader className="bg-primary py-4 text-white rounded-t-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Dokumentasi Pendidikan</CardTitle>
                        <CardDescription className="text-emerald-50">Dokumentasi pendidikan di Desa Karang Waru</CardDescription>
                    </div>
                    <ModalDokumentasiPendidikan refetch={refetch} task="add" />
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataDokumentasiPendidikan?.data.map((doc : any, idx : number) => (
                        <div key={idx} className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                            <div className="flex items-start gap-3">
                                <div className="p-3 bg-emerald-100 rounded-lg">
                                    <FileText className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800">{doc.judul}</h4>
                                    <p className="text-sm text-gray-500 mt-1">Tahun: {doc.tahun}</p>
                                    <Badge variant="outline" className="mt-2 border-emerald-500 text-emerald-700">
                                        {doc.type}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Button size="sm" className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                                    <Eye className="w-4 h-4 mr-1" />
                                    Lihat
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

    )
}
