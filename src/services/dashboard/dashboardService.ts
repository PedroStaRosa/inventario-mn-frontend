"server-only";
import { apiClient } from "@/lib/apiClient";
import { requireToken } from "@/lib/auth";
import { DashboardResponse } from "@/types/apiResponse";

export const getDashboardService = async () => {
  try {
    const token = await requireToken();
    const response = await apiClient<DashboardResponse>(`/dashboard`, {
      method: "GET",
      token,
      next: {
        revalidate: 60,
        tags: ["dashboard"],
      },
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro ao buscar dashboard");
  }
};
