import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AssetSummaryCard from "./dashboard/AssetSummaryCard";
import ZakatSummaryCard from "./dashboard/ZakatSummaryCard";
import FeatureGrid from "./dashboard/FeatureGrid";
import SEO from "./layout/SEO";

const Home = () => {
  return (
    <AppLayout activePage="dashboard">
      <SEO 
        title="First Comprehensive Personal Zakat Calculator | Zakat Manager"
        description="Calculate your Zakat accurately with our comprehensive Islamic Zakat calculator. Track assets, manage gold inventory, and follow Islamic guidelines for Zakat calculation."
        keywords="zakat calculator, islamic finance, zakat management, nisab calculation, gold zakat, silver zakat, cryptocurrency zakat"
        ogTitle="Zakat Manager - Complete Zakat Calculation Solution"
        ogDescription="The most comprehensive Zakat calculator and asset management tool following Islamic principles. Track your wealth, calculate Zakat, and manage payments."
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
          Welcome to Zakat Manager
        </h1>
        <p className="mt-2 text-gray-600">
          Track your assets, calculate Zakat, and manage your wealth according
          to Islamic principles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <AssetSummaryCard
            totalAssetValue={125000}
            cashValue={25000}
            goldValue={35000}
            propertyValue={50000}
            cryptoValue={15000}
            changePercentage={5.2}
            changeDirection="up"
          />
        </div>
        <div>
          <ZakatSummaryCard
            zakatAmount={2500}
            eligibleAssets={100000}
            eligibilityStatus="eligible"
            nisabThreshold={5200}
            dueDate="2023-12-15"
            currency="USD"
          />
        </div>
      </div>

      <div className="mt-16 mb-10">
        <FeatureGrid />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 mb-8 hover:shadow-md transition-shadow border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 relative pb-3 inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-emerald-500/60 after:rounded-full">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-white to-blue-50 hover:shadow-md transition-all group">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4 group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="font-semibold text-lg mb-3 text-blue-700">Add Your Assets</h3>
            <p className="text-sm text-gray-600 mb-4">
              Start by adding your assets in the Asset Management section to
              get an accurate overview of your wealth.
            </p>
            <Link
              to="/assets"
              className="text-blue-600 text-sm font-medium hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform"
            >
              Go to Asset Management
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-white to-green-50 hover:shadow-md transition-all group">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4 group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="font-semibold text-lg mb-3 text-green-700">Catalog Your Gold</h3>
            <p className="text-sm text-gray-600 mb-4">
              Add your gold items to the inventory with details like weight,
              purity, and whether they're for personal use.
            </p>
            <Link
              to="/inventory"
              className="text-green-600 text-sm font-medium hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform"
            >
              Go to Gold Inventory
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-white to-amber-50 hover:shadow-md transition-all group">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4 group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="font-semibold text-lg mb-3 text-amber-700">Calculate Zakat</h3>
            <p className="text-sm text-gray-600 mb-4">
              Use the Zakat Calculator to determine your obligation based on
              your eligible assets and the current Nisab.
            </p>
            <Link
              to="/zakat"
              className="text-amber-600 text-sm font-medium hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform"
            >
              Go to Zakat Calculator
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-xl p-8 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
        <h2 className="text-xl font-bold mb-4 text-emerald-800">
          Did You Know?
        </h2>
        <p className="text-emerald-700 mb-5 leading-relaxed">
          Zakat is one of the Five Pillars of Islam and means "purification"
          and "growth." By giving Zakat, you're purifying your wealth and
          helping those in need.
        </p>
        <Link
          to="/guidelines"
          className="text-emerald-600 font-medium hover:underline inline-flex items-center group hover:translate-x-1 transition-transform"
        >
          Learn more about Zakat guidelines
          <svg className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </AppLayout>
  );
};

export default Home;
