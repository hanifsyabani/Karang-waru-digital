import { ChevronUp, Info } from "lucide-react";
import { Button } from "../ui/button";

export default function Jumbotron() {
  return (
    <div className="relative space-y-12 ">
      <button className="bg-green-950 flex items-center gap-2 cursor-pointer text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
        <ChevronUp size={20} />
        <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
        Desa Digital
      </button>
      <div className="space-y-6">
        <h1 className="text-7xl font-extrabold tracking-wide">
          Desa Karang Waru
        </h1>
        <p className="text-lg md:text-2xl z-10">
          Kecamatan Lawang Wetan, Kabupaten Musi Banyuasin, Provinsi Sumatera
          Selatan
        </p>
      </div>
      <div className="flex gap-6">
        <Button className="bg-white  text-primary px-6 py-3 text-lg rounded-md hover:bg-white/90 w-48 cursor-pointer">
          <Info size={25} />
          Jelajahi Desa
        </Button>
        <Button className="bg-primary w-48 text-lg text-white px-6 py-3 rounded-md hover:bg-green-700 cursor-pointer">
          <Info size={25} />
          Layanan Desa
        </Button>
      </div>
    </div>
  );
}
