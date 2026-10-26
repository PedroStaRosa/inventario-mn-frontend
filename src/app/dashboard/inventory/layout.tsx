<<<<<<< HEAD
import PageHeader from "@/components/headers/pageHeader";

export default function ProductsLayout({
=======
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function InventoryLayout({
>>>>>>> origin/main
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<<<<<<< HEAD
    <div className="flex min-h-0 flex-1 flex-col">
      <PageHeader title="Inventário" />
      <main className="min-h-0 flex-1 flex px-8">{children}</main>
=======
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-4">
        <Button asChild variant="outline" className="w-fit">
          <Link href="/dashboard">Voltar</Link>
        </Button>
      </div>
      <main>{children}</main>
>>>>>>> origin/main
    </div>
  );
}
