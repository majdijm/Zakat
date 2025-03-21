import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { InfoIcon } from "lucide-react";

interface NisabThresholdProps {
  goldNisabValue?: number;
  silverNisabValue?: number;
  userTotalAssets?: number;
  currency?: string;
  isEligible?: boolean;
}

const NisabThreshold = ({
  goldNisabValue = 4500, // Default value in USD
  silverNisabValue = 600, // Default value in USD
  userTotalAssets = 10000, // Default value in USD
  currency = "USD",
  isEligible = true,
}: NisabThresholdProps) => {
  // Calculate percentage of assets compared to nisab threshold (using gold standard)
  const percentageOfNisab = Math.min(
    Math.round((userTotalAssets / goldNisabValue) * 100),
    100,
  );

  return (
    <Card className="w-full max-w-md bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Nisab Threshold</CardTitle>
          <Badge
            variant={isEligible ? "destructive" : "outline"}
            className="ml-2"
          >
            {isEligible ? "Zakat Due" : "Below Threshold"}
          </Badge>
        </div>
        <CardDescription>
          The minimum amount of wealth that makes one liable for Zakat
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-medium">Gold Standard</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="ml-1 h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60">Equivalent to 87.48 grams of gold</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="font-semibold">
              {currency === "USD" ? "$" : currency}{" "}
              {goldNisabValue.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-medium">Silver Standard</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="ml-1 h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-60">Equivalent to 612.36 grams of silver</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="font-semibold">
              {currency === "USD" ? "$" : currency}{" "}
              {silverNisabValue.toLocaleString()}
            </span>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Your Assets</span>
              <span className="text-sm font-medium">
                {currency === "USD" ? "$" : currency}{" "}
                {userTotalAssets.toLocaleString()}
              </span>
            </div>
            <Progress value={percentageOfNisab} className="h-2" />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0</span>
              <span>Nisab Threshold</span>
              <span>2x Nisab</span>
            </div>
          </div>

          <div className="mt-4 text-sm bg-blue-50 p-3 rounded-md">
            {isEligible ? (
              <p>
                Your assets exceed the Nisab threshold. You are eligible to pay
                Zakat on your qualifying assets.
              </p>
            ) : (
              <p>
                Your assets are below the Nisab threshold. You are not required
                to pay Zakat at this time.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NisabThreshold;
