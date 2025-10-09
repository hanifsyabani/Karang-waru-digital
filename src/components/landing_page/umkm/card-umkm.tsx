import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight,  User, Verified } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface UmkmProps {
  title: string;
  category: string;
  href: string;
}

export default function CardUmkm({ data }: { data: UmkmProps }) {
  return (
    <div className=" rounded-lg cursor-pointer overflow-hidden border shadow-lg group">
      <Image
        src="/desa-main.png"
        alt="logo"
        width={100}
        height={100}
        className="w-full"
      />
      <div className="px-6 space-y-2 py-3">
        <div className="flex justify-between items-center mb-4">
          <Badge className="bg-green-200 text-primary">{data.category}</Badge>
          <Badge className="">
            <Verified />
            Terverifikasi
          </Badge>
        </div>

        <div className="space-y-4 ">
          <div>
            <h1 className="font-semibold text-xl group-hover:text-primary">
              {data.title}
            </h1>
            <div className="w-1/4 border-b-2 border-primary mt-1"></div>
          </div>
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
            <Link href={data.href} className="text-sm ">
              <Button className="bg-white text-gray-500 hover:bg-white hover:text-primary cursor-pointer ">
                Lihat Detail <ArrowRight />{" "}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
