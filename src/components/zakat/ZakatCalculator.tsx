import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Calculator, Save, HelpCircle, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import NisabThreshold from "./NisabThreshold";
import ZakatBreakdown from "./ZakatBreakdown";
import ZakatCalculatorSEO from "./ZakatCalculatorSEO";
import { useAuth } from "../auth/AuthContext";
import { getUserItems, createItem } from "../../utils/supabase";

interface AssetType {
  id: string;
  category: string;
  name: string;
  value: number;
  eligible?: boolean;
  user_id?: string;
}

interface ZakatCalculatorProps {
  assets?: AssetType[];
  currency?: string;
  calculationDate?: Date;
}

const ZakatCalculator = ({
  assets: initialAssets,
  currency = "USD",
  calculationDate = new Date(),
}: ZakatCalculatorProps) => {
  const [activeTab, setActiveTab] = useState("assets");
  const [assets, setAssets] = useState<AssetType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAssets = async () => {
      if (!user) {
        setLoading(false);
        setAssets([]);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await getUserItems<AssetType>('assets', user.id);
        
        if (error) {
          console.error('Error fetching assets:', error);
          setAssets([]);
          setLoading(false);
          return;
        }
        
        const assetsWithEligibility = (data || []).map(asset => ({
          ...asset,
          eligible: true, // Default all assets to eligible
        }));
        
        setAssets(assetsWithEligibility);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assets:', error);
        setAssets([]);
        setLoading(false);
      }
    };

    fetchAssets();
  }, [user]);

  // Function to save calculation to database
  const saveCalculation = async () => {
    if (!user) {
      window.alert("Authentication required: Please sign in to save your calculation");
      return;
    }

    try {
      // Prepare calculation data
      const calculationData = {
        id: window.crypto.randomUUID(),
        user_id: user.id,
        total_assets: assets.reduce((sum, asset) => sum + asset.value, 0),
        nisab_value: 4500,
        zakat_amount: assets.filter(asset => asset.eligible).reduce((sum, asset) => sum + asset.value, 0) * 0.025,
        currency,
        notes: `Zakat calculation based on ${assets.filter(asset => asset.eligible).reduce((sum, asset) => sum + asset.value, 0).toLocaleString()} ${currency} of eligible assets`,
      };

      console.log('Saving calculation data:', calculationData);
      // Save to database
      const { data, error } = await createItem('zakat_calculations', calculationData);

      if (error) {
        console.error('Error saving calculation:', error);
        window.alert("Failed to save your calculation. Please try again.");
        return;
      }

      window.alert("Your Zakat calculation has been saved.");
    } catch (err) {
      console.error('Unexpected error saving calculation:', err);
      window.alert("An unexpected error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
        <span className="text-emerald-600">Loading your assets...</span>
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <span className="text-gray-500">No assets found for Zakat calculation.</span>
      </div>
    );
  }

  // Calculate totals
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const eligibleAssets = assets
    .filter((asset) => asset.eligible)
    .reduce((sum, asset) => sum + asset.value, 0);

  // Zakat is 2.5% of eligible assets
  const zakatAmount = eligibleAssets * 0.025;

  // Gold Nisab threshold (approximate value in USD)
  const goldNisabValue = 4500;

  // Check if user is eligible to pay Zakat
  const isEligible = eligibleAssets >= goldNisabValue;

  // Prepare data for ZakatBreakdown component
  const assetBreakdown = assets.map((asset) => ({
    category: asset.category,
    name: asset.name,
    value: asset.value,
    eligible: asset.eligible,
    zakatAmount: asset.eligible ? asset.value * 0.025 : 0,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <ZakatCalculatorSEO />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Zakat Calculator</h1>
            <p className="text-gray-600 mt-2">
              Calculate your Zakat based on your eligible assets and current
              Nisab threshold
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar with Nisab information */}
          <div className="lg:col-span-1">
            <NisabThreshold
              goldNisabValue={goldNisabValue}
              silverNisabValue={600}
              userTotalAssets={totalAssets}
              currency={currency}
              isEligible={isEligible}
            />

            <Card className="mt-6 bg-white shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">Quick Guide</CardTitle>
                <CardDescription>
                  Understanding Zakat calculation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      1
                    </span>
                    <span>Zakat is due on assets held for one lunar year</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      2
                    </span>
                    <span>
                      The rate is 2.5% of eligible assets above Nisab threshold
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      3
                    </span>
                    <span>Personal use items are generally exempt</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      4
                    </span>
                    <span>Debts are deducted from eligible assets</span>
                  </li>
                </ul>

                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full" size="sm">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    View Detailed Guidelines
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-md">
              <CardHeader className="pb-2 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold">
                    Calculation Results
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Calculator className="h-4 w-4 mr-2" />
                            Recalculate
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Update calculation based on current assets</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button variant="default" size="sm" onClick={saveCalculation}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Calculation
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <Tabs
                  defaultValue="overview"
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="detailed">
                      Detailed Breakdown
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-slate-50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            Total Assets
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-end justify-between">
                            <span className="text-3xl font-bold">
                              {currency} {totalAssets.toLocaleString()}
                            </span>
                            <span className="text-sm text-slate-500">
                              {assets.length} assets
                            </span>
                          </div>

                          <Separator className="my-4" />

                          <div className="space-y-2">
                            {Object.entries(
                              assets.reduce(
                                (acc, asset) => {
                                  acc[asset.category] =
                                    (acc[asset.category] || 0) + asset.value;
                                  return acc;
                                },
                                {} as Record<string, number>,
                              ),
                            ).map(([category, value]) => (
                              <div
                                key={category}
                                className="flex justify-between"
                              >
                                <span className="text-sm">{category}</span>
                                <span className="text-sm font-medium">
                                  {currency} {value.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card
                        className={isEligible ? "bg-emerald-50" : "bg-slate-50"}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Zakat Due</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-end justify-between">
                            <span
                              className={`text-3xl font-bold ${isEligible ? "text-emerald-700" : "text-slate-500"}`}
                            >
                              {isEligible
                                ? `${currency} ${zakatAmount.toLocaleString()}`
                                : "No Zakat Due"}
                            </span>
                            <span className="text-sm text-slate-500">
                              2.5% rate
                            </span>
                          </div>

                          <Separator className="my-4" />

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Eligible Assets</span>
                              <span className="text-sm font-medium">
                                {currency} {eligibleAssets.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Nisab Threshold</span>
                              <span className="text-sm font-medium">
                                {currency} {goldNisabValue.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Calculation Date</span>
                              <span className="text-sm font-medium">
                                {calculationDate.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button onClick={() => setActiveTab("detailed")}>
                        View Detailed Breakdown
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="detailed" className="pt-4">
                    <ZakatBreakdown
                      totalAssets={totalAssets}
                      eligibleAssets={eligibleAssets}
                      zakatAmount={zakatAmount}
                      assetBreakdown={assetBreakdown}
                      calculationDate={calculationDate}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;
