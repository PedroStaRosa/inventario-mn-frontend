"use server";

import { listInventoryService } from "@/services/inventoryService";
import { Inventory } from "@/types/api";

export async function listInventoryAction(
  prevState: {
    success: boolean;
    error: string;
    inventories: Inventory[];
  } | null
) {
  const response = await listInventoryService();

  return { success: true, error: "", inventories: response };
}
