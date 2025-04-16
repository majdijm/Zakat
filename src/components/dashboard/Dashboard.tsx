import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { getUserItems } from '../../utils/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Wallet, Calculator, Coins, ArrowRight } from 'lucide-react';
import UserStats from './UserStats';

interface Asset {
  id: string;
  name: string;
  value: number;
  category: string;
  user_id: string;
}

interface DashboardProps {
  showWelcome?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ showWelcome = true }) => {
  const { user } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [totalAssetValue, setTotalAssetValue] = useState(0);
  const [assetsByCategory, setAssetsByCategory] = useState<Record<string, number>>({
    cash: 0,
    gold: 0,
    silver: 0,
    property: 0,
    stocks: 0,
    business: 0,
    other: 0,
  });

  useEffect(() => {
    const fetchAssets = async () => {
      if (!user) {
        setAssets([]);
        return;
      }

      try {
        console.log('Fetching assets for dashboard...');
        const { data, error } = await getUserItems<Asset>('assets', user.id);
        
        if (error) {
          console.error('Error fetching assets for dashboard:', error);
          setAssets([]);
          return;
        }
        
        console.log('Assets fetched for dashboard:', data?.length || 0, 'assets');
        setAssets(data || []);
      } catch (error) {
        console.error('Exception fetching assets for dashboard:', error);
        setAssets([]);
      }
    };

    fetchAssets();
  }, [user]);

  useEffect(() => {
    // Calculate asset totals whenever assets change
    const categoryTotals = {
      cash: 0,
      gold: 0,
      silver: 0,
      property: 0,
      stocks: 0,
      business: 0,
      other: 0,
    };
    
    let total = 0;
    
    assets.forEach(asset => {
      total += asset.value;
      
      if (asset.category in categoryTotals) {
        categoryTotals[asset.category] += asset.value;
      } else {
        categoryTotals.other += asset.value;
      }
    });
    
    setTotalAssetValue(total);
    setAssetsByCategory(categoryTotals);
    
    console.log('Asset totals calculated:', { total, categoryTotals });
  }, [assets]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (!user) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Zakat Manager</CardTitle>
          <CardDescription>
            Sign in or create an account to manage your assets and calculate Zakat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Zakat Manager helps you track your assets, calculate your Zakat obligation, and maintain records of your Zakat payments.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button asChild variant="outline">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Create Account</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {showWelcome && (
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}!</CardTitle>
            <CardDescription>
              Here's an overview of your assets and Zakat status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {assets.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48">
                <Coins className="h-10 w-10 text-amber-500 mb-3" />
                <span className="text-gray-500 text-lg">You haven't added any assets yet.</span>
                <span className="text-gray-400 text-sm mt-1 mb-4">Get started by adding your first asset to see your stats and Zakat calculations.</span>
                <Button asChild size="sm" variant="outline" className="flex items-center mt-2">
                  <Link to="/assets">
                    Manage Assets
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Assets</p>
                        <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(totalAssetValue)}</h3>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Wallet className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Gold & Silver</p>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {formatCurrency(assetsByCategory.gold + assetsByCategory.silver)}
                        </h3>
                      </div>
                      <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Coins className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Estimated Zakat</p>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {formatCurrency(totalAssetValue * 0.025)}
                        </h3>
                      </div>
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Calculator className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <UserStats />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <p className="text-sm text-gray-600">
                    {`You have ${assets.length} asset${assets.length !== 1 ? 's' : ''} in your portfolio.`}
                  </p>
                  <Button asChild size="sm" variant="outline" className="flex items-center">
                    <Link to="/assets">
                      Manage Assets
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
