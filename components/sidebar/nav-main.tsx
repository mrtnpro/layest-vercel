"use client";

import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UrlObject } from "url";

export function NavMain({
  title,
  items,
}: {
  title?: string;
  items: {
    name: string;
    url: string;
    icon: React.ComponentType<{ className: string }>;
  }[];
}) {
  // Info: to hide this navigation on collapsed sidebar: className="group-data-[collapsible=icon]:hidden"

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name}>
              <Link href={item.url as unknown as UrlObject}>
                <item.icon className="text-secondary-foreground-muted" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
