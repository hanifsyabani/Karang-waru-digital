import DashboardContent from "@/components/dashboard/overview/dashboard-content";
import { GetDashboardSummary } from "@/service/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminDashboardPage() {
  

  return <DashboardContent  />;
}
