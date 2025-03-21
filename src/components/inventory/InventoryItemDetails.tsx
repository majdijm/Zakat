import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Calendar, Clock, DollarSign, Info, Scale, Tag } from "lucide-react";

interface InventoryItemDetailsProps {
  item?: {
    id: string;
    name: string;
    image: string;
    description: string;
    purchaseDate: string;
    weight: number;
    weightUnit: string;
    value: number;
    category: string;
    usage: "personal" | "investment";
    purity?: number;
    karats?: number;
    currency?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const InventoryItemDetails = ({
  item = {
    id: "gold-necklace-1",
    name: "Gold Necklace",
    image:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80",
    description: "22K gold necklace with pendant, family heirloom",
    purchaseDate: "2020-05-15",
    weight: 25.5,
    weightUnit: "grams",
    value: 1850,
    category: "Gold",
    usage: "personal",
  },
  onEdit,
  onDelete,
}: InventoryItemDetailsProps) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {item.name}
                  </CardTitle>
                  <Badge
                    className="mt-2"
                    variant={
                      item.usage === "personal" ? "secondary" : "default"
                    }
                  >
                    {item.usage === "personal" ? "Personal Use" : "Investment"}
                  </Badge>
                </div>
                <Badge variant="outline" className="text-lg font-semibold">
                  {item.category}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Weight</p>
                    <p className="font-medium">
                      {item.weight} {item.weightUnit}
                      {item.karats && (
                        <span className="ml-2 text-sm text-gray-500">
                          ({item.karats}K)
                        </span>
                      )}
                      {item.purity && (
                        <span className="ml-2 text-sm text-gray-500">
                          ({(item.purity * 100).toFixed(1)}% pure)
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Value</p>
                    <p className="font-medium">
                      {item.currency || "$"}
                      {item.value.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Purchase Date
                    </p>
                    <p className="font-medium">
                      {formatDate(item.purchaseDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Category
                    </p>
                    <p className="font-medium">{item.category}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-md">
                <Info className="h-5 w-5 text-blue-500" />
                <p className="text-sm text-blue-700">
                  {item.usage === "personal"
                    ? "Personal use items are not subject to Zakat calculation."
                    : "Investment items are included in Zakat calculation."}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                {onEdit && (
                  <Button variant="outline" className="flex-1" onClick={onEdit}>
                    Edit Item
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={onDelete}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemDetails;
