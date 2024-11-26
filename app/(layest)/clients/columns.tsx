"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { components } from "@/schemas/api";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<components["schemas"]["ResponseClientDto"]>[] =
  [
    {
      id: "fullname",
      header: "Full name",
      cell: ({ row }) => {
        return (
          <Button variant="link" asChild>
            <Link href={`/clients/${row.original.id}`}>
              {row.original.firstname} {row.original.lastname}
            </Link>
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "company",
      header: "Company",
    },
    {
      id: "lastInteraction",
      header: "Last Interaction",
    },
  ];
