import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="p-8">Loading...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminDashboard;
