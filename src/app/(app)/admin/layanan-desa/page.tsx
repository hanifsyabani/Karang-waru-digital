import ListServiceVillage from "@/components/dashboard/village-service/list-service-village";
import StatsServiceVillage from "@/components/dashboard/village-service/stats-service-village";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Layanan",
};

export default function page() {
  return (
    <>
      <StatsServiceVillage/>
      <ListServiceVillage/>
    </>
  )
}
