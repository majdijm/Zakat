import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import { DebugEnv } from "./components/DebugEnv";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const AssetManagement = lazy(
  () => import("./components/asset/AssetManagement"),
);
const ZakatCalculator = lazy(
  () => import("./components/zakat/ZakatCalculator"),
);
const AssetInventory = lazy(
  () => import("./components/inventory/AssetInventory"),
);
const History = lazy(
  () => import("./pages/History"),
);
const IslamicGuidelines = lazy(
  () => import("./components/guidelines/IslamicGuidelines"),
);
const PrivacyPolicy = lazy(
  () => import("./components/legal/PrivacyPolicy"),
);
const TermsOfService = lazy(
  () => import("./components/legal/TermsOfService"),
);
const Contact = lazy(
  () => import("./components/legal/Contact"),
);
const GoldPriceSettings = lazy(
  () => import("./components/settings/GoldPriceSettings"),
);
const Login = lazy(
  () => import("./components/auth/Login"),
);
const Register = lazy(
  () => import("./components/auth/Register"),
);
const Profile = lazy(
  () => import("./components/auth/Profile"),
);

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen w-full bg-gray-50">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-4 text-emerald-600 font-medium">Loading...</p>
            </div>
          }
        >
          <AppLayout>
            <DebugEnv />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected routes */}
              <Route path="/assets" element={
                <ProtectedRoute>
                  <AssetManagement />
                </ProtectedRoute>
              } />
              <Route path="/zakat" element={
                <ProtectedRoute>
                  <ZakatCalculator />
                </ProtectedRoute>
              } />
              <Route path="/inventory" element={
                <ProtectedRoute>
                  <AssetInventory />
                </ProtectedRoute>
              } />
              <Route path="/history" element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } />
              <Route path="/guidelines" element={
                <ProtectedRoute>
                  <IslamicGuidelines />
                </ProtectedRoute>
              } />
              <Route path="/settings/gold-prices" element={
                <ProtectedRoute>
                  <GoldPriceSettings />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Add this before the catchall route for Tempo */}
              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempo" element={<div>Tempo</div>} />
              )}

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </Suspense>
        <Toaster />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
