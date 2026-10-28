import { listInventoryService } from "@/services/inventory/inventoryService";
import { InventoryTable } from "./_components/inventoryTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FilePlusCorner } from "lucide-react";

export default async function InventoryPage() {
  const inventories = await listInventoryService();
  return (
    <div className="flex flex-col h-full min-h-0 w-full">
      <h1 className="text-2xl font-bold">Inventários</h1>
      <span className="text-sm text-gray-500">
        Importe planilhas, acompanhe processamentos e visualize resultados.
      </span>
      <div className="flex-1 min-h-0 flex flex-col w-full ">
        <div className="flex items-center justify-between w-full mb-4">
          <span className="text-sm text-muted-foreground">
            Gerencie os inventários da sua empresa
          </span>
          <span className="text-sm text-muted-foreground">
            Total de Inventários: {inventories.length}
          </span>
          <div className="flex items-center gap-2">
            <Button asChild className="shadow-md hover:shadow-lg font-bold">
              <Link
                href="/dashboard/inventory/import"
                className="flex items-center gap-2"
              >
                <FilePlusCorner className="w-4 h-4" /> Importar Inventários CSV
              </Link>
            </Button>
          </div>
        </div>
        <InventoryTable inventories={inventories} />
      </div>
    </div>
  );
}
