import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, MessageCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/workly.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDashboard = location.pathname.includes('/student') || 
                      location.pathname.includes('/company') || 
                      location.pathname.includes('/admin');

  if (isDashboard) return null;

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 z-50 w-full glass-nav-dark"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center px-8 py-5">
          <Link to="/" className="flex items-center gap-4 group">
            <motion.img 
              src={logo} 
              alt="Workly Logo" 
              className="h-8 md:h-10 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <span className="text-xl font-bold text-white tracking-tight transition-all duration-300">
              Workly
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {[
              { name: 'Find Internships', path: '/internships' },
              { name: 'CV Generator', path: '/cv-generator' },
              { name: 'TNP Dashboard', path: '/tnp-dashboard' },
              { name: 'Admin Panel', path: '/admin-panel' },
              { name: 'About', path: '/about' },
              { name: 'How it Works', path: '/#how-it-works', isHash: true }
            ].map((link) => {
              const isActive = location.pathname === link.path;
              return link.isHash ? (
                <a key={link.name} href={link.path} className="relative text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors duration-300 py-2 group/link">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#333333] rounded-full transition-all duration-300 group-hover/link:w-full" />
                </a>
              ) : (
                <Link key={link.name} to={link.path} className={`relative text-sm font-medium transition-colors duration-300 py-2 group/link ${isActive ? 'text-white' : 'text-[#a1a1aa] hover:text-white'}`}>
                  {link.name}
                  {isActive && (
                    <motion.div layoutId="navbar-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#333333] rounded-full transition-all duration-300 group-hover/link:w-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/chat" className="relative p-2 text-[#a1a1aa] hover:text-white transition-colors group/msg">
                  <MessageCircle className="w-5 h-5 group-hover/msg:scale-110 transition-transform" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                </Link>
                <Link to={`/${user.role}`}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout} className="gap-2 border-[#1f1f1f]">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#a1a1aa] hover:text-white focus:outline-none transition-colors duration-300">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }} 
              className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-[#1f1f1f] py-4 px-4 space-y-4 rounded-b-2xl mt-4"
            >
              <Link to="/internships" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-[#a1a1aa] hover:text-[#ff6a00] transition-colors py-2">Find Internships</Link>
              <Link to="/cv-generator" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-[#a1a1aa] hover:text-[#ff6a00] transition-colors py-2">CV Generator</Link>
              <Link to="/tnp-dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-[#a1a1aa] hover:text-[#ff6a00] transition-colors py-2">TNP Dashboard</Link>
              <Link to="/admin-panel" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-[#a1a1aa] hover:text-[#ff6a00] transition-colors py-2">Admin Panel</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-[#a1a1aa] hover:text-[#ff6a00] transition-colors py-2">About</Link>
              <a href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-[#a1a1aa] hover:text-[#ff6a00] transition-colors py-2">How it Works</a>
              
              <div className="pt-4 border-t border-[#1f1f1f] flex flex-col gap-3">
                {user ? (
                  <>
                    <Link to={`/${user.role}`} onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-2 h-12 text-white bg-[#111111] hover:bg-[#1a1a1a]">
                        <User className="w-4 h-4" /> Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full justify-start gap-2 h-12 text-red-400 hover:text-red-300 border-[#1f1f1f]">
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full h-12 text-white bg-[#111111] hover:bg-[#1a1a1a]">Log in</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="primary" className="w-full h-12">Sign up</Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
