'use client'

import CardBerita from "@/components/landing_page/berita/card-berita";
import HeaderPage from "@/components/landing_page/header-page";
import HeaderSection from "@/components/landing_page/header-section";
import TabPage from "@/components/landing_page/tab-page";
import { tabsBerita } from "@/lib/items";
import { Newspaper } from "lucide-react";
import { useState } from "react";

export default function page() {

    const [tabFilter, setTabFilter] = useState<string>(tabsBerita[0].title);


    return (
        <>
            <HeaderPage header="Informasi Desa" title="Berita Desa" subtitle="Informasi terkini seputar kegiatan dan pengumuman Desa Karang Waru" />
            <div className="px-10 ">
                <HeaderSection title="Informasi Terkini" icon={Newspaper} subtitle="Pilih kategori berita untuk melihat informasi terkini" />
                <TabPage data={tabsBerita} setTab={setTabFilter} tab={tabFilter} />
            </div>

            <div className="px-10">
                <div className="w-[25%]">
                    <CardBerita />
                </div>
            </div>
        </>
    )
}
