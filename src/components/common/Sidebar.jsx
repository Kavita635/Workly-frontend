import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, User, FileText, Settings, 
  PlusCircle, Users, Activity, LogOut,
  LayoutDashboard, Bookmark, MessageCircle
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const studentLinks = [
    { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { name: 'My Profile', path: '/student/profile', icon: User },
    { name: 'Applications', path: '/student/applications', icon: FileText },
    { name: 'Saved Internships', path: '/student/saved', icon: Bookmark },
    { name: 'Messages', path: '/chat', icon: MessageCircle },
  ];

  const companyLinks = [
    { name: 'Dashboard', path: '/company', icon: LayoutDashboard },
    { name: 'Post Internship', path: '/company/post', icon: PlusCircle },
    { name: 'Manage Postings', path: '/company/manage', icon: Briefcase },
    { name: 'View Applications', path: '/company/applications', icon: Users },
    { name: 'Messages', path: '/chat', icon: MessageCircle },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Analytics', path: '/admin/analytics', icon: Activity },
    { name: 'Reports', path: '/admin/reports', icon: FileText },
  ];

  const links = user?.role === 'admin' ? adminLinks : 
                user?.role === 'company' ? companyLinks : 
                studentLinks;

  return (
    <div className="w-64 bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col min-h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-2 text-white">
          <Briefcase className="w-5 h-5 text-blue-500" />
          <span className="text-xl font-bold tracking-tight">Workly</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1">
        <p className="px-3 text-xs font-semibold text-[#475569] uppercase tracking-wider mb-2">
          Menu
        </p>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path.split('/').length === 2}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-[#1f1f1f] text-white' 
                  : 'text-[#a1a1aa] hover:bg-[#111111] hover:text-white'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-[#1f1f1f]">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#1f1f1f] flex items-center justify-center text-white font-bold border border-[#333333]">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-[#475569] truncate capitalize">{user?.role}</p>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#a1a1aa] hover:bg-[#111111] hover:text-white transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
