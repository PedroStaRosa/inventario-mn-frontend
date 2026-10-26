"server-only";
import { apiClient } from "@/lib/apiClient";
import { requireToken } from "@/lib/auth";
import {
  InventoryListResponse,
  InventoryProductResponse,
  SuggestInventoryResponse,
} from "@/types/apiResponse";
import { Inventory, InventoryCvs } from "@/types/inventory";

export async function listInventoryService(): Promise<Inventory[]> {
  try {
    const token = await requireToken();
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

export async function getInventoryProductService(
  idProduct: string,
): Promise<InventoryProductResponse> {
  try {
    const token = await requireToken();
    const response = await apiClient<InventoryProductResponse>(
      `/inventory/product?id=${idProduct}`,
      {
        method: "GET",
        token,
      },
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
  throw new Error("Erro ao buscar inventário do produto");
}

export async function getInventoryByIdService(id: string): Promise<Inventory> {
  try {
    const token = await requireToken();
    const response = await apiClient<Inventory>(`/inventory?id=${id}`, {
      method: "GET",
      token,
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao buscar inventário");
  }
}

interface CreateInventoryProps {
  inventoryName: string;
  inventoryItens: InventoryCvs[];
}
export async function createInventoryService(
  inventoryItems: InventoryCvs[],
  inventoryName: string,
): Promise<Inventory> {
  try {
    const inventory: CreateInventoryProps = {
      inventoryName: inventoryName,
      inventoryItens: inventoryItems,
    };
    const token = await requireToken();
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

export async function getSuggestInventoryService(
  days: string,
  limit: string,
): Promise<SuggestInventoryResponse> {
  try {
    const token = await requireToken();
    const response = await apiClient<SuggestInventoryResponse>(
      `/inventory/suggested?days=${days}&limit=${limit}`,
      {
        method: "GET",
        token,
      },
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao buscar sugestão de inventário");
  }
}
