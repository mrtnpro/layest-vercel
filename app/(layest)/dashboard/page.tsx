import Header from "@/components/app-header";
import CollectionContent from "@/components/collections/collection-content";
import CollectionHeader from "@/components/collections/collection-header";
import { getTranslations } from "next-intl/server";

export default async function AppDashboard() {
  const t = await getTranslations("app.dashboard");

  return (
    <>
      <Header title={t("title")} />

      <CollectionHeader title={t("title")} />

      <CollectionContent>WIP</CollectionContent>
    </>
  );
}
