import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { ArrowUp, ArrowDown } from "lucide-react";

interface AssetSummaryCardProps {
  totalAssetValue?: number;
  cashValue?: number;
  goldValue?: number;
  silverValue?: number;
  propertyValue?: number;
  cryptoValue?: number;
  otherValue?: number;
  changePercentage?: number;
  changeDirection?: "up" | "down" | "none";
  currency?: string;
}

const AssetSummaryCard = ({
  totalAssetValue = 125000,
  cashValue = 25000,
  goldValue = 35000,
  silverValue = 0,
  propertyValue = 50000,
  cryptoValue = 15000,
  otherValue = 0,
  changePercentage = 5.2,
  changeDirection = "up",
  currency = "USD",
}: AssetSummaryCardProps) => {
  // Calculate percentages
  const totalValue = totalAssetValue || 1; // Prevent division by zero
  const cashPercentage = totalValue > 0 ? Math.round((cashValue / totalValue) * 100) : 0;
  const goldPercentage = totalValue > 0 ? Math.round((goldValue / totalValue) * 100) : 0;
  const silverPercentage = totalValue > 0 ? Math.round((silverValue / totalValue) * 100) : 0;
  const propertyPercentage = totalValue > 0 ? Math.round((propertyValue / totalValue) * 100) : 0;
  const cryptoPercentage = totalValue > 0 ? Math.round((cryptoValue / totalValue) * 100) : 0;
  const otherPercentage = totalValue > 0 ? Math.round((otherValue / totalValue) * 100) : 0;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Asset Summary</span>
          <div className="flex items-center text-sm font-medium">
            {changeDirection === "up" ? (
              <ArrowUp className="h-4 w-4 text-emerald-500 mr-1" />
            ) : changeDirection === "down" ? (
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
            ) : null}
            <span
              className={`${changeDirection === "up" ? "text-emerald-500" : changeDirection === "down" ? "text-red-500" : "text-gray-500"}`}
            >
              {changePercentage}% from last month
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4">{formatCurrency(totalAssetValue)}</div>

        <div className="space-y-4">
          {/* Cash */}
          {cashValue > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cash/Crypto</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{formatCurrency(cashValue)}</span>
                  <span className="text-xs text-gray-500">{cashPercentage}%</span>
                </div>
              </div>
              <Progress value={cashPercentage} className="h-2 bg-gray-100" />
            </div>
          )}

          {/* Gold */}
          {goldValue > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Gold</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{formatCurrency(goldValue)}</span>
                  <span className="text-xs text-gray-500">{goldPercentage}%</span>
                </div>
              </div>
              <Progress value={goldPercentage} className="h-2 bg-gray-100" />
            </div>
          )}

          {/* Silver */}
          {silverValue > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Silver</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{formatCurrency(silverValue)}</span>
                  <span className="text-xs text-gray-500">{silverPercentage}%</span>
                </div>
              </div>
              <Progress value={silverPercentage} className="h-2 bg-gray-100" />
            </div>
          )}

          {/* Property */}
          {propertyValue > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Property</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{formatCurrency(propertyValue)}</span>
                  <span className="text-xs text-gray-500">{propertyPercentage}%</span>
                </div>
              </div>
              <Progress value={propertyPercentage} className="h-2 bg-gray-100" />
            </div>
          )}

          {/* Cryptocurrency */}
          {cryptoValue > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cryptocurrency</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{formatCurrency(cryptoValue)}</span>
                  <span className="text-xs text-gray-500">{cryptoPercentage}%</span>
                </div>
              </div>
              <Progress value={cryptoPercentage} className="h-2 bg-gray-100" />
            </div>
          )}

          {/* Other */}
          {otherValue > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Other</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{formatCurrency(otherValue)}</span>
                  <span className="text-xs text-gray-500">{otherPercentage}%</span>
                </div>
              </div>
              <Progress value={otherPercentage} className="h-2 bg-gray-100" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetSummaryCard;
