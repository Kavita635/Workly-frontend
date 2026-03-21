import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/layout/PageTransition';

const StudentDashboard = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user || user.role !== 'student') return <Navigate to="/login" replace />;

  return (
    <div className="flex bg-[#000000] min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 relative">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </div>
    </div>
  );
};
export default StudentDashboard;
