import { Button } from "@/components/ui/button";
import { Megaphone, User } from "lucide-react";
import Image from "next/image";

export default function CardBerita() {
  return (
    <div className="rounded-lg cursor-pointer overflow-hidden border shadow-lg group">
      <Image
        src="/desa-main.png"
        alt="logo"
        width={100}
        height={100}
        className="w-full"
      />
      <div className="px-6 space-y-2 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 my-4">
            <div className="text-center">
              <div className="bg-primary text-white p-1">JUL</div>
              <div className="bg-green-100 text-green-800 p-1">20</div>
            </div>
            <div className="text-gray-500 text-sm">
              <p>2025 </p>
              <span>Sabtu</span>
            </div>
          </div>
          <div className="bg-orange-500 text-white flex gap-2  items-center rounded-lg p-2">
            <Megaphone />
            Pengumuman
          </div>
        </div>

        <div className="space-y-4 ">
          <h1 className="font-semibold text-xl group-hover:text-primary">
            Pengumuman Bedah Rumah Desa Karang Waru
          </h1>
          <div className="flex items-center gap-2">
            <div className="h-8 w-0.5 bg-primary" />
            <p className="text-sm ">
              Program bedah rumah ini bertujuan untuk meningktakan...
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <div className="flex gap-2 text-sm text-gray-500">
            <User className="text-primary" /> Kepala Desa
          </div>

          <div>
            <Button className="bg-green-100 text-primary hover:bg-green-200  cursor-pointer">
              Baca Selengkapnya...
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
