import Copyright from "@/components/copyright";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex h-screen w-screen items-center justify-center gap-5">
            <div className="w-1/2 bg-gradient-to-r from-primary to-green-800 p-8 h-full">
                <Link href={"/"} className="text-white flex items-center gap-4">
                    <Image src={"/logo.png"} alt="logo" width={100} height={100} className="w-14" />
                    <div>
                        <h1 className="font-bold">Desa Karang Waru</h1>
                        <p>Lawang Wetan, Musi Banyuasin, Sumatera Selatan</p>
                    </div>
                </Link>

                <div className="space-y-3 mt-8">
                    <h1 className="text-3xl font-bold text-white">Layanan Desa Karang Waru</h1>
                    <p className="text-white">Akses informasi dan layanan desa kapan pun dan dimana pun</p>
                </div>

                <div className="rounded-lg my-4 ">
                    <Image src={"/desa-main.png"} alt="logo" width={500} height={500} className="w-full h-[500px] rounded-lg " />
                </div>

                <Copyright variant="" />
            </div>
            <div className="w-1/2 bg-white p-8">
                {children}
            </div>
        </main>
    );
}
