import Link from "next/link";

import { getClients } from "@/actions/clients/getClients";
import Header from "@/components/app-header";
import CollectionContent from "@/components/collections/collection-content";
import CollectionHeader from "@/components/collections/collection-header";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export const dynamic = "force-dynamic";

export default async function AppClients() {
  const t = await getTranslations("app.clients");
  const clients = await getClients();

  const data = clients.data || [
    {
      id: 21,
      email: "Mattie8@example.net",
      firstname: "Asha",
      lastname: "Gislason",
      account: "individual",
      phone: "935-953-6653",
      address: "787 Derrick Turnpike",
      city: "North Chynamouth",
      zipcode: null,
      country: "TR",
      customFields: {},
    },
  ];

  console.log("result", clients);

  return (
    <>
      <Header title={t("title")} />
      <CollectionHeader title={t("title")} count={data.length}>
        <Button asChild>
          <Link href="/clients/create">{t("button.create")}</Link>
        </Button>
      </CollectionHeader>
      <CollectionContent>
        <DataTable columns={columns} data={data} />
      </CollectionContent>
    </>
  );
}
