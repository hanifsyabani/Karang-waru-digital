"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { adminNavLinks } from "@/lib/items";
import Copyright from "../copyright";


export default function SidebarDashboard() {
    const pathname = usePathname();
    return (
        <Sidebar side="left" collapsible="icon">
            <SidebarContent>
                <Link href={`/admin`} className="flex items-center gap-2 bg-gradient-to-r from-primary to-green-900 p-4 ">
                    <Image
                        src={"/logo.png"}
                        width={35}
                        height={35}
                        alt={"logo"}
                    />
                    <div>
                        <h1 className="text-lg text-white font-bold">Desa Karang Waru</h1>
                        <p className="text-sm text-white">Muba Maju Berjaya</p>
                    </div>
                </Link>
                <SidebarGroup className="px-3 py-2">
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {adminNavLinks.map((item) => {
                                const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
                                return (
                                    <SidebarMenuItem key={item.title} className={`${isActive && "bg-primary text-white rounded-lg"}`}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.href}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            }
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="px-5 mt-4">
                    <Copyright variant="dashboard" />
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
