'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { kategoriLayanan } from "@/lib/items";
import { generateSlug } from "@/lib/utils";
import { GetLayananByID, PostLayanan, PutLayanan } from "@/service/layanan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FileText, Pen, Plus } from "lucide-react";
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
    service_name: z.string().min(1, { message: "Nama layanan harus diisi" }),
    description: z.string().min(1, { message: "Deskripsi layanan harus diisi" }),
    category: z.string().min(1, { message: "Kategori layanan harus diisi" }),
    estimated_time: z.string().min(1, { message: "Estimasi waktu layanan harus diisi" }),
    cost: z.string().min(1, { message: "Biaya layanan harus diisi" }),
    status: z.string().min(1, { message: "Status berita harus diisi" }),
    image: z.any().optional(),
    slug: z.string().optional(),
})
type FormFields = z.infer<typeof schema>;


export default function ModalLayanan({ refetch, task, id }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);


    const { data: dataLayanan } = useQuery({
        queryFn: () => GetLayananByID(id || ""),
        queryKey: ['layananByID', id],
        enabled: task === "edit" && !!id,
    })


    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm<FormFields>({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (dataLayanan?.data) {
            const data = dataLayanan.data;

            setValue('status', data.status || '');
            setValue('slug', data.slug || '');
            setValue('image', data.image || '');
            setPreviewImage(data.image || '');
        }
    }, [dataLayanan, setValue])


    const { mutate: addLayanan } = useMutation({
        mutationFn: (data: FormFields) => PostLayanan(data),
        onSuccess: () => {
            setIsOpen(false);
            setIsLoading(false);
            toast.success("Layanan berhasil ditambahkan");
            refetch();
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan, silahkan coba lagi");
        }
    })
    const { mutate: editLayanan } = useMutation({
        mutationFn: (data: FormFields) => PutLayanan(data, id || ""),
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

        let imageUrl = dataLayanan?.data?.image || "";
        if (data.image instanceof FileList && data.image.length > 0) {
            imageUrl = await uploadToCloudinary(data.image[0]);
        }

        const rawData = {
            ...data,
            image: imageUrl,
            slug: generateSlug(data.service_name),
        };

        if (task === "edit" && id) {
            editLayanan(rawData);
        } else {
            addLayanan(rawData);
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {task === "add" ? (
                    <Button className="bg-primary cursor-pointer">
                        <Plus />Tambah Layanan
                    </Button>
                ) : (
                    <Button className="bg-green-500 text-white hover:bg-green-800 cursor-pointer">
                        <Pen />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-5xl overflow-y-auto max-h-[90vh] ">
                <DialogHeader>
                    <DialogTitle>
                        {task === "add" ? "Tambah Berita" : "Ubah Berita"}
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>

                <form className="p-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-1">Nama Layanan</Label>
                        <Input type="text" {...register('service_name')} placeholder="Masukkan Nama Layanan" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</Label>
                        <Textarea rows={4} {...register('description')} placeholder="Masukkan Deskripsi Layanan" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div >
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Kategori</Label>
                            <Select onValueChange={(value) => setValue("category", value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kategoriLayanan.map((item) => (
                                        <SelectItem key={item.value} value={item.value} className="hover:bg-primary cursor-pointer hover:text-white">
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Status</Label>
                            <Select
                                onValueChange={(value) => setValue("status", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectItem value="draft" className="hover:bg-primary cursor-pointer hover:text-white">Draft</SelectItem>
                                    <SelectItem value="published" className="hover:bg-primary cursor-pointer hover:text-white">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Estimasi Waktu</Label>
                            <Input type="number" {...register('estimated_time')} placeholder="1-3 hari kerja" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Biaya</Label>
                            <Input type="number" {...register('cost')} placeholder="Gratis atau Rp 10.000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
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

            </DialogContent>
        </Dialog>
    )
}
