import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Building, UserCheck } from 'lucide-react';
import { useInternships } from '../../context/InternshipContext';
import InternshipCard from '../../components/internship/InternshipCard';

const LandingPage = () => {
  const { internships, loading } = useInternships();

  const featuredInternships = internships.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New opportunities added daily
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
            Kickstart your career <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">with top companies</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover tailored internships, build your professional network, and take the first step towards your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/internships" className="px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-xl shadow-blue-600/20 text-lg flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Find Internships
            </Link>
            <Link to="/signup" className="px-8 py-4 bg-white text-gray-900 font-medium rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition shadow-sm text-lg">
              For Companies
            </Link>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -ml-[39rem] -mt-[12rem] w-[78rem] h-[50rem] opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent -z-10 blur-3xl"></div>
      </section>

      {/* Stats/Logo Cloud could go here */}

      {/* Featured Internships */}
      <section className="py-24 bg-gray-50" id="featured">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore hand-picked internships from our top partner companies.</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredInternships.map(internship => (
                <InternshipCard key={internship.id} internship={internship} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link to="/internships" className="text-blue-600 font-semibold hover:text-blue-700 text-lg flex items-center justify-center gap-2">
              View all opportunities <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100 pt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A seamless experience for both students and companies.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Create Profile</h3>
              <p className="text-gray-600">Build a standout profile highlighting your skills, education, and portfolio.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Search & Apply</h3>
              <p className="text-gray-600">Filter through hundreds of active listings and apply with just one click.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Get Hired</h3>
              <p className="text-gray-600">Connect with recruiters directly and land your dream internship.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
