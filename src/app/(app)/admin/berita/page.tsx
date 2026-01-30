import StatsNews from "@/components/dashboard/berita/stats-news";
import TableNews from "@/components/dashboard/berita/table-news";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Berita",
};

export default function page() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-5 bg-white ">
        <StatsNews />
        <TableNews />
      </main>
    </>
  )
}
