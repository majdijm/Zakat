import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title = 'First Comprehensive Personal Zakat Calculator',
  description = 'Track your assets, calculate Zakat, and manage your wealth according to Islamic principles with our comprehensive Zakat calculator and management tool.',
  keywords = 'zakat calculator, islamic finance, zakat management, nisab calculation, wealth management, gold zakat, silver zakat, cryptocurrency zakat',
  ogTitle,
  ogDescription,
  ogImage = '/og-image.jpg',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  children,
}) => {
  const siteUrl = window.location.origin;
  const pageUrl = canonicalUrl || window.location.href;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Additional Meta Tags */}
      <meta name="application-name" content="Zakat Manager" />
      <meta name="apple-mobile-web-app-title" content="Zakat Manager" />
      <meta name="theme-color" content="#10b981" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Structured Data for Rich Results */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Zakat Manager",
          "applicationCategory": "FinanceApplication",
          "description": description,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "operatingSystem": "Web",
          "screenshot": `${siteUrl}${ogImage}`,
          "featureList": [
            "Asset Management",
            "Zakat Calculator",
            "Gold/Asset Inventory",
            "Historical Records",
            "Islamic Guidelines"
          ]
        })}
      </script>
      
      {children}
    </Helmet>
  );
};

export default SEO;
