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
import { uploadToCloudinary } from "@/lib/cloudinary";
import { GetApbdByID, PostApbd, PutApbd } from "@/service/apbd";
import SectionTitle from "../section-title";
import DetailItem from "../detail-item";
import { getYears } from "@/lib/utils";

interface ModalProps {
    refetch: () => void
    task: "add" | "edit" | "detail"
    id?: string
}

export const schema = z.object({
    tahun: z.string().min(1, "Wajib diisi"),
    pendapatan_asli_desa: z.coerce.number().min(0, "Wajib diisi"),
    transfer: z.coerce.number().min(0, "Wajib diisi"),
    pendapatan_lain: z.coerce.number().min(0, "Wajib diisi"),
    belanja_pemerintahan: z.coerce.number().min(0, "Wajib diisi"),
    belanja_pembangunan: z.coerce.number().min(0, "Wajib diisi"),
    belanja_pembinaan: z.coerce.number().min(0, "Wajib diisi"),
    belanja_pemberdayaan: z.coerce.number().min(0, "Wajib diisi"),
    belanja_takterduga: z.coerce.number().min(0, "Wajib diisi"),
    penerimaan_pembiayaan: z.coerce.number().min(0, "Wajib diisi"),
    pengeluaran_pembiayaan: z.coerce.number().min(0, "Wajib diisi"),
    total_pendapatan: z.coerce.number().optional(),
    total_belanja: z.coerce.number().optional(),
    surplus_defisit: z.coerce.number().optional(),
    status: z.string(),
    keterangan: z.string().optional(),
    file_lampiran: z.any().optional(),
})

type FormFields = z.infer<typeof schema>

export default function ModalAccount({ refetch, task, id }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [previewFile, setPreviewFile] = useState<string | null>(null)

    const buttonMessage = task === "add" ? "Tambah APBD" : task === "detail" ? "Lihat Detail" : "Ubah APBD";
    const titleMessage = task === "add" ? "Tambah Data APBD Desa" : task === "detail" ? "Detail Data APBD Desa" : "Ubah Data APBD Desa";

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

            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{titleMessage}</DialogTitle>
                    <DialogDescription>
                        {task === "add" ? "Isi form berikut untuk menambahkan data APBD desa." : task === "detail" ? "Berikut adalah detail data APBD desa." : "Ubah informasi data APBD desa pada form berikut."}
                    </DialogDescription>
                </DialogHeader>

                {(task === "add" || task === "edit") && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Tahun</Label>
                                <Select onValueChange={(value) => setValue("tahun", value)} >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Tahun" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getYears().map((year) => (
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
                                        <SelectItem value="draft" className="hover:bg-primary cursor-pointer hover:text-white"  >Draft</SelectItem>
                                        <SelectItem value="published" className="hover:bg-primary cursor-pointer hover:text-white">Published</SelectItem>
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
                                {isLoading ? (
                                    <span className="loader" />
                                ) : (
                                    buttonMessage
                                )}
                            </Button>
                        </div>
                    </form>
                )}

                {task === "detail" && (
                    <div className="p-4 space-y-6">
                        {dataApbd?.data && (
                            <>
                                <section>
                                    <SectionTitle title="Ringkasan APBD" />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <DetailItem label="Tahun" value={dataApbd.data.tahun} />
                                        <DetailItem label="Status" value={dataApbd.data.status} isStatus />
                                        <DetailItem label="Keterangan" value={dataApbd.data.keterangan} />
                                    </div>
                                </section>

                                <section>
                                    <SectionTitle title="Pendapatan Desa" />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <DetailItem label="Pendapatan Asli Desa" value={dataApbd.data.pendapatan_asli_desa} isCurrency />
                                        <DetailItem label="Transfer" value={dataApbd.data.transfer} isCurrency />
                                        <DetailItem label="Pendapatan Lain" value={dataApbd.data.pendapatan_lain} isCurrency />
                                    </div>
                                    <div className="mt-4 p-3 bg-primary/10 rounded-md">
                                        <DetailItem label="Total Pendapatan" value={dataApbd.data.total_pendapatan} isCurrency />
                                    </div>
                                </section>

                                <section>
                                    <SectionTitle title="Belanja Desa" />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <DetailItem label="Pemerintahan" value={dataApbd.data.belanja_pemerintahan} isCurrency />
                                        <DetailItem label="Pembangunan" value={dataApbd.data.belanja_pembangunan} isCurrency />
                                        <DetailItem label="Pembinaan" value={dataApbd.data.belanja_pembinaan} isCurrency />
                                        <DetailItem label="Pemberdayaan" value={dataApbd.data.belanja_pemberdayaan} isCurrency />
                                        <DetailItem label="Tak Terduga" value={dataApbd.data.belanja_takterduga} isCurrency />
                                    </div>
                                    <div className="mt-4 p-3 bg-red-100/50 rounded-md">
                                        <DetailItem label="Total Belanja" value={dataApbd.data.total_belanja} isCurrency />
                                    </div>
                                </section>

                                <section>
                                    <SectionTitle title="Pembiayaan Desa" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <DetailItem label="Penerimaan Pembiayaan" value={dataApbd.data.penerimaan_pembiayaan} isCurrency />
                                        <DetailItem label="Pengeluaran Pembiayaan" value={dataApbd.data.pengeluaran_pembiayaan} isCurrency />
                                    </div>
                                </section>

                                <section>
                                    <SectionTitle title="Hasil Akhir & Lampiran" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className={`p-4 rounded-md ${(dataApbd.data.surplus_defisit ?? 0) >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                                            <DetailItem label="Surplus / Defisit" value={dataApbd.data.surplus_defisit} isCurrency />
                                        </div>
                                        {dataApbd.data.file_lampiran && (
                                            <div>
                                                <Label className="text-sm text-muted-foreground">File Lampiran</Label>
                                                <p className="text-base font-medium mt-1">
                                                    <a
                                                        href={dataApbd.data.file_lampiran}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
                                                    >
                                                        <FileText size={18} /> Lihat Dokumen Lampiran
                                                    </a>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
