import { Inventory, ProductInventoryItem } from "./inventory";
import { Product } from "./product";

export interface CreateManyProductResponse {
  created: Product[];
  total_created: number;
  skipped: Product[];
  total_skipped: number;
  errors: string[];
}

export interface ProductListResponse {
  products: Product[];
  total_products: number;
}

export interface InventoryListResponse {
  inventories: Inventory[];
}

export interface InventoryProductResponse {
  id: string;
  code: string;
  description: string;
  unit: string | null;
  lastInventory: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  inventoryItems: ProductInventoryItem[];
}

export interface DashboardResponse {
  period: {
    days: number;
    current: {
      from: string;
      to: string;
    };
    previous: {
      from: string;
      to: string;
    };
  };
  totals: {
    products: number;
    inventories: number;
    inventoriesLastDays: number;
    productsNeverInventoried: number;
    productsInventoriedLastDays: number;
  };
  recentlyInventoriedProducts: {
    id: string;
    code: string;
    description: string;
    unit: string | null;
    lastInventory: string | null;
  }[];
  currentPeriod: {
    totalInventories: number;
    totalItems: number;
    totalDifference: number;
  };
  previousPeriod: {
    totalInventories: number;
    totalItems: number;
    totalDifference: number;
  };
  latestInventories: {
    id: string;
    name: string;
    createdAt: Date;
    itemsCount: number;
    difference: number;
  }[];
}

export interface SuggestInventoryResponse {
  products: Product[];
  total: number;
}
