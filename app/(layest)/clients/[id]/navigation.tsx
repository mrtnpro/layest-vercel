"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavigationProps = { id: string };

export default function Navigation({ id }: NavigationProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="flex gap-2">
      <Button variant="ghost" asChild>
        <Link
          className={cn(segment === "overview" && "border border-primary-700")}
          href={`/clients/${id}/overview`}
        >
          Overview
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link
          className={cn(segment === "company" && "border border-primary-700")}
          href={`/clients/${id}/company`}
        >
          Company
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link
          className={cn(segment === "reports" && "border border-primary-700")}
          href={`/clients/${id}/reports`}
        >
          Reports
        </Link>
      </Button>
    </nav>
  );
}
