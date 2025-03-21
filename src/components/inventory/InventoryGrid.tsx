import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, MoreVertical, Edit, Trash2, Eye } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  type: string;
  weight?: number;
  value: number;
  purchaseDate: string;
  imageUrl: string;
  usage: "personal" | "investment";
  description?: string;
}

interface InventoryGridProps {
  items?: InventoryItem[];
  onViewItem?: (id: string) => void;
  onEditItem?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
}

const InventoryGrid = ({
  items = [
    {
      id: "1",
      name: "Gold Necklace",
      type: "gold",
      weight: 25.5,
      value: 2500,
      purchaseDate: "2022-05-15",
      imageUrl:
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=500&q=80",
      usage: "personal",
      description: "Family heirloom gold necklace with pendant",
    },
    {
      id: "2",
      name: "Gold Coins",
      type: "gold",
      weight: 50,
      value: 5000,
      purchaseDate: "2021-10-10",
      imageUrl:
        "https://images.unsplash.com/photo-1610375461249-d7e1faea70e9?w=500&q=80",
      usage: "investment",
      description: "5 gold coins for investment purposes",
    },
    {
      id: "3",
      name: "Diamond Ring",
      type: "jewelry",
      weight: 5.2,
      value: 3500,
      purchaseDate: "2023-01-20",
      imageUrl:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
      usage: "personal",
      description: "Diamond engagement ring",
    },
    {
      id: "4",
      name: "Silver Bracelet",
      type: "silver",
      weight: 30,
      value: 800,
      purchaseDate: "2022-08-05",
      imageUrl:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&q=80",
      usage: "personal",
      description: "Handcrafted silver bracelet",
    },
    {
      id: "5",
      name: "Investment Property",
      type: "property",
      value: 250000,
      purchaseDate: "2020-03-15",
      imageUrl:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80",
      usage: "investment",
      description: "Rental apartment in downtown area",
    },
    {
      id: "6",
      name: "Bitcoin",
      type: "crypto",
      value: 35000,
      purchaseDate: "2021-12-01",
      imageUrl:
        "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500&q=80",
      usage: "investment",
      description: "0.75 BTC investment",
    },
  ],
  onViewItem = () => {},
  onEditItem = () => {},
  onDeleteItem = () => {},
}: InventoryGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter items based on search term and active tab
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "personal")
      return matchesSearch && item.usage === "personal";
    if (activeTab === "investment")
      return matchesSearch && item.usage === "investment";
    if (activeTab === item.type) return matchesSearch;

    return false;
  });

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        {/* Search and filter bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setActiveTab("all")}>
                All Items
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("gold")}>
                Gold
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("silver")}>
                Silver
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("jewelry")}>
                Jewelry
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("platinum")}>
                Platinum
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("gemstone")}>
                Gemstones
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("personal")}>
                Personal Use
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("investment")}>
                Investment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tabs for quick filtering */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:grid-cols-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="gold">Gold</TabsTrigger>
            <TabsTrigger value="silver">Silver</TabsTrigger>
            <TabsTrigger value="jewelry">Jewelry</TabsTrigger>
            <TabsTrigger value="platinum">Platinum</TabsTrigger>
            <TabsTrigger value="gemstone">Gemstone</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="investment">Investment</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-lg font-medium text-gray-900">
                  No items found
                </p>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                      <Badge
                        className={`absolute top-2 right-2 ${item.usage === "personal" ? "bg-blue-500" : "bg-green-500"}`}
                      >
                        {item.usage === "personal" ? "Personal" : "Investment"}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {item.type}
                            </Badge>
                            {item.weight && (
                              <span className="text-sm text-gray-500">
                                {item.weight}g
                              </span>
                            )}
                          </div>
                          <p className="mt-2 font-medium">
                            ${item.value.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Purchased:{" "}
                            {new Date(item.purchaseDate).toLocaleDateString()}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onViewItem(item.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onEditItem(item.id)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDeleteItem(item.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InventoryGrid;
