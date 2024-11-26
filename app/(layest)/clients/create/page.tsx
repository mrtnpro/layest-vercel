import Header from "@/components/app-header";
import CollectionContent from "@/components/collections/collection-content";
import CollectionHeader from "@/components/collections/collection-header";
import ClientForm from "@/components/forms/client";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("app.clients");

  const breadcrumbs = [{ href: "/clients", title: t("title") }];

  return (
    <>
      <Header title={t("create.breadcrumb")} breadcrumbs={breadcrumbs} />

      <CollectionHeader title={t("create.title")} />

      <CollectionContent>
        <ClientForm />
      </CollectionContent>
    </>
  );
}
