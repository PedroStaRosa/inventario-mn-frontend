"server-only";

import { apiClient } from "@/lib/apiClient";
import { getToken, requireToken } from "@/lib/auth";
import { parseDate } from "@/lib/parseDate";
import { ProductInput } from "@/schemas/productSchema";
import {
  CreateManyProductResponse,
  ProductListResponse,
} from "@/types/apiResponse";
import { Product, ProductCvs } from "@/types/product";

export async function getProductsService(): Promise<ProductListResponse> {
  try {
    const token = await requireToken();
    const response = await apiClient<ProductListResponse>(`/products`, {
      method: "GET",
      token,
    });

    return {
      ...response,
      products: response.products
        .map((product) => ({
          ...product,
          lastInventoryFormatted: product.lastInventory
            ? parseDate(product.lastInventory)
            : " - ",
        }))
        .sort((a, b) => a.description.localeCompare(b.description)),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao buscar produtos");
  }
}

export async function createProductService(
  data: ProductInput,
): Promise<Product> {
  try {
    const token = await requireToken();
    const response = await apiClient<Product>(`/products`, {
      method: "POST",
      token,
      body: JSON.stringify({ ...data, code: data.code.toString() }),
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao criar produto");
  }
}

interface ProductServiceProps {
  products: ProductCvs[];
}
export async function createManyProductService(
  products: ProductCvs[],
): Promise<CreateManyProductResponse> {
  try {
    const sendProducts: ProductServiceProps = {
      products: products,
    };
    const token = await requireToken();
    const response = await apiClient<CreateManyProductResponse>(
      `/products/import/many`,
      {
        method: "POST",
        token,
        body: JSON.stringify(sendProducts),
      },
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao criar produtos");
  }
}
