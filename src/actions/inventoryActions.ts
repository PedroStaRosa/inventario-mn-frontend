"use server";

import { getUserFriendlyErrorMessage } from "@/lib/errorHandler";
import { redirect } from "next/navigation";
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
  try {
    const response = await listInventoryService();

    prevState = {
      success: true,
      error: "",
      inventories: response,
    };
    return prevState;
  } catch (error) {

    if (error instanceof Error) {
      getUserFriendlyErrorMessage(error);
    }
    return {
      success: false,
      error: getUserFriendlyErrorMessage(error),
      inventories: [],
    };
  }
}

export async function listInventoryByIdAction(
  prevState: {
    success: boolean;
    error: string;
    inventory: Inventory;
  } | null,
  id: string
) {
  try {
    const response = await listInventoryByIdService(id);
    prevState = {
      success: true,
      error: "",
      inventory: response,
    };
    return prevState;
  } catch (error) {
    if (error instanceof Error) {
      getUserFriendlyErrorMessage(error);
    }
    return {
      success: false,
      error: "Erro ao listar inventário por id",
      inventory: null,
    };
  }

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

    let message = error instanceof Error ? getUserFriendlyErrorMessage(error) : "Erro ao criar inventário";

    return {
      success: false,
      error: message,
      inventory: null,
    };
  }
}
