"use server";

import {
  listInventoryByIdService,
  listInventoryService,
} from "@/services/inventoryService";
import { Inventory } from "@/types/api";

export async function listInventoryAction(
  prevState: {
    success: boolean;
    error: string;
    inventories: Inventory[];
  } | null
) {
  const response = await listInventoryService();

  prevState = {
    success: true,
    error: "",
    inventories: response,
  };
  return prevState;
}

export async function listInventoryByIdAction(
  prevState: {
    success: boolean;
    error: string;
    inventory: Inventory;
  } | null,
  id: string
) {
  const response = await listInventoryByIdService(id);
  prevState = {
    success: true,
    error: "",
    inventory: response,
  };
  return prevState;
}
