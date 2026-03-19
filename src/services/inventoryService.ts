import { apiClient } from "@/lib/api/client";
import { getToken } from "@/lib/auth";
import { Inventory } from "@/types/api";

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
