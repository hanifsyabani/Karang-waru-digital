import { LayananDesa, navLinks } from "@/lib/items";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-between px-20 shadow-2xl bg-gray-100 py-10">
      <div className="space-y-4">
        <TitleFooter title="Tentang Desa" />
        <Image
          src={"/logo.png"}
          width={100}
          height={100}
          alt="logo"
          className="w-14"
        />

        <div className="space-y-2">
          <h1 className=" text-lg">Desa Karang Waru</h1>
          <div className="flex items-center gap-3">
            <div className=" rounded-full p-2 bg-green-100 ">
              <Phone size={20} className=" text-primary" />
            </div>
            +62812345678
          </div>
          <div className="flex items-center gap-3">
            <div className=" rounded-full p-2 bg-green-100 ">
              <Mail size={20} className=" text-primary" />
            </div>
            karangwaru@info.com
          </div>
        </div>
      </div>

      <div>
        <TitleFooter title="Akses Cepat" />
        <LinkFooter data={navLinks} />
      </div>

      <div>
        <TitleFooter title="Layanan Desa" />
        <LinkFooter data={LayananDesa} />
      </div>

      <div>
        <TitleFooter title="Jam Operasional" />
        <div className="flex gap-4 mt-4">
          <div className="space-y-1">
            <p>Senin – Jumat: 08.00 – 16.00</p>
            <p>Sabtu – Minggu: Tutup</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TitleFooter({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="w-1/2 border-b-2 border-primary mt-1"></div>
    </div>
  );
}

function LinkFooter({ data }: any) {
  return (
    <ul className="space-y-2" key={data}>
      {data.map((item: any) => (
        <Link
          key={item.title}
          href={item.href}
          className="flex items-center gap-2 mt-4"
        >
          <div className="rounded-full bg-primary w-2 h-2 " />
          <li className="text-lg">{item.title}</li>
        </Link>
      ))}
    </ul>
  );
}
