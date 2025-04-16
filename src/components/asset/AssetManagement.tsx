import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Trash2, Edit, Save, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useToast } from '../ui/use-toast';
import { useAuth } from '../auth/AuthContext';
import { getUserItems, createItem, updateItem, deleteItem } from '../../utils/supabase';
import { v4 as uuidv4 } from 'uuid';

interface Asset {
  id: string;
  name: string;
  value: number;
  category: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

const AssetManagement: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [newAsset, setNewAsset] = useState<{
    name: string;
    value: number;
    category: string;
  }>({
    name: '',
    value: 0,
    category: 'cash',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch user's assets
  useEffect(() => {
    const fetchAssets = async () => {
      if (!user) {
        setAssets([]);
        setIsLoading(false);
        return;
      }
      
      try {
        console.log('Fetching assets for user:', user.id);
        const { data, error } = await getUserItems<Asset>('assets', user.id, []);
        
        if (error) {
          console.error('Error details:', error);
          setAssets([]);
          setIsLoading(false);
          return;
        }
        
        console.log('Assets fetched successfully:', data);
        setAssets(data || []);
      } catch (error: any) {
        console.error('Error fetching assets:', error.message);
        setAssets([]);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchAssets();
  }, [user]);

  const handleAddAsset = async () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to add assets',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSaving(true);
    try {
      // Validate input
      if (!newAsset.name.trim()) {
        throw new Error('Asset name is required');
      }
      
      if (newAsset.value < 0) {
        throw new Error('Asset value cannot be negative');
      }

      if (!newAsset.category) {
        throw new Error('Asset category is required');
      }

      // Prepare asset data - make sure to match the database schema exactly
      const assetData = {
        id: uuidv4(),
        user_id: user.id,
        name: newAsset.name.trim(),
        value: newAsset.value,
        category: newAsset.category,
      };

      console.log('Creating new asset:', assetData);
      
      // Save to database
      const { data, error } = await createItem<Asset>('assets', assetData);

      if (error) {
        console.error('Error saving asset:', error);
        throw new Error('Failed to save asset. Please try again.');
      }

      console.log('Asset created successfully:', data);
      
      // Update asset list with the returned data
      setAssets((prevAssets) => [...prevAssets, data || assetData]);
      
      // Reset form
      setNewAsset({
        name: '',
        value: 0,
        category: '',
      });
      
      toast({
        title: 'Asset added',
        description: 'Your asset has been added successfully',
      });
    } catch (error) {
      console.error('Error in handleAddAsset:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateAsset = async () => {
    if (!editingAsset || !user) return;
    
    setIsSaving(true);
    try {
      const { data, error } = await updateItem<Asset>('assets', editingAsset.id, editingAsset);
      if (error) throw error;

      setAssets(assets.map(asset => asset.id === editingAsset.id ? data : asset));
      setEditingAsset(null);
      
      toast({
        title: 'Asset updated',
        description: 'Your asset has been updated successfully',
      });
    } catch (error: any) {
      console.error('Error updating asset:', error.message);
      toast({
        title: 'Error updating asset',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAsset = async (id: string) => {
    if (!user) return;
    
    if (!window.confirm('Are you sure you want to delete this asset?')) return;
    
    try {
      const { error } = await deleteItem('assets', id);
      if (error) throw error;

      setAssets(assets.filter(asset => asset.id !== id));
      
      toast({
        title: 'Asset deleted',
        description: 'Your asset has been deleted successfully',
      });
    } catch (error: any) {
      console.error('Error deleting asset:', error.message);
      toast({
        title: 'Error deleting asset',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingAsset) return;
    
    const { name, value } = e.target;
    setEditingAsset({
      ...editingAsset,
      [name]: name === 'value' ? parseFloat(value) : value,
    });
  };

  const handleNewAssetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAsset({
      ...newAsset,
      [name]: name === 'value' ? parseFloat(value) : value,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      cash: 'Cash',
      gold: 'Gold',
      silver: 'Silver',
      stocks: 'Stocks',
      property: 'Property',
      business: 'Business',
      other: 'Other',
    };
    return categories[category] || category;
  };

  return (
    <div>
      <Helmet>
        <title>Asset Management | Zakat Manager</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-800">Asset Management</h1>
          <Button 
            onClick={() => setIsAdding(true)} 
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={isAdding}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Asset
          </Button>
        </div>

        {isAdding && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Asset</CardTitle>
              <CardDescription>Enter the details of your new asset</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleAddAsset();
              }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Asset Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newAsset.name}
                      onChange={handleNewAssetChange}
                      placeholder="e.g., Savings Account"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Value</Label>
                    <Input
                      id="value"
                      name="value"
                      type="number"
                      value={newAsset.value}
                      onChange={handleNewAssetChange}
                      placeholder="0.00"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Asset Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={newAsset.category}
                      onChange={handleNewAssetChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="cash">Cash</option>
                      <option value="gold">Gold</option>
                      <option value="silver">Silver</option>
                      <option value="stocks">Stocks</option>
                      <option value="property">Property</option>
                      <option value="business">Business</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                      setNewAsset({ name: '', value: 0, category: 'cash' });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Asset
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
            </CardFooter>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Your Assets</CardTitle>
            <CardDescription>
              Manage your assets for Zakat calculation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!user ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Please sign in to view and manage your assets.</p>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-4" />
                <p className="text-gray-500">Loading assets...</p>
              </div>
            ) : assets.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No assets found. Add your first asset to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Asset Category</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map(asset => (
                      <TableRow key={asset.id}>
                        {editingAsset && editingAsset.id === asset.id ? (
                          <>
                            <TableCell>
                              <Input
                                name="name"
                                value={editingAsset.name}
                                onChange={handleEditChange}
                              />
                            </TableCell>
                            <TableCell>
                              <select
                                name="category"
                                value={editingAsset.category}
                                onChange={handleEditChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              >
                                <option value="cash">Cash</option>
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                                <option value="stocks">Stocks</option>
                                <option value="property">Property</option>
                                <option value="business">Business</option>
                                <option value="other">Other</option>
                              </select>
                            </TableCell>
                            <TableCell>
                              <Input
                                name="value"
                                type="number"
                                value={editingAsset.value}
                                onChange={handleEditChange}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingAsset(null)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-emerald-600 hover:bg-emerald-700"
                                  onClick={handleUpdateAsset}
                                  disabled={isSaving}
                                >
                                  {isSaving ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Save className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{asset.name}</TableCell>
                            <TableCell>{getCategoryLabel(asset.category)}</TableCell>
                            <TableCell>{formatCurrency(asset.value)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingAsset(asset)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteAsset(asset.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetManagement;
