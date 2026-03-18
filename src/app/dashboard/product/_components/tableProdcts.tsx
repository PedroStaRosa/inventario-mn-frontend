"use client";

import { listProductAction } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useActionState, useMemo, useState, useTransition } from "react";

export default function TableProducts() {
  const [state, formAction, isPending] = useActionState(
    listProductAction,
    null
  );
  const [, startTransition] = useTransition();
  const [page, setPage] = useState(1);

  const products = useMemo(
    () => (state?.success ? state.products.products : []),
    [state]
  );
  const pageSize = 20;
  const totalPages = Math.ceil(products.length / pageSize);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return products.slice(start, end);
  }, [products, page]);

  function handlePrev() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNext() {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }

  const handleListProducts = () => {
    startTransition(() => {
      formAction();
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Lista de produtos</h2>
          <p className="text-sm text-muted-foreground">
            {products.length} produto(s) disponível(eis)
          </p>
        </div>

        <Button disabled={isPending} onClick={handleListProducts}>
          Listar
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="max-h-[500px] overflow-y-auto rounded-b-xl">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead>Última Inventário</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Atualizado em</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.code}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell>{product.lastInventory}</TableCell>
                      <TableCell>{product.createdAt}</TableCell>
                      <TableCell>{product.updatedAt}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={page === 1}>
          Anterior
        </Button>

        <span className="text-sm text-muted-foreground">
          Página <strong>{page}</strong> de <strong>{totalPages}</strong>
        </span>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={page === totalPages || totalPages === 0}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
