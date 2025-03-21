import React from "react";
import Layout from "../components/layout/Layout";
import GoldPriceSetup from "../components/settings/GoldPriceSetup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const SettingsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Tabs defaultValue="prices">
          <TabsList className="mb-4">
            <TabsTrigger value="prices">Metal Prices</TabsTrigger>
            <TabsTrigger value="general">General Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prices" className="space-y-6">
            <GoldPriceSetup />
          </TabsContent>
          
          <TabsContent value="general" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">General Settings</h2>
              <p className="text-gray-500">
                General settings will be added in a future update.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
