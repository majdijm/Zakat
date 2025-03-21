import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ImagePlus, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface InventoryItemFormProps {
  onSubmit?: (data: InventoryItem) => void;
  onCancel?: () => void;
  initialData?: InventoryItem;
  isEditing?: boolean;
}

interface InventoryItem {
  id?: string;
  name: string;
  description: string;
  category: string;
  weight: number;
  value: number;
  purchaseDate: Date;
  isInvestment: boolean;
  image?: string;
  location?: string;
}

const InventoryItemForm = ({
  onSubmit = () => {},
  onCancel = () => {},
  initialData = {
    name: "",
    description: "",
    category: "gold",
    weight: 0,
    value: 0,
    purchaseDate: new Date(),
    isInvestment: false,
    location: "",
  },
  isEditing = false,
}: InventoryItemFormProps) => {
  const [formData, setFormData] = useState<InventoryItem>(initialData);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData.image || null,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "weight" || name === "value" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleInvestmentChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isInvestment: checked }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, purchaseDate: date }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Inventory Item" : "Add New Inventory Item"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="image">Item Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative w-32 h-32">
                  <img
                    src={imagePreview}
                    alt="Item preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <ImagePlus className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
              <div className="text-sm text-gray-500">
                <p>Upload a clear image of your item</p>
                <p>Max size: 5MB</p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Gold Necklace"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <RadioGroup
                value={formData.category}
                onValueChange={handleCategoryChange}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gold" id="gold" />
                  <Label htmlFor="gold">Gold</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="silver" id="silver" />
                  <Label htmlFor="silver">Silver</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="jewelry" id="jewelry" />
                  <Label htmlFor="jewelry">Jewelry</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="platinum" id="platinum" />
                  <Label htmlFor="platinum">Platinum</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gemstone" id="gemstone" />
                  <Label htmlFor="gemstone">Gemstone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (grams)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.01"
                min="0"
                value={formData.weight}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Value (USD)</Label>
              <Input
                id="value"
                name="value"
                type="number"
                step="0.01"
                min="0"
                value={formData.value}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.purchaseDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.purchaseDate ? (
                    format(formData.purchaseDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.purchaseDate}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Storage Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Home safe, bank vault, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add details about the item..."
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isInvestment"
              checked={formData.isInvestment}
              onCheckedChange={handleInvestmentChange}
            />
            <Label htmlFor="isInvestment">
              This is an investment asset (eligible for Zakat)
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Item" : "Add Item"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default InventoryItemForm;
