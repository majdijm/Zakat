import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useToast } from "../ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Loader2, RefreshCw } from "lucide-react";
import { CURRENCIES, GOLD_PURITY_OPTIONS } from "../../lib/constants";
import { convertCurrency } from "../../lib/currencyConverter";

interface GoldPrice {
  id?: string;
  purity: number;
  karats: number;
  pricePerGram: number;
  currency: string;
  lastUpdated: string;
}

const GoldPriceSetup = () => {
  const { toast } = useToast();
  const [goldPrices, setGoldPrices] = useState<GoldPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [globalCurrency, setGlobalCurrency] = useState("USD");

  // Form state
  const [newPrice, setNewPrice] = useState<GoldPrice>({
    purity: 0.999,
    karats: 24,
    pricePerGram: 0,
    currency: "USD",
    lastUpdated: new Date().toISOString(),
  });

  // Fetch gold prices on component mount
  useEffect(() => {
    fetchGoldPrices();
    fetchGlobalCurrency();
  }, []);

  // Fetch gold prices from database
  const fetchGoldPrices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("gold_prices").select("*");

      if (error) throw error;

      setGoldPrices(data || []);
    } catch (error) {
      console.error("Error fetching gold prices:", error);
      toast({
        title: "Error",
        description: "Failed to fetch gold prices. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch global currency setting
  const fetchGlobalCurrency = async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("key", "global_currency")
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setGlobalCurrency(data.value);
      }
    } catch (error) {
      console.error("Error fetching global currency:", error);
    }
  };

  // Save global currency setting
  const saveGlobalCurrency = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("settings")
        .upsert({
          key: "global_currency",
          value: globalCurrency,
        })
        .select();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Global currency updated successfully.",
      });
    } catch (error) {
      console.error("Error saving global currency:", error);
      toast({
        title: "Error",
        description: "Failed to update global currency. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for new price
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPrice({
      ...newPrice,
      [name]: name === "pricePerGram" ? parseFloat(value) : value,
    });
  };

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    if (name === "purity") {
      const purityValue = parseFloat(value);
      const karatsValue = Math.round((purityValue * 24) * 100) / 100;
      setNewPrice({
        ...newPrice,
        purity: purityValue,
        karats: karatsValue,
      });
    } else {
      setNewPrice({
        ...newPrice,
        [name]: value,
      });
    }
  };

  // Add new gold price
  const addGoldPrice = async () => {
    try {
      setLoading(true);
      const newGoldPrice = {
        ...newPrice,
        lastUpdated: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("gold_prices")
        .insert([newGoldPrice])
        .select();

      if (error) throw error;

      setGoldPrices([...goldPrices, data[0]]);
      setNewPrice({
        purity: 0.999,
        karats: 24,
        pricePerGram: 0,
        currency: "USD",
        lastUpdated: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Gold price added successfully.",
      });
    } catch (error) {
      console.error("Error adding gold price:", error);
      toast({
        title: "Error",
        description: "Failed to add gold price. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete gold price
  const deleteGoldPrice = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.from("gold_prices").delete().eq("id", id);

      if (error) throw error;

      setGoldPrices(goldPrices.filter((price) => price.id !== id));
      toast({
        title: "Success",
        description: "Gold price deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting gold price:", error);
      toast({
        title: "Error",
        description: "Failed to delete gold price. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Refresh gold prices from external API
  const refreshGoldPrices = async () => {
    try {
      setRefreshing(true);
      // This would typically call an external API to get the latest gold prices
      // For now, we'll simulate this with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update the prices with the latest data
      const updatedPrices = await Promise.all(
        goldPrices.map(async (price) => {
          // Simulate getting a new price (in a real app, this would come from an API)
          const newPriceInUSD = 65 + Math.random() * 5; // Random price between $65-70 per gram
          
          // Convert to the appropriate currency if not USD
          let newPrice = newPriceInUSD;
          if (price.currency !== "USD") {
            newPrice = await convertCurrency(newPriceInUSD, "USD", price.currency);
          }
          
          // Apply purity factor
          newPrice = newPrice * price.purity;
          
          return {
            ...price,
            pricePerGram: Math.round(newPrice * 100) / 100,
            lastUpdated: new Date().toISOString(),
          };
        })
      );

      // Update in database
      for (const price of updatedPrices) {
        await supabase
          .from("gold_prices")
          .update({
            pricePerGram: price.pricePerGram,
            lastUpdated: price.lastUpdated,
          })
          .eq("id", price.id);
      }

      setGoldPrices(updatedPrices);

      toast({
        title: "Success",
        description: "Gold prices refreshed successfully.",
      });
    } catch (error) {
      console.error("Error refreshing gold prices:", error);
      toast({
        title: "Error",
        description: "Failed to refresh gold prices. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Convert price to selected currency for display
  const displayPrice = async (price: GoldPrice) => {
    if (price.currency === selectedCurrency) return price.pricePerGram;
    
    try {
      const convertedPrice = await convertCurrency(
        price.pricePerGram,
        price.currency,
        selectedCurrency
      );
      return Math.round(convertedPrice * 100) / 100;
    } catch (error) {
      console.error("Error converting currency:", error);
      return price.pricePerGram;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gold Price Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="prices">
          <TabsList className="mb-4">
            <TabsTrigger value="prices">Gold Prices</TabsTrigger>
            <TabsTrigger value="settings">Currency Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prices" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Label>Display Currency:</Label>
                <Select
                  value={selectedCurrency}
                  onValueChange={(value) => setSelectedCurrency(value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} ({currency.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                variant="outline"
                onClick={refreshGoldPrices}
                disabled={refreshing || goldPrices.length === 0}
              >
                {refreshing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Prices
                  </>
                )}
              </Button>
            </div>
            
            {/* Gold prices table */}
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 text-left font-medium">Purity</th>
                    <th className="p-2 text-left font-medium">Karats</th>
                    <th className="p-2 text-left font-medium">Price per Gram</th>
                    <th className="p-2 text-left font-medium">Currency</th>
                    <th className="p-2 text-left font-medium">Last Updated</th>
                    <th className="p-2 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="p-4 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      </td>
                    </tr>
                  ) : goldPrices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-muted-foreground">
                        No gold prices found. Add one below.
                      </td>
                    </tr>
                  ) : (
                    goldPrices.map((price) => (
                      <tr key={price.id} className="border-b">
                        <td className="p-2">{price.purity}</td>
                        <td className="p-2">{price.karats}K</td>
                        <td className="p-2">
                          {price.pricePerGram} {price.currency}
                        </td>
                        <td className="p-2">{price.currency}</td>
                        <td className="p-2">{formatDate(price.lastUpdated)}</td>
                        <td className="p-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => price.id && deleteGoldPrice(price.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Add new gold price form */}
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Add New Gold Price</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="purity">Purity</Label>
                  <Select
                    value={newPrice.purity.toString()}
                    onValueChange={(value) => handleSelectChange("purity", value)}
                  >
                    <SelectTrigger id="purity">
                      <SelectValue placeholder="Select purity" />
                    </SelectTrigger>
                    <SelectContent>
                      {GOLD_PURITY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value.toString()}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="karats">Karats</Label>
                  <Input
                    id="karats"
                    name="karats"
                    type="number"
                    value={newPrice.karats}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                
                <div>
                  <Label htmlFor="pricePerGram">Price per Gram</Label>
                  <Input
                    id="pricePerGram"
                    name="pricePerGram"
                    type="number"
                    step="0.01"
                    value={newPrice.pricePerGram}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={newPrice.currency}
                    onValueChange={(value) => handleSelectChange("currency", value)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} ({currency.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button
                className="mt-4 w-full"
                onClick={addGoldPrice}
                disabled={loading || newPrice.pricePerGram <= 0}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Add Gold Price
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Global Currency Setting</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Set the global currency for Zakat calculations. All assets will be converted to this currency for calculation purposes.
              </p>
              
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Label htmlFor="globalCurrency">Global Currency</Label>
                  <Select
                    value={globalCurrency}
                    onValueChange={setGlobalCurrency}
                  >
                    <SelectTrigger id="globalCurrency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} ({currency.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  onClick={saveGlobalCurrency}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Save Setting
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GoldPriceSetup;
