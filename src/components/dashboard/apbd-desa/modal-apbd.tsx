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
import { FileText, Pen, Plus } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { GetApbdByID, PostApbd, PutApbd } from "@/service/apbd";

interface ModalProps {
    refetch: () => void
    task: string
    id?: string
}

export const schema = z.object({
    tahun: z.string().min(1, "Wajib diisi"),

    // Pendapatan Desa
    pendapatan_asli_desa: z.coerce.number().min(0, "Wajib diisi"),
    transfer: z.coerce.number().min(0, "Wajib diisi"),
    pendapatan_lain: z.coerce.number().min(0, "Wajib diisi"),

    // Belanja Desa
    belanja_pemerintahan: z.coerce.number().min(0, "Wajib diisi"),
    belanja_pembangunan: z.coerce.number().min(0, "Wajib diisi"),
    belanja_pembinaan: z.coerce.number().min(0, "Wajib diisi"),
    belanja_pemberdayaan: z.coerce.number().min(0, "Wajib diisi"),
    belanja_takterduga: z.coerce.number().min(0, "Wajib diisi"),

    // Pembiayaan Desa
    penerimaan_pembiayaan: z.coerce.number().min(0, "Wajib diisi"),
    pengeluaran_pembiayaan: z.coerce.number().min(0, "Wajib diisi"),

    // Total (biasanya dihitung otomatis di backend)
    total_pendapatan: z.coerce.number().optional(),
    total_belanja: z.coerce.number().optional(),
    surplus_defisit: z.coerce.number().optional(),

    // Status (opsional: batasi ke Published/Draft)
    status: z.string(),
    // Metadata
    keterangan: z.string().optional(),
    file_lampiran: z.any().optional(),
})

type FormFields = z.infer<typeof schema>

