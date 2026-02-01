'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { kategoriumkm } from "@/lib/items";
import { generateSlug } from "@/lib/utils";
import { GetUmkmByID, PostUmkm, PutUmkm } from "@/service/umkm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eye, FileText, Pen, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

interface ModalProps {
    refetch: () => void
    task: string
    id?: string
}


const schema = z.object({
    nama_usaha: z.string().min(1, { message: "Nama usaha harus diisi" }),
    kategori: z.string().min(1, { message: "Kategori berita harus diisi" }),
    deskripsi: z.string().min(1, { message: "Deskripsi harus diisi" }),
    gambar: z.any().optional(),
    pemilik: z.string().min(1, { message: "Pemilik harus diisi" }),
    status: z.string().min(1, { message: "Status harus diisi" }),
    slug: z.string().optional(),
})
type FormFields = z.infer<typeof schema>;


export default function ModalUmkm({ refetch, task, id }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);


    const { data: dataUmkm } = useQuery({
        queryFn: () => GetUmkmByID(id || ""),
        queryKey: ['umkmByID', id],
        enabled: task === "edit" && !!id,
    })


    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm<FormFields>({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (dataUmkm?.data) {
            const data = dataUmkm.data;
            setValue('nama_usaha', data.nama_usaha || '');
            setValue('kategori', data.kategori || '');
            setValue('deskripsi', data.deskripsi || '');
            setValue('pemilik', data.pemilik || '');
            setValue('status', data.status || '');
            setValue('slug', data.slug || '');
            setValue('gambar', data.gambar || '');
            setPreviewImage(data.gambar || '');
        }
    }, [dataUmkm, setValue])


    const { mutate: addUmkm } = useMutation({
        mutationFn: (data: FormFields) => PostUmkm(data),
        onSuccess: () => {
            setIsOpen(false);
            setIsLoading(false);
            toast.success("Umkm berhasil ditambahkan");
            refetch();
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan, silahkan coba lagi");
        }
    })
    const { mutate: editUmkm } = useMutation({
        mutationFn: (data: FormFields) => PutUmkm(data, id || ""),
        onSuccess: () => {
            setIsOpen(false);
            setIsLoading(false);
            toast.success("Umkm berhasil diubah");
            refetch();
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan, silahkan coba lagi");
        }
    })

    async function onSubmit(data: FormFields) {
        setIsLoading(true);

        let imageUrl = dataUmkm?.data?.gambar || "";

        // Cek apakah ada file BARU yang diunggah.
        // data.image akan berupa FileList jika user memilih file baru.
        if (data.gambar instanceof FileList && data.gambar.length > 0) {
            imageUrl = await uploadToCloudinary(data.gambar[0]);
        }

        const rawData = {
            ...data,
            gambar: imageUrl,
            slug: generateSlug(data.nama_usaha),
        };

        if (task === "edit" && id) {
            editUmkm(rawData);
        } else {
            addUmkm(rawData);
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {task === "add" ? (
                    <Button className="bg-primary cursor-pointer">
                        <Plus />Tambah Umkm
                    </Button>
                ) : (task === "edit") ? (
                    <Button className="bg-green-500 text-white hover:bg-green-800 cursor-pointer">
                        <Pen />
                    </Button>
                ) : (
                    <Button className="bg-yellow-500 text-white hover:bg-yellow-800 cursor-pointer">
                        <Eye />
                    </Button>

                )}
            </DialogTrigger>
            <DialogContent className="max-w-5xl overflow-y-auto max-h-[90vh] ">
                <DialogHeader>
                    <DialogTitle>
                        {task === "add" ? "Tambah Umkm" : task === "detail" ? "Detail Umkm" : "Ubah Umkm"}
                    </DialogTitle>
                    <DialogDescription>
                        {task === "add" ? "Isi form berikut untuk menambahkan umkm baru." : task === "detail" ? "Lihat detail lengkap umkm berikut." : "Ubah informasi umkm pada form berikut."}
                    </DialogDescription>
                </DialogHeader>
                {task !== "detail" ? (
                    <form className="p-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label className="block text-sm font-bold text-gray-700 mb-2">Judul Umkm *</Label>
                            <Input
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Masukkan nama usaha"
                                {...register("nama_usaha")}
                            />
                            {errors.nama_usaha && <p className="text-red-500 text-sm mt-1">{errors.nama_usaha.message}</p>}
                        </div>

                        <div className="flex items-center">
                            <div className="w-1/2">
                                <Label className="block text-sm font-bold text-gray-700 mb-2">Kategori *</Label>
                                <Select onValueChange={(value) => setValue("kategori", value)} value={watch("kategori")} >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        {kategoriumkm.map((item) => (
                                            <SelectItem value={item.value} key={item.value} className="hover:bg-primary cursor-pointer hover:text-white">
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.kategori && <p className="text-red-500 text-sm mt-1">{errors.kategori.message}</p>}

                            </div>

                            <div className="w-1/2 ml-4">
                                <Label className="block text-sm font-bold text-gray-700 mb-2">Status *</Label>
                                <Select onValueChange={(value) => setValue("status", value)} value={watch("status")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectItem value="unverified" className="hover:bg-primary cursor-pointer hover:text-white">Unverified</SelectItem>
                                        <SelectItem value="verified" className="hover:bg-primary cursor-pointer hover:text-white">Verified</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label className="block text-sm font-bold text-gray-700 mb-2">Pemilik *</Label>
                            <Input
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Nama pemilik usaha"
                                {...register("pemilik")}
                            />
                            {errors.pemilik && <p className="text-red-500 text-sm mt-1">{errors.pemilik.message}</p>}
                        </div>

                        <div>
                            <Label className="block text-sm font-bold text-gray-700 mb-2">Gambar</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                                <Input
                                    type="file"
                                    className="hidden"
                                    id="image-upload"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setPreviewImage(URL.createObjectURL(file));
                                            setValue("gambar", e.target.files);
                                        }
                                    }}
                                    accept="image/*"
                                />
                                <Label htmlFor="image-upload" className="cursor-pointer">
                                    <div className="text-gray-500 mx-auto">
                                        <FileText size={40} className="mx-auto mb-2 text-gray-400" />
                                        <p className="font-semibold">Klik untuk upload gambar</p>
                                        <p className="text-sm">PNG, JPG atau JPEG (Max. 5MB)</p>
                                    </div>
                                </Label>

                                {previewImage && (
                                    <div className="mt-4">
                                        <Image
                                            src={previewImage}
                                            alt="Preview"
                                            className="mx-auto max-h-64 rounded-lg shadow-md"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                )}
                                {errors.gambar && <p className="text-red-500 text-sm mt-1">{errors.gambar.message as string}</p>}
                            </div>
                        </div>

                        <div>
                            <Label className="block text-sm font-bold text-gray-700 mb-2" >Konten Umkm *</Label>
                            <Textarea placeholder="Masukkan deskripsi umkm" {...register("deskripsi")} />
                            {errors.deskripsi && <p className="text-red-500 text-sm mt-1">{errors.deskripsi.message}</p>}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                variant={"outline"}
                                className="flex-1"
                            >
                                Batal
                            </Button>
                            <Button
                                className="flex-1 cursor-pointer"
                                disabled={isLoading}
                            >
                                {isLoading ? <span className="loader" /> : "Simpan"}
                            </Button>
                        </div>
                    </form>

                ) : (
                    <div className="p-6 space-y-6">
                        {/* Header dengan Gambar */}
                        {dataUmkm?.data?.gambar && (
                            <div className="w-full h-64 relative rounded-xl overflow-hidden mb-6">
                                <Image
                                    src={dataUmkm.data.gambar}
                                    alt={dataUmkm.data.nama_usaha}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* Informasi Utama */}
                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-semibold text-gray-500">Nama Usaha</Label>
                                <p className="text-lg font-bold text-gray-900 mt-1">
                                    {dataUmkm?.data?.nama_usaha || '-'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-semibold text-gray-500">Kategori</Label>
                                    <p className="text-base text-gray-900 mt-1">
                                        {kategoriumkm.find(k => k.value === dataUmkm?.data?.kategori)?.label || dataUmkm?.data?.kategori || '-'}
                                    </p>
                                </div>

                                <div>
                                    <Label className="text-sm font-semibold text-gray-500">Status</Label>
                                    <div className="mt-1">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${dataUmkm?.data?.status === 'verified'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {dataUmkm?.data?.status === 'verified' ? 'Verified' : 'Unverified'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-gray-500">Pemilik</Label>
                                <p className="text-base text-gray-900 mt-1">
                                    {dataUmkm?.data?.pemilik || '-'}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-semibold text-gray-500">Deskripsi</Label>
                                <div className="text-base text-gray-700 mt-2 leading-relaxed whitespace-pre-wrap">
                                    {dataUmkm?.data?.deskripsi || '-'}
                                </div>
                            </div>
                        </div>

                        {/* Tombol Close */}
                        <div className="pt-4 border-t">
                            <Button
                                onClick={() => setIsOpen(false)}
                                variant="outline"
                                className="w-full"
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                )}

            </DialogContent>
        </Dialog>
    )
}
