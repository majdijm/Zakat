import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  currencies,
  goldPurityOptions,
  silverPurityOptions,
} from "../../lib/constants";
import CurrencySelector from "../common/CurrencySelector";
import { fetchExchangeRates } from "../../lib/currencyConverter";
import { RefreshCw, Save } from "lucide-react";

interface CurrencySettingsProps {
  onSave?: (settings: CurrencySettings) => void;
  initialSettings?: CurrencySettings;
}

interface CurrencySettings {
  defaultCurrency: string;
  goldPrice: number;
  silverPrice: number;
  exchangeRates: Record<string, number>;
}

const CurrencySettings: React.FC<CurrencySettingsProps> = ({
  onSave,
  initialSettings = {
    defaultCurrency: "USD",
    goldPrice: 65.0, // USD per gram for 24K gold
    silverPrice: 0.85, // USD per gram for fine silver
    exchangeRates: {},
  },
}) => {
  const [settings, setSettings] = useState<CurrencySettings>(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Fetch exchange rates on component mount
  useEffect(() => {
    const loadExchangeRates = async () => {
      try {
        setIsLoading(true);
        const rates = await fetchExchangeRates();
        setSettings((prev) => ({
          ...prev,
          exchangeRates: rates,
        }));
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (Object.keys(settings.exchangeRates).length === 0) {
      loadExchangeRates();
    }
  }, []);

  const handleCurrencyChange = (currency: string) => {
    setSettings((prev) => ({
      ...prev,
      defaultCurrency: currency,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleRefreshRates = async () => {
    try {
      setIsLoading(true);
      const rates = await fetchExchangeRates();
      setSettings((prev) => ({
        ...prev,
        exchangeRates: rates,
      }));
    } catch (error) {
      console.error("Failed to refresh exchange rates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(settings);
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Currency & Metal Price Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="metal-prices">Metal Prices</TabsTrigger>
            <TabsTrigger value="exchange-rates">Exchange Rates</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="defaultCurrency">Default Currency</Label>
              <div className="flex items-center space-x-2">
                <CurrencySelector
                  value={settings.defaultCurrency}
                  onValueChange={handleCurrencyChange}
                  className="w-full"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                This currency will be used as the default for all transactions
                and calculations.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="metal-prices" className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Gold Prices (per gram)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goldPrice">
                    24K Gold Price (USD per gram)
                  </Label>
                  <Input
                    id="goldPrice"
                    name="goldPrice"
                    type="number"
                    value={settings.goldPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Calculated Prices by Karat</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {goldPurityOptions.map((option) => (
                      <div key={option.karat} className="p-2 border rounded-md">
                        <div className="text-sm font-medium">{option.name}</div>
                        <div className="text-sm">
                          ${(settings.goldPrice * option.purity).toFixed(2)}/g
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Silver Prices (per gram)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="silverPrice">
                    Fine Silver Price (USD per gram)
                  </Label>
                  <Input
                    id="silverPrice"
                    name="silverPrice"
                    type="number"
                    value={settings.silverPrice}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Calculated Prices by Purity</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {silverPurityOptions.map((option) => (
                      <div
                        key={option.purity}
                        className="p-2 border rounded-md"
                      >
                        <div className="text-sm font-medium">{option.name}</div>
                        <div className="text-sm">
                          ${(settings.silverPrice * option.purity).toFixed(2)}/g
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="exchange-rates" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Exchange Rates (Base: USD)
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshRates}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {isLoading ? "Refreshing..." : "Refresh Rates"}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {currencies.map((currency) => (
                <div key={currency.code} className="p-2 border rounded-md">
                  <div className="text-sm font-medium">
                    {currency.code} ({currency.symbol})
                  </div>
                  <div className="text-sm">
                    {settings.exchangeRates[currency.code]
                      ? `1 USD = ${settings.exchangeRates[currency.code].toFixed(4)} ${currency.code}`
                      : "Loading..."}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              Exchange rates are updated automatically from an external API.
              Last updated: {new Date().toLocaleString()}
            </p>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencySettings;
