'use client'

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import z from 'zod';
import { toast } from 'react-toastify';
import { useForm, } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import Loader from '@/components/ui/loader';
import { GetInfoUmum, PostInfoUmum, PutInfoUmum } from '@/service/profile-village';

const schema = z.object({
  alamat: z.string(),
  kecamatan: z.string(),
  kabupaten: z.string(),
  provinsi: z.string(),
  kode_pos: z.string(),
  jumlah_penduduk: z.string().min(1),
  jumlah_laki: z.string().min(1),
  jumlah_perempuan: z.string().min(1),
  jumlah_kk: z.string().min(1),
  tahun_pembentukan: z.string().min(1),
  telepon: z.string(),
  email: z.email(),
})
type FormFields = z.infer<typeof schema>

export default function InfoUmum() {

  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<'submit' | 'edit'>('submit')


  const { data: dataInfoUmum, isLoading: isLoadingInfoUmum, refetch } = useQuery({
    queryFn: () => GetInfoUmum(),
    queryKey: ['info-umum'],
  })

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (dataInfoUmum?.data) {
      setMode('edit')
      setValue('alamat', dataInfoUmum.data.alamat || '')
      setValue('kecamatan', dataInfoUmum.data.kecamatan || '')
      setValue('kabupaten', dataInfoUmum.data.kabupaten || '')
      setValue('provinsi', dataInfoUmum.data.provinsi || '')
      setValue('kode_pos', dataInfoUmum.data.kode_pos || '')
      setValue('jumlah_penduduk', dataInfoUmum.data.jumlah_penduduk?.toString() || '')
      setValue('jumlah_laki', dataInfoUmum.data.jumlah_laki?.toString() || '')
      setValue('jumlah_perempuan', dataInfoUmum.data.jumlah_perempuan?.toString() || '')
      setValue('jumlah_kk', dataInfoUmum.data.jumlah_kk?.toString() || '')
      setValue('tahun_pembentukan', dataInfoUmum.data.tahun_pembentukan?.toString() || '')
      setValue('telepon', dataInfoUmum.data.telepon || '')
      setValue('email', dataInfoUmum.data.email || '')
    }
  }, [dataInfoUmum, setValue])

  const { mutate: postInfo } = useMutation({
    mutationFn: (data: FormFields) => PostInfoUmum(data),
    onSuccess: () => {
      setIsLoading(false)
      toast.success('Informasi Umum Berhasil diubah', {
        theme: "colored"
      })
      refetch()
    },
    onError: () => {
      setIsLoading(false)
      toast.error('Informasi Umum Gagal diubah', {
        theme: "colored"
      })
    }
  })

  const { mutate: updateInfo } = useMutation({
    mutationFn: (data: FormFields) => PutInfoUmum(data),
    onSuccess: () => {
      setIsLoading(false)
      toast.success('Informasi Umum Berhasil diubah', {
        theme: "colored"
      })
      refetch()
    },
    onError: () => {
      setIsLoading(false)
      toast.error('Informasi Umum Gagal diubah', {
        theme: "colored"
      })
    }
  })

  function onSubmit(data: FormFields) {
    setIsLoading(true)
    if (mode === "edit") {
      updateInfo(data)
    }
    else {
      postInfo(data)
    }
  }

  if (isLoadingInfoUmum) return <Loader />
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Informasi Umum Desa</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-2">Alamat</Label>
          <Textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={3}
            placeholder="Masukkan alamat lengkap desa"
            {...register('alamat')}
          />
          {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan</Label>
            <Input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Nama kecamatan"
              {...register('kecamatan')}
            />
            {errors.kecamatan && <p className="text-red-500 text-sm mt-1">{errors.kecamatan.message}</p>}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Kabupaten</Label>
            <Input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
              placeholder="Nama kabupaten"
              {...register('kabupaten')}
            />
            {errors.kabupaten && <p className="text-red-500 text-sm mt-1">{errors.kabupaten.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Penduduk</Label>
            <Input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Masukkan jumlah penduduk"
              {...register('jumlah_penduduk')}
            />
            {errors.jumlah_penduduk && <p className="text-red-500 text-sm mt-1">{errors.jumlah_penduduk.message}</p>}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Jumlah KK</Label>
            <Input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Masukkan jumlah kartu keluarga"
              {...register('jumlah_kk')}
            />
            {errors.jumlah_kk && <p className="text-red-500 text-sm mt-1">{errors.jumlah_kk.message}</p>}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Laki-Laki</Label>
            <Input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
              placeholder="Masukkan jumlah laki-laki"
              {...register('jumlah_laki')}
            />
            {errors.jumlah_laki && <p className="text-red-500 text-sm mt-1">{errors.jumlah_laki.message}</p>}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Perempuan</Label>
            <Input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
              placeholder="Masukkan jumlah perempuan"
              {...register('jumlah_perempuan')}
            />
            {errors.jumlah_perempuan && <p className="text-red-500 text-sm mt-1">{errors.jumlah_perempuan.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</Label>
            <Input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
              placeholder="Nama provinsi"
              {...register('provinsi')}
            />
            {errors.provinsi && <p className="text-red-500 text-sm mt-1">{errors.provinsi.message}</p>}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</Label>
            <Input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
              placeholder="Kode pos"
              {...register('kode_pos')}
            />
            {errors.kode_pos && <p className="text-red-500 text-sm mt-1">{errors.kode_pos.message}</p>}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Tahun Pembentukan</Label>
            <Input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
              placeholder="Tahun pembentukan desa"
              {...register('tahun_pembentukan')}
            />
            {errors.tahun_pembentukan && <p className="text-red-500 text-sm mt-1">{errors.tahun_pembentukan.message}</p>}
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Telepon</Label>
            <Input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ringgreeb-500 focus:bordergreeb-500"
              placeholder="Nomor telepon"
              {...register('telepon')}
            />
            {errors.telepon && <p className="text-red-500 text-sm mt-1">{errors.telepon.message}</p>}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Email</Label>
            <Input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email resmi desa"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>
      </div>



      <div className='flex justify-end'>
        <Button className='cursor-pointer' type='submit' disabled={isLoading}>
          {isLoading ? <span className='loader' /> : (
            <>
              {mode === 'edit' ? (
                <><Save className='h-4 w-4 mr-2' /> Simpan Perubahan</>
              ) : 'Submit'}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
