export interface Product {
  id: string;
  code: string;
  description: string;
  unit: number;
  lastInventory: Date | null;
  isAbcSales: boolean;
  lastInventoryFormatted: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface ProductCvs {
  code: string;
  description: string;
  unit: string;
}
