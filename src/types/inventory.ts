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
  createdAt: Date;
  inventoryItems: InventoryItem[];
}

/** Item de inventário no histórico de um produto (GET /inventory/product) */
export interface ProductInventoryItem {
  id: string;
  inventoryId: string;
  productId: string;
  unitInput: string;
  stockExpected: string;
  stockCounted: string;
  difference: string;
  createdAt: string;
}

export interface InventoryCvs {
  productId: string;
  unitInput: string;
  stockExpected: number;
  stockCounted: number;
  description: string;
}
