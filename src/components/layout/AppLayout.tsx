import React, { useState } from 'react';
import Navbar from './Navbar';
import GuidelinesSidebar from '../guidelines/GuidelinesSidebar';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
  activePage?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, activePage = 'home' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar activePage={activePage} />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed bottom-4 left-4 z-50 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-all"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <div 
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                      md:translate-x-0 transition-transform duration-300 ease-in-out 
                      fixed md:relative z-40 md:z-0 h-[calc(100vh-64px)] w-full md:w-80 lg:w-96 
                      overflow-y-auto md:border-r border-gray-200 md:shadow-md`}
        >
          <GuidelinesSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="container mx-auto flex flex-col min-h-[calc(100vh-64px)]">
            <div className="flex-grow">
              {children}
            </div>
            
            {/* Footer */}
            <footer className="mt-12 py-6 border-t border-gray-200">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-gray-600 text-sm">
                      &copy; {currentYear} AIVirtus - Majdi El-Jazmawi. All rights reserved.
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <Link to="/privacy-policy" className="text-gray-600 hover:text-emerald-600 text-sm">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="text-gray-600 hover:text-emerald-600 text-sm">Terms of Service</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-emerald-600 text-sm">Contact</Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
