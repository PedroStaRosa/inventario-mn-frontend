import NewProductForm from "@/app/dashboard/products/_components/newProductForm";
import ProductTable from "@/app/dashboard/products/_components/productTable";
import { Button } from "@/components/ui/button";
import { getProductsService } from "@/services/product/productService";
import { FilePlusCorner } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  try {
    const productList = await getProductsService();
    if (!productList) {
      return <div>Erro ao buscar produtos</div>;
    }
    return (
      <div className="flex flex-col h-full min-h-0 w-full">
        <div className="flex items-center justify-between w-full p-4">
          <span className="text-sm text-muted-foreground">
            Gerencie os produtos da sua empresa
          </span>
          <span className="text-sm text-muted-foreground">
            Total de produtos: {productList.total_products}
          </span>
          <div className="flex items-center gap-2">
            <Button asChild className="shadow-md hover:shadow-lg font-bold">
              <Link
                href="/dashboard/products/import"
                className="flex items-center gap-2"
              >
                <FilePlusCorner className="w-4 h-4" /> Import Products CSV
              </Link>
            </Button>
            <NewProductForm />
          </div>
        </div>
        <div className="flex-1 min-h-0 flex w-full justify-center">
          <ProductTable products={productList.products} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex w-full justify-center p-8">
        <p className="text-destructive">
          Não foi possível carregar os produtos. Tente novamente mais tarde.
        </p>
      </div>
    );
  }
}
