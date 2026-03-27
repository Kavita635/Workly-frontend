import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';
import PageTransition from './components/layout/PageTransition';
import Chatbot from './components/Chatbot';

// Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import Marketplace from './pages/public/Marketplace';
import CVGenerator from './pages/CVGenerator';
import TNPDashboard from './pages/TNPDashboard';
import AdminPanel from './pages/AdminPanel';
import Chat from './pages/shared/Chat';
import InternshipDetail from './pages/public/InternshipDetail';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Info Pages
import About from './pages/public/About';
import HelpCenter from './pages/public/HelpCenter';
import Blog from './pages/public/Blog';
import CareerGuide from './pages/public/CareerGuide';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsOfService from './pages/public/TermsOfService';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import Profile from './pages/student/Profile';
import Applications from './pages/student/Applications';
import SavedInternships from './pages/student/SavedInternships';

// Company Pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import PostInternship from './pages/company/PostInternship';
import ManageInternships from './pages/company/ManageInternships';
import ViewApplications from './pages/company/ViewApplications';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import Analytics from './pages/admin/Analytics';
import Reports from './pages/admin/Reports';

const PublicLayout = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/internships" element={<Marketplace />} />
          <Route path="/internships/:id" element={<InternshipDetail />} />
          <Route path="/cv-generator" element={<CVGenerator />} />
          <Route path="/tnp-dashboard" element={<TNPDashboard />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/career-guide" element={<CareerGuide />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/student" element={<StudentDashboard />}>
          <Route index element={<div>Student Home Overview</div>} />
          <Route path="profile" element={<Profile />} />
          <Route path="applications" element={<Applications />} />
          <Route path="saved" element={<SavedInternships />} />
        </Route>

        <Route path="/company" element={<CompanyDashboard />}>
          <Route index element={<div>Company Home Overview</div>} />
          <Route path="post-internship" element={<PostInternship />} />
          <Route path="manage" element={<ManageInternships />} />
          <Route path="candidates" element={<ViewApplications />} />
        </Route>

        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Analytics />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="moderation" element={<div>Moderation Page</div>} />
        </Route>
      </Routes>
      <Chatbot userId={user?.id} />
    </Router>
  );
}

export default App;
