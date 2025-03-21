import React from "react";
import Layout from "../components/layout/Layout";
import AssetInventory from "../components/inventory/AssetInventory";
import GoldInventoryLink from "../components/inventory/GoldInventoryLink";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const InventoryPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-bold">Asset Inventory</h1>
        
        <Tabs defaultValue="inventory">
          <TabsList className="mb-4">
            <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
            <TabsTrigger value="link">Gold Asset Link</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory" className="space-y-6">
            <AssetInventory />
          </TabsContent>
          
          <TabsContent value="link" className="space-y-6">
            <GoldInventoryLink />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InventoryPage;
