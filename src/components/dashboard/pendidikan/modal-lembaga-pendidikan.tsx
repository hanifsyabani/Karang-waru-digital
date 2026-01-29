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
import { GetLembagaPendidikanByID, PostLembagaPendidikan, PutLembagaPendidikan } from "@/service/education";
import SectionTitle from "../section-title";
import DetailItem from "../detail-item";

interface ModalProps {
  refetch: () => void
  task: "add" | "edit" | "detail"
  id?: string
}

export const schema = z.object({
  nama_sekolah: z.string().min(1, { message: "Nama Sekolah harus diisi" }),
  jenjang_pendidikan: z.string().min(1, { message: "Jenjang Pendidikan harus diisi" }),
  alamat: z.string().min(1, { message: "Alamat harus diisi" }),
  jumlah_siswa: z.coerce.number().min(1, { message: "Jumlah Siswa harus diisi" }),
  jumlah_guru: z.coerce.number().min(1, { message: "Jumlah Guru harus diisi" }),
  jumlah_staf: z.coerce.number().min(1, { message: "Jumlah Staff harus diisi" }),
  kontak: z.string().min(1, { message: "Kontak harus diisi" }),
});

type FormFields = z.infer<typeof schema>

export default function ModalLembagaPendidikan({ refetch, task, id }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const titleMessage =
    task === "add"
      ? "Tambah Data Lembaga Pendidikan"
      : task === "detail"
        ? "Detail Data Lembaga Pendidikan"
        : "Ubah Data Lembaga Pendidikan";

  const { data: dataLembagaPendidikanByID } = useQuery({
    queryFn: () => GetLembagaPendidikanByID(id || ""),
    queryKey: ["lembagaPendidikanByID", id],
    enabled: !!id && (task === "edit" || task === "detail"),
  });

  const { handleSubmit, register, setValue, watch, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(schema) as any,
  });

  useEffect(() => {
    if (dataLembagaPendidikanByID?.data && (task === "edit" || task === "detail")) {
      const d = dataLembagaPendidikanByID.data;
      Object.entries(d).forEach(([key, value]) => {
        setValue(key as keyof FormFields, value as any);
      });
    }
  }, [dataLembagaPendidikanByID, setValue, task]);

  const { mutate: addLembagaPendidikan } = useMutation({
    mutationFn: (data: FormFields) => PostLembagaPendidikan(data),
    onSuccess: () => {
      toast.success("Data Lembaga Pendidikan berhasil ditambahkan");
      setIsOpen(false);
      setIsLoading(false);
      refetch();
    },
    onError: () => {
      toast.error("Gagal menambahkan data");
      setIsLoading(false);
    },
  });

  const { mutate: editLembagaPendidikan } = useMutation({
    mutationFn: (data: FormFields) => PutLembagaPendidikan(data, id || ""),
    onSuccess: () => {
      toast.success("Data Lembaga Pendidikan berhasil diperbarui");
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
    if (task === "edit" && id) editLembagaPendidikan(data);
    else addLembagaPendidikan(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {task === "add" ? (
          <Button className="bg-white text-primary hover:bg-neutral-100  cursor-pointer">
            <Plus /> Tambah Lembaga
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
              ? "Isi form berikut untuk menambahkan data lembaga pendidikan."
              : task === "detail"
                ? "Berikut adalah detail data lembaga pendidikan."
                : "Ubah informasi lembaga pendidikan di form berikut."}
          </DialogDescription>
        </DialogHeader>

        {(task === "add" || task === "edit") && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nama Sekolah</Label>
                <Input {...register("nama_sekolah")} placeholder="Masukkan nama sekolah" />
                {errors.nama_sekolah && <p className="text-red-500 text-sm">{errors.nama_sekolah.message}</p>}
              </div>

              <div>
                <Label>Jenjang Pendidikan</Label>
                <Select onValueChange={(val) => setValue("jenjang_pendidikan", val)} value={watch("jenjang_pendidikan")} >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih jenjang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SD" className="hover:bg-primary cursor-pointer hover:text-white">SD</SelectItem>
                    <SelectItem value="SMP" className="hover:bg-primary cursor-pointer hover:text-white">SMP</SelectItem>
                    <SelectItem value="SMA" className="hover:bg-primary cursor-pointer hover:text-white">SMA</SelectItem>
                    <SelectItem value="SMK" className="hover:bg-primary cursor-pointer hover:text-white">SMK</SelectItem>
                    <SelectItem value="Perguruan Tinggi" >Perguruan Tinggi</SelectItem>
                  </SelectContent>
                </Select>
                {errors.jenjang_pendidikan && <p className="text-red-500 text-sm">{errors.jenjang_pendidikan.message}</p>}
              </div>
            </div>

            <div>
              <Label>Alamat</Label>
              <Textarea {...register("alamat")} placeholder="Masukkan alamat lengkap" />
              {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat.message}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Jumlah Siswa</Label>
                <Input type="number" {...register("jumlah_siswa")} placeholder="Masukkan jumlah siswa" />
                {errors.jumlah_siswa && <p className="text-red-500 text-sm">{errors.jumlah_siswa.message}</p>}
              </div>
              <div>
                <Label>Jumlah Guru</Label>
                <Input type="number" {...register("jumlah_guru")} placeholder="Masukkan jumlah guru" />
                {errors.jumlah_guru && <p className="text-red-500 text-sm">{errors.jumlah_guru.message}</p>}
              </div>
              <div>
                <Label>Jumlah Staff</Label>
                <Input type="number" {...register("jumlah_staf")} placeholder="Masukkan jumlah staff" />
                {errors.jumlah_staf && <p className="text-red-500 text-sm">{errors.jumlah_staf.message}</p>}
              </div>
            </div>

            <div>
              <Label>Kontak</Label>
              <Input {...register("kontak")} placeholder="Masukkan nomor telepon atau email" />
              {errors.kontak && <p className="text-red-500 text-sm">{errors.kontak.message}</p>}
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

        {task === "detail" && dataLembagaPendidikanByID?.data && (
          <div className="p-4 space-y-6">
            <SectionTitle title="Detail Lembaga Pendidikan" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <DetailItem label="Nama Sekolah" value={dataLembagaPendidikanByID.data.nama_sekolah} />
              <DetailItem label="Jenjang Pendidikan" value={dataLembagaPendidikanByID.data.jenjang_pendidikan} />
              <DetailItem label="Alamat" value={dataLembagaPendidikanByID.data.alamat} />
              <DetailItem label="Latitude" value={dataLembagaPendidikanByID.data.latitude} />
              <DetailItem label="Longitude" value={dataLembagaPendidikanByID.data.longitude} />
              <DetailItem label="Jumlah Siswa" value={dataLembagaPendidikanByID.data.jumlah_siswa} />
              <DetailItem label="Jumlah Guru" value={dataLembagaPendidikanByID.data.jumlah_guru} />
              <DetailItem label="Jumlah Staff" value={dataLembagaPendidikanByID.data.jumlah_staff} />
              <DetailItem label="Kontak" value={dataLembagaPendidikanByID.data.kontak} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
