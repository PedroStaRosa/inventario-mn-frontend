"use server";

import { listProductService } from "@/services/productService";
import { ProductListResponse } from "@/types/api";

export async function listProductAction(
  prevState: {
    success: boolean;
    error: string;
    products: ProductListResponse;
  } | null
) {
  const response = await listProductService();
  return { success: true, error: "", products: response };
}