export default function ModalApbd({ refetch, task, id }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [previewFile, setPreviewFile] = useState<string | null>(null)

    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => currentYear - i);

    const { data: dataApbd } = useQuery({
        queryFn: () => GetApbdByID(id || ""),
        queryKey: ["apbdByID", id],
        enabled: task === "edit" && !!id,
    })

    const { handleSubmit, register, setValue, watch, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema) as any,
    })

    useEffect(() => {
        if (dataApbd?.data) {
            const d = dataApbd.data
            setValue("tahun", d.tahun)
            setValue("pendapatan_asli_desa", d.pendapatan_asli_desa)
            setValue("transfer", d.transfer)
            setValue("pendapatan_lain", d.pendapatan_lain)
            setValue("belanja_pemerintahan", d.belanja_pemerintahan)
            setValue("belanja_pembangunan", d.belanja_pembangunan)
            setValue("belanja_pembinaan", d.belanja_pembinaan)
            setValue("belanja_pemberdayaan", d.belanja_pemberdayaan)
            setValue("belanja_takterduga", d.belanja_takterduga)
            setValue("penerimaan_pembiayaan", d.penerimaan_pembiayaan)
            setValue("pengeluaran_pembiayaan", d.pengeluaran_pembiayaan)
            setValue("status", d.status)
            setValue("keterangan", d.keterangan)
            setValue("file_lampiran", d.file_lampiran)
            setPreviewFile(d.file_lampiran)
        }
    }, [dataApbd, setValue])

    const { mutate: addApbd } = useMutation({
        mutationFn: (data: FormFields) => PostApbd(data),
        onSuccess: () => {
            toast.success("Data APBD berhasil ditambahkan")
            setIsOpen(false)
            setIsLoading(false)
            refetch()
        },
        onError: () => {
            toast.error("Gagal menambahkan data")
            setIsLoading(false)
        }
    })

    const { mutate: editApbd } = useMutation({
        mutationFn: (data: FormFields) => PutApbd(data, id || ""),
        onSuccess: () => {
            toast.success("Data APBD berhasil diperbarui")
            setIsOpen(false)
            setIsLoading(false)
            refetch()
        },
        onError: () => {
            toast.error("Gagal memperbarui data")
            setIsLoading(false)
        }
    })

    async function onSubmit(data: FormFields) {
        setIsLoading(true)

        let fileUrl = dataApbd?.data?.file_lampiran || ""
        if (data.file_lampiran instanceof FileList && data.file_lampiran.length > 0) {
            fileUrl = await uploadToCloudinary(data.file_lampiran[0])
        }

        const payload = {
            ...data,
            file_lampiran: fileUrl,
        }

        if (task === "edit" && id) editApbd(payload)
        else addApbd(payload)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {task === "add" ? (
                    <Button className="bg-primary cursor-pointer">
                        <Plus /> Tambah APBD
                    </Button>
                ) : (
                    <Button className="bg-green-500 text-white hover:bg-green-800 cursor-pointer">
                        <Pen />
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{task === "add" ? "Tambah Data APBD Desa" : "Ubah Data APBD Desa"}</DialogTitle>
                    <DialogDescription>Isi semua kolom APBD dengan benar sebelum menyimpan.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Tahun</Label>
                            <Select onValueChange={(value) => setValue("tahun", value)} >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Tahun" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem value={year.toString()} key={year} className="hover:bg-primary cursor-pointer hover:text-white" >
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.tahun && <p className="text-red-500 text-sm mt-1">{errors.tahun.message}</p>}
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Select onValueChange={(val) => setValue("status", val)} value={watch("status")}>
                                <SelectTrigger className="w-full"><SelectValue placeholder="Pilih Status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Draft" className="hover:bg-primary cursor-pointer hover:text-white"  >Draft</SelectItem>
                                    <SelectItem value="Published" className="hover:bg-primary cursor-pointer hover:text-white">Published</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                        </div>
                    </div>

                    <div>
                        <Label className="font-semibold text-primary">Pendapatan Desa</Label>
                        <div className="grid grid-cols-3 gap-3 mt-2">
                            <div>
                                <Input type="number" placeholder="PAD" {...register("pendapatan_asli_desa")} />
                                {errors.pendapatan_asli_desa && <p className="text-red-500 text-sm mt-1">{errors.pendapatan_asli_desa.message}</p>}
                            </div>
                            <div>
                                <Input type="number" placeholder="Transfer" {...register("transfer")} />
                                {errors.transfer && <p className="text-red-500 text-sm mt-1">{errors.transfer.message}</p>}
                            </div>

                            <div>
                                <Input type="number" placeholder="Pendapatan Lain" {...register("pendapatan_lain")} />
                                {errors.pendapatan_lain && <p className="text-red-500 text-sm mt-1">{errors.pendapatan_lain.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label className="font-semibold text-primary">Belanja Desa</Label>
                        <div className="grid grid-cols-3 gap-3 mt-2">
                            <div>
                                <Input type="number" placeholder="Pemerintahan" {...register("belanja_pemerintahan")} />
                                {errors.belanja_pemerintahan && <p className="text-red-500 text-sm mt-1">{errors.belanja_pemerintahan.message}</p>}
                            </div>
                            <div>
                                <Input type="number " placeholder="Pembangunan" {...register("belanja_pembangunan")} />
                                {errors.belanja_pembangunan && <p className="text-red-500 text-sm mt-1">{errors.belanja_pembangunan.message}</p>}
                            </div>
                            <div>
                                <Input type="number" placeholder="Pembinaan" {...register("belanja_pembinaan")} />
                                {errors.belanja_pembinaan && <p className="text-red-500 text-sm mt-1">{errors.belanja_pembinaan.message}</p>}
                            </div>
                            <div>
                                <Input type="number" placeholder="Pemberdayaan" {...register("belanja_pemberdayaan")} />
                                {errors.belanja_pemberdayaan && <p className="text-red-500 text-sm mt-1">{errors.belanja_pemberdayaan.message}</p>}
                            </div>
                            <div>
                                <Input type="number" placeholder="Tak Terduga" {...register("belanja_takterduga")} />
                                {errors.belanja_takterduga && <p className="text-red-500 text-sm mt-1">{errors.belanja_takterduga.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label className="font-semibold text-primary">Pembiayaan Desa</Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <div>
                                <Input type="number" placeholder="Penerimaan Pembiayaan" {...register("penerimaan_pembiayaan")} />
                                {errors.penerimaan_pembiayaan && <p className="text-red-500 text-sm mt-1">{errors.penerimaan_pembiayaan.message}</p>}
                            </div>
                            <div>
                                <Input type="number" placeholder="Pengeluaran Pembiayaan" {...register("pengeluaran_pembiayaan")} />
                                {errors.pengeluaran_pembiayaan && <p className="text-red-500 text-sm mt-1">{errors.pengeluaran_pembiayaan.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label>Keterangan</Label>
                        <Textarea {...register("keterangan")} placeholder="Tambahkan catatan atau informasi tambahan..." />
                        {errors.keterangan && <p className="text-red-500 text-sm mt-1">{errors.keterangan.message}</p>}
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
                                    setValue("file_lampiran", e.target.files)
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

                    <div className="flex gap-3 pt-3">
                        <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
                            Batal
                        </Button>
                        <Button className="flex-1 cursor-pointer" disabled={isLoading}>
                            {isLoading ? <span className="loader" /> : (task === "add" ? "Tambah" : "Simpan")}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
