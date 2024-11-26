import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs?: { title: string; href: string }[];
}) {
  return (
    <div className="flex h-12 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-container">
        <SidebarTrigger className="-mx-1 sm:hidden" />
        <Separator orientation="vertical" className="mr-1 h-4 sm:hidden" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs?.map((item) => (
              <Fragment key={item.title}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
