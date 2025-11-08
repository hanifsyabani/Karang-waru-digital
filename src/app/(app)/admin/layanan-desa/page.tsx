import LayananView from "@/components/dashboard/layanan-desa/layanan-view";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Layanan",
};

export default function page() {
  return (
    <>
      <LayananView/>
    </>
  )
}
