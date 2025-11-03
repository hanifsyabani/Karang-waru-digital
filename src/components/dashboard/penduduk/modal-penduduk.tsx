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
import { Eye, Pen, Plus } from "lucide-react";
import SectionTitle from "../section-title";
import DetailItem from "../detail-item";
import { GetPendudukByID, PostPenduduk, PutPenduduk } from "@/service/penduduk";

interface ModalProps {
    refetch: () => void
    task: "add" | "edit" | "detail"
    id?: string
}

export const schema = z.object({
    // Identitas dasar
    nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit"),
    no_kk: z.string().optional(),
    nama_lengkap: z.string().min(1, "Nama lengkap wajib diisi"),
    jenis_kelamin: z.string().min(1, "Jenis kelamin wajib dipilih"),
    tempat_lahir: z.string().optional(),
    tanggal_lahir: z.string().optional(),

    // Alamat domisili
    alamat: z.string().optional(),
    rt: z.string().optional(),
    rw: z.string().optional(),
    dusun: z.string().optional(),
    desa: z.string().optional(),
    kecamatan: z.string().optional(),
    kabupaten: z.string().optional(),
    provinsi: z.string().optional(),

    // Informasi tambahan
    agama: z.string().optional(),
    status_perkawinan: z.string().optional(),
    pekerjaan: z.string().optional(),
    pendidikan_terakhir: z.string().optional(),
    kewarganegaraan: z.string().optional(),
    status_kependudukan: z.string().optional(),
    keterangan: z.string().optional(),
})

type FormFields = z.infer<typeof schema>

