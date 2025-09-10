'use client'

import HeaderPage from "@/components/landing_page/header-page";
import Geografis from "@/components/landing_page/profil/geografis";
import InfoUmum from "@/components/landing_page/profil/info-umum";
import Sejarah from "@/components/landing_page/profil/sejarah";
import StrukturPemerintahan from "@/components/landing_page/profil/struktur-pemerintahan";
import VisiMisi from "@/components/landing_page/profil/visi-misi";
import TabPage from "@/components/landing_page/tab-page";
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
      <HeaderPage header="Profil Desa" title="Profil Desa Karang Waru" subtitle="Mengenal Sejarah, Visi dan Misi, dan Struktur Pemerintahan Desa Karang Waru" />
      <TabPage data={tabsProfil} setTab={setTab} tab={tab} />

      <div className="px-10">
        {changeTab(tab)}
      </div>
    </>
  )
}
