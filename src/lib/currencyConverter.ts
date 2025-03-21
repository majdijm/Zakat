import { currencies } from "./constants";

// Cache for exchange rates
let exchangeRates: Record<string, number> | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

// Fetch exchange rates from API
export const fetchExchangeRates = async (): Promise<Record<string, number>> => {
  const currentTime = Date.now();

  // Return cached rates if they're still valid
  if (exchangeRates && currentTime - lastFetchTime < CACHE_DURATION) {
    return exchangeRates;
  }

  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD",
    );
    const data = await response.json();

    if (data && data.rates) {
      exchangeRates = data.rates;
      lastFetchTime = currentTime;
      return data.rates;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching exchange rates:", error);

    // If we have cached rates, return those even if they're expired
    if (exchangeRates) {
      return exchangeRates;
    }

    // Return fallback rates if API call fails and no cache exists
    return getFallbackRates();
  }
};

// Convert amount from one currency to another
export const convertCurrency = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
): Promise<number> => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const rates = await fetchExchangeRates();

  // Convert to USD first (as base currency)
  const amountInUSD =
    fromCurrency === "USD" ? amount : amount / rates[fromCurrency];

  // Convert from USD to target currency
  const convertedAmount =
    toCurrency === "USD" ? amountInUSD : amountInUSD * rates[toCurrency];

  return convertedAmount;
};

// Format currency amount with proper symbol
export const formatCurrency = (
  amount: number,
  currencyCode: string,
): string => {
  const currency =
    currencies.find((c) => c.code === currencyCode) || currencies[0];

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Fallback exchange rates in case API fails
const getFallbackRates = (): Record<string, number> => {
  return {
    USD: 1,
    EUR: 0.91,
    GBP: 0.78,
    JPY: 150.14,
    AUD: 1.51,
    CAD: 1.37,
    CHF: 0.9,
    CNY: 7.23,
    INR: 83.5,
    SAR: 3.75,
    AED: 3.67,
    MYR: 4.65,
    IDR: 15650,
    PKR: 278.5,
    EGP: 30.9,
  };
};
