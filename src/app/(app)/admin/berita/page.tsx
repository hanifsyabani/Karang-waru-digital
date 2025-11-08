import BeritaView from "@/components/dashboard/berita/berita-view";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Berita",
};

export default function page() {
  return (
    <>
        <BeritaView />
    </>
  )
}
