import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { InfoIcon } from "lucide-react";

interface ZakatSummaryCardProps {
  zakatAmount?: number;
  eligibleAssets?: number;
  eligibilityStatus?: "eligible" | "not-eligible" | "partial";
  nisabThreshold?: number;
  dueDate?: Date | string;
  currency?: string;
}

const ZakatSummaryCard = ({
  zakatAmount = 2500,
  eligibleAssets = 100000,
  eligibilityStatus = "eligible",
  nisabThreshold = 5271.35,
  dueDate = new Date(),
  currency = "USD",
}: ZakatSummaryCardProps) => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format date
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  };

  // Calculate eligibility percentage for progress bar
  const eligibilityPercentage =
    eligibilityStatus === "not-eligible"
      ? 0
      : eligibilityStatus === "partial"
      ? 50
      : 100;

  return (
    <Card className="bg-white shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <span>Zakat Summary</span>
          <InfoIcon className="h-5 w-5 text-gray-400 cursor-help" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm font-medium text-gray-600">Your calculated obligation on eligible assets:</span>
            </div>
            <div className="text-3xl font-bold mb-1">{formatCurrency(zakatAmount)}</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Eligibility Status:</span>
              <span
                className={`text-sm font-medium ${eligibilityStatus === "eligible" ? "text-emerald-500" : eligibilityStatus === "partial" ? "text-amber-500" : "text-gray-500"}`}
              >
                {eligibilityStatus === "eligible"
                  ? "Eligible for Zakat"
                  : eligibilityStatus === "partial"
                  ? "Partially Eligible"
                  : "Not Eligible"}
              </span>
            </div>
            <Progress value={eligibilityPercentage} className="h-2 bg-gray-100" />
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Nisab Threshold:</span>
                <div className="text-sm font-medium">{formatCurrency(nisabThreshold)}</div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Due Date:</span>
                <div className="text-sm font-medium">{formatDate(dueDate)}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZakatSummaryCard;
