'use client'

import CardBerita from "@/components/landing_page/berita/card-berita";
import HeaderPage from "@/components/landing_page/header-page";
import HeaderSection from "@/components/landing_page/header-section";
import TabPage from "@/components/landing_page/tab-page";
import { tabsBerita, tabsLayanan } from "@/lib/items";
import { Handshake } from "lucide-react";
import { useState } from "react";

export default function page() {
  const [tabFilter, setTabFilter] = useState<string>(tabsLayanan[0].title);
  return (
    <>
      <HeaderPage
        header="Pelayanan Desa"
        title="Layanan Desa Karang Waru"
        subtitle="Informasi lengkap tentang layanan yang tersedia di Desa Karang Waru"
      />
      <div className="px-10 ">
        <HeaderSection title="Layanan Desa" icon={Handshake} subtitle="Pilih kategori layanan untuk melihat informasi layanan" />
        <TabPage data={tabsLayanan} setTab={setTabFilter} tab={tabFilter} />
      </div>

      <div className="px-10">
        <div className="w-[25%]">
          <CardBerita />
        </div>
      </div>
    </>
  )
}
