import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  DollarSign,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AssetDetailsProps {
  asset?: {
    id: string;
    name: string;
    type: "cash" | "gold" | "property" | "crypto" | "other";
    value: number;
    purchaseDate: string;
    description?: string;
    location?: string;
    lastUpdated: string;
    historicalValues?: {
      date: string;
      value: number;
    }[];
  };
}

const AssetDetails = ({ asset }: AssetDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Default asset if none provided
  const defaultAsset = {
    id: "1",
    name: "Gold Investment",
    type: "gold",
    value: 5000,
    purchaseDate: "2022-01-15",
    description:
      "Investment grade gold bars purchased from ABC Precious Metals",
    location: "Home safe",
    lastUpdated: "2023-06-10",
    historicalValues: [
      { date: "2022-01-15", value: 4800 },
      { date: "2022-04-15", value: 4900 },
      { date: "2022-07-15", value: 4750 },
      { date: "2022-10-15", value: 4850 },
      { date: "2023-01-15", value: 4950 },
      { date: "2023-04-15", value: 5100 },
      { date: "2023-06-10", value: 5000 },
    ],
  } as const;

  const displayAsset = asset || defaultAsset;

  // Calculate value change
  const historicalValues = displayAsset.historicalValues || [];
  const currentValue = displayAsset.value;
  const previousValue =
    historicalValues.length > 1
      ? historicalValues[historicalValues.length - 2].value
      : currentValue;

  const valueChange = currentValue - previousValue;
  const percentChange = previousValue ? (valueChange / previousValue) * 100 : 0;
  const isPositiveChange = valueChange >= 0;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white">
      <Card className="shadow-lg border-2 border-gray-100">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">
                {displayAsset.name}
              </CardTitle>
              <CardDescription className="text-gray-500 mt-1">
                Asset ID: {displayAsset.id}
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className={`px-3 py-1 capitalize ${
                displayAsset.type === "gold"
                  ? "bg-amber-100 text-amber-800 border-amber-200"
                  : displayAsset.type === "cash"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : displayAsset.type === "property"
                      ? "bg-blue-100 text-blue-800 border-blue-200"
                      : displayAsset.type === "crypto"
                        ? "bg-purple-100 text-purple-800 border-purple-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
              }`}
            >
              {displayAsset.type}
            </Badge>
          </div>
        </CardHeader>

        <Tabs
          defaultValue="overview"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">Value History</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="pt-6">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">
                      Current Value
                    </div>
                    <div className="text-3xl font-bold">
                      {formatCurrency(displayAsset.value)}
                    </div>
                    <div
                      className={`flex items-center mt-2 text-sm ${isPositiveChange ? "text-green-600" : "text-red-600"}`}
                    >
                      {isPositiveChange ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                      <span className="ml-1">
                        {isPositiveChange ? "+" : ""}
                        {formatCurrency(valueChange)} (
                        {isPositiveChange ? "+" : ""}
                        {percentChange.toFixed(2)}%)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Calendar size={14} className="mr-1" />
                        <span>Purchase Date</span>
                      </div>
                      <div className="font-medium">
                        {formatDate(displayAsset.purchaseDate)}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Calendar size={14} className="mr-1" />
                        <span>Last Updated</span>
                      </div>
                      <div className="font-medium">
                        {formatDate(displayAsset.lastUpdated)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Info size={14} className="mr-1" />
                      <span>Description</span>
                    </div>
                    <p className="text-gray-700">
                      {displayAsset.description || "No description available"}
                    </p>
                  </div>

                  {displayAsset.location && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-500 mb-1">Location</div>
                      <p className="text-gray-700">{displayAsset.location}</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <LineChart size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">
                    Historical value chart would be displayed here
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Showing data from {historicalValues.length} time periods
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Value History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-2 border border-gray-200">
                          Date
                        </th>
                        <th className="text-right p-2 border border-gray-200">
                          Value
                        </th>
                        <th className="text-right p-2 border border-gray-200">
                          Change
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {historicalValues.map((entry, index) => {
                        const prevValue =
                          index > 0
                            ? historicalValues[index - 1].value
                            : entry.value;
                        const change = entry.value - prevValue;
                        const changePercent = prevValue
                          ? (change / prevValue) * 100
                          : 0;
                        const isPositive = change >= 0;

                        return (
                          <tr
                            key={entry.date}
                            className="border-b border-gray-200"
                          >
                            <td className="p-2 border border-gray-200">
                              {formatDate(entry.date)}
                            </td>
                            <td className="text-right p-2 border border-gray-200">
                              {formatCurrency(entry.value)}
                            </td>
                            <td
                              className={`text-right p-2 border border-gray-200 ${isPositive ? "text-green-600" : "text-red-600"}`}
                            >
                              {index === 0 ? (
                                "-"
                              ) : (
                                <>
                                  {isPositive ? "+" : ""}
                                  {formatCurrency(change)} (
                                  {isPositive ? "+" : ""}
                                  {changePercent.toFixed(2)}%)
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Asset Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Asset Name</span>
                        <span className="font-medium">{displayAsset.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Asset Type</span>
                        <span className="font-medium capitalize">
                          {displayAsset.type}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Current Value</span>
                        <span className="font-medium">
                          {formatCurrency(displayAsset.value)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Purchase Date</span>
                        <span className="font-medium">
                          {formatDate(displayAsset.purchaseDate)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Last Updated</span>
                        <span className="font-medium">
                          {formatDate(displayAsset.lastUpdated)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Additional Details
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm text-gray-500 mb-1">
                        Description
                      </h4>
                      <p className="text-gray-700 mb-4">
                        {displayAsset.description || "No description available"}
                      </p>

                      {displayAsset.location && (
                        <>
                          <h4 className="text-sm text-gray-500 mb-1">
                            Location
                          </h4>
                          <p className="text-gray-700">
                            {displayAsset.location}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">
                    Zakat Information
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <DollarSign size={16} className="text-blue-600 mr-2" />
                      <span className="font-medium">Zakat Eligibility</span>
                    </div>
                    <p className="text-gray-700 mb-2">
                      This asset is eligible for Zakat calculation as it has
                      been owned for more than one lunar year.
                    </p>
                    <div className="flex justify-between py-2 border-b border-blue-100">
                      <span className="text-gray-600">Zakat Value (2.5%)</span>
                      <span className="font-medium">
                        {formatCurrency(displayAsset.value * 0.025)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>

        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline">Edit Asset</Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <Download size={16} className="mr-2" />
                  Export Data
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export asset data as CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssetDetails;
