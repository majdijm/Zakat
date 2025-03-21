import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import {
  goldPurityOptions,
  silverPurityOptions,
  defaultMetalPrices,
} from "../../lib/constants";
import { getCurrentMetalPrices } from "../../lib/metalPriceCalculator";
import CurrencySelector from "./CurrencySelector";

interface MetalPriceInputProps {
  metalType: "gold" | "silver";
  currency: string;
  onPriceChange: (price: number) => void;
  onCurrencyChange?: (currency: string) => void;
}

const MetalPriceInput: React.FC<MetalPriceInputProps> = ({
  metalType,
  currency,
  onPriceChange,
  onCurrencyChange,
}) => {
  const [price, setPrice] = useState<number>(
    metalType === "gold" ? defaultMetalPrices.gold : defaultMetalPrices.silver,
  );
  const [purity, setPurity] = useState<string>(
    metalType === "gold" ? "24" : "0.999",
  );

  // Fetch current metal prices when currency changes
  useEffect(() => {
    const fetchPrices = async () => {
      const prices = await getCurrentMetalPrices(currency);
      setPrice(metalType === "gold" ? prices.gold : prices.silver);
    };

    fetchPrices();
  }, [currency, metalType]);

  // Update parent component when price changes
  useEffect(() => {
    onPriceChange(price);
  }, [price, onPriceChange]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value) || 0;
    setPrice(newPrice);
  };

  const handlePurityChange = (value: string) => {
    setPurity(value);
  };

  const handleCurrencyChange = (value: string) => {
    if (onCurrencyChange) {
      onCurrencyChange(value);
    }
  };

  const refreshPrice = async () => {
    const prices = await getCurrentMetalPrices(currency);
    setPrice(metalType === "gold" ? prices.gold : prices.silver);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="metal-price">
          {metalType === "gold" ? "Gold" : "Silver"} Price (per gram)
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            id="metal-price"
            type="number"
            value={price}
            onChange={handlePriceChange}
            step="0.01"
            min="0"
            className="flex-1"
          />
          <CurrencySelector
            value={currency}
            onValueChange={handleCurrencyChange}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={refreshPrice}
            title="Refresh current price"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="metal-purity">
          {metalType === "gold" ? "Karat" : "Purity"}
        </Label>
        <Select value={purity} onValueChange={handlePurityChange}>
          <SelectTrigger id="metal-purity">
            <SelectValue
              placeholder={`Select ${metalType === "gold" ? "karat" : "purity"}`}
            />
          </SelectTrigger>
          <SelectContent>
            {metalType === "gold"
              ? goldPurityOptions.map((option) => (
                  <SelectItem
                    key={option.karat}
                    value={option.karat.toString()}
                  >
                    {option.name} ({(option.purity * 100).toFixed(1)}%)
                  </SelectItem>
                ))
              : silverPurityOptions.map((option) => (
                  <SelectItem
                    key={option.purity}
                    value={option.purity.toString()}
                  >
                    {option.name}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MetalPriceInput;
