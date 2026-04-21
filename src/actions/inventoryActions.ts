"use server";

import { getUserFriendlyErrorMessage } from "@/lib/errorHandler";
import {
  createInventoryService,
  listInventoryByIdService,
  listInventoryService,
} from "@/services/inventoryService";
import { CreateInventoryResponse, Inventory } from "@/types/api";
import { InventoryCvs } from "@/types/inventoryCvs";

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

export async function createInventoryAction(
  prevState: {
    success: boolean;
    error: string;
    inventory: Inventory | null;
  } | null,
  formData: FormData
) {
  try {
    const inventoryName = formData.get("inventoryName") as string;
    const inventoryItems = formData.get("inventoryItems") as string;
    const inventoryItemsArray = JSON.parse(inventoryItems) as InventoryCvs[];

    const response = await createInventoryService(
      inventoryItemsArray,
      inventoryName
    );
    console.log("RESPONSE INVENTARIO:", response);
    console.log("FIM DO LOG RESPONSE INVENTARIO ###########################");
    if (!response) {
      prevState = {
        success: false,
        error: "Erro ao criar inventario",
        inventory: null,
      };
      return prevState;
    }
    prevState = {
      success: true,
      error: "",
      inventory: response,
    };
    return prevState;
  } catch (error) {
    let message = "Erro ao criar inventário";
    if (error instanceof Error) {
      try {
        const parsed = JSON.parse(error.message) as { error?: string };
        message = parsed.error ?? getUserFriendlyErrorMessage(error);
      } catch {
        message = getUserFriendlyErrorMessage(error);
      }
    }
    return {
      success: false,
      error: message,
      inventory: null,
    };
  }
  /* if (error instanceof Error) {
    const errorMessage = JSON.stringify(error.message);
    const msg: {
      error: string;
    } = {
      error: errorMessage,
    };

    console.log("ERROR MESSAGE:", msg);
    prevState = {
      success: false,
      error: msg.error,
      inventory: null,
    };
    return prevState;
  }
  console.error(error);
  prevState = {
    success: false,
    error: "Erro ao criar inventario",
    inventory: null,
  };
  return prevState;
} */
}
