import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getUserItems } from '../../utils/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Loader2, TrendingUp, AlertCircle } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  value: number;
  category: string;
}

interface ZakatCalculation {
  id: string;
  created_at: string;
  total_assets: number;
  nisab_value: number;
  zakat_amount: number;
}

const UserStats: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAssets: 0,
    assetCount: 0,
    zakatHistory: 0,
    nisabThreshold: 0,
    isAboveNisab: false,
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch assets
        const assetsResponse = await getUserItems<Asset>('assets', user.id);
        
        // Fetch zakat history
        const zakatResponse = await getUserItems<ZakatCalculation>('zakat_calculations', user.id);

        // Calculate stats
        const assets = assetsResponse.data || [];
        const zakatHistory = zakatResponse.data || [];
        const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
        
        // Get the most recent nisab threshold from zakat history, or use default
        const nisabThreshold = zakatHistory.length > 0 
          ? zakatHistory[0].nisab_value 
          : 5000; // Default value in USD
        
        setStats({
          totalAssets,
          assetCount: assets.length,
          zakatHistory: zakatHistory.length,
          nisabThreshold,
          isAboveNisab: totalAssets >= nisabThreshold,
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <span className="ml-2 text-emerald-600">Loading stats...</span>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Zakat Status</CardTitle>
        <CardDescription>
          Track your assets and Zakat eligibility
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Assets vs. Nisab Threshold</span>
              <span className="text-sm font-medium">
                {formatCurrency(stats.totalAssets)} / {formatCurrency(stats.nisabThreshold)}
              </span>
            </div>
            <Progress 
              value={(stats.totalAssets / stats.nisabThreshold) * 100} 
              max={100} 
              className="h-2"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500">Asset Count</p>
              <p className="text-2xl font-bold">{stats.assetCount}</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-sm font-medium text-gray-500">Zakat Calculations</p>
              <p className="text-2xl font-bold">{stats.zakatHistory}</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Zakat Status</p>
                  <p className="text-2xl font-bold">
                    {stats.isAboveNisab ? 'Eligible' : 'Not Eligible'}
                  </p>
                </div>
                {stats.isAboveNisab ? (
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-amber-500" />
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserStats;
