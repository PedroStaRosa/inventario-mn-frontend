import { apiClient } from "@/lib/api/client";
import { getToken } from "@/lib/auth";
import { ProductListResponse } from "@/types/api";

export async function listProductService(): Promise<ProductListResponse> {
  try {
    const token = await getToken();
    const response = await apiClient<ProductListResponse>(`/products`, {
      method: "GET",
      token,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao listar produtos");
  }
}
