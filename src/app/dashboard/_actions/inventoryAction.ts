"use server";
import { getUserFriendlyErrorMessage } from "@/lib/errorHandler";
import {
  createInventoryService,
  getSuggestInventoryService,
} from "@/services/inventory/inventoryService";
import { SuggestInventoryResponse } from "@/types/apiResponse";
import { Inventory, InventoryCvs } from "@/types/inventory";

export async function createInventoryAction(
  prevState: {
    success: boolean;
    error: string;
    inventory: Inventory | null;
  } | null,
  formData: FormData,
) {
  try {
    const inventoryName = formData.get("inventoryName") as string;
    const inventoryItems = formData.get("inventoryItems") as string;
    const inventoryItemsArray = JSON.parse(inventoryItems) as InventoryCvs[];
    const response = await createInventoryService(
      inventoryItemsArray,
      inventoryName,
    );
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
    const message =
      error instanceof Error
        ? await getUserFriendlyErrorMessage(error)
        : "Erro ao criar inventário";

    return {
      success: false,
      error: message,
      inventory: null,
    };
  }
}

export async function getSuggestInventoryAction(
  prevState: {
    success: boolean;
    error: string;
    products: SuggestInventoryResponse | null;
  } | null,
  formData: FormData,
) {
  try {
    const days = formData.get("days") as string;
    const limit = formData.get("limit") as string;
    if (Number.isNaN(Number(days)) || Number.isNaN(Number(limit))) {
      /* throw new Error("Dias ou limite inválidos"); */
      return {
        success: false,
        error: "Dias ou limite inválidos",
        products: null,
      };
    }
    const response = await getSuggestInventoryService(days, limit);
    if (!response) {
      prevState = {
        success: false,
        error: "Erro ao buscar sugestão de inventário",
        products: null,
      };
      return prevState;
    }
    prevState = {
      success: true,
      error: "",
      products: response,
    };
    return prevState;
  } catch (error) {
    const message =
      error instanceof Error
        ? await getUserFriendlyErrorMessage(error)
        : "Erro ao criar uma sugestão de inventário";

    return {
      success: false,
      error: message,
      products: null,
    };
  }
}
