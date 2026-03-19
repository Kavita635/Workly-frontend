import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import Marketplace from './pages/public/Marketplace';
import InternshipDetail from './pages/public/InternshipDetail';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import Profile from './pages/student/Profile';
import Applications from './pages/student/Applications';

// Company Pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import PostInternship from './pages/company/PostInternship';
import ManageInternships from './pages/company/ManageInternships';
import ViewApplications from './pages/company/ViewApplications';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import Analytics from './pages/admin/Analytics';

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/internships" element={<Marketplace />} />
          <Route path="/internships/:id" element={<InternshipDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Dashboard Routes (Protected, no public Navbar/Footer) */}
        <Route path="/student" element={<StudentDashboard />}>
          <Route index element={<div>Student Home Overview</div>} />
          <Route path="profile" element={<Profile />} />
          <Route path="applications" element={<Applications />} />
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
          <Route path="moderation" element={<div>Moderation Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
