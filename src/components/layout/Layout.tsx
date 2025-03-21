import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, Database, DollarSign, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Assets', href: '/assets', icon: DollarSign },
    { name: 'Inventory', href: '/inventory', icon: Database },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu */}
      <div className="lg:hidden">
        <div className="fixed inset-0 flex z-40">
          {/* Mobile menu backdrop */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={toggleMobileMenu}
            ></div>
          )}

          {/* Mobile menu panel */}
          <div
            className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-semibold">Zakat Manager</span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-2 py-4 bg-white space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="mr-4 h-6 w-6 text-gray-400" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5">
          <div className="flex items-center flex-shrink-0 px-4">
            <DollarSign className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-semibold">Zakat Manager</span>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Icon className="mr-3 h-6 w-6 text-gray-400" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-10 flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <Menu className="h-6 w-6" />
          </button>
          <DollarSign className="ml-2 h-8 w-8 text-primary" />
          <span className="ml-2 text-xl font-semibold">Zakat Manager</span>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
