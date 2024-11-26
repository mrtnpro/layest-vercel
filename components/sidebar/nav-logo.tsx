"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import LayestIcon from "@/images/layest-icon.svg";

export function NavLogo() {
  return (
    <Link href="/dashboard" className="flex gap-2" aria-hidden tabIndex={-1}>
      <div className="flex h-8 w-12 flex-shrink-0 translate-x-1 items-center justify-center px-1 transition-[width,transform] group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:translate-x-0">
        <Image
          src={LayestIcon}
          alt="Layest"
          width={48}
          height={48}
          className="max-w-full"
        />
      </div>
    </Link>
  );
}
