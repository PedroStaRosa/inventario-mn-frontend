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

    console.log("RESPONSE INVENTARIOS:", response);
    console.log("FIM DO LOG ###########################");

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao listar inventarios");
  }
}

export async function listInventoryByIdService(
  id: string
): Promise<Inventory | null> {
  try {
    const token = await getToken();
    const response = await apiClient<Inventory>(`/inventory?id=${id}`, {
      method: "GET",
      token,
    });
    return response;
  } catch {
    return null;
  }
}

interface CreateInventoryProps {
  inventoryName: string;
  inventoryItens: InventoryCvs[];
}
export async function createInventoryService(
  inventoryItems: InventoryCvs[],
  inventoryName: string
): Promise<Inventory | null> {
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
      throw new Error(error.message);
    }
    console.error(error);
    return null;
  }
}
