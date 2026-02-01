'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { selectKategori } from "@/lib/items";
import { generateSlug } from "@/lib/utils";
import { GetBeritaByID, PostBerita, PutBerita } from "@/service/news";
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
    title: z.string().min(1, { message: "Judul berita harus diisi" }),
    category: z.string().min(1, { message: "Kategori berita harus diisi" }),
    content: z.string().min(1, { message: "Isi berita harus diisi" }),
    writer: z.string().min(1, { message: "Penulis berita harus diisi" }),
    date: z.string().min(1, { message: "Tanggal berita harus diisi" }),
    status: z.string().min(1, { message: "Status berita harus diisi" }),
    image: z.any().optional(),
    slug: z.string().optional(),
})
type FormFields = z.infer<typeof schema>;


export default function ModalBerita({ refetch, task, id }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);


    const { data: dataBerita } = useQuery({
        queryFn: () => GetBeritaByID(id || ""),
        queryKey: ['beritaByID', id],
        enabled: task === "edit" && !!id,
    })


    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm<FormFields>({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (dataBerita?.data) {
            const data = dataBerita.data;
            setValue('title', data.title || '');
            setValue('category', data.category || '');
            setValue('content', data.content || '');
            setValue('writer', data.writer || '');
            setValue('date', data.date || '');
            setValue('status', data.status || '');
            setValue('slug', data.slug || '');
            setValue('image', data.image || '');
            setPreviewImage(data.image || '');
        }
    }, [dataBerita, setValue])


    const { mutate: addBerita } = useMutation({
        mutationFn: (data: FormFields) => PostBerita(data),
        onSuccess: () => {
            setIsOpen(false);
            setIsLoading(false);
            toast.success("Berita berhasil ditambahkan");
            refetch();
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan, silahkan coba lagi");
        }
    })
    const { mutate: editBerita } = useMutation({
        mutationFn: (data: FormFields) => PutBerita(data, id || ""),
        onSuccess: () => {
            setIsOpen(false);
            setIsLoading(false);
            toast.success("Berita berhasil diubah");
            refetch();
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan, silahkan coba lagi");
        }
    })

    async function onSubmit(data: FormFields) {
        setIsLoading(true);

        let imageUrl = dataBerita?.data?.image || ""; // Simpan URL lama sebagai default

        // Cek apakah ada file BARU yang diunggah.
        // data.image akan berupa FileList jika user memilih file baru.
        if (data.image instanceof FileList && data.image.length > 0) {
            imageUrl = await uploadToCloudinary(data.image[0]);
        }

        const rawData = {
            ...data,
            image: imageUrl, // Gunakan imageUrl yang sudah diproses
            slug: generateSlug(data.title),
        };

        if (task === "edit" && id) {
            editBerita(rawData);
        } else {
            addBerita(rawData);
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {task === "add" ? (
                    <Button className="bg-primary cursor-pointer">
                        <Plus />Tambah Berita
                    </Button>
                ) : task === "edit" ? (
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
                        {task === "add" ? "Tambah Berita" : task === "edit" ? "Edit Berita" : "Detail Berita"}
                    </DialogTitle>
                    <DialogDescription>
                        {task === "add" ? "Isi form berikut untuk menambahkan berita baru." : task === "edit" ? "Ubah informasi berita sesuai kebutuhan." : "Lihat detail lengkap berita di sini."}
                    </DialogDescription>
                </DialogHeader>


                {task === "detail" ? (
                    <div className="p-6 space-y-6">
                        {/* Header with Image */}
                        {dataBerita?.data?.image && (
                            <div className="relative w-full h-64 rounded-lg overflow-hidden">
                                <Image
                                    src={dataBerita.data.image}
                                    alt={dataBerita.data.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* Title */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {dataBerita?.data?.title}
                            </h2>
                        </div>

                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Kategori:</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                                    {dataBerita?.data?.category}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Status:</span>
                                <span className={`px-3 py-1 rounded-full ${dataBerita?.data?.status === 'published'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {dataBerita?.data?.status === 'published' ? 'Published' : 'Draft'}
                                </span>
                            </div>
                        </div>

                        {/* Writer and Date */}
                        <div className="flex flex-wrap gap-4 text-sm border-t border-b border-gray-200 py-3">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-700">Penulis:</span>
                                <span className="text-gray-600">{dataBerita?.data?.writer}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-700">Tanggal:</span>
                                <span className="text-gray-600">
                                    {dataBerita?.data?.date ?
                                        new Date(dataBerita.data.date).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        }) : '-'}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Konten Berita</h3>
                            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                                {dataBerita?.data?.content}
                            </div>
                        </div>
                        {/* Close Button */}
                        <div className="flex justify-end pt-4">
                            <Button
                                onClick={() => setIsOpen(false)}
                                variant="outline"
                                className="px-6 hover:bg-gray-100 cursor-pointer"
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                ) : (

                    <form className="p-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita *</Label>
                            <Input
                                type="text"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Masukkan judul berita yang menarik"
                                {...register("title")}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>

                        <div className="flex items-center">
                            <div className="w-1/2">
                                <Label className="block text-sm font-bold text-gray-700 mb-2">Kategori *</Label>
                                <Select onValueChange={(value) => setValue("category", value)} value={watch("category")} >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        {selectKategori.map((item) => (

                                            <SelectItem value={item.value} key={item.value} className="hover:bg-primary cursor-pointer hover:text-white">
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}

                            </div>

                            <div className="w-1/2 ml-4">
                                <Label className="block text-sm font-bold text-gray-700 mb-2">Status *</Label>
                                <Select onValueChange={(value) => setValue("status", value)} value={watch("status")}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectItem value="draft" className="hover:bg-primary cursor-pointer hover:text-white">Draft</SelectItem>
                                        <SelectItem value="published" className="hover:bg-primary cursor-pointer hover:text-white">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="block text-sm font-bold text-gray-700 mb-2">Penulis *</Label>
                                <Input
                                    type="text"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Nama penulis"
                                    {...register("writer")}
                                />
                                {errors.writer && <p className="text-red-500 text-sm mt-1">{errors.writer.message}</p>}
                            </div>

                            <div>
                                <Label className="block text-sm font-bold text-gray-700 mb-2">Tanggal *</Label>
                                <Input
                                    type="date"
                                    {...register("date")}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                            </div>
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
                                            setValue("image", e.target.files);
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
                                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message as string}</p>}
                            </div>
                        </div>

                        <div>
                            <Label className="block text-sm font-bold text-gray-700 mb-2" >Konten Berita *</Label>
                            <Textarea placeholder="Masukkan konten berita" {...register("content")} />
                            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
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

                )}

            </DialogContent>
        </Dialog>
    )
}
