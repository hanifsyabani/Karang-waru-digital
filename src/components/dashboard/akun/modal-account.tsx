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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Eye, Pen, Plus, User, Mail, ShieldCheck, EyeOff } from "lucide-react";
import { GetAccountById, PostAccount, PutAccount } from "@/service/account";

interface ModalProps {
    refetch: () => void
    task: "add" | "edit" | "detail"
    id?: string
    refetchAll: () => void
}

export const schema = z
    .object({
        name: z.string().min(3, { message: "Nama lengkap minimal 3 karakter" }),
        email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Email tidak valid" }),
        password: z.string().min(8, { message: "Password minimal 8 karakter" }),
    })

type FormFields = z.infer<typeof schema>

export default function ModalAccount({ refetch, task, id }: ModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const buttonMessage = task === "add" ? "Tambah Akun" : task === "detail" ? "Lihat Detail" : "Ubah Akun";
    const titleMessage = task === "add" ? "Tambah Data Akun" : task === "detail" ? "Detail Data Akun" : "Ubah Data Akun";

    const { data: dataAccount } = useQuery({
        queryFn: () => GetAccountById(id || ""),
        queryKey: ["accountByID", id],
        enabled: (task === "edit" || task === "detail") && !!id,
    })

    const { handleSubmit, register, setValue, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema) as any,
    })

    useEffect(() => {
        if (dataAccount?.data) {
            const d = dataAccount.data
            setValue("name", d.name)
            setValue("email", d.email)
            setValue("password", d.password)
        }
    }, [dataAccount, setValue])

    const { mutate: addAccount } = useMutation({
        mutationFn: (data: FormFields) => PostAccount(data),
        onSuccess: () => {
            toast.success("Data Account berhasil ditambahkan")
            setIsOpen(false)
            setIsLoading(false)
            refetch()
        },
        onError: () => {
            toast.error("Gagal menambahkan data")
            setIsLoading(false)
        }
    })

    const { mutate: editAccount } = useMutation({
        mutationFn: (data: FormFields) => PutAccount(data, id || ""),
        onSuccess: () => {
            toast.success("Data Account berhasil diperbarui")
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
            name: data.name,
            email: data.email,
        }
        if (task === "edit" && id) editAccount(payload as any)
        else addAccount(payload as any)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {task === "add" ? (
                    <Button className="bg-primary cursor-pointer">
                        <Plus /> Tambah Akun
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
                        {task === "add" ? "Isi form berikut untuk menambahkan data." : task === "detail" ? "Berikut adalah detail data akun." : "Ubah informasi data akun."}
                    </DialogDescription>
                </DialogHeader>

                {(task === "add" || task === "edit") && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-6">
                        <div className="space-y-3">
                            <Label htmlFor="name" >Nama Lengkap</Label>
                            <Input type="text" {...register("name")} placeholder="Masukan nama anda..." id="name" className="py-6" />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="email" >Email</Label>
                            <Input type="email" {...register("email")} placeholder="Masukan email" id="email" className="py-6" />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="password" >Password</Label>
                            <Input readOnly  type="password" {...register("password")} placeholder="Masukan password" id="password" className="py-6" />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>
                       
                        <div className="flex justify-end">
                            <Button disabled={isLoading} className="cursor-pointer">
                                {isLoading ? <span className="loader" /> : buttonMessage}
                            </Button>
                        </div>
                    </form>
                )}

                {task === "detail" && (
                    <div className="space-y-6 my-4">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                                <User className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold">{dataAccount?.data?.name || "-"}</p>
                                <p className="text-sm text-muted-foreground">{dataAccount?.data?.email || "-"}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-4">
                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 mt-0.5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                                    <p className="font-medium">{dataAccount?.data?.name || "-"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 mt-0.5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{dataAccount?.data?.email || "-"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 mt-0.5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Role</p>
                                    <Badge variant="outline" className="mt-1 capitalize">
                                        {dataAccount?.data?.role || "-"}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
