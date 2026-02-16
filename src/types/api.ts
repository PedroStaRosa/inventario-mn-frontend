// Tipos de resposta genérica
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Tipos de erro
export interface ApiErrorResponse {
  error: string;
  details?: Array<{
    message: string;
  }>;
}

// Tipos de autenticação
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface RegisterUserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// Tipos de produtos
export interface Product {
  id: string;
  code: string;
  description: string;
  unit: string | null;
  lastInventory: string | null;
  createdAt: string;
  updatedAt: string;
}

// Tipos de inventário
export interface InventoryItem {
  stockExpected: string;
  stockCounted: string;
  difference: string;
  product: {
    id: string;
    code: string;
    description: string;
  };
}

export interface Inventory {
  id: string;
  name: string;
  createdAt: string;
  inventoryItems: InventoryItem[];
}
