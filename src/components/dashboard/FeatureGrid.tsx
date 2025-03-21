import React from "react";
import { Coins, Calculator, Database, LineChart, BookOpen } from "lucide-react";
import FeatureCard from "./FeatureCard";

interface FeatureGridProps {
  features?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    linkTo: string;
  }>;
}

const FeatureGrid = ({ features }: FeatureGridProps) => {
  const defaultFeatures = [
    {
      icon: <Database className="w-8 h-8 text-blue-600" />,
      title: "Asset Management",
      description:
        "Track and manage all your assets including cash, gold, property, and crypto.",
      linkTo: "/assets",
    },
    {
      icon: <Calculator className="w-8 h-8 text-green-600" />,
      title: "Zakat Calculator",
      description:
        "Calculate your Zakat obligation based on your eligible assets and Nisab threshold.",
      linkTo: "/zakat",
    },
    {
      icon: <Coins className="w-8 h-8 text-amber-600" />,
      title: "Gold/Asset Inventory",
      description:
        "Catalog your gold and other assets with detailed records including images and specifications.",
      linkTo: "/inventory",
    },
    {
      icon: <LineChart className="w-8 h-8 text-purple-600" />,
      title: "Historical Records",
      description:
        "View your wealth growth over time and track your previous Zakat payments.",
      linkTo: "/history",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-teal-600" />,
      title: "Islamic Guidelines",
      description:
        "Access references to Quranic verses and hadiths explaining Zakat rules.",
      linkTo: "/guidelines",
    },
  ];

  const displayFeatures = features || defaultFeatures;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-8 mb-0 hover:shadow-md transition-shadow border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-emerald-500/60 after:rounded-full">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {displayFeatures.map((feature, index) => (
          <div key={index} className="h-full">
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              linkTo={feature.linkTo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
