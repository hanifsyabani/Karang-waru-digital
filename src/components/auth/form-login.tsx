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
import { Login } from "@/service/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { error: "Invalid email" }),
  password: z.string().min(8, { error: "Password must be at least 8 characters" }),
})
type FormFields = z.infer<typeof schema>

export default function FormLogin() {
  const [isLoading, setISLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate: login } = useMutation({
    mutationFn: (data: FormFields) => Login(data),
    onSuccess: ({ data }) => {
      setISLoading(false)
      toast.success('Login Berhasil', {
        theme: "colored"
      })

      if (data.user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/user')
      }
    }, onError: () => {
      setISLoading(false)
      toast.error('Periksa Kembali Email dan Password Anda', {
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
          <p className="text-gray-500">Masuk untuk mengakses layanan desa</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-6">
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

        <div className="flex justify-end">
          <p>Lupa Password?</p>
        </div>

        <Button className="w-full cursor-pointer mt-4" disabled={isLoading}>
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
