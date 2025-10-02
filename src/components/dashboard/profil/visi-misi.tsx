'use client'

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Loader from '@/components/ui/loader';
import { Textarea } from '@/components/ui/textarea';
import { GetInfoUmum, GetVisiMisi, PostVisiMisi, PutVisiMisi } from '@/service/profil';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';


const schema = z.object({
    profil_desa_id: z.number().min(1, { message: "ID Profil Desa harus diisi" }),
    visi: z.string().min(10, { message: "Visi harus diisi minimal 10 karakter" }),
    misi: z.string().min(10, { message: "Visi harus diisi minimal 10 karakter" })
})
type FormFields = z.infer<typeof schema>;

export default function VisiMisi() {
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<'create' | 'edit'>('create');


    const { data: dataInfoUmum, isLoading: isLoadingInfoUmum } = useQuery({
        queryFn: () => GetInfoUmum(),
        queryKey: ['info-umum'],
    })
    const { data: dataVisiMisi, isLoading: isLoadingVisiMisi, refetch } = useQuery({
        queryFn: () => GetVisiMisi(),
        queryKey: ['visi-misi'],
    })

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (dataInfoUmum?.data?.id) {
            setValue('profil_desa_id', Number(dataInfoUmum.data.id));
        }
        if (dataVisiMisi?.data) {
            const visiMisi = dataVisiMisi.data;
            setMode('edit')
            setValue('profil_desa_id', Number(visiMisi.profil_desa_id));
            setValue('visi', visiMisi.visi);
            setValue('misi', visiMisi.misi);
        }
    }, [dataInfoUmum, setValue, dataVisiMisi]);

    const { mutate: postVisiMisi } = useMutation({
        mutationFn: (data: FormFields) => PostVisiMisi(data),
        onSuccess: () => {
            setIsLoading(false);
            toast.success("Data visi misi desa berhasil disimpan");

        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan saat menyimpan data visi misi desa");
        }
    })
    const { mutate: putVisiMisi } = useMutation({
        mutationFn: (data: FormFields) => PutVisiMisi(data),
        onSuccess: () => {
            setIsLoading(false);
            toast.success("Data visi misi desa berhasil disimpan");
            refetch();
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan saat menyimpan data visi misi desa");
        }
    })


    function onSubmit(data: FormFields) {
        setIsLoading(true);
        { mode === 'edit' ? putVisiMisi(data) : postVisiMisi(data) }
    }


    if (isLoadingInfoUmum || isLoadingVisiMisi) return <Loader />

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Visi dan Misi</h3>
            <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Visi</Label>
                <Textarea
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder="Tuliskan visi desa..."
                    {...register("visi")}
                />
                {errors.visi && <p className="text-sm text-red-600 mt-1">{errors.visi.message}</p>}
            </div>

            <div>
                <Label className="block text-sm font-medium text-gray-700">Misi</Label>
                <Textarea
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder="Tuliskan misi desa..."
                    {...register("misi")}
                />
                {errors.misi && <p className="text-sm text-red-600 mt-1">{errors.misi.message}</p>}
            </div>
            <div className="flex justify-end">
                <Button className='cursor-pointer' type='submit' disabled={isLoading}>
                    {isLoading ? <span className="loader" /> : (
                        <>
                            {mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Data'}
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}
