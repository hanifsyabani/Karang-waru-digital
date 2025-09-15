import { CircleDot, Home, LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";

export default function FormLogin() {
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

      <form action="" className="space-y-4 my-6">
        <div className="space-y-3">
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Masukan email" id="email" className="py-6" />
        </div>
        <div className="space-y-3">
          <Label htmlFor="password">Password</Label>
          <Input type="password" placeholder="Masukan password" id="password" className="py-6" />
        </div>

        <div className="flex justify-end">
          <p>Lupa Password?</p>
        </div>

          <Button className="w-full cursor-pointer mt-4"><LogIn /> Masuk</Button>

          <p className="text-center">
            Belum punya akun?{" "}
            <Link href={'/register'} className="text-primary cursor-pointer">Daftar</Link>
          </p>
      </form>
    </div>
  )
}
