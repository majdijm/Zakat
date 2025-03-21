import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Loader2, Link } from "lucide-react";
import { Asset } from "../../types/models";
import { calculateGoldValue } from "../../lib/metalPriceCalculator";

interface GoldInventoryItem {
  id: string;
  name: string;
  weight: number;
  purity: number;
  karats: number;
  purchaseDate: string;
  description?: string;
  location?: string;
}

const GoldInventoryLink = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [inventoryItems, setInventoryItems] = useState<GoldInventoryItem[]>([]);
  const [linkedAssets, setLinkedAssets] = useState<Asset[]>([]);
  const [globalCurrency, setGlobalCurrency] = useState("USD");
  const [goldPrice, setGoldPrice] = useState<number | null>(null);

  // Fetch inventory items, linked assets, and settings on component mount
  useEffect(() => {
    fetchInventoryItems();
    fetchLinkedAssets();
    fetchGlobalCurrency();
    fetchGoldPrice();
  }, []);

  // Fetch gold inventory items
  const fetchInventoryItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("inventory_items")
        .select("*")
        .eq("type", "gold");

      if (error) throw error;

      setInventoryItems(data || []);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
      toast({
        title: "Error",
        description: "Failed to fetch inventory items.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch linked assets
  const fetchLinkedAssets = async () => {
    try {
      const { data, error } = await supabase
        .from("assets")
        .select("*")
        .eq("type", "gold");

      if (error) throw error;

      setLinkedAssets(data || []);
    } catch (error) {
      console.error("Error fetching linked assets:", error);
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

  // Fetch gold price
  const fetchGoldPrice = async () => {
    try {
      const { data, error } = await supabase
        .from("gold_prices")
        .select("*")
        .eq("purity", 0.999)
        .order("lastUpdated", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setGoldPrice(data.pricePerGram);
      }
    } catch (error) {
      console.error("Error fetching gold price:", error);
    }
  };

  // Link inventory item to asset management
  const linkToAsset = async (item: GoldInventoryItem) => {
    try {
      setLoading(true);
      
      // Calculate current value based on weight, purity and current gold price
      let value = 0;
      if (goldPrice) {
        value = await calculateGoldValue(
          item.weight,
          item.karats,
          goldPrice,
          "USD", // Assuming gold price is in USD
          globalCurrency
        );
      }

      // Check if asset already exists
      const existingAssetIndex = linkedAssets.findIndex(
        (asset) => asset.name === `Gold: ${item.name}`
      );

      if (existingAssetIndex >= 0) {
        // Update existing asset
        const existingAsset = linkedAssets[existingAssetIndex];
        const updatedAsset = {
          ...existingAsset,
          value,
          weight: item.weight,
          purity: item.purity,
          karats: item.karats,
          lastUpdated: new Date().toISOString().split("T")[0],
          historicalValues: [
            ...(existingAsset.historicalValues || []),
            {
              date: new Date().toISOString().split("T")[0],
              value,
            },
          ],
        };

        const { error } = await supabase
          .from("assets")
          .update(updatedAsset)
          .eq("id", existingAsset.id);

        if (error) throw error;

        // Update local state
        const updatedAssets = [...linkedAssets];
        updatedAssets[existingAssetIndex] = updatedAsset;
        setLinkedAssets(updatedAssets);

        toast({
          title: "Success",
          description: `Updated asset value for ${item.name}.`,
        });
      } else {
        // Create new asset
        const newAsset: Asset = {
          id: Date.now().toString(),
          name: `Gold: ${item.name}`,
          type: "gold",
          value,
          dateAdded: new Date().toISOString().split("T")[0],
          purchaseDate: item.purchaseDate,
          description: item.description || "",
          weight: item.weight,
          purity: item.purity,
          karats: item.karats,
          location: item.location,
          currency: globalCurrency,
          lastUpdated: new Date().toISOString().split("T")[0],
          historicalValues: [
            {
              date: new Date().toISOString().split("T")[0],
              value,
            },
          ],
        };

        const { error } = await supabase.from("assets").insert([newAsset]);

        if (error) throw error;

        // Update local state
        setLinkedAssets([...linkedAssets, newAsset]);

        toast({
          title: "Success",
          description: `Linked ${item.name} to asset management.`,
        });
      }
    } catch (error) {
      console.error("Error linking inventory item to asset:", error);
      toast({
        title: "Error",
        description: "Failed to link inventory item to asset management.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if an inventory item is linked to an asset
  const isLinked = (item: GoldInventoryItem) => {
    return linkedAssets.some((asset) => asset.name === `Gold: ${item.name}`);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gold Inventory to Assets Link</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Link your gold inventory items to asset management for Zakat calculations.
          This will create or update assets based on your inventory items and current gold prices.
        </p>

        {loading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : inventoryItems.length === 0 ? (
          <div className="text-center p-4 border rounded-md">
            <p>No gold inventory items found. Add items to your inventory first.</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 text-left font-medium">Name</th>
                  <th className="p-2 text-left font-medium">Weight (g)</th>
                  <th className="p-2 text-left font-medium">Purity</th>
                  <th className="p-2 text-left font-medium">Karats</th>
                  <th className="p-2 text-left font-medium">Purchase Date</th>
                  <th className="p-2 text-left font-medium">Status</th>
                  <th className="p-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.weight}g</td>
                    <td className="p-2">{item.purity}</td>
                    <td className="p-2">{item.karats}K</td>
                    <td className="p-2">{formatDate(item.purchaseDate)}</td>
                    <td className="p-2">
                      {isLinked(item) ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Linked
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Not Linked
                        </span>
                      )}
                    </td>
                    <td className="p-2">
                      <Button
                        variant={isLinked(item) ? "outline" : "default"}
                        size="sm"
                        onClick={() => linkToAsset(item)}
                        disabled={loading || !goldPrice}
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Link className="h-4 w-4 mr-2" />
                        )}
                        {isLinked(item) ? "Update Asset" : "Link to Asset"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!goldPrice && (
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md">
            <p className="text-sm">
              No gold price found. Please set up gold prices in the settings before linking inventory items.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoldInventoryLink;
