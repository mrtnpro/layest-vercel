type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const id = (await params).id;

  return (
    <div>
      reports for <strong>clientId {id}</strong>
    </div>
  );
}
