'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PostDemografis, PostInfoUmum, PutDemografis } from '@/service/profil';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';

const schema = z.object({
    profilDesaId: z.string().min(1, "ProfilDesa wajib"),
    balita: z.string().max(50).optional(),
    anak: z.string().max(50).optional(),
    dewasa: z.string().max(50).optional(),
    lansia: z.string().max(50).optional(),
    pertanian: z.string().max(50).optional(),
    perdagangan: z.string().max(50).optional(),
    jasa: z.string().max(50).optional(),
    industri: z.string().max(50).optional(),
    sekolah: z.string().max(50).optional(),
    puskesmas: z.string().max(50).optional(),
    masjid: z.string().max(50).optional(),
    pasar_tradisional: z.string().max(50).optional(),
    pos_keamanan: z.string().max(50).optional(),
    balai_desa: z.string().max(50).optional(),
});
type FormFields = z.infer<typeof schema>;

export default function Demografis() {

    const [isLoading, setIsLoading] = useState(false)
    const [mode, setMode] = useState<'submit' | 'edit'>('submit')


    const [komposisiPenduduk, setKomposisiPenduduk] = useState([
        { kategori: 'Balita', jumlah: 0 },
        { kategori: 'Anak-anak', jumlah: 0 },
        { kategori: 'Dewasa', jumlah: 0 },
        { kategori: 'Lansia', jumlah: 0 }
    ]);

    const [mataPencaharian, setMataPencaharian] = useState([
        { jenis: 'Pertanian', persentase: 0 },
        { jenis: 'Perdagangan', persentase: 0 },
        { jenis: 'Jasa', persentase: 0 },
        { jenis: 'Industri Kecil', persentase: 0 }
    ]);

    const [fasilitasUmum, setFasilitasUmum] = useState([
        { jenis: 'Sekolah', jumlah: 0 },
        { jenis: 'Puskesmas', jumlah: 0 },
        { jenis: 'Masjid', jumlah: 0 },
        { jenis: 'Pasar Tradisional', jumlah: 0 },
        { jenis: 'Pos Keamanan', jumlah: 0 },
        { jenis: 'Balai Desa', jumlah: 0 }
    ]);

    const {register, handleSubmit, formState: { errors }} = useForm<FormFields>({
        resolver: zodResolver(schema),
    })

    const { mutate: postDemografis } = useMutation({
        mutationFn: (data: FormFields) => PostDemografis(data),
        onSuccess: () => {
            setIsLoading(false)
            toast.success('Informasi Demografis Berhasil diubah', {
                theme: "colored"
            })
        },
        onError: () => {
            setIsLoading(false)
            toast.error('Informasi Demografis Gagal diubah', {
                theme: "colored"
            })
        }
    })
    const { mutate: changeDemografis } = useMutation({
        mutationFn: (data: FormFields) => PutDemografis(data),
        onSuccess: () => {
            setIsLoading(false)
            toast.success('Informasi Demografis Berhasil diubah', {
                theme: "colored"
            })
        },
        onError: () => {
            setIsLoading(false)
            toast.error('Informasi Demografis Gagal diubah', {
                theme: "colored"
            })
        }
    })

    function onSubmit(data: FormFields) {
        setIsLoading(true)
        { mode === 'edit' ? changeDemografis(data) : postDemografis(data) }
    }


    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Demografis</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Komposisi Penduduk</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {komposisiPenduduk.map((komposisi, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <Label className="block text-sm font-medium text-gray-700 mb-2">{komposisi.kategori}</Label>
                                <Input
                                    type="number"
                                    value={komposisi.jumlah}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Jumlah"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Mata Pencaharian</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {mataPencaharian.map((mata, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <Label className="block text-sm font-medium text-gray-700 mb-2">{mata.jenis}</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={mata.persentase}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Persentase (%)"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Fasilitas Umum</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {fasilitasUmum.map((fasilitas, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <Label className="block text-sm font-medium text-gray-700 mb-2">{fasilitas.jenis}</Label>
                                <Input
                                    type="number"
                                    value={fasilitas.jumlah}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Jumlah"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    )
}
