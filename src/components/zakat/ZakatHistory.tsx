import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getUserItems } from '../../utils/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Download, Calendar } from 'lucide-react';

interface ZakatCalculation {
  id: string;
  user_id: string;
  created_at: string;
  total_assets: number;
  nisab_value: number;
  zakat_amount: number;
  currency: string;
  notes?: string;
}

const ZakatHistory: React.FC = () => {
  const { user } = useAuth();
  const [calculations, setCalculations] = useState<ZakatCalculation[]>([]);

  useEffect(() => {
    const fetchCalculations = async () => {
      if (!user) {
        setCalculations([]);
        return;
      }

      try {
        console.log('Fetching zakat calculations for user:', user.id);
        const { data, error } = await getUserItems<ZakatCalculation>('zakat_calculations', user.id);
        
        if (error) {
          console.error('Error fetching zakat calculations:', error);
          setCalculations([]);
          return;
        }
        
        console.log('Zakat calculations fetched successfully:', data);
        setCalculations(data || []);
      } catch (error) {
        console.error('Error fetching zakat calculations:', error);
        setCalculations([]);
      }
    };

    fetchCalculations();
  }, [user]);

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const exportToCSV = () => {
    if (calculations.length === 0) return;
    
    const headers = ['Date', 'Total Assets', 'Nisab Value', 'Zakat Amount', 'Currency', 'Notes'];
    const csvRows = [
      headers.join(','),
      ...calculations.map(calc => [
        formatDate(calc.created_at),
        calc.total_assets,
        calc.nisab_value,
        calc.zakat_amount,
        calc.currency,
        calc.notes ? `"${calc.notes.replace(/"/g, '""')}"` : ''
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `zakat_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Zakat History</CardTitle>
          <CardDescription>
            Please sign in to view your Zakat calculation history
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Zakat Calculation History</CardTitle>
          <CardDescription>
            View and manage your past Zakat calculations
          </CardDescription>
        </div>
        {calculations.length > 0 && (
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {calculations.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Zakat Calculations Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              No zakat calculations have been saved yet. Use the Zakat Calculator to calculate and save your Zakat obligation.
            </p>
            <Button 
              className="mt-4 bg-emerald-600 hover:bg-emerald-700"
              onClick={() => window.location.href = '/calculator'}
            >
              Go to Zakat Calculator
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Total Assets</TableHead>
                  <TableHead>Nisab Value</TableHead>
                  <TableHead>Zakat Amount</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculations.map((calc) => (
                  <TableRow key={calc.id}>
                    <TableCell>{formatDate(calc.created_at)}</TableCell>
                    <TableCell>{formatCurrency(calc.total_assets, calc.currency)}</TableCell>
                    <TableCell>{formatCurrency(calc.nisab_value, calc.currency)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(calc.zakat_amount, calc.currency)}</TableCell>
                    <TableCell className="max-w-xs truncate">{calc.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ZakatHistory;
