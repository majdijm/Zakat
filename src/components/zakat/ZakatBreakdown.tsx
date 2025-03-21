import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Download, Printer } from "lucide-react";

interface AssetBreakdown {
  category: string;
  name: string;
  value: number;
  eligible: boolean;
  zakatAmount: number;
}

interface ZakatBreakdownProps {
  totalAssets: number;
  eligibleAssets: number;
  zakatAmount: number;
  assetBreakdown: AssetBreakdown[];
  calculationDate?: Date;
}

const ZakatBreakdown = ({
  totalAssets = 50000,
  eligibleAssets = 45000,
  zakatAmount = 1125,
  assetBreakdown = [
    {
      category: "Cash",
      name: "Savings Account",
      value: 15000,
      eligible: true,
      zakatAmount: 375,
    },
    {
      category: "Gold",
      name: "Gold Jewelry",
      value: 10000,
      eligible: true,
      zakatAmount: 250,
    },
    {
      category: "Gold",
      name: "Personal Gold Ring",
      value: 2000,
      eligible: false,
      zakatAmount: 0,
    },
    {
      category: "Property",
      name: "Investment Property",
      value: 20000,
      eligible: true,
      zakatAmount: 500,
    },
    {
      category: "Crypto",
      name: "Bitcoin",
      value: 3000,
      eligible: true,
      zakatAmount: 75,
    },
    {
      category: "Personal",
      name: "Primary Residence",
      value: 0,
      eligible: false,
      zakatAmount: 0,
    },
  ],
  calculationDate = new Date(),
}: ZakatBreakdownProps) => {
  // Calculate percentages for the progress bar
  const eligiblePercentage = (eligibleAssets / totalAssets) * 100;

  // Group assets by category for summary
  const categorySummary = assetBreakdown.reduce(
    (acc, asset) => {
      if (!acc[asset.category]) {
        acc[asset.category] = { total: 0, eligible: 0, zakatAmount: 0 };
      }
      acc[asset.category].total += asset.value;
      if (asset.eligible) {
        acc[asset.category].eligible += asset.value;
        acc[asset.category].zakatAmount += asset.zakatAmount;
      }
      return acc;
    },
    {} as Record<
      string,
      { total: number; eligible: number; zakatAmount: number }
    >,
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <Card>
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">
                Zakat Calculation Breakdown
              </CardTitle>
              <CardDescription>
                Calculated on {calculationDate.toLocaleDateString()} based on
                your eligible assets
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="text-sm font-medium text-slate-500">
                Total Assets
              </h3>
              <p className="text-2xl font-bold">
                ${totalAssets.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <h3 className="text-sm font-medium text-slate-500">
                Eligible for Zakat
              </h3>
              <p className="text-2xl font-bold">
                ${eligibleAssets.toLocaleString()}
              </p>
              <div className="mt-2">
                <Progress value={eligiblePercentage} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">
                  {eligiblePercentage.toFixed(1)}% of total assets
                </p>
              </div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <h3 className="text-sm font-medium text-emerald-600">
                Total Zakat Due
              </h3>
              <p className="text-2xl font-bold text-emerald-700">
                ${zakatAmount.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                2.5% of eligible assets
              </p>
            </div>
          </div>

          {/* Category Summary */}
          <h3 className="text-lg font-semibold mb-3">Category Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {Object.entries(categorySummary).map(([category, data]) => (
              <div key={category} className="p-4 border rounded-lg">
                <h4 className="font-medium">{category}</h4>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Total:</span>
                    <span className="font-medium">
                      ${data.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Eligible:</span>
                    <span className="font-medium">
                      ${data.eligible.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Zakat:</span>
                    <span className="font-medium text-emerald-600">
                      ${data.zakatAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Breakdown Table */}
          <h3 className="text-lg font-semibold mb-3">
            Detailed Asset Breakdown
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Zakat Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetBreakdown.map((asset, index) => (
                <TableRow key={index}>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>${asset.value.toLocaleString()}</TableCell>
                  <TableCell>
                    {asset.eligible ? (
                      <Badge
                        variant="default"
                        className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                      >
                        Eligible
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-slate-500">
                        Exempt
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    ${asset.zakatAmount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Notes Section */}
          <div className="mt-8 p-4 bg-amber-50 rounded-lg">
            <h3 className="text-sm font-medium text-amber-800 mb-2">
              Important Notes
            </h3>
            <ul className="text-sm text-amber-700 space-y-1 list-disc pl-5">
              <li>
                Zakat is calculated at 2.5% of eligible assets held for one
                lunar year.
              </li>
              <li>
                Personal use items like primary residence and personal jewelry
                are exempt.
              </li>
              <li>
                Consult with a scholar for specific questions about your
                situation.
              </li>
              <li>
                This calculation is based on the information you provided and
                serves as a guide only.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZakatBreakdown;
