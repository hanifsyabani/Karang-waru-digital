'use client'

import HeaderPage from "@/components/landing_page/header-page";
import Geografis from "@/components/landing_page/profil/geografis";
import InfoUmum from "@/components/landing_page/profil/info-umum";
import Sejarah from "@/components/landing_page/profil/sejarah";
import StrukturPemerintahan from "@/components/landing_page/profil/struktur-pemerintahan";
import VisiMisi from "@/components/landing_page/profil/visi-misi";
import { Button } from "@/components/ui/button";
import { tabsProfil } from "@/lib/items";
import { useState } from "react";

export default function page() {

  const [tab, setTab] = useState<string>(tabsProfil[0].title);

  function changeTab(title: string) {
    switch (title) {
      case "Informasi Umum":
        return <InfoUmum />
      case "Sejarah":
        return <Sejarah />
      case "Visi dan Misi":
        return <VisiMisi />
      case "Geografis":
        return <Geografis />
      case "Struktur Pemerintahan":
        return <StrukturPemerintahan />
    }
  }
  return (
    <>
      <HeaderPage title="Profil Desa Karang Waru" />

      <div className="flex items-center gap-8 px-10 " >
        {tabsProfil.map((item) => (
          <Button
            key={item.title}
            className={`text-lg font-semibold hover:text-white cursor-pointer hover:bg-primary ${item.title === tab ? "text-white bg-primary" : "text-gray-500 bg-gray-200"
              }`}
            onClick={() => setTab(item.title)}
          >
            <item.icon size={24} />
            <p className="text-sm">{item.title}</p>
          </Button>
        ))}
      </div>

      <div className="px-10">
        {changeTab(tab)}
      </div>
    </>
  )
}
