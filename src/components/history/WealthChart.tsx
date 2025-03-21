import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  TrendingUp,
  Download,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface WealthChartProps {
  data?: {
    labels: string[];
    datasets: {
      name: string;
      values: number[];
      color: string;
    }[];
  };
  timeRange?: string;
  assetTypes?: string[];
}

const WealthChart = ({
  data = {
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
  timeRange = "yearly",
  assetTypes = ["Cash", "Gold", "Property", "Crypto"],
}: WealthChartProps) => {
  const [chartType, setChartType] = useState("line");
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [selectedAssetTypes, setSelectedAssetTypes] =
    useState<string[]>(assetTypes);
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Calculate total wealth for current period
  const currentTotal = data.datasets.reduce((sum, dataset) => {
    if (selectedAssetTypes.includes(dataset.name)) {
      return sum + dataset.values[dataset.values.length - 1];
    }
    return sum;
  }, 0);

  // Calculate total wealth for previous period
  const previousTotal = data.datasets.reduce((sum, dataset) => {
    if (selectedAssetTypes.includes(dataset.name)) {
      return sum + dataset.values[dataset.values.length - 2];
    }
    return sum;
  }, 0);

  // Calculate percentage change
  const percentageChange =
    ((currentTotal - previousTotal) / previousTotal) * 100;

  // Mock function to render chart (in a real app, you would use a charting library like recharts)
  const renderChart = () => {
    return (
      <div className="h-[300px] w-full bg-background border rounded-md flex items-center justify-center relative">
        {/* This is a placeholder for the actual chart */}
        <div className="absolute inset-0 p-4">
          {/* X-axis */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-muted"></div>

          {/* Y-axis */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-muted"></div>

          {/* Chart content - simplified visualization */}
          <div className="relative h-full w-full flex items-end justify-between px-6">
            {data.labels.map((label, index) => {
              // Only show data for selected asset types
              const filteredDatasets = data.datasets.filter((ds) =>
                selectedAssetTypes.includes(ds.name),
              );

              // Calculate height for this data point (simplified)
              const totalValue = filteredDatasets.reduce(
                (sum, ds) => sum + ds.values[index],
                0,
              );
              const maxValue = 25000; // Assuming this is our max value
              const heightPercentage = (totalValue / maxValue) * 100;

              return (
                <div key={label} className="flex flex-col items-center">
                  {/* Bar or point */}
                  <div
                    className={`w-4 ${chartType === "bar" ? "bg-primary" : "bg-transparent"}`}
                    style={{
                      height: `${heightPercentage}%`,
                      minHeight: "4px",
                    }}
                  >
                    {chartType === "line" && (
                      <div className="w-3 h-3 rounded-full bg-primary transform -translate-y-1.5"></div>
                    )}
                  </div>

                  {/* Label */}
                  <span className="text-xs text-muted-foreground mt-2">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {data.datasets
            .filter((ds) => selectedAssetTypes.includes(ds.name))
            .map((dataset) => (
              <div key={dataset.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: dataset.color }}
                ></div>
                <span className="text-xs">{dataset.name}</span>
              </div>
            ))}
        </div>

        <div className="text-muted-foreground text-sm">
          {chartType === "line" ? "Line Chart" : "Bar Chart"} Visualization
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">
          Wealth Growth Over Time
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant={chartType === "line" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("line")}
            className="h-8 w-8 p-0"
          >
            <LineChart className="h-4 w-4" />
          </Button>
          <Button
            variant={chartType === "bar" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("bar")}
            className="h-8 w-8 p-0"
          >
            <BarChart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 px-2">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="flex items-center gap-4">
              <Select
                value={selectedTimeRange}
                onValueChange={setSelectedTimeRange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>

              {selectedTimeRange === "custom" && (
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Asset Types:</span>
              <div className="flex flex-wrap gap-1">
                {assetTypes.map((type) => (
                  <Button
                    key={type}
                    variant={
                      selectedAssetTypes.includes(type) ? "default" : "outline"
                    }
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => {
                      if (selectedAssetTypes.includes(type)) {
                        if (selectedAssetTypes.length > 1) {
                          // Ensure at least one type is selected
                          setSelectedAssetTypes(
                            selectedAssetTypes.filter((t) => t !== type),
                          );
                        }
                      } else {
                        setSelectedAssetTypes([...selectedAssetTypes, type]);
                      }
                    }}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <TrendingUp
              className={`h-5 w-5 ${percentageChange >= 0 ? "text-green-500" : "text-red-500"}`}
            />
            <span
              className={`font-medium ${percentageChange >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {percentageChange >= 0 ? "+" : ""}
              {percentageChange.toFixed(2)}%
            </span>
            <span className="text-sm text-muted-foreground">
              since last period
            </span>
          </div>

          {renderChart()}

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Assets</TabsTrigger>
              <TabsTrigger value="cash">Cash</TabsTrigger>
              <TabsTrigger value="gold">Gold</TabsTrigger>
              <TabsTrigger value="property">Property</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <div className="text-sm text-muted-foreground">
                Showing combined wealth growth across all asset categories.
              </div>
            </TabsContent>
            <TabsContent value="cash" className="pt-4">
              <div className="text-sm text-muted-foreground">
                Showing wealth growth for Cash assets only.
              </div>
            </TabsContent>
            <TabsContent value="gold" className="pt-4">
              <div className="text-sm text-muted-foreground">
                Showing wealth growth for Gold assets only.
              </div>
            </TabsContent>
            <TabsContent value="property" className="pt-4">
              <div className="text-sm text-muted-foreground">
                Showing wealth growth for Property assets only.
              </div>
            </TabsContent>
            <TabsContent value="crypto" className="pt-4">
              <div className="text-sm text-muted-foreground">
                Showing wealth growth for Cryptocurrency assets only.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default WealthChart;
