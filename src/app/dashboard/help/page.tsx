import { Button } from "@/components/ui/button";
import { DownloadIcon, FileSpreadsheetIcon } from "lucide-react";
import Link from "next/link";
import { DownloadButton } from "./_components/downloadButtonHelpers";

export const csvDownloads = [
  {
    title: "Novos Produtos",
    fileName: "Novos_Produtos.csv",
    icon: "spreadsheet",
    file: "/downloads/csv/Novos_Produtos.csv",
    updatedAt: "2026-07-08",
    version: "1.0",
  },
  {
    title: "Importar Inventário",
    fileName: "Importar_Inventario.csv",
    icon: "spreadsheet",
    file: "/downloads/csv/Importar_Inventario.csv",
    updatedAt: "2026-08-13",
    version: "1.0",
  },
];
export default function HelpPage() {
  return (
    <div className="flex flex-col gap-4">
      {csvDownloads.map((download) => (
        <div key={download.title} className="flex items-center gap-4 ...">
          <FileSpreadsheetIcon className="w-6 h-6" />
          <div>
            <h2>{download.title}</h2>
            <p className="text-sm text-muted-foreground">
              v{download.version} · {download.updatedAt}
            </p>
          </div>
          <DownloadButton url={download.file} fileName={download.fileName} />
        </div>
      ))}
    </div>
  );
}
