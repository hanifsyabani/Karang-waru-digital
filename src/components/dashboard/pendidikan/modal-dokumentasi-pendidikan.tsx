'use client'

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, FileText, Pen, Plus } from "lucide-react";
import { GetDokumentasiPendidikanByID,  PostDokumentasiPendidikan,  PutDokumentasiPendidikan } from "@/service/pendidikan";
import SectionTitle from "../section-title";
import Image from "next/image";
import { getYears } from "@/lib/utils";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface ModalProps {
    refetch: () => void
    task: "add" | "edit" | "detail"
    id?: string
}

export const schema = z.object({
    judul: z.string().min(1, { message: "Judul Harus diisi" }),
    keterangan: z.string().min(1, { message: "Keterangan Harus diisi" }),
    file_path: z.any().optional(),
    foto_kegiatan: z.any().optional(),
    tahun: z.string().min(1, { message: "Tahun Harus diisi" }),
});

type FormFields = z.infer<typeof schema>

export default function ModalDokumentasiPendidikan({ refetch, task, id }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [previewFile, setPreviewFile] = useState<string | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const titleMessage =
        task === "add"
            ? "Tambah Data Dokumentasi Pendidikan"
            : task === "detail"
                ? "Detail Data Dokumentasi Pendidikan"
                : "Ubah Data Dokumentasi Pendidikan";

    const { data: dataDokumentasiPendidikanByID } = useQuery({
        queryFn: () => GetDokumentasiPendidikanByID(id || ""),
        queryKey: ["PeidikanByID", id],
        enabled: !!id && (task === "edit" || task === "detail"),
    });

    const { handleSubmit, register, setValue, watch, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema) as any,
    });

    useEffect(() => {
        if (dataDokumentasiPendidikanByID?.data && (task === "edit" || task === "detail")) {
            const d = dataDokumentasiPendidikanByID.data;
            Object.entries(d).forEach(([key, value]) => {
                setValue(key as keyof FormFields, value as any);
            });
        }
    }, [dataDokumentasiPendidikanByID, setValue, task]);

    const { mutate: addDokumentasiPendidikan } = useMutation({
        mutationFn: (data: FormFields) => PostDokumentasiPendidikan(data),
        onSuccess: () => {
            toast.success("Data Dokumentasi Pendidikan berhasil ditambahkan");
            setIsOpen(false);
            setIsLoading(false);
            refetch();
        },
        onError: () => {
            toast.error("Gagal menambahkan data");
            setIsLoading(false);
        },
    });

    const { mutate: editDokumentasiPendidikan } = useMutation({
        mutationFn: (data: FormFields) => PutDokumentasiPendidikan(data, id || ""),
        onSuccess: () => {
            toast.success("Data Dokumentasi Pendidikan berhasil diperbarui");
            setIsOpen(false);
            setIsLoading(false);
            refetch();
        },
        onError: () => {
            toast.error("Gagal memperbarui data");
            setIsLoading(false);
        },
    });

    async function onSubmit(data: FormFields) {
        setIsLoading(true);

        let file_path = dataDokumentasiPendidikanByID?.data?.file_path || ""
        let foto_kegiatan = dataDokumentasiPendidikanByID?.data?.foto_kegiatan || ""
        if (data.file_path instanceof FileList && data.file_path.length > 0 ) {
            file_path = await uploadToCloudinary(data.file_path[0])
        }
        if(data.foto_kegiatan instanceof FileList && data.foto_kegiatan.length > 0) {
            foto_kegiatan = await uploadToCloudinary(data.foto_kegiatan[0])
        }

        const payload = {
            ...data,
            file_path,
            foto_kegiatan
        }
        if (task === "edit" && id) editDokumentasiPendidikan(payload);
        else addDokumentasiPendidikan(payload);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {task === "add" ? (
                    <Button className="bg-white text-primary hover:bg-neutral-100  cursor-pointer">
                        <Plus /> Tambah Dokumentasi
                    </Button>
                ) : task === "detail" ? (
                    <Button className="bg-yellow-400 hover:bg-yellow-600 text-white cursor-pointer">
                        <Eye />
                    </Button>
                ) : (
                    <Button className="bg-green-500 text-white hover:bg-green-800 cursor-pointer">
                        <Pen />
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{titleMessage}</DialogTitle>
                    <DialogDescription>
                        {task === "add"
                            ? "Isi form berikut untuk menambahkan data dokumentasi pendidikan."
                            : task === "detail"
                                ? "Berikut adalah detail data dokumentasi pendidikan."
                                : "Ubah informasi dokumentasi pendidikan di form berikut."}
                    </DialogDescription>
                </DialogHeader>

                {(task === "add" || task === "edit") && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">
                        <div>
                            <Label>Judul Kegiatan</Label>
                            <Input {...register("judul")} placeholder="Masukkan nama program" />
                            {errors.judul && <p className="text-red-500 text-sm">{errors.judul.message}</p>}
                        </div>
                        <div>
                            <Label>Keterangan</Label>
                            <Textarea {...register("keterangan")} placeholder="Masukkan keterangan lengkap" />
                            {errors.keterangan && <p className="text-red-500 text-sm">{errors.keterangan.message}</p>}
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
                                            setValue("foto_kegiatan", e.target.files);
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
                                {errors.foto_kegiatan && <p className="text-red-500 text-sm mt-1">{errors.foto_kegiatan.message as string}</p>}
                            </div>
                        </div>
                        <div>
                            <Label>File Lampiran</Label>
                            <Input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        setPreviewFile(URL.createObjectURL(file))
                                        setValue("file_path", e.target.files)
                                    }
                                }}
                            />
                            {previewFile && (
                                <div className="mt-3">
                                    <FileText className="inline text-gray-500 mr-2" />{" "}
                                    <a href={previewFile} target="_blank" className="text-blue-600 underline">Lihat Lampiran</a>
                                </div>
                            )}
                        </div>
                        <div>
                            <Label>Tahun</Label>
                            <Select onValueChange={(val) => setValue("tahun", val)} value={watch("tahun")} >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih tahun" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getYears().map((year) => (
                                        <SelectItem className="hover:bg-primary cursor-pointer hover:text-white" value={year.toString()} key={year}>{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.tahun && <p className="text-red-500 text-sm">{errors.tahun.message}</p>}
                        </div>


                        <div className="flex gap-3 pt-3">
                            <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
                                Batal
                            </Button>
                            <Button className="flex-1 cursor-pointer" disabled={isLoading}>
                                {isLoading ? <span className="loader" /> : "Simpan"}
                            </Button>
                        </div>
                    </form>
                )}

                {task === "detail" && dataDokumentasiPendidikanByID?.data && (
                    <div className="p-4 space-y-6">
                        <SectionTitle title="Detail Dokumentasi Pendidikan" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
