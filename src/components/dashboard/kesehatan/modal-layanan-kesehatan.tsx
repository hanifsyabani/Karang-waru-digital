'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GetAllFasilitasKesehatan, GetLayananKesehatanByID, PostLayananKesehatan, PutLayananKesehatan } from "@/service/health";
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
    nama_program: z.string().min(1, "Nama program tidak boleh kosong"),
    jenis_program: z.string().min(1, "Jenis program tidak boleh kosong"),
    deskripsi: z.string().min(1, "Deskripsi tidak boleh kosong"),
    fasilitas_id: z.string(),
    jadwal: z.string().min(1, "Jadwal tidak boleh kosong"),
});
type FormFields = z.infer<typeof schema>;


export default function ModalLayananKesehatan({ refetch, task, id }: ModalProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data: dataFasilitas } = useQuery({
        queryKey: ['fasilitas-kesehatan'],
        queryFn: () => GetAllFasilitasKesehatan(),
    })
    const { data: dataLayananKesehatanByID, isLoading: isLoadingLayananKesehatanByID } = useQuery({
        queryKey: ['data-layanan-kesehatan', id],
        queryFn: () => GetLayananKesehatanByID(id || ""),
        enabled: task === "edit" && !!id,
    })


    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm<FormFields>({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (dataLayananKesehatanByID?.data) {
            const data = dataLayananKesehatanByID.data;
            setValue("nama_program", data.nama_program);
            setValue("jenis_program", data.jenis_program);
            setValue("deskripsi", data.deskripsi);
            setValue("fasilitas_id", String(data.fasilitas_id));
            setValue("jadwal", data.jadwal);
        }
    }, [dataLayananKesehatanByID, setValue])


    const { mutate: addLayananKesehatan } = useMutation({
        mutationFn: (data: FormFields) => PostLayananKesehatan(data),
        onSuccess: () => {
            setIsOpen(false);
            setIsLoading(false);
            toast.success("Layanan kesehatan berhasil ditambahkan");
            refetch();
        },
        onError: () => {
            setIsLoading(false);
            toast.error("Terjadi kesalahan, silahkan coba lagi");
        }
    })
    const { mutate: editLayananKesehatan } = useMutation({
        mutationFn: (data: FormFields) => PutLayananKesehatan(data, id || ""),
        onSuccess: () => {
            setIsOpen(false);
            setIsLoading(false);
            toast.success("Layanan kesehatan berhasil diubah");
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
            editLayananKesehatan(data);
        } else {
            addLayananKesehatan(data);
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {task === "add" ? (
                    <Button className="bg-primary cursor-pointer" >
                        <Plus />Tambah Layanan Kesehatan
                    </Button>
                ) : (
                    <Button className="bg-green-500 text-white hover:bg-green-800 cursor-pointer">
                        <Pen />
                    </Button>
                )}
            </DialogTrigger>
            {!isLoadingLayananKesehatanByID && (
                <DialogContent className="max-w-6xl">
                    <DialogHeader>
                        <DialogTitle>
                            {task === "add" ? "Tambah Layanan Kesehatan" : "Ubah Layanan Kesehatan"}
                        </DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="p-6 space-y-4">
                            <div>
                                <Label className="block text-sm font-semibold text-gray-700 mb-2">Nama Program</Label>
                                <Input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    placeholder="Masukkan nama program"
                                    {...register("nama_program")}
                                />
                                {errors.nama_program && <p className="text-sm text-red-600 mt-1">{errors.nama_program.message}</p>}
                            </div>
                            <div>
                                <Label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Program</Label>
                                <Select onValueChange={(value) => setValue("jenis_program", value)}
                                    value={watch("jenis_program") || undefined}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Jenis Program" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Imunisasi" className="hover:bg-primary hover:text-white cursor-pointer">Imunisasi</SelectItem>
                                        <SelectItem value="Posyandu" className="hover:bg-primary hover:text-white cursor-pointer">Posyandu</SelectItem>
                                        <SelectItem value="Posbindu" className="hover:bg-primary hover:text-white cursor-pointer">Posbindu</SelectItem>
                                        <SelectItem value="Cek Kesehatan" className="hover:bg-primary hover:text-white cursor-pointer">Cek Kesehatan</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.jenis_program && <p className="text-sm text-red-600 mt-1">{errors.jenis_program.message}</p>}
                            </div>
                            <div>
                                <Label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</Label>
                                <Textarea
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    placeholder="Masukkan deskripsi program"
                                    {...register("deskripsi")}
                                />
                                {errors.deskripsi && <p className="text-sm text-red-600 mt-1">{errors.deskripsi.message}</p>}
                            </div>
                            <div>
                                <Label className="block text-sm font-semibold text-gray-700 mb-2">Fasilitas</Label>
                                <Select onValueChange={(value) => setValue("fasilitas_id", value)}
                                    value={watch("fasilitas_id") || undefined}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Fasilitas Kesehatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dataFasilitas?.data && (
                                            dataFasilitas?.data.map((fasilitas: any) => (
                                                <SelectItem key={fasilitas.id} value={String(fasilitas.id)} className="hover:bg-primary hover:text-white cursor-pointer">
                                                    {fasilitas.nama_fasilitas}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.fasilitas_id && <p className="text-sm text-red-600 mt-1">{errors.fasilitas_id.message}</p>}
                            </div>
                            <div>
                                <Label className="block text-sm font-semibold text-gray-700 mb-2">Jadwal</Label>
                                <Input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                    placeholder="Contoh: Setiap Selasa, 08:00-11:00"
                                    {...register("jadwal")}
                                />
                                {errors.jadwal && <p className="text-sm text-red-600 mt-1">{errors.jadwal.message}</p>}
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
                                    disabled={isLoading}
                                >
                                    {isLoading ? <span className="loader" /> : "Simpan"}
                                </Button>
                            </div>
                        </div>
                    </form>

                </DialogContent>
            )}
        </Dialog>

    )
}
