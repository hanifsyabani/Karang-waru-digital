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
    tahun: z.coerce.number().int().min(2000, "Tahun tidak valid"),

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
                    <Button className="bg-primary">
                        <Plus /> Tambah APBD
                    </Button>
                ) : (
                    <Button className="bg-green-500 text-white hover:bg-green-800">
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
                            <Input type="number" {...register("tahun", { valueAsNumber: true })} placeholder="2025" />
                            {errors.tahun && <p className="text-red-500 text-sm">{errors.tahun.message}</p>}
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Select onValueChange={(val) => setValue("status", val)} value={watch("status")}>
                                <SelectTrigger><SelectValue placeholder="Pilih Status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* === Pendapatan === */}
                    <div>
                        <Label className="font-semibold text-primary">Pendapatan Desa</Label>
                        <div className="grid grid-cols-3 gap-3 mt-2">
                            <Input type="number" placeholder="PAD" {...register("pendapatan_asli_desa")} />
                            <Input type="number" placeholder="Transfer" {...register("transfer")} />
                            <Input type="number" placeholder="Pendapatan Lain" {...register("pendapatan_lain")} />
                        </div>
                    </div>

                    {/* === Belanja === */}
                    <div>
                        <Label className="font-semibold text-primary">Belanja Desa</Label>
                        <div className="grid grid-cols-3 gap-3 mt-2">
                            <Input type="number" placeholder="Pemerintahan" {...register("belanja_pemerintahan")} />
                            <Input type="number " placeholder="Pembangunan" {...register("belanja_pembangunan")} />
                            <Input type="number" placeholder="Pembinaan" {...register("belanja_pembinaan")} />
                            <Input type="number" placeholder="Pemberdayaan" {...register("belanja_pemberdayaan")} />
                            <Input type="number" placeholder="Tak Terduga" {...register("belanja_takterduga")} />
                        </div>
                    </div>

                    {/* === Pembiayaan === */}
                    <div>
                        <Label className="font-semibold text-primary">Pembiayaan Desa</Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <Input type="number" placeholder="Penerimaan Pembiayaan" {...register("penerimaan_pembiayaan")} />
                            <Input type="number" placeholder="Pengeluaran Pembiayaan" {...register("pengeluaran_pembiayaan")} />
                        </div>
                    </div>

                    <div>
                        <Label>Keterangan</Label>
                        <Textarea {...register("keterangan")} placeholder="Tambahkan catatan atau informasi tambahan..." />
                    </div>

                    <div>
                        <Label>File Lampiran (opsional)</Label>
                        <Input
                            type="file"
                            accept="application/pdf,image/*"
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
                        <Button className="flex-1" disabled={isLoading}>
                            {isLoading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
