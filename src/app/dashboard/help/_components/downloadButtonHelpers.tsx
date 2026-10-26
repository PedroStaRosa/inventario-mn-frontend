"use client";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
type Props = { url: string; fileName: string };
export function DownloadButton({ url, fileName }: Props) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };
  return (
    <Button variant="outline" size="sm" onClick={handleDownload}>
      <DownloadIcon className="w-4 h-4" />
      Baixar
    </Button>
  );
}
