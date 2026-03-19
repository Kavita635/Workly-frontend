import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, LayoutDashboard, User, FileText, 
  Settings, LogOut, Users, Search, PlusCircle, CheckSquare 
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = {
    student: [
      { path: '/student', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/internships', icon: Search, label: 'Find Internships' },
      { path: '/student/applications', icon: FileText, label: 'My Applications' },
      { path: '/student/profile', icon: User, label: 'Profile' },
    ],
    company: [
      { path: '/company', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/company/post-internship', icon: PlusCircle, label: 'Post Internship' },
      { path: '/company/manage', icon: Briefcase, label: 'Manage Internships' },
      { path: '/company/candidates', icon: Users, label: 'View Candidates' },
    ],
    admin: [
      { path: '/admin', icon: LayoutDashboard, label: 'Overview' },
      { path: '/admin/users', icon: Users, label: 'User Management' },
      { path: '/admin/moderation', icon: CheckSquare, label: 'Moderation' },
    ]
  };

  const items = user ? menuItems[user.role] : [];

  return (
    <div className="flex flex-col w-64 h-screen bg-white border-r border-gray-100 flex-shrink-0">
      <div className="flex items-center gap-2 h-16 px-6 border-b border-gray-100 shrink-0">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">InternConnect</span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4">
        <div className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-2 px-2">
          Menu
        </div>
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === `/${user?.role}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
