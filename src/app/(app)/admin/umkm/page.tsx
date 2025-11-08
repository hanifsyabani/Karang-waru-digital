import UmkmView from "@/components/dashboard/umkm/umkm-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UMKM",
};

export default function page() {
  return (
    <>
        <UmkmView/>
    </>
  )
}
