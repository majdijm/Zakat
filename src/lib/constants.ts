// Currency options
export const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee" },
  { code: "EGP", symbol: "E£", name: "Egyptian Pound" },
];

// Export currency options
export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "$", name: "Australian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble" },
  { code: "KRW", symbol: "₩", name: "South Korean Won" },
  { code: "SGD", symbol: "$", name: "Singapore Dollar" },
  { code: "NZD", symbol: "$", name: "New Zealand Dollar" },
  { code: "MXN", symbol: "$", name: "Mexican Peso" },
  { code: "HKD", symbol: "$", name: "Hong Kong Dollar" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
];

// Gold purity options (in karats)
export const goldPurityOptions = [
  { karat: 24, purity: 0.999, name: "24K - Pure Gold" },
  { karat: 22, purity: 0.916, name: "22K" },
  { karat: 21, purity: 0.875, name: "21K" },
  { karat: 18, purity: 0.75, name: "18K" },
  { karat: 14, purity: 0.585, name: "14K" },
  { karat: 10, purity: 0.417, name: "10K" },
  { karat: 9, purity: 0.375, name: "9K" },
];

// Export gold purity options
export const GOLD_PURITY_OPTIONS = [
  { value: 0.999, label: "24K (99.9% Pure)" },
  { value: 0.958, label: "23K (95.8% Pure)" },
  { value: 0.916, label: "22K (91.6% Pure)" },
  { value: 0.875, label: "21K (87.5% Pure)" },
  { value: 0.833, label: "20K (83.3% Pure)" },
  { value: 0.792, label: "19K (79.2% Pure)" },
  { value: 0.75, label: "18K (75.0% Pure)" },
  { value: 0.625, label: "15K (62.5% Pure)" },
  { value: 0.583, label: "14K (58.3% Pure)" },
  { value: 0.417, label: "10K (41.7% Pure)" },
];

// Export silver purity options
export const SILVER_PURITY_OPTIONS = [
  { value: 0.999, label: "Fine Silver (99.9% Pure)" },
  { value: 0.958, label: "Britannia Silver (95.8% Pure)" },
  { value: 0.925, label: "Sterling Silver (92.5% Pure)" },
  { value: 0.900, label: "Coin Silver (90.0% Pure)" },
  { value: 0.800, label: "European Silver (80.0% Pure)" },
];

// Silver purity options
export const silverPurityOptions = [
  { purity: 0.999, name: "Fine Silver (99.9%)" },
  { purity: 0.958, name: "Britannia Silver (95.8%)" },
  { purity: 0.925, name: "Sterling Silver (92.5%)" },
  { purity: 0.9, name: "Coin Silver (90%)" },
  { purity: 0.8, name: "European Silver (80%)" },
];

// Asset categories with subcategories
export const assetCategories = [
  {
    id: "cash",
    name: "Cash",
    subcategories: [
      { id: "savings", name: "Savings" },
      { id: "checking", name: "Checking" },
      { id: "cash_on_hand", name: "Cash on Hand" },
      { id: "fixed_deposit", name: "Fixed Deposit" },
      { id: "other_cash", name: "Other Cash" },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    subcategories: [
      { id: "gold_jewelry", name: "Jewelry" },
      { id: "gold_coins", name: "Coins" },
      { id: "gold_bars", name: "Bars" },
      { id: "other_gold", name: "Other Gold" },
    ],
  },
  {
    id: "silver",
    name: "Silver",
    subcategories: [
      { id: "silver_jewelry", name: "Jewelry" },
      { id: "silver_coins", name: "Coins" },
      { id: "silver_bars", name: "Bars" },
      { id: "other_silver", name: "Other Silver" },
    ],
  },
  {
    id: "property",
    name: "Property",
    subcategories: [
      { id: "residential", name: "Residential" },
      { id: "commercial", name: "Commercial" },
      { id: "land", name: "Land" },
      { id: "other_property", name: "Other Property" },
    ],
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    subcategories: [
      { id: "bitcoin", name: "Bitcoin" },
      { id: "ethereum", name: "Ethereum" },
      { id: "other_crypto", name: "Other Crypto" },
    ],
  },
  {
    id: "other",
    name: "Other",
    subcategories: [
      { id: "stocks", name: "Stocks" },
      { id: "bonds", name: "Bonds" },
      { id: "mutual_funds", name: "Mutual Funds" },
      { id: "business_assets", name: "Business Assets" },
      { id: "other_assets", name: "Other Assets" },
    ],
  },
];

// Default metal prices (in USD)
export const defaultMetalPrices = {
  gold: 65.0, // USD per gram for 24K gold
  silver: 0.85, // USD per gram for fine silver
};

// Exchange rate API endpoint
export const exchangeRateApiUrl =
  "https://api.exchangerate-api.com/v4/latest/USD";
