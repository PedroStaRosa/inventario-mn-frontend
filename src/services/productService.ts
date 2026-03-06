import { apiClient } from "@/lib/api/client";
import { getToken } from "@/lib/auth";
import { Product, ProductListResponse } from "@/types/api";

interface CreateProductProps {
  code: string;
  description: string;
  unit: string;
}

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

export async function createProductService(
  product: CreateProductProps
): Promise<Product> {
  try {
    const token = await getToken();
    const response = await apiClient<Product>(`/products`, {
      method: "POST",
      token,
      body: JSON.stringify(product),
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Erro ao criar produto");
  }
}
