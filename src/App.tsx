import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth';
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

function AppRoutes() {
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
          <Route path="/auth" element={<WCAuthPage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminRoute><WCAdminPage /></AdminRoute></ProtectedRoute>} />
        </Routes>
      </main>
      <WCFooter />
    </div>
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
