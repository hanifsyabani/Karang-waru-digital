'use client'

import HeaderPage from "@/components/landing_page/header-page";
import HeaderSection from "@/components/landing_page/header-section";
import TabPage from "@/components/landing_page/tab-page";
import CardUmkm from "@/components/landing_page/umkm/card-umkm";
import {  tabsUmkm, umkmContent } from "@/lib/items";
import { Store } from "lucide-react";
import { useState } from "react";

export default function Page() {
    const [tabFilter, setTabFilter] = useState<string>(tabsUmkm[0].title);
    return (
        <div className="pb-10">
            <HeaderPage
                header="Eksplorasi UMKM"
                title="UMKM Desa Karang Waru"
                subtitle="Temukan berbagai produk dan layanan unggulan dari pelaku UMKM Desa Karang Waru"
            />
            <div className="px-10 ">
                <HeaderSection title="UMKM Desa" icon={Store} subtitle="Pilih kategori berita untuk melihat UMKM Desa" />
                <TabPage data={tabsUmkm} setTab={setTabFilter} tab={tabFilter} />
            </div>

            <div className="px-10 grid grid-cols-3 gap-4">
                {umkmContent.map((item: any) => (
                    <div key={item.title}>
                        <CardUmkm data={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}
