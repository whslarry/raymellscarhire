import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import TrackingPage from './pages/TrackingPage';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';
import PaymentPage from './pages/PaymentPage';
import ClientPortalPage from './pages/ClientPortalPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/client-portal" element={<ClientPortalPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;