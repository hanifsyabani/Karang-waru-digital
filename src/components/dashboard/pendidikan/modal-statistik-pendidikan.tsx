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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Pen, Plus } from "lucide-react";
import { GetStatistikPendidikanByID, PostStatistikPendidikan, PutStatistikPendidikan } from "@/service/education";
import SectionTitle from "../section-title";
import DetailItem from "../detail-item";
import { getYears } from "@/lib/utils";

interface ModalProps {
  refetch: () => void
  task: "add" | "edit" | "detail"
  id?: string
}

export const schema = z.object({
  tahun: z.string().min(1, { message: "Tahun harus diisi" }),
  tidak_sekolah: z.coerce.number().min(1, { message: "Data harus diisi" }),
  sd: z.coerce.number().min(1, { message: "Data harus diisi" }),
  smp: z.coerce.number().min(1, { message: "Data harus diisi" }),
  sma: z.coerce.number().min(1, { message: "Dataharus diisi" }),
  perguruan_tinggi: z.coerce.number().min(1, { message: "Data harus diisi" }),
});

type FormFields = z.infer<typeof schema>

export default function ModalStatistikPendidikan({ refetch, task, id }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const titleMessage =
    task === "add"
      ? "Tambah Data Statistik Pendidikan"
      : task === "detail"
        ? "Detail Data Statistik Pendidikan"
        : "Ubah Data Statistik Pendidikan";

  const { data: dataStatistikPendidikanByID } = useQuery({
    queryFn: () => GetStatistikPendidikanByID(id || ""),
    queryKey: ["lembagaPendidikanByID", id],
    enabled: !!id && (task === "edit" || task === "detail"),
  });

  const { handleSubmit, register, setValue, watch, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(schema) as any,
  });

  useEffect(() => {
    if (dataStatistikPendidikanByID?.data && (task === "edit" || task === "detail")) {
      const d = dataStatistikPendidikanByID.data;
      Object.entries(d).forEach(([key, value]) => {
        setValue(key as keyof FormFields, value as any);
      });
    }
  }, [dataStatistikPendidikanByID, setValue, task]);

  const { mutate: addStatistikPendidikan } = useMutation({
    mutationFn: (data: FormFields) => PostStatistikPendidikan(data),
    onSuccess: () => {
      toast.success("Data Statistik Pendidikan berhasil ditambahkan");
      setIsOpen(false);
      setIsLoading(false);
      refetch();
    },
    onError: () => {
      toast.error("Gagal menambahkan data");
      setIsLoading(false);
    },
  });

  const { mutate: editStatistikPendidikan } = useMutation({
    mutationFn: (data: FormFields) => PutStatistikPendidikan(data, id || ""),
    onSuccess: () => {
      toast.success("Data Statistik Pendidikan berhasil diperbarui");
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
    if (task === "edit" && id) editStatistikPendidikan(data);
    else addStatistikPendidikan(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {task === "add" ? (
          <Button className="bg-white text-primary hover:bg-neutral-100  cursor-pointer">
            <Plus /> Tambah Statistik
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
              ? "Isi form berikut untuk menambahkan data statistik pendidikan."
              : task === "detail"
                ? "Berikut adalah detail data statistik pendidikan."
                : "Ubah informasi lembaga pendidikan di form berikut."}
          </DialogDescription>
        </DialogHeader>

        {(task === "add" || task === "edit") && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">

            <div>
              <Label>Tahun</Label>
              <Select onValueChange={(val) => setValue("tahun", val)} value={watch("tahun")} >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih jenjang" />
                </SelectTrigger>
                <SelectContent>
                  {getYears().map((year) => (
                    <SelectItem value={year.toString()} key={year} className="hover:bg-primary cursor-pointer hover:text-white">
                      {year}
                    </SelectItem>
                  ))}

                </SelectContent>
              </Select>
              {errors.tahun && <p className="text-red-500 text-sm">{errors.tahun.message}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Jumlah Tidak Sekolah</Label>
                <Input type="number" {...register("tidak_sekolah")} placeholder="Masukkan jumlah siswa" />
                {errors.tidak_sekolah && <p className="text-red-500 text-sm">{errors.tidak_sekolah.message}</p>}
              </div>
              <div>
                <Label>Jumlah Siswa SD</Label>
                <Input type="number" {...register("sd")} placeholder="Masukkan jumlah guru" />
                {errors.sd && <p className="text-red-500 text-sm">{errors.sd.message}</p>}
              </div>
              <div>
                <Label>Jumlah Siswa SMP</Label>
                <Input type="number" {...register("smp")} placeholder="Masukkan jumlah staff" />
                {errors.smp && <p className="text-red-500 text-sm">{errors.smp.message}</p>}
              </div>

            </div>
            <div className="grid grid-cols-2 gap-4">

              <div>
                <Label>Jumlah Siswa SMA</Label>
                <Input type="number" {...register("sma")} placeholder="Masukkan jumlah staff" />
                {errors.sma && <p className="text-red-500 text-sm">{errors.sma.message}</p>}
              </div>
              <div>
                <Label>Jumlah Mahasiswa Perguruan Tinggi</Label>
                <Input type="number" {...register("perguruan_tinggi")} placeholder="Masukkan jumlah staff" />
                {errors.perguruan_tinggi && <p className="text-red-500 text-sm">{errors.perguruan_tinggi.message}</p>}
              </div>
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

        {task === "detail" && dataStatistikPendidikanByID?.data && (
          <div className="p-4 space-y-6">
            <SectionTitle title="Detail Lembaga Pendidikan" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <DetailItem label="Tahun" value={dataStatistikPendidikanByID.data.tahun} isStatus={false} />
              <DetailItem label="Jumlah Tidak Sekolah" value={dataStatistikPendidikanByID.data.jumlah_siswa} isStatus={false} />
              <DetailItem label="Jumlah Siswa SD" value={dataStatistikPendidikanByID.data.jumlah_guru} isStatus={false} />
              <DetailItem label="Jumlah Siswa SMP" value={dataStatistikPendidikanByID.data.jumlah_staf} isStatus={false} />
              <DetailItem label="Jumlah Siswa SMA" value={dataStatistikPendidikanByID.data.sma} isStatus={false} />
              <DetailItem label="Jumlah Mahasiswa Perguruan Tinggi" value={dataStatistikPendidikanByID.data.perguruan_tinggi} isStatus={false} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
