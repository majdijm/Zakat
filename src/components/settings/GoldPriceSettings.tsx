import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RefreshCw, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface GoldPrice {
  currency: string;
  price24k: number;
  price22k: number;
  price21k: number;
  price18k: number;
  lastUpdated: Date;
}

const GoldPriceSettings = () => {
  const [goldPrices, setGoldPrices] = useState<GoldPrice>({
    currency: "USD",
    price24k: 65.32, // per gram
    price22k: 59.86,
    price21k: 57.13,
    price18k: 48.97,
    lastUpdated: new Date(),
  });

  const [globalCurrency, setGlobalCurrency] = useState("USD");
  const [conversionRates, setConversionRates] = useState<Record<string, number>>({
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    CAD: 1.35,
    AUD: 1.51,
    SAR: 3.75, // Saudi Riyal
    AED: 3.67, // UAE Dirham
    KWD: 0.31, // Kuwaiti Dinar
    QAR: 3.64, // Qatari Riyal
    BHD: 0.38, // Bahraini Dinar
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [manualPrices, setManualPrices] = useState({
    price24k: goldPrices.price24k.toString(),
    price22k: goldPrices.price22k.toString(),
    price21k: goldPrices.price21k.toString(),
    price18k: goldPrices.price18k.toString(),
  });

  const currencies = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "CAD", label: "Canadian Dollar (C$)" },
    { value: "AUD", label: "Australian Dollar (A$)" },
    { value: "SAR", label: "Saudi Riyal (﷼)" },
    { value: "AED", label: "UAE Dirham (د.إ)" },
    { value: "KWD", label: "Kuwaiti Dinar (د.ك)" },
    { value: "QAR", label: "Qatari Riyal (﷼)" },
    { value: "BHD", label: "Bahraini Dinar (BD)" },
  ];

  const handleCurrencyChange = (currency: string) => {
    setGlobalCurrency(currency);
    // In a real app, this would trigger recalculation of all zakat values
  };

  const handleManualPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManualPrices({
      ...manualPrices,
      [name]: value,
    });
  };

  const saveManualPrices = () => {
    setGoldPrices({
      ...goldPrices,
      price24k: parseFloat(manualPrices.price24k) || goldPrices.price24k,
      price22k: parseFloat(manualPrices.price22k) || goldPrices.price22k,
      price21k: parseFloat(manualPrices.price21k) || goldPrices.price21k,
      price18k: parseFloat(manualPrices.price18k) || goldPrices.price18k,
      lastUpdated: new Date(),
    });
  };

  const fetchLiveGoldPrices = async () => {
    setIsUpdating(true);
    try {
      // In a real app, this would fetch from an API like xe.com or a gold price API
      // For now, we'll simulate a fetch with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulated response
      const newPrice24k = 65.32 + (Math.random() * 2 - 1); // Random fluctuation
      
      setGoldPrices({
        ...goldPrices,
        price24k: parseFloat(newPrice24k.toFixed(2)),
        price22k: parseFloat((newPrice24k * 0.9167).toFixed(2)), // 22k is 91.67% of 24k
        price21k: parseFloat((newPrice24k * 0.875).toFixed(2)),  // 21k is 87.5% of 24k
        price18k: parseFloat((newPrice24k * 0.75).toFixed(2)),   // 18k is 75% of 24k
        lastUpdated: new Date(),
      });
      
      // Update the manual input fields too
      setManualPrices({
        price24k: newPrice24k.toFixed(2),
        price22k: (newPrice24k * 0.9167).toFixed(2),
        price21k: (newPrice24k * 0.875).toFixed(2),
        price18k: (newPrice24k * 0.75).toFixed(2),
      });
    } catch (error) {
      console.error("Error fetching gold prices:", error);
      // In a real app, show an error message to the user
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Gold Price Settings | Zakat Manager</title>
        <meta
          name="description"
          content="Configure gold prices and currency settings for accurate Zakat calculations."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-emerald-800">Gold Price & Currency Settings</h1>
        
        <Tabs defaultValue="gold-prices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gold-prices">Gold Prices</TabsTrigger>
            <TabsTrigger value="currency-settings">Currency Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gold-prices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Gold Prices (per gram)</span>
                  <div className="text-sm font-normal text-gray-500">
                    Last updated: {goldPrices.lastUpdated.toLocaleString()}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Current Prices</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={fetchLiveGoldPrices}
                        disabled={isUpdating}
                      >
                        <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
                        {isUpdating ? 'Updating...' : 'Update Prices'}
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <div className="text-amber-800 font-medium">24K Gold</div>
                        <div className="text-2xl font-bold text-amber-700 mt-1">
                          {goldPrices.price24k.toFixed(2)} {goldPrices.currency}/g
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <div className="text-amber-800 font-medium">22K Gold</div>
                        <div className="text-2xl font-bold text-amber-700 mt-1">
                          {goldPrices.price22k.toFixed(2)} {goldPrices.currency}/g
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <div className="text-amber-800 font-medium">21K Gold</div>
                        <div className="text-2xl font-bold text-amber-700 mt-1">
                          {goldPrices.price21k.toFixed(2)} {goldPrices.currency}/g
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <div className="text-amber-800 font-medium">18K Gold</div>
                        <div className="text-2xl font-bold text-amber-700 mt-1">
                          {goldPrices.price18k.toFixed(2)} {goldPrices.currency}/g
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Manual Entry</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4 text-gray-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Enter custom gold prices if you have more accurate local rates.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price24k">24K Gold Price</Label>
                          <div className="relative">
                            <Input
                              id="price24k"
                              name="price24k"
                              type="number"
                              step="0.01"
                              value={manualPrices.price24k}
                              onChange={handleManualPriceChange}
                              className="pl-8"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                              {goldPrices.currency}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="price22k">22K Gold Price</Label>
                          <div className="relative">
                            <Input
                              id="price22k"
                              name="price22k"
                              type="number"
                              step="0.01"
                              value={manualPrices.price22k}
                              onChange={handleManualPriceChange}
                              className="pl-8"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                              {goldPrices.currency}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="price21k">21K Gold Price</Label>
                          <div className="relative">
                            <Input
                              id="price21k"
                              name="price21k"
                              type="number"
                              step="0.01"
                              value={manualPrices.price21k}
                              onChange={handleManualPriceChange}
                              className="pl-8"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                              {goldPrices.currency}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="price18k">18K Gold Price</Label>
                          <div className="relative">
                            <Input
                              id="price18k"
                              name="price18k"
                              type="number"
                              step="0.01"
                              value={manualPrices.price18k}
                              onChange={handleManualPriceChange}
                              className="pl-8"
                            />
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                              {goldPrices.currency}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700"
                        onClick={saveManualPrices}
                      >
                        Save Prices
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="currency-settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Currency Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="globalCurrency">Default Currency</Label>
                    <Select value={globalCurrency} onValueChange={handleCurrencyChange}>
                      <SelectTrigger className="w-full md:w-[300px]">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 mt-1">
                      All Zakat calculations will be performed in this currency.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Exchange Rates</h3>
                    <p className="text-sm text-gray-500">
                      These rates are used to convert between currencies. The base currency is USD.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(conversionRates).map(([currency, rate]) => (
                        <div key={currency} className="space-y-2">
                          <Label htmlFor={`rate-${currency}`}>{currency}</Label>
                          <div className="relative">
                            <Input
                              id={`rate-${currency}`}
                              type="number"
                              step="0.0001"
                              value={rate}
                              disabled={currency === "USD"}
                              onChange={(e) => {
                                const newRates = { ...conversionRates };
                                newRates[currency] = parseFloat(e.target.value) || rate;
                                setConversionRates(newRates);
                              }}
                              className={currency === "USD" ? "bg-gray-100" : ""}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => {
                          // In a real app, this would fetch from xe.com or similar
                          alert("In a real app, this would fetch current exchange rates from an API");
                        }}
                      >
                        <RefreshCw className="h-4 w-4" />
                        Update Exchange Rates
                      </Button>
                      
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GoldPriceSettings;
