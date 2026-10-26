import { getInventoryStatusLabel } from "@/lib/inventoryStatus";
import { diffDays } from "@/lib/parseDate";
import { Product } from "@/types/product";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export type SuggestInventoryPdfMeta = {
  days: number;
  limit: number;
};

const formatLastInventoryCell = (product: Product) => {
  if (!product.lastInventory) {
    return product.lastInventoryFormatted ?? "—";
  }
  const formatted = product.lastInventoryFormatted ?? "—";
  return `${formatted} (${diffDays(product.lastInventory)} dias)`;
};

export function exportSuggestInventoryPdf(
  products: Product[],
  meta: SuggestInventoryPdfMeta,
) {
  if (products.length === 0) {
    throw new Error("Nenhum produto para exportar");
  }

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const generatedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  doc.setFontSize(16);
  doc.text("Sugestão de inventário", 14, 16);

  doc.setFontSize(10);
  doc.text(
    `Critérios: ${meta.days} dias sem inventário · limite ${meta.limit} itens`,
    14,
    24,
  );
  doc.text(`Gerado em: ${generatedAt} · Total: ${products.length}`, 14, 30);

  autoTable(doc, {
    startY: 36,
    head: [["Código", "Descrição", "Unidade", "Status", "Último inventário"]],
    body: products.map((product) => [
      String(product.code),
      product.description,
      String(product.unit ?? "—"),
      getInventoryStatusLabel(product.lastInventory),
      formatLastInventoryCell(product),
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [55, 65, 81],
      textColor: 255,
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 28 },
      1: { cellWidth: "auto" },
      2: { cellWidth: 22 },
      3: { cellWidth: 40 },
      4: { cellWidth: 45 },
    },
  });

  const fileDate = new Date().toISOString().slice(0, 10);
  doc.save(`sugestao-inventario-${fileDate}.pdf`);
}
