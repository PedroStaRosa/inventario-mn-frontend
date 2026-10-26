export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof Error) {
    console.log(error.message);
    return {
      message: error.message,
      status: 500,
      details: error.stack,
    };
  }
  return {
    message: error instanceof Error ? error.message : "Erro desconhecido",
  };
  // Erro da API com resposta
  /* if (error.response) {
    const { status, data } = error.response;
    
    return {
      message: data?.error || data?.message || 'Erro ao processar requisição',
      status,
      details: data?.details || data,
    };
  }
  
  // Erro de rede
  if (error.request) {
    return {
      message: 'Erro de conexão. Verifique sua internet.',
      status: 0,
    };
  }
} */
}
