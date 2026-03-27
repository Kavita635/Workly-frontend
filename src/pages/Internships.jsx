import React, { useState } from 'react';
import { useInternships } from '../context/InternshipContext';
import { useAuth } from '../../context/AuthContext';
import InternshipCard from '../../components/internship/InternshipCard';
import { Search } from 'lucide-react';

export default function Internships() {
  const { internships, loading } = useInternships();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState([]); // ['Remote', 'Hybrid', 'Onsite']
  const [domains, setDomains] = useState([]); // ['AI', 'Web Dev', 'Data Science']
  const [stipend, setStipend] = useState([0, 10000]);
  const [duration, setDuration] = useState('');
  const [workingDays, setWorkingDays] = useState('');

  const parseStipend = (stipendStr) => {
    const match = stipendStr.match(/\d+/g);
    return match ? parseInt(match[0], 10) : 0;
  };

  const isRecommended = (internship) => {
    if (!user || !user.skills) return false;
    return internship.requirements?.some(req => user.skills.includes(req));
  };

  const filteredInternships = internships.filter(intern => {
    const matchesSearch =
      intern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = mode.length === 0 || mode.includes(intern.location === 'Remote' ? 'Remote' : intern.location === 'Hybrid' ? 'Hybrid' : 'Onsite');
    const matchesDomain = domains.length === 0 || domains.some(domain => {
      if (domain === 'AI') return /ai|machine learning|deep learning|artificial intelligence/i.test(intern.title + intern.description);
      if (domain === 'Web Dev') return /web|frontend|backend|fullstack|react|node|javascript|html|css/i.test(intern.title + intern.description);
      if (domain === 'Data Science') return /data science|data analysis|python|statistics|analytics/i.test(intern.title + intern.description);
      return false;
    });
    const stipendNum = parseStipend(intern.stipend || '0');
    const matchesStipend = stipendNum >= stipend[0] && stipendNum <= stipend[1];
    const matchesDuration = !duration || (intern.duration && intern.duration.includes(duration));
    const matchesWorkingDays = !workingDays || (intern.workingDays && intern.workingDays.includes(workingDays));
    return matchesSearch && matchesMode && matchesDomain && matchesStipend && matchesDuration && matchesWorkingDays;
  });

  return (
    <div className="bg-[#000000] min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 mb-8 lg:mb-0">
          <div className="sticky top-32 p-6 rounded-2xl bg-[#111111] border border-[#1f1f1f] shadow-lg flex flex-col gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">Search</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2"><Search className="h-5 w-5 text-[#a1a1aa]" /></span>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Job title, company..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Mode</label>
              <div className="flex flex-wrap gap-2">
                {['Remote', 'Hybrid', 'Onsite'].map(opt => (
                  <button
                    key={opt}
                    className={`px-3 py-1 rounded-full border text-xs font-medium ${mode.includes(opt) ? 'bg-purple-600 text-white border-purple-600' : 'bg-[#191919] text-[#a1a1aa] border-[#333]'}`}
                    onClick={() => setMode(mode.includes(opt) ? mode.filter(m => m !== opt) : [...mode, opt])}
                  >{opt}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Domain</label>
              <div className="flex flex-wrap gap-2">
                {['AI', 'Web Dev', 'Data Science'].map(opt => (
                  <button
                    key={opt}
                    className={`px-3 py-1 rounded-full border text-xs font-medium ${domains.includes(opt) ? 'bg-purple-600 text-white border-purple-600' : 'bg-[#191919] text-[#a1a1aa] border-[#333]'}`}
                    onClick={() => setDomains(domains.includes(opt) ? domains.filter(d => d !== opt) : [...domains, opt])}
                  >{opt}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Stipend (₹)</label>
              <div className="flex items-center gap-2">
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
              <div className="flex justify-between text-xs text-[#a1a1aa] mt-1">
                <span>₹{stipend[0]}</span>
                <span>₹{stipend[1]}</span>
              </div>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Duration</label>
              <input
                type="text"
                className="block w-full px-3 py-2 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl outline-none"
                placeholder="e.g. 45 days, 2 months"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Working Days</label>
              <input
                type="text"
                className="block w-full px-3 py-2 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl outline-none"
                placeholder="e.g. Mon-Fri, 6 days"
                value={workingDays}
                onChange={e => setWorkingDays(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setMode([]);
                setDomains([]);
                setStipend([0, 10000]);
                setDuration('');
                setWorkingDays('');
              }}
              className="w-full py-2 mt-2 bg-red-900/10 text-red-500 rounded-xl hover:bg-red-900/30 transition-colors font-medium text-sm border border-red-900/20"
            >
              Clear Filters
            </button>
          </div>
        </aside>
        {/* Results */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-[#191919] rounded-xl animate-pulse" />)}
            </div>
          ) : filteredInternships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInternships.map((internship, index) => (
                <InternshipCard
                  key={internship.id}
                  internship={{ ...internship, recommended: isRecommended(internship) }}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <div className="w-24 h-24 bg-[#111111] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#1f1f1f]">
                <Search className="w-10 h-10 text-[#475569]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No results found</h3>
              <p className="text-[#a1a1aa] max-w-sm mx-auto">Try adjusting your search criteria to discover more opportunities.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
