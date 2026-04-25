import { apiClient } from "@/lib/api/client";
import { getToken } from "@/lib/auth";
import { Inventory } from "@/types/api";
import { InventoryCvs } from "@/types/inventoryCvs";

export async function listInventoryService(): Promise<Inventory[]> {
  try {
    const token = await getToken();
    const response = await apiClient<Inventory[]>("/inventories", {
      method: "GET",
      token,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao listar inventários");
  }
}

export async function listInventoryByIdService(
  id: string
): Promise<Inventory> {
  try {
    const token = await getToken();
    const response = await apiClient<Inventory>(`/inventory?id=${id}`, {
      method: "GET",
      token,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao listar inventário por id");
  }
}

interface CreateInventoryProps {
  inventoryName: string;
  inventoryItens: InventoryCvs[];
}
export async function createInventoryService(
  inventoryItems: InventoryCvs[],
  inventoryName: string
): Promise<Inventory> {
  try {
    const inventory: CreateInventoryProps = {
      inventoryName: inventoryName,
      inventoryItens: inventoryItems,
    };
    const token = await getToken();
    const response = await apiClient<Inventory>(`/inventory`, {
      method: "POST",
      token,
      body: JSON.stringify(inventory),
    });
    return response;
  } catch (error) {

    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao criar inventário");
  }
}
