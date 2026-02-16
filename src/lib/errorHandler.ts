/**
 * Sanitiza mensagens de erro técnicas e retorna mensagens amigáveis ao usuário
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();

    // Erros de rede/conexão
    if (
      errorMessage.includes("failed to fetch") || errorMessage.includes("fetch failed") ||
      errorMessage.includes("network error") ||
      errorMessage.includes("failed to parse url")
    ) {
      return "Erro de conexão. Verifique sua internet ou tente novamente mais tarde.";
    }

    // Timeout
    if (errorMessage.includes("timeout")) {
      return "A requisição demorou muito. Tente novamente.";
    }

    // Erros do servidor (já tratados, podem ser mostrados)
    if (
      !errorMessage.includes("function") &&
      !errorMessage.includes("undefined") &&
      !errorMessage.includes("parse")
    ) {
      return error.message;
    }
  }

  // Erro genérico para casos não mapeados
  return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
}

/**
 * Loga erros técnicos no console (apenas em desenvolvimento)
 */
export function logError(context: string, error: unknown) {
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context}]`, error);
  }
}
