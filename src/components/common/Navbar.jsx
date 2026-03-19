import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Menu, User, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isDashboard = location.pathname.includes('/student') || 
                      location.pathname.includes('/company') || 
                      location.pathname.includes('/admin');

  if (isDashboard) return null; // Dashboard has its own sidebar/header

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">InternConnect</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/internships" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Find Internships
            </Link>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              How it Works
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to={`/${user.role}`}>
                  <Button variant="ghost" className="gap-2">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={logout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
