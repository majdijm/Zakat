import React from "react";
import Navbar from "../layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, History } from "lucide-react";
import WealthChart from "./WealthChart";
import PaymentHistory from "./PaymentHistory";
import HistoricalRecordsSEO from "./HistoricalRecordsSEO";

interface HistoricalRecordsProps {
  wealthData?: {
    labels: string[];
    datasets: {
      name: string;
      values: number[];
      color: string;
    }[];
  };
  paymentRecords?: {
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending" | "planned";
    method: string;
    notes?: string;
  }[];
}

const HistoricalRecords = ({
  wealthData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        name: "Cash",
        values: [
          5000, 5200, 5400, 5300, 5500, 5800, 6000, 6200, 6400, 6500, 6700,
          7000,
        ],
        color: "#4CAF50",
      },
      {
        name: "Gold",
        values: [
          3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000,
          4100,
        ],
        color: "#FFC107",
      },
      {
        name: "Property",
        values: [
          10000, 10000, 10000, 10500, 10500, 10500, 11000, 11000, 11000, 11500,
          11500, 11500,
        ],
        color: "#2196F3",
      },
      {
        name: "Crypto",
        values: [
          1000, 1200, 900, 1100, 1300, 1500, 1400, 1600, 1800, 1700, 1900, 2100,
        ],
        color: "#9C27B0",
      },
    ],
  },
  paymentRecords = [
    {
      id: "1",
      date: "2023-04-15",
      amount: 2450.75,
      status: "paid",
      method: "Bank Transfer",
      notes: "Annual Zakat payment",
    },
    {
      id: "2",
      date: "2022-04-10",
      amount: 1875.5,
      status: "paid",
      method: "Cash",
      notes: "Paid to local mosque",
    },
    {
      id: "3",
      date: "2021-04-22",
      amount: 1540.25,
      status: "paid",
      method: "Bank Transfer",
      notes: "Annual Zakat payment",
    },
    {
      id: "4",
      date: "2024-05-01",
      amount: 2800.0,
      status: "planned",
      method: "Undecided",
      notes: "Estimated for Ramadan 2024",
    },
  ],
}: HistoricalRecordsProps) => {
  const handleExportAll = () => {
    console.log("Exporting all historical data...");
    // In a real implementation, this would generate and download a file
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage="historical-records" />
      <HistoricalRecordsSEO />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Historical Records</h1>
            <p className="text-gray-600 mt-2">
              Track your wealth growth and Zakat payment history over time
            </p>
          </div>
          <Button onClick={handleExportAll}>
            <Download className="h-4 w-4 mr-2" />
            Export All Data
          </Button>
        </div>

        <div className="space-y-8">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Historical Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track your wealth growth and Zakat payments over time. Use the
                tools below to analyze trends and export historical data for
                your records.
              </p>

              <Tabs defaultValue="wealth" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="wealth">Wealth Growth</TabsTrigger>
                  <TabsTrigger value="payments">Zakat Payments</TabsTrigger>
                </TabsList>
                <TabsContent value="wealth" className="pt-6">
                  <WealthChart data={wealthData} />
                </TabsContent>
                <TabsContent value="payments" className="pt-6">
                  <PaymentHistory payments={paymentRecords} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  Year-over-Year Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Assets Growth</span>
                    <span className="text-green-500 font-medium">+15.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Zakat Paid (YoY)</span>
                    <span className="text-green-500 font-medium">+12.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Asset Diversification</span>
                    <span className="text-amber-500 font-medium">Moderate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Wealth Preservation</span>
                    <span className="text-green-500 font-medium">Strong</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li className="text-muted-foreground">
                    Your gold assets have shown consistent growth over the past
                    year.
                  </li>
                  <li className="text-muted-foreground">
                    Consider diversifying your property investments for better
                    long-term returns.
                  </li>
                  <li className="text-muted-foreground">
                    Your Zakat payments have increased proportionally with your
                    wealth growth.
                  </li>
                  <li className="text-muted-foreground">
                    Set up automatic reminders for upcoming Zakat payment dates.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalRecords;
