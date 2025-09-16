'use client'

import { navLinks } from "@/lib/items";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  return (
    <nav className="w-full flex justify-between items-center px-4 py-2 fixed bg-white z-50">
      <Image
        src="/logo.png"
        alt="logo"
        width={100}
        height={100}
        className="w-10"
      />
      <div>
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathName === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors ${isActive
                    ? "text-primary font-semibold border-b-2 border-primary pb-1"
                    : "text-gray-700 hover:text-primary"
                    }`}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center gap-2">
        <Link href={"/login"}>
          <Button className="bg-primary cursor-pointer ">Masuk</Button>
        </Link>
        <Link href={"/register"}>
          <Button
            className="border border-primary cursor-pointer hover:bg-white"
            variant={"outline"}
          >
            Daftar
          </Button>
        </Link>
      </div>
    </nav>
  );
}
