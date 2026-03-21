import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInternships } from '../../context/InternshipContext';
import InternshipCard from '../../components/internship/InternshipCard';
import { InternshipCardSkeleton } from '../../components/ui/Skeleton';
import { Search, Filter } from 'lucide-react';

export default function Marketplace() {
  const { internships, loading } = useInternships();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredInternships = internships.filter(intern => {
    const matchesSearch = intern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || intern.type === typeFilter;
    const matchesRole = roleFilter === 'All' || intern.title.toLowerCase().includes(roleFilter.toLowerCase());
    const matchesLocation = intern.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesType && matchesRole && matchesLocation;
  });

  return (
    <div className="bg-[#000000] min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Explore Roles</h1>
          <p className="text-xl text-[#a1a1aa] max-w-2xl mx-auto">Discover opportunities that shape the future.</p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="p-3 rounded-2xl bg-[#111111] border border-[#1f1f1f] flex flex-col lg:flex-row gap-3 mb-16 max-w-6xl mx-auto shadow-lg"
        >
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#a1a1aa]" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
              placeholder="Search by job title, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              className="block w-full px-4 py-4 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
              placeholder="Filter by Location (e.g., Remote, NY)"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>

          <div className="lg:w-48 flex items-center relative">
            <select
              className="block w-full px-4 py-4 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none appearance-none cursor-pointer"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="lg:w-48 flex items-center relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Filter className="w-5 h-5 text-[#a1a1aa]" />
            </div>
            <select
              className="block w-full pl-12 pr-4 py-4 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none appearance-none cursor-pointer"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchTerm('');
              setTypeFilter('All');
              setRoleFilter('All');
              setLocationFilter('');
            }}
            className="lg:w-32 flex items-center justify-center py-4 px-6 bg-red-900/10 text-red-500 rounded-xl hover:bg-red-900/30 transition-colors font-medium text-sm border border-red-900/20"
          >
            Reset
          </button>
        </motion.div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <InternshipCardSkeleton key={i} />)}
          </div>
        ) : filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInternships.map((internship, index) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="w-24 h-24 bg-[#111111] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#1f1f1f]">
              <Search className="w-10 h-10 text-[#475569]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No results found</h3>
            <p className="text-[#a1a1aa] max-w-sm mx-auto">Try adjusting your search criteria to discover more opportunities.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
