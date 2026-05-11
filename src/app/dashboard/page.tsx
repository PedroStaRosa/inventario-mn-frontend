import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import InventoriedProductsChart from "@/components/inventoriedProducts-chart";

export default async function DashboardPage() {
  return (
    <div className="py-10 gap-4 grid grid-cols-1 md:grid-cols-2">
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Package size={32} />
            Inventarios
          </CardTitle>
          <CardDescription>Acesse seus inventarios.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center justify-center">
          <Button asChild>
            <Link href="/dashboard/inventory">Listar Inventarios</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/inventory/import">Importar Inventarios</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Package size={32} />
            Produtos
          </CardTitle>
          <CardDescription>
            Acesse rapidamente o cadastro e a importação de produtos.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center justify-center">
          <Button asChild>
            <Link href="/dashboard/product">Listar Produtos</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/product/new">Importar Produtos</Link>
          </Button>
        </CardContent>
      </Card>

      <InventoriedProductsChart />
    </div>
  );
}
