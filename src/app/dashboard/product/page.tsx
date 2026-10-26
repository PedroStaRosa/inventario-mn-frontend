import TableProducts from "./_components/tableProdcts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Button asChild variant="outline" className="w-fit">
          <Link href="/dashboard">Voltar</Link>
        </Button>
      </div>

      <div className="space-y-4">
        <TableProducts />
      </div>
    </div>
  );
}
