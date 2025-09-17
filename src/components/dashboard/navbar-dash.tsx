'use client'

import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SidebarTrigger } from "../ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query"
import { Logout } from "@/service/auth"
import { useState } from "react"
import { toast } from "react-toastify"

export default function NavbarDash() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const { mutate: logout } = useMutation({
        mutationFn: () => Logout(),
        onSuccess: () => {
            setIsLoading(false)
            toast.success('Logout Berhasil', {
                theme: "colored"
            })
            router.push('/login')
        },
        onError: () => {
            setIsLoading(false)
            toast.error('Logout Gagal', {
                theme: "colored"
            })
        }
    })
    return (
        <div className="flex items-center justify-between pr-8 pl-4 py-2">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div>
                    <h1>Selamat Datang, <span className="font-bold">Admin</span></h1>
                    <p>Kelola data desa, layanan, dan informasi dengan lebih mudah di Dashboard Karang-Waru.</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>User</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            setIsLoading(true)
                            logout()
                        }} className="bg-red-600 flex justify-center cursor-pointer text-center hover:bg-red-700  text-white">
                            {isLoading ? <span className="loader"></span> : (
                                <>
                                    <LogOut size={20} className="text-white" />Logout
                                </>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
