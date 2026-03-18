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

export default function DashboardPage() {
  return (
    <div className="py-10">
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
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild>
            <Link href="/dashboard/product">Listar Produtos</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/product/new">Importar Produtos</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
