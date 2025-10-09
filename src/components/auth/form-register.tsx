'use client'

import { CircleDot, Home, LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {  Register } from "@/service/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const schema = z.object({
    name: z.string().min(3, { error: "Nama minimal 3 karakter" }),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { error: "Email tidak valid" }),
    password: z.string().min(8, { error: "Password harus minimal 8 karakter" }),
    confirmPassword: z.string().min(8, { error: "Password harus minimal 8 karakter" }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password tidak sama",
})
type FormFields = z.infer<typeof schema>

export default function FormRegister() {
    const [isLoading, setISLoading] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const { mutate: login } = useMutation({
        mutationFn: (data: FormFields) => Register(data),
        onSuccess: () => {
            setISLoading(false)
            toast.success('Register Berhasil', {
                theme: "colored"
            })
            router.push('/login')


        }, onError: () => {
            setISLoading(false)
            toast.error('Periksa Kembali data anda', {
                theme: "colored"
            })
        }
    })


    function onSubmit(data: FormFields) {
        setISLoading(true)
        login(data)
    }

    return (
        <div >
            <div>
                <Button className="bg-primary rounded-full">
                    <Home /> Portal Desa Digital
                </Button>
            </div>

            <div className="space-y-4 mt-4">
                <h1 className="text-4xl font-bold text-primary">Selamat Datang!</h1>
                <div className="flex items-center gap-2">
                    <CircleDot size={15} className="text-primary" />
                    <p className="text-gray-500">Daftarkan akun untuk mengakses layanan desa</p>
                </div>
            </div>

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
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" {...register("password")} placeholder="Masukan password" id="password" className="py-6" />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div className="space-y-3">
                    <Label htmlFor="password">Konfirmasi Password</Label>
                    <Input type="password" {...register("confirmPassword")} placeholder="Masukan password kembali" id="password" className="py-6" />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                </div>

                <div className="flex justify-end">
                    <p>Lupa Password?</p>
                </div>

                <Button className="w-full cursor-pointer mt-4">
                    {isLoading ? <span className="loader" /> : (
                        <>
                            <LogIn />
                            <p>Masuk</p>
                        </>
                    )}
                </Button>

                <p className="text-center">
                    Belum punya akun?{" "}
                    <Link href={'/register'} className="text-primary cursor-pointer">Daftar</Link>
                </p>
            </form>
        </div>
    )
}
