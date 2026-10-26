"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseDate } from "@/lib/parseDate";
import { ProductInventoryItem } from "@/types/inventory";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const PAGE_SIZE = 20;

function DifferenceBadge({ difference }: { difference: string }) {
  const value = Number(difference);
  const isZero = Number.isFinite(value) && value === 0;
  const isPositive = Number.isFinite(value) && value > 0;

  return (
    <Badge
      variant={isZero ? "green" : isPositive ? "orange" : "red"}
      className="font-bold"
    >
      {difference}
    </Badge>
  );
}

export function ProductInventoryHistory({
  items,
}: {
  items: ProductInventoryItem[];
}) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [items],
  );

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / PAGE_SIZE));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedItems.slice(start, start + PAGE_SIZE);
  }, [sortedItems, page]);

  function handlePrev() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNext() {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }

  function handleViewInventory(id: string) {
    router.push(`/dashboard/inventory/${id}`);
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-sm text-muted-foreground">
          {items.length} registro(s) de inventário
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-24 md:pb-0">
        <Table>
          <TableHeader className="sticky top-0 z-10 border-b bg-gray-100">
            <TableRow className="font-bold">
              <TableHead className="font-bold text-gray-700">Data</TableHead>
              <TableHead className="font-bold text-gray-700">Unidade</TableHead>
              <TableHead className="font-bold text-gray-700">
                Esperado
              </TableHead>
              <TableHead className="font-bold text-gray-700">Contado</TableHead>
              <TableHead className="font-bold text-gray-700">
                Diferença
              </TableHead>
              <TableHead className="font-bold text-gray-700">#</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{parseDate(new Date(item.createdAt))}</TableCell>
                <TableCell>{item.unitInput}</TableCell>
                <TableCell>{item.stockExpected}</TableCell>
                <TableCell>{item.stockCounted}</TableCell>
                <TableCell>
                  <DifferenceBadge difference={item.difference} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => handleViewInventory(item.inventoryId)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {sortedItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Este produto ainda não aparece em nenhum inventário.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {sortedItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-center gap-3 bg-card px-4 py-4 md:static md:z-0 md:w-full">
            <Separator className="w-full" />
            <span className="text-sm text-muted-foreground">
              Página <strong>{page}</strong> de <strong>{totalPages}</strong>
            </span>
            <div className="flex flex-row items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={page === 1}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={page === totalPages}
              >
                Próximo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
