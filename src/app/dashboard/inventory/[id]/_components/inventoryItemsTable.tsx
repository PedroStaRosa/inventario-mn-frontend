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
import { InventoryItem } from "@/types/inventory";
import { useMemo, useState } from "react";
import { DifferenceBadge } from "../../_components/differenceBadge";

const PAGE_SIZE = 20;

export function InventoryItemsTable({ items }: { items: InventoryItem[] }) {
  const [page, setPage] = useState(1);

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) =>
        a.product.description.localeCompare(b.product.description, "pt-BR"),
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

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-sm text-muted-foreground">
          {items.length} produto(s) no inventário
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-24 md:pb-0">
        <Table>
          <TableHeader className="sticky top-0 z-10 border-b bg-gray-100">
            <TableRow className="font-bold">
              <TableHead className="font-bold text-gray-700">Código</TableHead>
              <TableHead className="font-bold text-gray-700">
                Descrição
              </TableHead>
              <TableHead className="font-bold text-gray-700">
                Esperado
              </TableHead>
              <TableHead className="font-bold text-gray-700">Contado</TableHead>
              <TableHead className="font-bold text-gray-700">
                Diferença
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell className="font-mono text-sm">
                  {item.product.code}
                </TableCell>
                <TableCell>{item.product.description}</TableCell>
                <TableCell>{item.stockExpected}</TableCell>
                <TableCell>{item.stockCounted}</TableCell>
                <TableCell>
                  <DifferenceBadge difference={item.difference} />
                </TableCell>
              </TableRow>
            ))}

            {sortedItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Este inventário ainda não possui produtos.
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
