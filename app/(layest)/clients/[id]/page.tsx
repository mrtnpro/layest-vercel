import { redirect } from "next/navigation";

type LayoutProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: LayoutProps) {
  const id = (await params).id;

  redirect(`/clients/${id}/overview`);
}
