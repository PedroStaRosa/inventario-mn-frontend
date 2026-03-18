"use server";

import { getUserFriendlyErrorMessage } from "@/lib/errorHandler";
import { parseDate } from "@/lib/parseDate";
import { productSchema } from "@/schemas/productSchema";
import {
  createManyProductService,
  createProductService,
  listProductService,
} from "@/services/productService";
import { CreateManyProductResponse, Product, ProductListResponse } from "@/types/api";
import { ProductCvs } from "@/types/productCvs";

export async function listProductAction(
  prevState: {
    success: boolean;
    error: string;
    products: Product[];
  } | null
) {
  const response = await listProductService();

  const products: Product[] = response.products.map((product) => ({
    lastInventory: product.lastInventory ? parseDate(product.lastInventory) : "",
    createdAt: parseDate(product.createdAt),
    updatedAt: parseDate(product.updatedAt),
    id: product.id,
    code: product.code,
    description: product.description,
    unit: product.unit,
  }));

  return { success: true, error: "", products: products };
}

export async function createProductAction(
  prevState: {
    success: boolean;
    error: string;
  } | null,
  formData: FormData
) {
  try {
    const data = {
      code: formData.get("code") as string,
      description: formData.get("description") as string,
      unit: formData.get("unit") as string,
    };
    const validated = productSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, error: validated.error.message };
    }
    await createProductService(validated.data);

    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: getUserFriendlyErrorMessage(error),
      };
    }

    return { success: false, error: "Erro ao criar produto" };
  }
}

export async function createManyProductAction(
  prevState: {
    success: boolean;
    error: string;
    response?: CreateManyProductResponse;
  } | null,
  formData: FormData
) {
  try {
    const productsCsv = formData.get("file") as string;
    const products = JSON.parse(productsCsv) as ProductCvs[];

    const response = await createManyProductService(products);
    return { success: true, error: "", response: response };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: getUserFriendlyErrorMessage(error) };
    }
    return { success: false, error: "Erro ao criar produtos" };
  }
}
