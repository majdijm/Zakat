import React from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import FeatureGrid from '../components/dashboard/FeatureGrid';
import { useAuth } from '../components/auth/AuthContext';
import { Calculator, Coins, BookOpen } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Dashboard showWelcome={true} />
        
        {!user && (
          <div className="text-center py-12 mb-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-white mb-4">Simplify Your Zakat Calculations</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Track your assets, calculate your Zakat obligation, and maintain records of your Zakat payments with our easy-to-use platform.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="lg" variant="default" className="bg-white text-emerald-600 hover:bg-gray-100">
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        )}
        
        <FeatureGrid />
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Why Use Zakat Manager?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-emerald-600">Accurate Calculations</h3>
              <p className="text-gray-600">Our Zakat calculator follows Islamic principles to ensure your Zakat is calculated correctly.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Secure & Private</h3>
              <p className="text-gray-600">Your financial data is encrypted and stored securely. We prioritize your privacy.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Coins className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-amber-600">Comprehensive Tracking</h3>
              <p className="text-gray-600">Track all your assets in one place and maintain a history of your Zakat payments.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">What is Zakat?</h3>
              <p className="text-gray-600">Zakat is one of the Five Pillars of Islam. It is a form of obligatory charity that has a specific calculation method based on one's wealth.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">How is Zakat calculated?</h3>
              <p className="text-gray-600">Zakat is typically calculated at 2.5% of your eligible assets that have been held for one lunar year and exceed the nisab threshold (minimum amount).</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">What is Nisab?</h3>
              <p className="text-gray-600">Nisab is the minimum amount of wealth a Muslim must possess before they are obligated to pay Zakat. It is typically defined as the value of 85 grams of gold or 595 grams of silver.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">How secure is my data?</h3>
              <p className="text-gray-600">We use industry-standard encryption and security practices. Your data is stored securely and is only accessible to you.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center py-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join thousands of Muslims who use Zakat Manager to fulfill their religious obligation with confidence.
          </p>
          <div className="flex justify-center space-x-4">
            {user ? (
              <Button asChild size="lg" variant="default" className="bg-white text-emerald-600 hover:bg-gray-100">
                <Link to="/assets">Manage Your Assets</Link>
              </Button>
            ) : (
              <Button asChild size="lg" variant="default" className="bg-white text-emerald-600 hover:bg-gray-100">
                <Link to="/register">Create Free Account</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
