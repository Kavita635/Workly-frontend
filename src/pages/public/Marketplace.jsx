import React, { useState } from 'react';
import { useInternships } from '../../context/InternshipContext';
import InternshipCard from '../../components/internship/InternshipCard';
import Input from '../../components/ui/Input';
import { Search, Filter } from 'lucide-react';

export default function Marketplace() {
  const { internships, loading } = useInternships();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredInternships = internships.filter(intern => {
    const matchesSearch = intern.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          intern.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || intern.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Next Internship</h1>
          <p className="text-gray-600 max-w-2xl">Browse hundreds of opportunities across different domains and start building your career path.</p>
        </div>

        {/* Filters and Search Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search by job title, company, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-48 flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="block flex-1 py-2.5 px-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map(internship => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No internships found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}
