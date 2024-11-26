"use client";

import Link from "next/link";

import { federatedSignOut } from "@/actions/federatedSignOut";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BellAlertIcon,
  ChevronUpDownIcon,
  CreditCardIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

import { Skeleton } from "../ui/skeleton";

export function NavUser() {
  const { isMobile } = useSidebar();

  const session = useSession();

  const name = session.data?.user?.name ?? "";
  const email = session.data?.user?.email ?? "";
  const image = session.data?.user?.image ?? undefined;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={email}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg group-data-[collapsible=icon]:-mx-1.5">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {session.status === "loading" ? (
                  <>
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="mt-1 h-2.5 w-full" />
                  </>
                ) : (
                  <>
                    <span className="truncate font-semibold">{name}</span>
                    <span className="truncate text-xs">{email}</span>
                  </>
                )}
              </div>
              <ChevronUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={image} alt={name} />
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>Upgrade to Pro</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/account">
                  <UserCircleIcon />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <BellAlertIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <form className="grid gap-2" action={federatedSignOut}>
              <DropdownMenuItem asChild>
                <button type="submit">
                  <PowerIcon />
                  Log out
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
