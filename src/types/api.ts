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

// RESPOSTAS DO BACKEND
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

export interface ProductResponse {
  id: string;
  code: string;
  description: string;
  unit: string | null;
  lastInventory: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductListResponse {
  products: ProductResponse[];
  total: number;
}

// TIPOS DAS ENTIDADES DO BACKEND
export interface User {
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

export interface CreateManyProductResponse {
  created: Product[];
  total_created: number;
  skipped: Product[];
  total_skipped: number;
  errors: string[];
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
