import { Button } from "@/components/ui/button";
import { parseDate } from "@/lib/parseDate";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductInventoryHistory } from "./_components/productInventoryHistory";
import { getInventoryProductService } from "@/services/inventory/inventoryService";
import { BackButton } from "@/components/backButton";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  try {
    const product = await getInventoryProductService(id);
    return (
      <div className="flex h-full min-h-0 w-full flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {/* <Button asChild variant="outline" size="icon-sm">
                <Link href="/dashboard/products" aria-label="Voltar">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button> */}
              <BackButton
                fallback="/dashboard/products"
                label="Voltar para produtos"
              />
              <h1 className="text-2xl font-bold">{product.description}</h1>
            </div>
            <span className="text-sm text-muted-foreground">
              Histórico de inventários em que o produto está presente.
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {product.inventoryItems.length} inventário(s)
          </span>
        </div>

        <div className="grid gap-3 rounded-lg border bg-card p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Código
            </span>
            <span className="font-mono text-sm font-semibold">
              {product.code}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Unidade
            </span>
            <span className="text-sm font-semibold">{product.unit ?? "—"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Último inventário
            </span>
            <span className="text-sm font-semibold">
              {product.lastInventory
                ? parseDate(new Date(product.lastInventory))
                : "—"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              Cadastrado em
            </span>
            <span className="text-sm font-semibold">
              {parseDate(new Date(product.createdAt))}
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 w-full justify-center">
          <ProductInventoryHistory items={product.inventoryItems} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex w-full flex-col items-center gap-4 p-8">
        <p className="text-destructive">
          Não foi possível carregar o histórico de inventários deste produto.
        </p>
        <Button asChild variant="outline">
          <Link href="/dashboard/products">Voltar para produtos</Link>
        </Button>
      </div>
    );
  }
}
