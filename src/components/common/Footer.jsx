import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">InternConnect</span>
            </Link>
            <p className="text-sm text-gray-500 mb-6">
              Connecting ambitious students with innovative companies for meaningful internship opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">For Students</h3>
            <ul className="space-y-3">
              <li><Link to="/internships" className="text-sm text-gray-500 hover:text-blue-600">Search Internships</Link></li>
              <li><Link to="/signup" className="text-sm text-gray-500 hover:text-blue-600">Create Profile</Link></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">Career Advice</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">For Companies</h3>
            <ul className="space-y-3">
              <li><Link to="/signup" className="text-sm text-gray-500 hover:text-blue-600">Post an Internship</Link></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">Hiring Resources</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} InternConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
