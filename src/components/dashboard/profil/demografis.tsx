'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Loader from '@/components/ui/loader';
import { GetDemografis, GetInfoUmum, PostDemografis, PostInfoUmum, PutDemografis } from '@/service/profil';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';

const schema = z.object({
    profil_desa_Id: z.number().min(1, { message: "ID Profil Desa harus diisi" }),
    balita: z.string().max(50),
    anak: z.string().max(50),
    dewasa: z.string().max(50),
    lansia: z.string().max(50),
    pertanian: z.string().max(50),
    perdagangan: z.string().max(50),
    jasa: z.string().max(50),
    industri: z.string().max(50),
    sekolah: z.string().max(50),
    puskesmas: z.string().max(50),
    masjid: z.string().max(50),
    pasar_tradisional: z.string().max(50),
    pos_keamanan: z.string().max(50),
    balai_desa: z.string().max(50),
});
type FormFields = z.infer<typeof schema>;
type FormFieldKeys = keyof FormFields;

export default function Demografis() {

    const [isLoading, setIsLoading] = useState(false)
    const [mode, setMode] = useState<'submit' | 'edit'>('submit')


    const [komposisiPenduduk, setKomposisiPenduduk] = useState<
        { key: FormFieldKeys; label: string; jumlah: number }[]
    >([
        { key: 'balita', label: 'Balita', jumlah: 0 },
        { key: 'anak', label: 'Anak-anak', jumlah: 0 },
        { key: 'dewasa', label: 'Dewasa', jumlah: 0 },
        { key: 'lansia', label: 'Lansia', jumlah: 0 }
    ]);



    const [mataPencaharian, setMataPencaharian] = useState<
        { key: FormFieldKeys; jenis: string; persentase: number }[]>([
            { key: 'pertanian', jenis: 'Pertanian', persentase: 0 },
            { key: 'perdagangan', jenis: 'Perdagangan', persentase: 0 },
            { key: 'jasa', jenis: 'Jasa', persentase: 0 },
            { key: 'industri', jenis: 'Industri Kecil', persentase: 0 }
        ]);

    const [fasilitasUmum, setFasilitasUmum] = useState<{
        key: FormFieldKeys; jenis: string; jumlah: number
    }[]>([
        { key: 'sekolah', jenis: 'Sekolah', jumlah: 0 },
        { key: 'puskesmas', jenis: 'Puskesmas', jumlah: 0 },
        { key: 'masjid', jenis: 'Masjid', jumlah: 0 },
        { key: 'pasar_tradisional', jenis: 'Pasar Tradisional', jumlah: 0 },
        { key: 'pos_keamanan', jenis: 'Pos Keamanan', jumlah: 0 },
        { key: 'balai_desa', jenis: 'Balai Desa', jumlah: 0 }
    ]);

    const { data: dataInfoUmum, isLoading: isLoadingInfoUmum } = useQuery({
        queryFn: () => GetInfoUmum(),
        queryKey: ['info-umum'],
    })

    const { data: dataDemografis, isLoading: isLoadingDemografis, refetch: refetchDemografis } = useQuery({
        queryKey: ['dataDemografis'],
        queryFn: () => GetDemografis()
    })

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema),

    })

    useEffect(() => {
        if (dataInfoUmum?.data?.id) {
            setValue('profil_desa_Id',Number(dataInfoUmum.data.id));
        }

        if (dataDemografis?.data) {
            const demografis = dataDemografis.data;
            setMode('edit')
            setValue('profil_desa_Id',Number(demografis.profil_desa_id));
            setValue('balita', demografis.balita);
            setValue('anak', demografis.anak);
            setValue('dewasa', demografis.dewasa);
            setValue('lansia', demografis.lansia);
            setValue('pertanian', demografis.pertanian);
            setValue('perdagangan', demografis.perdagangan);
            setValue('jasa', demografis.jasa);
            setValue('industri', demografis.industri);
            setValue('sekolah', demografis.sekolah);
            setValue('puskesmas', demografis.puskesmas);
            setValue('masjid', demografis.masjid);
            setValue('pasar_tradisional', demografis.pasar_tradisional);
            setValue('pos_keamanan', demografis.pos_keamanan);
            setValue('balai_desa', demografis.balai_desa);
        }
    }, [dataInfoUmum, setValue,dataDemografis]);

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
            refetchDemografis()
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
        if (mode === 'submit') {
            postDemografis(data)
        } else {
            changeDemografis(data)
        }
    }

    if (isLoadingDemografis || isLoadingInfoUmum) return <Loader />


    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Demografis</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Komposisi Penduduk</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {komposisiPenduduk.map((komposisi, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <Label className="block text-sm font-medium text-gray-700 mb-2">{komposisi.label}</Label>
                                <Input
                                    type="number"
                                    {...register(komposisi.key)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Jumlah"
                                />
                                {errors[komposisi.key] && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors[komposisi.key]?.message}
                                    </p>
                                )}
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
                                    step={0.01}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Persentase (%)"
                                    {...register(mata.key)}
                                />
                                {errors[mata.key] && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors[mata.key]?.message}
                                    </p>
                                )}
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
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Jumlah"
                                    {...register(fasilitas.key)}
                                />
                                {errors[fasilitas.key] && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors[fasilitas.key]?.message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex justify-end mt-6'>
                    <Button className='cursor-pointer' type='submit' disabled={isLoading}>
                        {isLoading ? <span className="loader" /> : (
                            <>
                                {mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Data'}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
