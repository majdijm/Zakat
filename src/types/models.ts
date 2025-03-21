// Asset types
export interface Asset {
  id: string;
  type: "cash" | "gold" | "silver" | "property" | "crypto" | "other";
  name: string;
  value: number;
  dateAdded: string;
  description?: string;
  purchaseDate: string;
  lastUpdated: string;
  historicalValues?: {
    date: string;
    value: number;
  }[];
  location?: string;
  user_id?: string;
  // Additional properties for specific asset types
  currency?: string;
  weight?: number;
  purity?: number;
  karats?: number;
  tokenSymbol?: string;
}

// Inventory item types
export interface InventoryItem {
  id: string;
  name: string;
  type: string;
  weight?: number;
  value: number;
  purchaseDate: string;
  imageUrl: string;
  usage: "personal" | "investment";
  description?: string;
  user_id?: string;
}

// Zakat calculation types
export interface ZakatCalculation {
  id: string;
  calculationDate: string;
  totalAssets: number;
  eligibleAssets: number;
  zakatAmount: number;
  nisabThreshold: number;
  currency: string;
  assetBreakdown: {
    category: string;
    name: string;
    value: number;
    eligible: boolean;
    zakatAmount: number;
  }[];
  user_id?: string;
}

// Payment history types
export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "planned";
  method: string;
  notes?: string;
  user_id?: string;
}
