import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { DonorSearchPage } from './pages/DonorSearchPage';
import { DonorProfilePage } from './pages/DonorProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { CreateBloodRequestPage } from './pages/CreateBloodRequestPage';
import { BloodRequestListPage } from './pages/BloodRequestListPage';
import { BloodRequestDetailPage } from './pages/BloodRequestDetailPage';
import { OrganizationsPage } from './pages/OrganizationsPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { QrVerificationPage } from './pages/QrVerificationPage';
import { DashboardRouter } from './pages/dashboard/DashboardRouter';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage, TermsPage, HelpPage } from './pages/StaticPages';

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-ivory">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/donors" element={<DonorSearchPage />} />
                <Route path="/donors/:id" element={<DonorProfilePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/blood-request" element={<CreateBloodRequestPage />} />
                <Route path="/requests" element={<BloodRequestListPage />} />
                <Route path="/requests/:id" element={<BloodRequestDetailPage />} />
                <Route path="/organizations" element={<OrganizationsPage />} />
                <Route path="/campaigns" element={<CampaignsPage />} />
                <Route path="/verify" element={<QrVerificationPage />} />
                <Route path="/verify/:token" element={<QrVerificationPage />} />
                <Route path="/dashboard" element={<DashboardRouter />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/help" element={<HelpPage />} />
                {/* Fallback */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
