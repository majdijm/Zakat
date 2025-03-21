import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { X, Plus, Save, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import CurrencySelector from "../common/CurrencySelector";
import MetalPriceInput from "../common/MetalPriceInput";
import {
  assetCategories,
  goldPurityOptions,
  silverPurityOptions,
} from "../../lib/constants";
import {
  calculateGoldValue,
  calculateSilverValue,
} from "../../lib/metalPriceCalculator";

interface AssetFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (asset: AssetData) => void;
  initialData?: AssetData;
  mode?: "add" | "edit";
}

interface AssetData {
  id?: string;
  name: string;
  type: string;
  value: number;
  purchaseValue?: number;
  purchaseDate: Date;
  description: string;
  isZakatEligible: boolean;
  category: string;
  subcategory?: string;
  // Additional fields based on asset type
  weight?: number; // for gold/silver
  purity?: number; // for gold/silver
  karats?: number; // for gold
  location?: string; // for property
  currency?: string; // for all assets
  purchaseCurrency?: string; // for all assets
  tokenSymbol?: string; // for crypto
  currentPrice?: number; // for gold/silver per gram
}

const AssetForm: React.FC<AssetFormProps> = ({
  isOpen = true,
  onClose = () => {},
  onSave = () => {},
  initialData = {
    name: "",
    type: "cash",
    value: 0,
    purchaseDate: new Date(),
    description: "",
    isZakatEligible: true,
    category: "investment",
    currency: "USD",
    purchaseCurrency: "USD",
  },
  mode = "add",
}) => {
  const [assetData, setAssetData] = useState<AssetData>(initialData);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialData.purchaseDate,
  );
  const [subcategories, setSubcategories] = useState<
    { id: string; name: string }[]
  >([]);
  const [metalPrice, setMetalPrice] = useState<number>(0);
  const [isCalculatingValue, setIsCalculatingValue] = useState<boolean>(false);

  // Update subcategories when asset type changes
  useEffect(() => {
    const category = assetCategories.find((cat) => cat.id === assetData.type);
    if (category) {
      setSubcategories(category.subcategories);
      // Set default subcategory if none selected or if type changed
      if (
        !assetData.subcategory ||
        !category.subcategories.find((sub) => sub.id === assetData.subcategory)
      ) {
        setAssetData((prev) => ({
          ...prev,
          subcategory: category.subcategories[0]?.id || "",
        }));
      }
    } else {
      setSubcategories([]);
    }
  }, [assetData.type]);

  // Calculate asset value for gold/silver based on weight, purity, and current price
  useEffect(() => {
    const calculateValue = async () => {
      if (
        (assetData.type === "gold" || assetData.type === "silver") &&
        assetData.weight &&
        assetData.weight > 0 &&
        metalPrice > 0
      ) {
        setIsCalculatingValue(true);
        try {
          let calculatedValue = 0;

          if (assetData.type === "gold" && assetData.karats) {
            calculatedValue = await calculateGoldValue(
              assetData.weight,
              assetData.karats,
              metalPrice,
              assetData.currency,
              assetData.currency,
            );
          } else if (assetData.type === "silver" && assetData.purity) {
            calculatedValue = await calculateSilverValue(
              assetData.weight,
              assetData.purity,
              metalPrice,
              assetData.currency,
              assetData.currency,
            );
          }

          if (calculatedValue > 0) {
            setAssetData((prev) => ({
              ...prev,
              value: parseFloat(calculatedValue.toFixed(2)),
            }));
          }
        } catch (error) {
          console.error("Error calculating value:", error);
        } finally {
          setIsCalculatingValue(false);
        }
      }
    };

    calculateValue();
  }, [
    assetData.type,
    assetData.weight,
    assetData.karats,
    assetData.purity,
    metalPrice,
    assetData.currency,
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setAssetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssetData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setAssetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setAssetData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setAssetData((prev) => ({
        ...prev,
        purchaseDate: date,
      }));
    }
  };

  const handleMetalPriceChange = (price: number) => {
    setMetalPrice(price);
    setAssetData((prev) => ({
      ...prev,
      currentPrice: price,
    }));
  };

  const handleCurrencyChange = (currency: string) => {
    setAssetData((prev) => ({
      ...prev,
      currency,
    }));
  };

  const handlePurchaseCurrencyChange = (currency: string) => {
    setAssetData((prev) => ({
      ...prev,
      purchaseCurrency: currency,
    }));
  };

  const handleKaratChange = (karat: string) => {
    const karatValue = parseInt(karat, 10);
    const purityOption = goldPurityOptions.find(
      (option) => option.karat === karatValue,
    );

    setAssetData((prev) => ({
      ...prev,
      karats: karatValue,
      purity: purityOption ? purityOption.purity : 1,
    }));
  };

  const handlePurityChange = (purity: string) => {
    setAssetData((prev) => ({
      ...prev,
      purity: parseFloat(purity),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(assetData);
    onClose();
  };

  // Render different fields based on asset type
  const renderTypeSpecificFields = () => {
    switch (assetData.type) {
      case "gold":
        return (
          <>
            <div className="grid grid-cols-1 gap-4">
              <MetalPriceInput
                metalType="gold"
                currency={assetData.currency || "USD"}
                onPriceChange={handleMetalPriceChange}
                onCurrencyChange={handleCurrencyChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (grams)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={assetData.weight || ""}
                  onChange={handleNumberChange}
                  placeholder="Enter weight in grams"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="karats">Karat</Label>
                <Select
                  value={assetData.karats?.toString() || "24"}
                  onValueChange={handleKaratChange}
                >
                  <SelectTrigger id="karats">
                    <SelectValue placeholder="Select karat" />
                  </SelectTrigger>
                  <SelectContent>
                    {goldPurityOptions.map((option) => (
                      <SelectItem
                        key={option.karat}
                        value={option.karat.toString()}
                      >
                        {option.name} ({(option.purity * 100).toFixed(1)}%)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
      case "silver":
        return (
          <>
            <div className="grid grid-cols-1 gap-4">
              <MetalPriceInput
                metalType="silver"
                currency={assetData.currency || "USD"}
                onPriceChange={handleMetalPriceChange}
                onCurrencyChange={handleCurrencyChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (grams)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={assetData.weight || ""}
                  onChange={handleNumberChange}
                  placeholder="Enter weight in grams"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purity">Purity</Label>
                <Select
                  value={assetData.purity?.toString() || "0.999"}
                  onValueChange={handlePurityChange}
                >
                  <SelectTrigger id="purity">
                    <SelectValue placeholder="Select purity" />
                  </SelectTrigger>
                  <SelectContent>
                    {silverPurityOptions.map((option) => (
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
          </>
        );
      case "property":
        return (
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={assetData.location || ""}
              onChange={handleChange}
              placeholder="Enter property location"
            />
          </div>
        );
      case "cash":
        return (
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <CurrencySelector
              value={assetData.currency || "USD"}
              onValueChange={(value) => handleSelectChange("currency", value)}
            />
          </div>
        );
      case "crypto":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tokenSymbol">Token Symbol</Label>
                <Input
                  id="tokenSymbol"
                  name="tokenSymbol"
                  value={assetData.tokenSymbol || ""}
                  onChange={handleChange}
                  placeholder="BTC, ETH, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Base Currency</Label>
                <CurrencySelector
                  value={assetData.currency || "USD"}
                  onValueChange={(value) =>
                    handleSelectChange("currency", value)
                  }
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Asset Name</Label>
            <Input
              id="name"
              name="name"
              value={assetData.name}
              onChange={handleChange}
              placeholder="Enter asset name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Asset Type</Label>
            <Select
              value={assetData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                {assetCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {subcategories.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select
              value={assetData.subcategory || ""}
              onValueChange={(value) =>
                handleSelectChange("subcategory", value)
              }
            >
              <SelectTrigger id="subcategory">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="value">
              Current Value
              {isCalculatingValue && (
                <span className="ml-2 text-xs text-muted-foreground">
                  (Calculating...)
                </span>
              )}
            </Label>
            <div className="flex space-x-2">
              <Input
                id="value"
                name="value"
                type="number"
                value={assetData.value}
                onChange={handleNumberChange}
                placeholder="Enter current value"
                required
                className="flex-1"
              />
              <CurrencySelector
                value={assetData.currency || "USD"}
                onValueChange={handleCurrencyChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchaseValue">Purchase Value</Label>
            <div className="flex space-x-2">
              <Input
                id="purchaseValue"
                name="purchaseValue"
                type="number"
                value={assetData.purchaseValue || 0}
                onChange={handleNumberChange}
                placeholder="Enter purchase value"
                className="flex-1"
              />
              <CurrencySelector
                value={assetData.purchaseCurrency || "USD"}
                onValueChange={handlePurchaseCurrencyChange}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Usage Category</Label>
          <Select
            value={assetData.category}
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="investment">Investment</SelectItem>
              <SelectItem value="personal">Personal Use</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="savings">Savings</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {renderTypeSpecificFields()}

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={assetData.description}
            onChange={handleChange}
            placeholder="Enter asset description"
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isZakatEligible"
            checked={assetData.isZakatEligible}
            onCheckedChange={(checked) =>
              handleSwitchChange("isZakatEligible", checked)
            }
          />
          <Label htmlFor="isZakatEligible">
            Eligible for Zakat calculation
          </Label>
        </div>
      </div>

      <Separator />

      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          {mode === "add" ? "Add Asset" : "Update Asset"}
        </Button>
      </div>
    </form>
  );

  // If used as a standalone component
  if (!isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Asset
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add New Asset" : "Edit Asset"}
            </DialogTitle>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  // If used within another component that controls visibility
  return (
    <Card className="w-full max-w-[600px] bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{mode === "add" ? "Add New Asset" : "Edit Asset"}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
    </Card>
  );
};

export default AssetForm;
