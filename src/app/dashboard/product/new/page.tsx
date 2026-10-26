import { Button } from "@/components/ui/button";
import { CreateManyProduct } from "../_components/createManyProduct";
import CreateProductDialog from "../_components/createProductDialog";
import Link from "next/link";

export default function ImportProductPage() {
  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 sm:items-start sm:justify-between">
        <Button asChild variant="outline" className="w-fit">
          <Link href="/dashboard">Voltar</Link>
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Produtos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Cadastre novos produtos ou importe via CSV.
          </p>
        </div>
      </div>
      <CreateProductDialog />
      <CreateManyProduct />
    </main>
  );
}
