"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { adminNavLinks } from "@/lib/items";


export default function SidebarDashboard() {
    const pathname = usePathname();
    return (
        <Sidebar side="left" collapsible="icon">
            <SidebarContent className="py-5 px-2 h-full bg-white ">
                <Link href={`/admin`} className="flex items-center gap-2">
                    <Image
                        src={"/logo.png"}
                        width={100}
                        height={100}
                        alt={"logo"}
                        className="w-14"
                    />
                    <h1 className="text-xl font-bold">Desa Karang Waru</h1>
                </Link>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {adminNavLinks.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <SidebarMenuItem key={item.title} className={`${isActive && "bg-primary text-white rounded-lg"} `}>
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

            </SidebarContent>
        </Sidebar>
    );
}
