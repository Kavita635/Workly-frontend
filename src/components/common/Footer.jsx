import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import worklyLogo from '../../assets/workly.png';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1f1f1f] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* 1. Brand Section */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-start pr-4">
            <Link to="/" className="flex items-center gap-3 mb-6 block w-fit">
              <img src={worklyLogo} alt="Workly Logo" className="h-8 w-auto object-contain" />
              <span className="text-xl font-bold text-white tracking-tight">Workly</span>
            </Link>
            <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">
              The premier platform connecting ambitious students with elite companies worldwide. Launch your career here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#a1a1aa] hover:text-white transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#a1a1aa] hover:text-white transition-colors duration-300">
                <span className="sr-only">GitHub</span>
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#a1a1aa] hover:text-white transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 2. Platform Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-5">Platform</h3>
            <ul className="space-y-4">
              <li><Link to="/internships" className="text-sm text-[#a1a1aa] hover:text-[#ff6a00] hover:translate-x-1 block transition-all duration-300">Find Internships</Link></li>
              <li><Link to="/career-guide" className="text-sm text-[#a1a1aa] hover:text-[#ff6a00] hover:translate-x-1 block transition-all duration-300">Career Guide</Link></li>
              <li><Link to="/blog" className="text-sm text-[#a1a1aa] hover:text-[#ff6a00] hover:translate-x-1 block transition-all duration-300">Blog</Link></li>
            </ul>
          </div>

          {/* 3. Company */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-5">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-[#a1a1aa] hover:text-[#ff6a00] hover:translate-x-1 block transition-all duration-300">About</Link></li>
              <li><Link to="/help-center" className="text-sm text-[#a1a1aa] hover:text-[#ff6a00] hover:translate-x-1 block transition-all duration-300">Help Center</Link></li>
              <li><a href="#" className="text-sm text-[#a1a1aa] hover:text-[#ff6a00] hover:translate-x-1 block transition-all duration-300">Press Kit</a></li>
            </ul>
          </div>

          {/* 4. Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-5">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-sm text-[#a1a1aa] hover:text-[#ff6a00] hover:translate-x-1 block transition-all duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-[#a1a1aa] hover:text-[#ff6a00] hover:translate-x-1 block transition-all duration-300">Terms of Service</Link></li>
              <li><a href="#" className="text-sm text-[#a1a1aa] hover:text-[#ff6a00] hover:translate-x-1 block transition-all duration-300">Cookie Protocol</a></li>
            </ul>
          </div>

          {/* 5. Contact */}
          <div className="col-span-1 md:col-span-4 lg:col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-5">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:support@workly.com" className="group flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white transition-all duration-300">
                  <span className="p-1.5 rounded-md bg-[#111111] group-hover:bg-[#ff6a00]/20 border border-[#1f1f1f] group-hover:border-[#ff6a00]/50 transition-colors">
                    <Mail className="w-3.5 h-3.5 group-hover:text-[#ff6a00] transition-colors" />
                  </span>
                  support@workly.com
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-[#1f1f1f] flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#475569] mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Workly Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-[#475569] font-medium tracking-wide">SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
