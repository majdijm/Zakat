import {
  goldPurityOptions,
  silverPurityOptions,
  defaultMetalPrices,
} from "./constants";
import { convertCurrency } from "./currencyConverter";

// Calculate gold value based on weight, purity, and current price
export const calculateGoldValue = async (
  weightInGrams: number,
  karats: number,
  pricePerGram: number,
  fromCurrency: string = "USD",
  toCurrency: string = "USD",
): Promise<number> => {
  // Find purity percentage based on karats
  const purityOption = goldPurityOptions.find(
    (option) => option.karat === karats,
  );
  const purity = purityOption ? purityOption.purity : 1;

  // Calculate value in source currency
  const valueInSourceCurrency = weightInGrams * purity * pricePerGram;

  // Convert to target currency if needed
  return await convertCurrency(valueInSourceCurrency, fromCurrency, toCurrency);
};

// Calculate silver value based on weight, purity, and current price
export const calculateSilverValue = async (
  weightInGrams: number,
  purity: number,
  pricePerGram: number,
  fromCurrency: string = "USD",
  toCurrency: string = "USD",
): Promise<number> => {
  // Calculate value in source currency
  const valueInSourceCurrency = weightInGrams * purity * pricePerGram;

  // Convert to target currency if needed
  return await convertCurrency(valueInSourceCurrency, fromCurrency, toCurrency);
};

// Get current metal prices (could be extended to fetch from an API)
export const getCurrentMetalPrices = async (
  currency: string = "USD",
): Promise<{ gold: number; silver: number }> => {
  if (currency === "USD") {
    return defaultMetalPrices;
  }

  // Convert default prices (USD) to target currency
  const goldPrice = await convertCurrency(
    defaultMetalPrices.gold,
    "USD",
    currency,
  );
  const silverPrice = await convertCurrency(
    defaultMetalPrices.silver,
    "USD",
    currency,
  );

  return {
    gold: goldPrice,
    silver: silverPrice,
  };
};

// Get purity percentage from karat value
export const getPurityFromKarat = (karats: number): number => {
  const purityOption = goldPurityOptions.find(
    (option) => option.karat === karats,
  );
  return purityOption ? purityOption.purity : 0;
};

// Get karat value from purity percentage
export const getKaratFromPurity = (purity: number): number => {
  const closestOption = goldPurityOptions.reduce((prev, curr) => {
    return Math.abs(curr.purity - purity) < Math.abs(prev.purity - purity)
      ? curr
      : prev;
  });
  return closestOption.karat;
};