export default function ModalPenduduk({ refetch, task, id }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const buttonMessage = task === "add" ? "Tambah Penduduk" : task === "detail" ? "Lihat Detail" : "Ubah Penduduk";
    const titleMessage = task === "add" ? "Tambah Data Penduduk" : task === "detail" ? "Detail Data Penduduk" : "Ubah Data Penduduk";

    const { data: dataPendudukByID } = useQuery({
        queryFn: () => GetPendudukByID(id || ""),
        queryKey: ["pendudukByID", id],
        enabled: (task === "edit" || task === "detail") && !!id,
    })

    const { handleSubmit, register, setValue, watch, formState: { errors }, reset } = useForm<FormFields>({
        resolver: zodResolver(schema) as any,
        defaultValues: {
            nik: "",
            no_kk: "",
            nama_lengkap: "",
            jenis_kelamin: "",
            tempat_lahir: "",
            tanggal_lahir: "",
            alamat: "",
            rt: "",
            rw: "",
            dusun: "",
            desa: "",
            kecamatan: "",
            kabupaten: "",
            provinsi: "",
            agama: "",
            status_perkawinan: "",
            pekerjaan: "",
            pendidikan_terakhir: "",
            kewarganegaraan: "WNI",
            status_kependudukan: "",
            keterangan: "",
        }
    })

    useEffect(() => {
        if (dataPendudukByID?.data) {
            const d = dataPendudukByID.data
            setValue("nik", d.nik || "")
            setValue("no_kk", d.no_kk || "")
            setValue("nama_lengkap", d.nama_lengkap || "")
            setValue("jenis_kelamin", d.jenis_kelamin || "")
            setValue("tempat_lahir", d.tempat_lahir || "")
            setValue("tanggal_lahir", d.tanggal_lahir || "")
            setValue("alamat", d.alamat || "")
            setValue("rt", d.rt || "")
            setValue("rw", d.rw || "")
            setValue("dusun", d.dusun || "")
            setValue("desa", d.desa || "")
            setValue("kecamatan", d.kecamatan || "")
            setValue("kabupaten", d.kabupaten || "")
            setValue("provinsi", d.provinsi || "")
            setValue("agama", d.agama || "")
            setValue("status_perkawinan", d.status_perkawinan || "")
            setValue("pekerjaan", d.pekerjaan || "")
            setValue("pendidikan_terakhir", d.pendidikan_terakhir || "")
            setValue("kewarganegaraan", d.kewarganegaraan || "")
            setValue("status_kependudukan", d.status_kependudukan || "")
            setValue("keterangan", d.keterangan || "")
        }
    }, [dataPendudukByID, setValue])

    const { mutate: addPenduduk } = useMutation({
        mutationFn: (data: FormFields) => PostPenduduk(data),
        onSuccess: () => {
            toast.success("Data Penduduk berhasil ditambahkan")
            setIsOpen(false)
            setIsLoading(false)
            reset()
            refetch()
        },
        onError: () => {
            toast.error("Gagal menambahkan data")
            setIsLoading(false)
        }
    })

    const { mutate: editPenduduk } = useMutation({
        mutationFn: (data: FormFields) => PutPenduduk(data, id || ""),
        onSuccess: () => {
            toast.success("Data Penduduk berhasil diperbarui")
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

        const payload = {
            ...data,
        }

        if (task === "edit" && id) editPenduduk(payload)
        else addPenduduk(payload)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {task === "add" ? (
                    <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 cursor-pointer rounded-lg transition-all duration-200 flex items-center gap-2">
                        <Plus /> Tambah Penduduk
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
                        {task === "add" ? "Isi form berikut untuk menambahkan data penduduk." : task === "detail" ? "Berikut adalah detail data penduduk." : "Ubah informasi data penduduk pada form berikut."}
                    </DialogDescription>
                </DialogHeader>

                {(task === "add" || task === "edit") && (
                    <div className="space-y-6 p-4">
                        {/* Identitas Dasar */}
                        <div>
                            <Label className="font-semibold text-primary text-base">Identitas Dasar</Label>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                    <Label>NIK <span className="text-red-500">*</span></Label>
                                    <Input type="text" placeholder="16 digit NIK" maxLength={16} {...register("nik")} />
                                    {errors.nik && <p className="text-red-500 text-sm mt-1">{errors.nik.message}</p>}
                                </div>
                                <div>
                                    <Label>No. KK</Label>
                                    <Input type="text" placeholder="Nomor Kartu Keluarga" maxLength={16} {...register("no_kk")} />
                                    {errors.no_kk && <p className="text-red-500 text-sm mt-1">{errors.no_kk.message}</p>}
                                </div>
                                <div className="col-span-2">
                                    <Label>Nama Lengkap <span className="text-red-500">*</span></Label>
                                    <Input type="text" placeholder="Nama lengkap sesuai KTP" {...register("nama_lengkap")} />
                                    {errors.nama_lengkap && <p className="text-red-500 text-sm mt-1">{errors.nama_lengkap.message}</p>}
                                </div>
                                <div>
                                    <Label>Jenis Kelamin <span className="text-red-500">*</span></Label>
                                    <Select onValueChange={(val) => setValue("jenis_kelamin", val)} value={watch("jenis_kelamin")}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Laki-laki" className="hover:bg-primary cursor-pointer hover:text-white">Laki-laki</SelectItem>
                                            <SelectItem value="Perempuan" className="hover:bg-primary cursor-pointer hover:text-white">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.jenis_kelamin && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin.message}</p>}
                                </div>
                                <div>
                                    <Label>Tempat Lahir</Label>
                                    <Input type="text" placeholder="Kota/Kabupaten" {...register("tempat_lahir")} />
                                    {errors.tempat_lahir && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir.message}</p>}
                                </div>
                                <div className="col-span-2">
                                    <Label>Tanggal Lahir</Label>
                                    <Input type="date" {...register("tanggal_lahir")} />
                                    {errors.tanggal_lahir && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label className="font-semibold text-primary text-base">Alamat Domisili</Label>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="col-span-2">
                                    <Label>Alamat Lengkap</Label>
                                    <Textarea placeholder="Jalan, nomor rumah, dll" {...register("alamat")} rows={2} />
                                    {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat.message}</p>}
                                </div>
                                <div>
                                    <Label>RT</Label>
                                    <Input type="text" placeholder="001" {...register("rt")} />
                                    {errors.rt && <p className="text-red-500 text-sm mt-1">{errors.rt.message}</p>}
                                </div>
                                <div>
                                    <Label>RW</Label>
                                    <Input type="text" placeholder="001" {...register("rw")} />
                                    {errors.rw && <p className="text-red-500 text-sm mt-1">{errors.rw.message}</p>}
                                </div>
                                <div>
                                    <Label>Dusun</Label>
                                    <Input type="text" placeholder="Nama dusun" {...register("dusun")} />
                                    {errors.dusun && <p className="text-red-500 text-sm mt-1">{errors.dusun.message}</p>}
                                </div>
                                <div>
                                    <Label>Desa</Label>
                                    <Input type="text" placeholder="Nama desa" {...register("desa")} />
                                    {errors.desa && <p className="text-red-500 text-sm mt-1">{errors.desa.message}</p>}
                                </div>
                                <div>
                                    <Label>Kecamatan</Label>
                                    <Input type="text" placeholder="Nama kecamatan" {...register("kecamatan")} />
                                    {errors.kecamatan && <p className="text-red-500 text-sm mt-1">{errors.kecamatan.message}</p>}
                                </div>
                                <div>
                                    <Label>Kabupaten</Label>
                                    <Input type="text" placeholder="Nama kabupaten" {...register("kabupaten")} />
                                    {errors.kabupaten && <p className="text-red-500 text-sm mt-1">{errors.kabupaten.message}</p>}
                                </div>
                                <div className="col-span-2">
                                    <Label>Provinsi</Label>
                                    <Input type="text" placeholder="Nama provinsi" {...register("provinsi")} />
                                    {errors.provinsi && <p className="text-red-500 text-sm mt-1">{errors.provinsi.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Informasi Tambahan */}
                        <div>
                            <Label className="font-semibold text-primary text-base">Informasi Tambahan</Label>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                    <Label>Agama</Label>
                                    <Select onValueChange={(val) => setValue("agama", val)} value={watch("agama")}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Agama" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Islam" className="hover:bg-primary cursor-pointer hover:text-white">Islam</SelectItem>
                                            <SelectItem value="Kristen" className="hover:bg-primary cursor-pointer hover:text-white">Kristen</SelectItem>
                                            <SelectItem value="Katolik" className="hover:bg-primary cursor-pointer hover:text-white">Katolik</SelectItem>
                                            <SelectItem value="Hindu" className="hover:bg-primary cursor-pointer hover:text-white">Hindu</SelectItem>
                                            <SelectItem value="Buddha" className="hover:bg-primary cursor-pointer hover:text-white">Buddha</SelectItem>
                                            <SelectItem value="Konghucu" className="hover:bg-primary cursor-pointer hover:text-white">Konghucu</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.agama && <p className="text-red-500 text-sm mt-1">{errors.agama.message}</p>}
                                </div>
                                <div>
                                    <Label>Status Perkawinan</Label>
                                    <Select onValueChange={(val) => setValue("status_perkawinan", val)} value={watch("status_perkawinan")}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Belum Kawin" className="hover:bg-primary cursor-pointer hover:text-white">Belum Kawin</SelectItem>
                                            <SelectItem value="Kawin" className="hover:bg-primary cursor-pointer hover:text-white">Kawin</SelectItem>
                                            <SelectItem value="Cerai Hidup" className="hover:bg-primary cursor-pointer hover:text-white">Cerai Hidup</SelectItem>
                                            <SelectItem value="Cerai Mati" className="hover:bg-primary cursor-pointer hover:text-white">Cerai Mati</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status_perkawinan && <p className="text-red-500 text-sm mt-1">{errors.status_perkawinan.message}</p>}
                                </div>
                                <div>
                                    <Label>Pekerjaan</Label>
                                    <Input type="text" placeholder="Pekerjaan saat ini" {...register("pekerjaan")} />
                                    {errors.pekerjaan && <p className="text-red-500 text-sm mt-1">{errors.pekerjaan.message}</p>}
                                </div>
                                <div>
                                    <Label>Pendidikan Terakhir</Label>
                                    <Select onValueChange={(val) => setValue("pendidikan_terakhir", val)} value={watch("pendidikan_terakhir")}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Pendidikan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Tidak/Belum Sekolah" className="hover:bg-primary cursor-pointer hover:text-white">Tidak/Belum Sekolah</SelectItem>
                                            <SelectItem value="SD" className="hover:bg-primary cursor-pointer hover:text-white">SD</SelectItem>
                                            <SelectItem value="SMP" className="hover:bg-primary cursor-pointer hover:text-white">SMP</SelectItem>
                                            <SelectItem value="SMA" className="hover:bg-primary cursor-pointer hover:text-white">SMA</SelectItem>
                                            <SelectItem value="D1/D2/D3" className="hover:bg-primary cursor-pointer hover:text-white">D1/D2/D3</SelectItem>
                                            <SelectItem value="D4/S1" className="hover:bg-primary cursor-pointer hover:text-white">D4/S1</SelectItem>
                                            <SelectItem value="S2" className="hover:bg-primary cursor-pointer hover:text-white">S2</SelectItem>
                                            <SelectItem value="S3" className="hover:bg-primary cursor-pointer hover:text-white">S3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.pendidikan_terakhir && <p className="text-red-500 text-sm mt-1">{errors.pendidikan_terakhir.message}</p>}
                                </div>
                                <div>
                                    <Label>Kewarganegaraan</Label>
                                    <Select onValueChange={(val) => setValue("kewarganegaraan", val)} value={watch("kewarganegaraan")}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Kewarganegaraan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="WNI" className="hover:bg-primary cursor-pointer hover:text-white">WNI</SelectItem>
                                            <SelectItem value="WNA" className="hover:bg-primary cursor-pointer hover:text-white">WNA</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.kewarganegaraan && <p className="text-red-500 text-sm mt-1">{errors.kewarganegaraan.message}</p>}
                                </div>
                                <div>
                                    <Label>Status Kependudukan</Label>
                                    <Select onValueChange={(val) => setValue("status_kependudukan", val)} value={watch("status_kependudukan")}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Tetap" className="hover:bg-primary cursor-pointer hover:text-white">Tetap</SelectItem>
                                            <SelectItem value="Tidak Tetap" className="hover:bg-primary cursor-pointer hover:text-white">Tidak Tetap</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status_kependudukan && <p className="text-red-500 text-sm mt-1">{errors.status_kependudukan.message}</p>}
                                </div>
                                <div className="col-span-2">
                                    <Label>Keterangan</Label>
                                    <Textarea {...register("keterangan")} placeholder="Catatan atau informasi tambahan..." rows={3} />
                                    {errors.keterangan && <p className="text-red-500 text-sm mt-1">{errors.keterangan.message}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-3">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
                                Batal
                            </Button>
                            <Button type="button" className="flex-1 cursor-pointer" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                                {isLoading ? (
                                    <span className="loader" />
                                ) : (
                                    buttonMessage
                                )}
                            </Button>
                        </div>
                    </div>
                )}

                {task === "detail" && dataPendudukByID?.data && (
                    <div className="p-4 space-y-6">
                        <section>
                            <SectionTitle title="Identitas Dasar" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <DetailItem label="NIK" value={dataPendudukByID.data.nik} />
                                <DetailItem label="No. KK" value={dataPendudukByID.data.no_kk} />
                                <DetailItem label="Nama Lengkap" value={dataPendudukByID.data.nama_lengkap} />
                                <DetailItem label="Jenis Kelamin" value={dataPendudukByID.data.jenis_kelamin} />
                                <DetailItem label="Tempat Lahir" value={dataPendudukByID.data.tempat_lahir} />
                                <DetailItem label="Tanggal Lahir" value={dataPendudukByID.data.tanggal_lahir} />
                            </div>
                        </section>

                        <section>
                            <SectionTitle title="Alamat Domisili" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="col-span-2">
                                    <DetailItem label="Alamat" value={dataPendudukByID.data.alamat} />
                                </div>
                                <DetailItem label="RT" value={dataPendudukByID.data.rt} />
                                <DetailItem label="RW" value={dataPendudukByID.data.rw} />
                                <DetailItem label="Dusun" value={dataPendudukByID.data.dusun} />
                                <DetailItem label="Desa" value={dataPendudukByID.data.desa} />
                                <DetailItem label="Kecamatan" value={dataPendudukByID.data.kecamatan} />
                                <DetailItem label="Kabupaten" value={dataPendudukByID.data.kabupaten} />
                                <DetailItem label="Provinsi" value={dataPendudukByID.data.provinsi} />
                            </div>
                        </section>

                        <section>
                            <SectionTitle title="Informasi Tambahan" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <DetailItem label="Agama" value={dataPendudukByID.data.agama} />
                                <DetailItem label="Status Perkawinan" value={dataPendudukByID.data.status_perkawinan} />
                                <DetailItem label="Pekerjaan" value={dataPendudukByID.data.pekerjaan} />
                                <DetailItem label="Pendidikan Terakhir" value={dataPendudukByID.data.pendidikan_terakhir} />
                                <DetailItem label="Kewarganegaraan" value={dataPendudukByID.data.kewarganegaraan} />
                                <DetailItem label="Status Kependudukan" value={dataPendudukByID.data.status_kependudukan} />
                                <div className="col-span-2">
                                    <DetailItem label="Keterangan" value={dataPendudukByID.data.keterangan} />
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}