import { Button } from "@/components/ui/button";
import { parseDate } from "@/lib/parseDate";
import { getInventoryByIdService } from "@/services/inventory/inventoryService";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InventoryItemsTable } from "./_components/inventoryItemsTable";
import { BackButton } from "@/components/backButton";

type InventoryDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function InventoryDetailPage({
  params,
}: InventoryDetailPageProps) {
  const { id } = await params;
  try {
    const inventory = await getInventoryByIdService(id);
    const itemsWithDifference = inventory.inventoryItems.filter((item) => {
      const value = Number(item.difference);
      return Number(value) && value !== 0;
    }).length;

    const itemsMatched = inventory.inventoryItems.length - itemsWithDifference;

    return (
      <div className="flex h-full min-h-0 w-full flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {/*               <Button asChild variant="outline" size="icon-sm">
                <Link href="/dashboard/inventory" aria-label="Voltar">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button> */}
              <BackButton fallback="/dashboard/inventory" />
              <h1 className="text-2xl font-bold">{inventory.name}</h1>
            </div>
            <span className="text-sm text-muted-foreground">
              Detalhes e contagem dos produtos deste inventário.
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {inventory.inventoryItems.length} produto(s)
          </span>
        </div>

        <div className="grid gap-3 rounded-lg border bg-card p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Criado em
            </span>
            <span className="text-sm font-semibold">
              {parseDate(new Date(inventory.createdAt))}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Produtos
            </span>
            <span className="text-sm font-semibold">
              {inventory.inventoryItems.length}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Conferidos
            </span>
            <span className="text-sm font-semibold">{itemsMatched}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Com diferença
            </span>
            <span className="text-sm font-semibold">{itemsWithDifference}</span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 w-full justify-center">
          <InventoryItemsTable items={inventory.inventoryItems} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex w-full flex-col items-center gap-4 p-8">
        <p className="text-destructive">
          Não foi possível carregar os detalhes deste inventário.
        </p>
        <Button asChild variant="outline">
          <Link href="/dashboard/inventory">Voltar para inventários</Link>
        </Button>
      </div>
    );
  }
}
