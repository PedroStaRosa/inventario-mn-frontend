"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/product";
import { Button } from "../../../../components/ui/button";
import { Eye, PencilIcon, SearchIcon, ViewIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../../components/ui/input-group";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "../../../../components/ui/field";
import { diffDays } from "@/lib/parseDate";
import { Badge } from "@/components/ui/badge";
import { BadgeStatus } from "./BadgeStatus";
import { useRouter } from "next/navigation";

interface ProductTableProps {
  products: Product[];
}

const searchSchema = z.object({
  search: z.string(),
});
type SearchFormData = z.infer<typeof searchSchema>;

const PAGE_SIZE = 20;

type StatusFilter = "ok" | "overdue" | "never" | "all" | null;

export default function ProductTable({ products }: ProductTableProps) {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(null);

  const router = useRouter();
  const handleSelectBadgeStatus = (status: StatusFilter) => {
    setStatusFilter(status);
    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        !term || product.description.toLowerCase().includes(term);
      if (!matchesSearch) return false;
      if (!statusFilter) return true;
      const days = product.lastInventory
        ? diffDays(product.lastInventory)
        : null;
      if (statusFilter === "never") return days === null;
      if (statusFilter === "ok") return days !== null && days <= 30;
      if (statusFilter === "overdue") return days !== null && days > 30;
      if (statusFilter === "all") return true;
      return true;
    });
    /*     if (!term && !badgeStatusProduct) return products;
    if (!term && badgeStatusProduct) {
      return products.filter((product) =>
        product.lastInventory
          ? diffDays(product.lastInventory) <= badgeStatusProduct
          : null,
      );
    }
    if (term && !badgeStatusProduct) {
      return products.filter((product) =>
        product.description.toLowerCase().includes(term),
      );
    }
    return products.filter((product) =>
      product.description.toLowerCase().includes(term),
    ); */
  }, [products, searchTerm, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  function handlePrev() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNext() {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }

  const onSubmit = (data: SearchFormData) => {
    setSearchTerm(data.search);
    setPage(1);
  };

  const handleViewProduct = (id: string) => {
    router.push(`/dashboard/inventory/product/${id}`);
  };

  return (
    <div className="flex flex-col min-h-0 overflow-y-auto rounded-lg border bg-card shadow-sm w-full">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 flex gap-2 justify-center items-center"
      >
        <FieldGroup className="w-full ">
          <Controller
            control={form.control}
            name="search"
            render={({ field, fieldState }) => (
              <InputGroup
                data-invalid={fieldState.invalid}
                className="shadow-md"
              >
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Nome do inventário..."
                  autoComplete="off"
                  type="text"
                />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
        </FieldGroup>
        <Button
          type="submit"
          className="bg-primary text-white hover:bg-primary/80 font-bold h-12 text-lg"
        >
          Pesquisar
        </Button>
      </form>
      <div className="flex flex-col gap-4 max-h-screen flex-1 overflow-y-auto pb-24 md:pb-0 items-center">
        <div className="flex gap-4 w-full p-2 items-center">
          <Badge
            data-active={statusFilter === "all"}
            variant="default"
            className="font-bold cursor-pointer data-active:bg-gray-500 data-active:text-white data-active:scale-115 transition-all duration-300 data-active:border-green-500 data-active:border-2"
            onClick={() => handleSelectBadgeStatus("all")}
          >
            Todos
          </Badge>
          <Badge
            data-active={statusFilter === "ok"}
            variant="green"
            className="font-bold cursor-pointer data-active:bg-green-500 data-active:text-white data-active:scale-115 transition-all duration-300 data-active:border-green-700 data-active:border-2"
            onClick={() => handleSelectBadgeStatus("ok")}
          >
            Em dia
          </Badge>
          <Badge
            data-active={statusFilter === "overdue"}
            variant="red"
            className="font-bold cursor-pointer data-active:bg-red-500 data-active:text-white data-active:scale-115 transition-all duration-300 data-active:border-red-900 data-active:border-2"
            onClick={() => handleSelectBadgeStatus("overdue")}
          >
            + 30dias
          </Badge>
          <Badge
            data-active={statusFilter === "never"}
            variant="orange"
            className="font-bold cursor-pointer data-active:bg-orange-500 data-active:text-white data-active:scale-115 transition-all duration-300 data-active:border-orange-900 data-active:border-2"
            onClick={() => handleSelectBadgeStatus("never")}
          >
            Nunca inventariado
          </Badge>
        </div>
        <Table className="mb-12 md:mb-0">
          <TableHeader className="sticky top-0 z-10 bg-gray-100 border-b">
            <TableRow>
              <TableHead className="text-left font-bold text-gray-700">
                Codigo
              </TableHead>
              <TableHead className="text-left flex-1 font-bold text-gray-700">
                Descrição
              </TableHead>
              <TableHead className="text-left font-bold text-gray-700">
                Unidade
              </TableHead>
              <TableHead className="text-left font-bold text-gray-700">
                Status
              </TableHead>
              <TableHead className="text-left font-bold text-gray-700">
                Último Inventário
              </TableHead>
              <TableHead className="text-left font-bold text-gray-700">
                ABC
              </TableHead>
              <TableHead className="text-center font-bold text-gray-700">
                #
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>
                  <BadgeStatus date={product.lastInventory} />
                </TableCell>
                <TableCell>
                  {product.lastInventoryFormatted}
                  {product.lastInventory
                    ? `( ${diffDays(product.lastInventory)} dias )`
                    : ""}
                </TableCell>
                <TableCell>
                  <Badge variant={product.isAbcSales ? "green" : "red"}>
                    {product.isAbcSales ? "Sim" : "Não"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  {searchTerm.trim()
                    ? "Nenhum produto encontrado para esta pesquisa"
                    : "Nenhum produto cadastrado"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div
          className="
    fixed bottom-0 left-0 right-0
    flex flex-col sm:flex-row
    items-center justify-center gap-3
    py-4 px-4 z-10 
    bg-card
    md:static
    md:w-full
    md:z-0
  "
        >
          <span className="text-sm text-muted-foreground">
            Página <strong>{page}</strong> de <strong>{totalPages}</strong>
            {searchTerm.trim() && (
              <> · {filteredProducts.length} resultado(s)</>
            )}
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
              disabled={page === totalPages || totalPages === 0}
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
