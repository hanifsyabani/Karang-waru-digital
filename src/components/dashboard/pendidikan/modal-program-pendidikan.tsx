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
import { GetProgramPendidikanByID, PostProgramPendidikan, PutProgramPendidikan } from "@/service/education";
import SectionTitle from "../section-title";
import DetailItem from "../detail-item";

interface ModalProps {
  refetch: () => void
  task: "add" | "edit" | "detail"
  id?: string
}

export const schema = z.object({
  nama_program: z.string().min(1, { message: "Nama Program Harus diisi" }),
  deskripsi: z.string().min(1, { message: "Deskripsi Harus diisi" }),
  tanggal_mulai: z.string().min(1, { message: "Tanggal Mulai Harus diisi" }),
  tanggal_selesai: z.string().min(1, { message: "Tanggal Selesai Harus diisi" }),
  status: z.string().min(1, { message: "Status Harus diisi" }),
});

type FormFields = z.infer<typeof schema>

export default function ModalProgramPendidikan({ refetch, task, id }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const titleMessage =
    task === "add"
      ? "Tambah Data Program Pendidikan"
      : task === "detail"
        ? "Detail Data Program Pendidikan"
        : "Ubah Data Program Pendidikan";

  const { data: dataProgramPendidikanByID } = useQuery({
    queryFn: () => GetProgramPendidikanByID(id || ""),
    queryKey: ["PeidikanByID", id],
    enabled: !!id && (task === "edit" || task === "detail"),
  });

  const { handleSubmit, register, setValue, watch, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(schema) as any,
  });

  useEffect(() => {
    if (dataProgramPendidikanByID?.data && (task === "edit" || task === "detail")) {
      const d = dataProgramPendidikanByID.data;
      Object.entries(d).forEach(([key, value]) => {
        setValue(key as keyof FormFields, value as any);
      });
    }
  }, [dataProgramPendidikanByID, setValue, task]);

  const { mutate: addProgramPendidikan } = useMutation({
    mutationFn: (data: FormFields) => PostProgramPendidikan(data),
    onSuccess: () => {
      toast.success("Data Program Pendidikan berhasil ditambahkan");
      setIsOpen(false);
      setIsLoading(false);
      refetch();
    },
    onError: () => {
      toast.error("Gagal menambahkan data");
      setIsLoading(false);
    },
  });

  const { mutate: editProgramPendidikan } = useMutation({
    mutationFn: (data: FormFields) => PutProgramPendidikan(data, id || ""),
    onSuccess: () => {
      toast.success("Data Program Pendidikan berhasil diperbarui");
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
    if (task === "edit" && id) editProgramPendidikan(data);
    else addProgramPendidikan(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {task === "add" ? (
          <Button className="bg-white text-primary hover:bg-neutral-100  cursor-pointer">
            <Plus /> Tambah Program
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
            <div>
              <Label>Nama Program</Label>
              <Input {...register("nama_program")} placeholder="Masukkan nama program" />
              {errors.nama_program && <p className="text-red-500 text-sm">{errors.nama_program.message}</p>}
            </div>
            <div>
              <Label>Deskripsi Program</Label>
              <Textarea {...register("deskripsi")} placeholder="Masukkan deskripsi lengkap" />
              {errors.deskripsi && <p className="text-red-500 text-sm">{errors.deskripsi.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tanggal Mulai</Label>
                <Input type="date" {...register("tanggal_mulai")} placeholder="Masukkan tanggal mulai" />
                {errors.tanggal_mulai && <p className="text-red-500 text-sm">{errors.tanggal_mulai.message}</p>}
              </div>
              <div>
                <Label>Tanggal Selesai</Label>
                <Input type="date" {...register("tanggal_selesai")} placeholder="Masukkan tanggal selesai" />
                {errors.tanggal_selesai && <p className="text-red-500 text-sm">{errors.tanggal_selesai.message}</p>}
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select onValueChange={(val) => setValue("status", val)} value={watch("status")} >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="hover:bg-primary cursor-pointer hover:text-white" value="perencanaan">Perencanaan</SelectItem>
                  <SelectItem className="hover:bg-primary cursor-pointer hover:text-white" value="berjalan">Berjalan</SelectItem>
                  <SelectItem className="hover:bg-primary cursor-pointer hover:text-white" value="selesai">Selesai</SelectItem>
                  <SelectItem className="hover:bg-primary cursor-pointer hover:text-white" value="ditunda">Ditunda</SelectItem>
                  <SelectItem className="hover:bg-primary cursor-pointer hover:text-white" value="dibatalkan">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
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

        {task === "detail" && dataProgramPendidikanByID?.data && (
          <div className="p-4 space-y-6">
            <SectionTitle title="Detail Program Pendidikan" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <DetailItem label="Nama Sekolah" value={dataProgramPendidikanByID.data.nama_sekolah} />
              <DetailItem label="Jenjang Pendidikan" value={dataProgramPendidikanByID.data.jenjang_pendidikan} />
              <DetailItem label="Alamat" value={dataProgramPendidikanByID.data.alamat} />
              <DetailItem label="Latitude" value={dataProgramPendidikanByID.data.latitude} />
              <DetailItem label="Longitude" value={dataProgramPendidikanByID.data.longitude} />
              <DetailItem label="Jumlah Siswa" value={dataProgramPendidikanByID.data.jumlah_siswa} />
              <DetailItem label="Jumlah Guru" value={dataProgramPendidikanByID.data.jumlah_guru} />
              <DetailItem label="Jumlah Staff" value={dataProgramPendidikanByID.data.jumlah_staff} />
              <DetailItem label="Kontak" value={dataProgramPendidikanByID.data.kontak} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
