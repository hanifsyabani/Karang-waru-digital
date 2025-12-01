'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {  GetFasilitasKesehatanByID,  PostFasilitasKesehatan, PutFasilitasKesehatan } from "@/service/kesehatan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Pen, Plus } from "lucide-react";
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
    nama_fasilitas: z.string().min(1, "Nama fasilitas harus diisi"),
    jenis : z.string().min(1, "Jenis fasilitas harus diisi"),
    alamat: z.string().min(1, "Alamat harus diisi"),
    penanggung_jawab: z.string().min(1, "Penanggung jawab harus diisi"),
    no_telepon: z.string().min(1, "No. telepon harus diisi"),
    jam_operasional: z.string().min(1, "Jam operasional harus diisi"),
});
type FormFields = z.infer<typeof schema>;


export default function ModalFasilitasKesehatan({ refetch, task, id }: ModalProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const { data: dataLayananKesehatanByID, isLoading: isLoadingLayananKesehatanByID } = useQuery({
        queryKey: ['data-layanan-kesehatan', id],
        queryFn: () => GetFasilitasKesehatanByID(id || ""),
        enabled: task === "edit" && !!id,
    })


    const { handleSubmit, register, formState: { errors }, setValue } = useForm<FormFields>({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (dataLayananKesehatanByID?.data) {
            const data = dataLayananKesehatanByID.data;
            setValue("nama_fasilitas", data.nama_fasilitas);
            setValue("jenis", data.jenis);
            setValue("alamat", data.alamat);
            setValue("penanggung_jawab", data.penanggung_jawab);
            setValue("no_telepon", data.no_telepon);
            setValue("jam_operasional", data.jam_operasional);
        }
    }, [dataLayananKesehatanByID, setValue])


    const { mutate: addFasilitasKesehatan } = useMutation({
        mutationFn: (data: FormFields) => PostFasilitasKesehatan(data),
        onSuccess: () => {
            setIsOpen(false);
            setIsLoading(false);
            toast.success("Fasilitas kesehatan berhasil ditambahkan");
            refetch();
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan, silahkan coba lagi");
        }
    })
    const { mutate: editFasilitasKesehatan } = useMutation({
        mutationFn: (data: FormFields) => PutFasilitasKesehatan(data, id || ""),
        onSuccess: () => {
            setIsOpen(false);
            setIsLoading(false);
            toast.success("Fasilitas kesehatan berhasil diubah");
            refetch();
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan, silahkan coba lagi");
        }
    })

    function onSubmit(data: FormFields) {
        setIsLoading(true);


        if (task === "edit" && id) {
            editFasilitasKesehatan(data);
        } else {
            addFasilitasKesehatan(data);
        }
    }

    if ( isLoadingLayananKesehatanByID) return <Loader />

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {task === "add" ? (
                    <Button className="bg-primary cursor-pointer" >
                        <Plus />Tambah Fasilitas Kesehatan
                    </Button>
                ) : (
                    <Button className="bg-green-500 text-white hover:bg-green-800 cursor-pointer">
                        <Pen />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-6xl">
                <DialogHeader>
                    <DialogTitle>
                        {task === "add" ? "Tambah Fasilitas Kesehatan" : "Ubah Fasilitas Kesehatan"}
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="p-6 space-y-4">
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">Nama Fasilitas</Label>
                            <Input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                placeholder="Masukkan nama fasilitas"
                                {...register("nama_fasilitas")}
                            />
                            {errors.nama_fasilitas && (
                                <p className="text-sm text-red-600 mt-1">{errors.nama_fasilitas.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Fasilitas</Label>
                            <Select onValueChange={(value) => setValue("jenis", value)} >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Jenis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="puskesmas" className="hover:bg-primary hover:text-white cursor-pointer">
                                        Puskesmas
                                    </SelectItem>
                                    <SelectItem value="posyandu" className="hover:bg-primary hover:text-white cursor-pointer">
                                        Posyandu
                                    </SelectItem>
                                    <SelectItem value="klinik" className="hover:bg-primary hover:text-white cursor-pointer">
                                        Klinik
                                    </SelectItem>
                                    <SelectItem value="apotek" className="hover:bg-primary hover:text-white cursor-pointer">
                                        Apotek
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">Alamat</Label>
                            <Textarea
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                placeholder="Masukkan alamat lengkap"
                                {...register("alamat")}
                            />
                            {errors.alamat && (
                                <p className="text-sm text-red-600 mt-1">{errors.alamat.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">Penanggung Jawab</Label>
                            <Input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                placeholder="Nama penanggung jawab"
                                {...register("penanggung_jawab")}
                            />
                            {errors.penanggung_jawab && (
                                <p className="text-sm text-red-600 mt-1">{errors.penanggung_jawab.message}</p>
                            )}

                        </div>
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon</Label>
                            <Input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                placeholder="Contoh: 081234567890"
                                {...register("no_telepon")}
                            />
                            {errors.no_telepon && (
                                <p className="text-sm text-red-600 mt-1">{errors.no_telepon.message}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-sm font-semibold text-gray-700 mb-2">Jam Operasional</Label>
                            <Input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                placeholder="Contoh: Senin-Jumat, 08:00-16:00"
                                {...register("jam_operasional")}
                            />
                            {errors.jam_operasional && (
                                <p className="text-sm text-red-600 mt-1">{errors.jam_operasional.message}</p>
                            )}
                        </div>

                        <div className="flex space-x-3 pt-4">
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
                            >
                                {isLoading ? <span className="loader" /> : "Simpan"}
                            </Button>
                        </div>
                    </div>
                </form>

            </DialogContent>
        </Dialog>

    )
}
