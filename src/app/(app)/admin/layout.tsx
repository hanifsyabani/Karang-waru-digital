import NavbarDash from "@/components/dashboard/navbar-dash";
import SidebarDashboard from "@/components/dashboard/sidebar";
import ProtectedAdminLayout from "@/components/layout/protected-admin-layout";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedAdminLayout>
      <SidebarProvider>
        <SidebarDashboard />
        <main className="bg-gray-100 w-full" >
          <NavbarDash />
          <div className="p-4">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </ProtectedAdminLayout>
  )
}
