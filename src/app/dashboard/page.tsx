<<<<<<< HEAD
import PageHeader from "@/components/headers/pageHeader";
import { Separator } from "@/components/ui/separator";
import calcPercentage from "@/lib/calcPercentage";
import { getDashboardService } from "@/services/dashboard/dashboardService";
import {
  ArrowRight,
  ClipboardCheck,
  ClipboardPen,
  Package,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { LastestInventoriesList } from "./_components/lastestInventoriesList";
import SuggestInventory from "./_components/suggestInventory";

export default async function Dashboard() {
  try {
    const dashboardData = await getDashboardService();
    const calcDifferenceDivergences = calcPercentage(
      dashboardData.currentPeriod.totalDifference,
      dashboardData.previousPeriod.totalDifference,
    );
    const calcDifferenceProductsNeverInventoried = calcPercentage(
      dashboardData.totals.productsNeverInventoried,
      dashboardData.totals.products,
    );

    return (
      <div className="flex h-full min-h-0 w-full flex-col">
        <PageHeader title="Dashboard" />
        <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
          <div>
            <h1 className="text-2xl font-bold">Visão Geral</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Acompanhe seus produtos, inventários e divergências dos últimos 30
              dias
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <div className="flex gap-3 rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex flex-1 flex-col gap-1">
                <h2 className="text-sm text-muted-foreground">
                  Produtos cadastrados
                </h2>
                <span className="text-3xl font-bold xl:text-4xl">
                  {dashboardData.totals.products.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="p-2 bg-green-100 rounded-md h-fit">
                <Package className="h-6 w-6 text-green-500" />
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex flex-1 flex-col gap-1">
                <h2 className="text-sm text-muted-foreground">
                  Inventários realizados
                </h2>
                <span className="text-3xl font-bold xl:text-4xl">
                  {dashboardData.totals.inventoriesLastDays.toLocaleString(
                    "pt-BR",
                  )}
                </span>
              </div>
              <div className="p-2 bg-green-100 rounded-md h-fit">
                <ClipboardCheck className="h-6 w-6 text-green-500" />
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex flex-1 flex-col gap-1">
                <h2 className="text-sm text-muted-foreground">
                  Itens inventariados
                </h2>
                <span className="text-3xl font-bold xl:text-4xl">
                  {dashboardData.totals.productsInventoriedLastDays.toLocaleString(
                    "pt-BR",
                  )}
                </span>
              </div>
              <div className="p-2 bg-green-100 rounded-md h-fit">
                <ClipboardPen className="h-6 w-6 text-green-500" />
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex flex-1 flex-col gap-1">
                <h2 className="text-sm text-muted-foreground">
                  Divergências encontradas
                </h2>
                <span className="text-3xl font-bold xl:text-4xl">
                  {dashboardData.currentPeriod.totalDifference.toLocaleString(
                    "pt-BR",
                  )}
                </span>
                <span
                  className={`text-sm ${calcDifferenceDivergences > 0 ? "text-red-500" : "text-green-500"}`}
                >
                  {calcDifferenceDivergences > 0
                    ? `+${calcDifferenceDivergences}%`
                    : `${calcDifferenceDivergences}%`}
                </span>
              </div>
              <div className="p-2 bg-red-100 rounded-md h-fit">
                <TriangleAlert className="h-6 w-6 text-red-500" />
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border bg-card p-4 shadow-sm sm:col-span-2 lg:col-span-1 xl:col-span-1">
              <div className="flex flex-1 flex-col gap-1">
                <h2 className="text-sm text-muted-foreground">
                  Produtos nunca inventariados
                </h2>
                <span className="text-3xl font-bold xl:text-4xl">
                  {dashboardData.totals.productsNeverInventoried.toLocaleString(
                    "pt-BR",
                  )}
                </span>
                <span className="text-sm text-red-500">
                  {(calcDifferenceProductsNeverInventoried + 100).toFixed(2)}%
                </span>
              </div>
              <div className="p-2 bg-red-100 rounded-md h-fit">
                <TriangleAlert className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-4 rounded-md border bg-card p-4 shadow-sm md:h-105">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-bold">
                    Inventários realizados
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Últimos 5 inventários
                  </span>
                </div>
                <Link
                  href="/dashboard/inventory"
                  className="flex shrink-0 items-center gap-2 text-sm text-primary"
                >
                  Ver tudo <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <Separator />
              <LastestInventoriesList data={dashboardData.latestInventories} />
            </div>

            <div className="flex min-h-0 min-w-0 flex-col gap-4 overflow-hidden rounded-md border bg-card p-4 shadow-sm md:h-105">
              <h2 className="text-base font-bold">Sugestão de inventário</h2>
              <div className="flex min-h-0 flex-1 flex-col">
                <SuggestInventory />
              </div>
            </div>
          </div>

          <div className="rounded-md border bg-card p-4 shadow-sm">
            ALGUM KPI AQUI
          </div>
        </main>
      </div>
    );
  } catch (error) {
    if (error instanceof Error) {
      return (
        <>
          <PageHeader title="Dashboard" />
          <div className="flex w-full justify-center p-8">
            <p className="text-destructive">
              Não foi possível carregar o dashboard, parametro inválido.
            </p>
          </div>
        </>
      );
    }
    return (
      <>
        <PageHeader title="Dashboard" />
        <div className="flex w-full justify-center p-8">
          <p className="text-destructive">
            Não foi possível carregar o dashboard.
          </p>
        </div>
      </>
    );
  }
=======
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
>>>>>>> origin/main
}
