import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Plus, Loader2 } from "lucide-react";
import InventoryGrid from "./InventoryGrid";
import InventoryItemForm from "./InventoryItemForm";
import InventoryItemDetails from "./InventoryItemDetails";
import InventorySEO from "./InventorySEO";
import {
  useSupabaseQuery,
  useSupabaseCreate,
  useSupabaseUpdate,
  useSupabaseDelete,
} from "../../lib/hooks";
import { InventoryItem as InventoryItemType } from "../../types/models";
import Loading from "../ui/loading";

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

const AssetInventory = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // Supabase hooks
  const {
    data: supabaseItems,
    loading: itemsLoading,
    error: itemsError,
  } = useSupabaseQuery<InventoryItemType>("inventory_items");
  const { createData } = useSupabaseCreate<InventoryItemType>();
  const { updateData } = useSupabaseUpdate<InventoryItemType>();
  const { deleteData } = useSupabaseDelete();

  // State for inventory items
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [itemsLoadingState, setItemsLoading] = useState(true);

  // Load data from Supabase when available
  useEffect(() => {
    if (!supabaseItems && itemsLoading) {
      // Still loading, do nothing
      return;
    }
    
    if (itemsError) {
      console.error('Error loading inventory items:', itemsError);
      // Initialize with empty array if there's an error
      setInventoryItems([]);
      setItemsLoading(false);
      return;
    }
    
    if (supabaseItems) {
      console.log('Inventory items loaded from Supabase:', supabaseItems);
      // Map Supabase data to our InventoryItem format
      const formattedItems = supabaseItems.map((item: any) => ({
        id: item.id,
        name: item.name,
        type: item.type || 'other',
        weight: item.weight,
        value: item.value,
        purchaseDate: item.purchase_date || new Date().toISOString().split('T')[0],
        imageUrl: item.image_url || 'https://images.unsplash.com/photo-1610375461249-d7e1faea70e9?w=500&q=80',
        usage: item.usage || 'personal',
        description: item.description || '',
      }));
      setInventoryItems(formattedItems);
    } else {
      // No data available
      setInventoryItems([]);
    }
    
    // Always set loading to false
    setItemsLoading(false);
  }, [supabaseItems, itemsLoading, itemsError]);

  // Handler for viewing item details
  const handleViewItem = (id: string) => {
    setSelectedItem(id);
    setIsDetailsDialogOpen(true);
  };

  // Handler for editing an item
  const handleEditItem = (id: string) => {
    setSelectedItem(id);
    setIsEditDialogOpen(true);
  };

  // Handler for deleting an item
  const handleDeleteItem = (id: string) => {
    setSelectedItem(id);
    setIsDeleteDialogOpen(true);
  };

  // Handler for confirming deletion
  const confirmDelete = async () => {
    if (selectedItem) {
      // Try to delete from Supabase
      await deleteData("inventory_items", selectedItem);

      // Update local state
      setInventoryItems(
        inventoryItems.filter((item) => item.id !== selectedItem),
      );
      setIsDeleteDialogOpen(false);
      setSelectedItem(null);
    }
  };

  // Handler for adding a new item
  const handleAddItem = async (data: any) => {
    try {
      console.log('Adding new inventory item:', data);
      
      // Prepare the new item with proper type casting
      const newItem: InventoryItem = {
        id: `${Date.now()}`,
        name: data.name,
        type: data.category || "other",
        weight: data.weight,
        value: data.value,
        purchaseDate: data.purchaseDate
          ? data.purchaseDate.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        imageUrl:
          data.image ||
          "https://images.unsplash.com/photo-1610375461249-d7e1faea70e9?w=500&q=80",
        usage: (data.isInvestment ? "investment" : "personal") as "personal" | "investment",
        description: data.description,
      };

      // Prepare the data for Supabase (field names might be different)
      const supabaseData = {
        id: newItem.id,
        name: newItem.name,
        type: newItem.type,
        weight: newItem.weight,
        value: newItem.value,
        purchase_date: newItem.purchaseDate,
        image_url: newItem.imageUrl,
        usage: newItem.usage,
        description: newItem.description,
      };

      // Try to save to Supabase
      const result = await createData("inventory_items", supabaseData);
      console.log('Supabase create result:', result);

      if (!result) {
        console.error('Error creating item in Supabase: No result returned');
        throw new Error('Failed to create item');
      }

      // Update local state
      setInventoryItems([...inventoryItems, newItem]);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding inventory item:', error);
      // You could add a toast notification here
    }
  };

  // Handler for updating an existing item
  const handleUpdateItem = async (data: any) => {
    if (selectedItem) {
      const updatedItem: Partial<InventoryItem> = {
        name: data.name,
        type: data.category || "other",
        weight: data.weight,
        value: data.value,
        purchaseDate: data.purchaseDate
          ? data.purchaseDate.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        imageUrl:
          data.image ||
          "https://images.unsplash.com/photo-1610375461249-d7e1faea70e9?w=500&q=80",
        usage: data.isInvestment ? "investment" : "personal" as "personal" | "investment",
        description: data.description,
      };

      // Try to update in Supabase
      await updateData("inventory_items", selectedItem, updatedItem);

      const updatedItems = inventoryItems.map((item) => {
        if (item.id === selectedItem) {
          return {
            ...item,
            ...updatedItem,
          } as InventoryItem;
        }
        return item;
      });

      setInventoryItems(updatedItems);
      setIsEditDialogOpen(false);
      setSelectedItem(null);
    }
  };

  // Find the selected item for editing or viewing details
  const getSelectedItemData = () => {
    return inventoryItems.find((item) => item.id === selectedItem);
  };

  if (itemsLoadingState) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
        <span className="text-emerald-600">Loading your inventory...</span>
      </div>
    );
  }

  if (inventoryItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <span className="text-gray-500">No assets in your inventory.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InventorySEO />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gold & Asset Inventory</h1>
            <p className="text-gray-600 mt-2">
              Catalog and manage your gold, silver, and other valuable assets
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <InventoryItemForm
                onSubmit={handleAddItem}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <Card className="bg-white shadow-sm">
          <CardContent>
            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>

              <TabsContent value="grid" className="w-full">
                <InventoryGrid
                  items={inventoryItems}
                  onViewItem={handleViewItem}
                  onEditItem={handleEditItem}
                  onDeleteItem={handleDeleteItem}
                />
              </TabsContent>

              <TabsContent value="table" className="w-full">
                <div className="p-8 text-center text-gray-500">
                  Table view is under development. Please use Grid view for now.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Item Details Dialog */}
        <Dialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        >
          <DialogContent className="sm:max-w-[800px]">
            {selectedItem && (
              <InventoryItemDetails
                item={{
                  id: getSelectedItemData()?.id || "",
                  name: getSelectedItemData()?.name || "",
                  image: getSelectedItemData()?.imageUrl || "",
                  description: getSelectedItemData()?.description || "",
                  purchaseDate: getSelectedItemData()?.purchaseDate || "",
                  weight: getSelectedItemData()?.weight || 0,
                  weightUnit: "grams",
                  value: getSelectedItemData()?.value || 0,
                  category: getSelectedItemData()?.type || "",
                  usage: getSelectedItemData()?.usage || "personal",
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Item Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            {selectedItem && (
              <InventoryItemForm
                isEditing={true}
                onSubmit={handleUpdateItem}
                onCancel={() => setIsEditDialogOpen(false)}
                initialData={{
                  name: getSelectedItemData()?.name || "",
                  description: getSelectedItemData()?.description || "",
                  category: getSelectedItemData()?.type || "gold",
                  weight: getSelectedItemData()?.weight || 0,
                  value: getSelectedItemData()?.value || 0,
                  purchaseDate: getSelectedItemData()?.purchaseDate
                    ? new Date(getSelectedItemData()?.purchaseDate || "")
                    : new Date(),
                  isInvestment: getSelectedItemData()?.usage === "investment",
                  image: getSelectedItemData()?.imageUrl,
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                item from your inventory.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AssetInventory;
