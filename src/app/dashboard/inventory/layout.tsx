import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-4">
        <Button asChild variant="outline" className="w-fit">
          <Link href="/dashboard">Voltar</Link>
        </Button>
      </div>
      <main>{children}</main>
    </div>
  );
}
