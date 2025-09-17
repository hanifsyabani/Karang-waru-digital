import NavbarDash from "@/components/dashboard/navbar-dash";
import SidebarDashboard from "@/components/dashboard/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarDashboard />
      <main className="bg-gray-100 w-full" >
        <NavbarDash />
        <div className="p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
