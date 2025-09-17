import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { SidebarTrigger } from "../ui/sidebar"

export default function NavbarDash() {
    return (
        <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div>
                    <h1>Selamat Datang, <span className="font-bold">Admin</span></h1>
                    <p>Kelola data desa, layanan, dan informasi dengan lebih mudah di Dashboard Karang-Waru.</p>
                </div>
            </div>
            <div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}
