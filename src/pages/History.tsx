import React from 'react';
import { Navigate } from 'react-router-dom';
import ZakatHistory from '../components/zakat/ZakatHistory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { Calculator } from 'lucide-react';

const History: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Zakat History</h1>
          <p className="text-gray-600">
            View and manage your past Zakat calculations
          </p>
        </div>
        
        <ZakatHistory />
        
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100">
            <CardHeader>
              <CardTitle>Need to calculate your Zakat?</CardTitle>
              <CardDescription>
                Use our Zakat calculator to determine your current Zakat obligation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Calculator className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600 mb-4">
                    Our Zakat calculator helps you determine your Zakat obligation based on your current assets and the latest gold and silver prices.
                  </p>
                  <Button asChild>
                    <Link to="/calculator">Go to Zakat Calculator</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default History;
