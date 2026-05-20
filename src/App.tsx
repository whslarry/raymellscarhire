import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth';
import AgroNavbar from './agro/components/AgroNavbar';
import AgroFooter from './agro/components/AgroFooter';
import AgroHomePage from './agro/pages/AgroHomePage';
import AgroAboutPage from './agro/pages/AgroAboutPage';
import AgroServicesPage from './agro/pages/AgroServicesPage';
import AgroContactPage from './agro/pages/AgroContactPage';
import WCNavbar from './worldcup/components/WCNavbar';
import WCFooter from './worldcup/components/WCFooter';
import WCHomePage from './worldcup/pages/WCHomePage';
import WCMatchesPage from './worldcup/pages/WCMatchesPage';
import WCSeatSelectionPage from './worldcup/pages/WCSeatSelectionPage';
import WCCheckoutPage from './worldcup/pages/WCCheckoutPage';
import WCConfirmationPage from './worldcup/pages/WCConfirmationPage';
import WCMyTicketsPage from './worldcup/pages/WCMyTicketsPage';
import WCAuthPage from './worldcup/pages/WCAuthPage';
import WCAdminPage from './worldcup/pages/WCAdminPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
    </div>
  );
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useAuth();
  if (loading) return null;
  if (profile?.role !== 'admin') return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AgroLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AgroNavbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<AgroHomePage />} />
          <Route path="/about" element={<AgroAboutPage />} />
          <Route path="/services" element={<AgroServicesPage />} />
          <Route path="/contact" element={<AgroContactPage />} />
        </Routes>
      </main>
      <AgroFooter />
    </div>
  );
}

function WCLayout() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <WCNavbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<WCHomePage />} />
          <Route path="/matches" element={<ProtectedRoute><WCMatchesPage /></ProtectedRoute>} />
          <Route path="/matches/:matchId/seats" element={<ProtectedRoute><WCSeatSelectionPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><WCCheckoutPage /></ProtectedRoute>} />
          <Route path="/confirmation/:bookingId" element={<ProtectedRoute><WCConfirmationPage /></ProtectedRoute>} />
          <Route path="/my-tickets" element={<ProtectedRoute><WCMyTicketsPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminRoute><WCAdminPage /></AdminRoute></ProtectedRoute>} />
        </Routes>
      </main>
      <WCFooter />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* World Cup app at /worldcup */}
      <Route path="/worldcup/*" element={<WCLayout />} />
      <Route path="/auth" element={<WCAuthPage />} />
      {/* AgroVista (default) */}
      <Route path="/*" element={<AgroLayout />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
