import { listProductService } from "@/services/productService";

import InfoCharts from "./infocharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

export default async function InventoriedProductsChart() {
  let totalProducts = 0;
  let productsOutdatedBy30Days = 0;
  let responseError = "";

  try {
    const response = await listProductService();
    totalProducts = response.products.length;
    const now = new Date().getTime();

    productsOutdatedBy30Days = response.products.filter((product) => {
      if (!product.lastInventory) return false;

      const lastInventoryDate = new Date(product.lastInventory).getTime();
      if (Number.isNaN(lastInventoryDate)) return false;

      return now - lastInventoryDate <= THIRTY_DAYS_IN_MS;
    }).length;
  } catch (error) {
    responseError =
      error instanceof Error ? error.message : "Erro ao carregar produtos.";
  }

  if (responseError) {
    return <p>{responseError}</p>;
  }

  return (
    <Card className="mx-auto w-full max-w-xl">
      <div className="w-full flex flex-col md:flex-row">
        <CardHeader className=" text-center sm:w-1/2">
          <CardTitle className="text-xl flex items-center gap-2">
            Produtos inventariados nos ultimos 30 dias
          </CardTitle>
          <CardDescription className="text-xl font-bold">
            Total de produtos: {totalProducts}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center justify-center">
          <div className="w-full flex justify-center sm:w-1/2">
            <InfoCharts
              totalProducts={totalProducts}
              productsOutdatedBy30Days={productsOutdatedBy30Days}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
