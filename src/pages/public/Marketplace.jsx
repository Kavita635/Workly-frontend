import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInternships } from '../../context/InternshipContext';
import { useAuth } from '../../context/AuthContext';
import InternshipCard from '../../components/internship/InternshipCard';
import { InternshipCardSkeleton } from '../../components/ui/Skeleton';
import { Search } from 'lucide-react';

export default function Marketplace() {
  const { internships, loading } = useInternships();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState([]);
  const [domains, setDomains] = useState([]);
  const [stipend, setStipend] = useState([0, 20000]);

  const parseStipend = (stipendStr) => {
    if (!stipendStr) return 0;
    const match = stipendStr.match(/\d+/g);
    return match ? parseInt(match.join(''), 10) : 0;
  };

  const filteredInternships = internships.filter(intern => {
    const matchesSearch =
      intern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMode = mode.length === 0 || mode.some(m => intern.location?.toLowerCase().includes(m.toLowerCase()) || intern.type?.toLowerCase().includes(m.toLowerCase()));
    
    const matchesDomain = domains.length === 0 || domains.some(domain => {
      const text = `${intern.title} ${intern.description}`.toLowerCase();
      if (domain === 'AI') return /ai|machine learning|deep learning|artificial intelligence/i.test(text);
      if (domain === 'Web Dev') return /web|frontend|backend|fullstack|react|node|javascript|html|css/i.test(text);
      if (domain === 'Data Science') return /data science|data analysis|python|statistics|analytics/i.test(text);
      return false;
    });

    const stipendNum = parseStipend(intern.stipend);
    const matchesStipend = stipendNum >= stipend[0] && stipendNum <= stipend[1];

    return matchesSearch && matchesMode && matchesDomain && matchesStipend;
  });

  return (
    <div className="bg-[#000000] min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        <aside className="w-full lg:w-72 mb-8 lg:mb-0">
          <div className="sticky top-28 p-6 rounded-2xl bg-[#111111] border border-[#1f1f1f] shadow-xl flex flex-col gap-6">
            <div>
              <label className="block text-white font-semibold mb-3 tracking-wide text-sm">SEARCH</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2"><Search className="h-5 w-5 text-[#a1a1aa]" /></span>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all placeholder-[#475569]"
                  placeholder="Job title, company..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3 tracking-wide text-sm">MODE</label>
              <div className="flex flex-wrap gap-2">
                {['Remote', 'Part-time', 'Full-time'].map(opt => (
                  <button
                    key={opt}
                    className={`px-4 py-1.5 rounded-full border text-xs font-medium transition-colors ${mode.includes(opt) ? 'bg-purple-600 text-white border-purple-600' : 'bg-[#191919] text-[#a1a1aa] border-[#333] hover:border-purple-500/50'}`}
                    onClick={() => setMode(mode.includes(opt) ? mode.filter(m => m !== opt) : [...mode, opt])}
                  >{opt}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3 tracking-wide text-sm">DOMAIN</label>
              <div className="flex flex-wrap gap-2">
                {['AI', 'Web Dev', 'Data Science'].map(opt => (
                  <button
                    key={opt}
                    className={`px-4 py-1.5 rounded-full border text-xs font-medium transition-colors ${domains.includes(opt) ? 'bg-purple-600 text-white border-purple-600' : 'bg-[#191919] text-[#a1a1aa] border-[#333] hover:border-purple-500/50'}`}
                    onClick={() => setDomains(domains.includes(opt) ? domains.filter(d => d !== opt) : [...domains, opt])}
                  >{opt}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3 tracking-wide text-sm">STIPEND (₹)</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={20000}
                  step={500}
                  value={stipend[0]}
                  onChange={e => setStipend([Number(e.target.value), stipend[1]])}
                  className="w-1/2 accent-purple-600"
                />
                <input
                  type="range"
                  min={0}
                  max={20000}
                  step={500}
                  value={stipend[1]}
                  onChange={e => setStipend([stipend[0], Number(e.target.value)])}
                  className="w-1/2 accent-purple-600"
                />
              </div>
              <div className="flex justify-between text-xs text-[#a1a1aa] mt-2 font-medium">
                <span>₹{stipend[0]}</span>
                <span>₹{stipend[1]}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSearchTerm('');
                setMode([]);
                setDomains([]);
                setStipend([0, 20000]);
              }}
              className="w-full py-2.5 mt-4 bg-red-900/10 text-red-500 rounded-xl hover:bg-red-900/30 transition-colors font-medium text-sm border border-red-900/20"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Explore Roles</h1>
            <p className="text-lg text-[#a1a1aa]">Discover opportunities that shape the future.</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => <InternshipCardSkeleton key={i} />)}
            </div>
          ) : filteredInternships.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredInternships.map((internship, index) => (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-[#111111] rounded-2xl border border-[#1f1f1f]"
            >
              <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#333333]">
                <Search className="w-8 h-8 text-[#475569]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">No results found</h3>
              <p className="text-[#a1a1aa] max-w-sm mx-auto">Try adjusting your filters or search terms.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
