import { Button } from "@/components/ui/button";
import { ChevronUp, Info } from "lucide-react";

export default function page() {
  return (
    <>
      <section
        style={{ backgroundImage: "url('/desa-main.png')", height: "90vh" }}
        className="h-screen bg-cover bg-center flex items-center text-white px-4"
      >
        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="relative space-y-9 ">
          <button className="bg-green-950 flex items-center gap-2 cursor-pointer text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <ChevronUp size={20} />
            <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Desa Digital
          </button>
          <div className="space-y-2">
            <h1 className="text-6xl font-extrabold tracking-wide">
              Desa Karang Waru
            </h1>
            <p className="text-lg md:text-2xl z-10">
              Kecamatan Balai Agung, Kabupaten Musi Banyuasin, Provinsi Sumatera
              Selatan
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-white  text-primary px-6 py-3 rounded-md hover:bg-white/90 cursor-pointer">
              <Info size={20} />
              Jelajahi Desa
            </Button>
            <Button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-green-700 cursor-pointer">
              <Info size={20} />
              Layanan Desa
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
