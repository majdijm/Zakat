import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Pencil, Trash2, Eye, Plus, Search, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Asset {
  id: string;
  type: "cash" | "gold" | "property" | "crypto" | "other";
  name: string;
  value: number;
  dateAdded: string;
  description?: string;
}

interface AssetListProps {
  assets?: Asset[];
  onEdit?: (asset: Asset) => void;
  onDelete?: (id: string) => void;
  onView?: (asset: Asset) => void;
  onAdd?: () => void;
}

const AssetList = ({
  assets = [
    {
      id: "1",
      type: "cash",
      name: "Savings Account",
      value: 5000,
      dateAdded: "2023-01-15",
      description: "Main savings account",
    },
    {
      id: "2",
      type: "gold",
      name: "Gold Necklace",
      value: 2500,
      dateAdded: "2023-02-20",
      description: "Family heirloom",
    },
    {
      id: "3",
      type: "property",
      name: "Apartment",
      value: 250000,
      dateAdded: "2022-11-05",
      description: "Investment property",
    },
    {
      id: "4",
      type: "crypto",
      name: "Bitcoin",
      value: 10000,
      dateAdded: "2023-03-10",
      description: "Long-term investment",
    },
    {
      id: "5",
      type: "other",
      name: "Car",
      value: 15000,
      dateAdded: "2022-08-30",
      description: "Personal vehicle",
    },
  ],
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
  onAdd = () => {},
}: AssetListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Asset;
    direction: "asc" | "desc";
  } | null>(null);

  // Filter assets based on search term and type
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || asset.type === filterType;
    return matchesSearch && matchesType;
  });

  // Sort assets based on sort configuration
  const sortedAssets = React.useMemo(() => {
    let sortableAssets = [...filteredAssets];
    if (sortConfig !== null) {
      sortableAssets.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableAssets;
  }, [filteredAssets, sortConfig]);

  const requestSort = (key: keyof Asset) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get badge color based on asset type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "cash":
        return "default";
      case "gold":
        return "warning";
      case "property":
        return "secondary";
      case "crypto":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Asset List</span>
          <Button onClick={onAdd} className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add Asset
          </Button>
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="property">Property</SelectItem>
              <SelectItem value="crypto">Cryptocurrency</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableCaption>A list of your assets</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead
                  onClick={() => requestSort("type")}
                  className="cursor-pointer w-[100px]"
                >
                  <div className="flex items-center">
                    Type <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => requestSort("name")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    Name <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => requestSort("value")}
                  className="cursor-pointer text-right"
                >
                  <div className="flex items-center justify-end">
                    Value <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  onClick={() => requestSort("dateAdded")}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    Date Added <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAssets.length > 0 ? (
                sortedAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>
                      <Badge variant={getBadgeVariant(asset.type) as any}>
                        {asset.type.charAt(0).toUpperCase() +
                          asset.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(asset.value)}
                    </TableCell>
                    <TableCell>
                      {new Date(asset.dateAdded).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onView(asset)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onEdit(asset)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Deletion</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p>
                                Are you sure you want to delete {asset.name}?
                              </p>
                              <p className="text-sm text-muted-foreground mt-2">
                                This action cannot be undone.
                              </p>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Cancel</Button>
                              <Button
                                variant="destructive"
                                onClick={() => onDelete(asset.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No assets found. Add your first asset to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetList;
