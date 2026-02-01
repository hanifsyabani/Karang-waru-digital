import StatsUmkm from "@/components/dashboard/umkm/stats-umkm";
import TableUmkm from "@/components/dashboard/umkm/table-umkm";
import UmkmView from "@/components/dashboard/umkm/table-umkm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UMKM",
};

export default function page() {
  return (
    <>
      <StatsUmkm />
      <TableUmkm />
    </>
  )
}
