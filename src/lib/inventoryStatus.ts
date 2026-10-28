import { diffDays } from "@/lib/parseDate";
export const INVENTORY_STATUS_THRESHOLD_DAYS = 30;
export type InventoryStatus = "ok" | "overdue" | "never";
const LABELS: Record<InventoryStatus, string> = {
  ok: "Em dia",
  overdue: "+ 30 dias",
  never: "Nunca inventariado",
};
export function getInventoryStatus(
  lastInventory: Date | null,
): InventoryStatus {
  if (!lastInventory) return "never";
  return diffDays(lastInventory) <= INVENTORY_STATUS_THRESHOLD_DAYS
    ? "ok"
    : "overdue";
}
export function getInventoryStatusLabel(lastInventory: Date | null): string {
  return LABELS[getInventoryStatus(lastInventory)];
}
