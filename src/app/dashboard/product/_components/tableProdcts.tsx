"use client";

import { listProductAction } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
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
    <div className="mt-4">
      <Button
        disabled={isPending}
        onClick={handleListProducts}
        className="mb-4"
      >
        Listar
      </Button>

      <div className="max-h-[500px] overflow-y-auto rounded-b-md border">
        <Table>
          <TableHeader className="bg-slate-100">
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
      <div className="flex items-center justify-center mt-4 gap-3">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={page === 1}
          className="hover:bg-primary hover:text-white"
        >
          Anterior
        </Button>

        <span className="text-sm text-muted-foreground">
          Página <strong>{page}</strong> de <strong>{totalPages}</strong>
        </span>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={page === totalPages || totalPages === 0}
          className="hover:bg-primary hover:text-white"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
