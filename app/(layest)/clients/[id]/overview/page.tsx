type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const id = (await params).id;

  await new Promise((f) => setTimeout(f, 2000));

  return (
    <div>
      overview for <strong>clientId {id}</strong>
    </div>
  );
}
