import PageHeader from "@/components/headers/pageHeader";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PageHeader title="Inventário" />
      <main className="min-h-0 flex-1 flex px-8">{children}</main>
    </div>
  );
}
