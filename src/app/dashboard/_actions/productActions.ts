"use server";
import { getUserFriendlyErrorMessage } from "@/lib/errorHandler";
import { ProductInput, productSchema } from "@/schemas/productSchema";
import {
  createManyProductService,
  createProductService,
} from "@/services/product/productService";
import { CreateManyProductResponse } from "@/types/apiResponse";
import { Product, ProductCvs } from "@/types/product";
import { revalidatePath, revalidateTag } from "next/cache";

export async function newProductAction(
  prevState: { success: boolean; error: string; product?: Product } | null,
  formData: FormData,
) {
  try {
    const code = parseInt(formData.get("code") as string);

    if (typeof code !== "number") {
      return { success: false, error: "Código inválido" };
    }
    const validated = productSchema.safeParse({
      code: formData.get("code"),
      description: formData.get("description"),
      unit: formData.get("unit"),
    });
    if (!validated.success) {
      return { success: false, error: validated.error.message };
    }
    const response = await createProductService(validated.data);
    revalidatePath("/dashboard/products");
    revalidateTag("dashboard", "max");
    return { success: true, error: "", product: response };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message, product: undefined };
    }
    return {
      success: false,
      error: "Erro ao criar produto",
      product: undefined,
    };
  }
}

export async function createManyProductAction(
  prevState: {
    success: boolean;
    error: string;
    response?: CreateManyProductResponse;
  } | null,
  formData: FormData,
) {
  try {
    const productsCsv = formData.get("file") as string;
    const products = JSON.parse(productsCsv) as ProductCvs[];
    const response = await createManyProductService(products);
    revalidatePath("/dashboard/products");
    revalidateTag("dashboard", "max");
    return { success: true, error: "", response: response };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: await getUserFriendlyErrorMessage(error),
      };
    }

    return {
      success: false,
      error: "Erro ao criar produtos",
    };
  }
}
