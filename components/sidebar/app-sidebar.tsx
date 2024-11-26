"use client";

import * as React from "react";

import { NavLogo } from "@/components/sidebar/nav-logo";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { SessionProvider } from "next-auth/react";

const data = {
  nav: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Clients",
      url: "/clients",
      icon: UsersIcon,
    },
    {
      name: "Projects",
      url: "/projects",
      icon: FolderIcon,
    },
    {
      name: "Reports",
      url: "/reports",
      icon: ChartPieIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <SessionProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader className="flex-row justify-between">
          <NavLogo />
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.nav} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SessionProvider>
  );
}
