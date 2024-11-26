import Header from "@/components/app-header";
import CollectionContent from "@/components/collections/collection-content";

import Navigation from "./navigation";

type LayoutProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export default async function Layout({ params, children }: LayoutProps) {
  const id = (await params).id;

  const breadcrumbs = [{ href: "/clients", title: "Clients" }];

  return (
    <>
      <Header title={id} breadcrumbs={breadcrumbs} />

      <CollectionContent>
        <Navigation id={id} />
        {children}
      </CollectionContent>
    </>
  );
}
