import React, { useState } from 'react';
import { Calendar, Building, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const mockVisits = [
  { id: 1, company: 'TechCorp', date: '2023-11-05', role: 'SDE Intern', status: 'Completed', students: 120 },
  { id: 2, company: 'DataSense', date: '2023-11-15', role: 'Data Analyst', status: 'Upcoming', students: 85 },
  { id: 3, company: 'CreativeFlow', date: '2023-12-01', role: 'UI/UX Designer', status: 'Upcoming', students: 40 },
  { id: 4, company: 'GlobalBank', date: '2023-12-10', role: 'Finance Intern', status: 'Scheduled', students: 150 },
  { id: 5, company: 'NextGen Auto', date: '2024-01-20', role: 'Mechanical Eng.', status: 'Planning', students: 0 }
];

export default function Reports() {
  const [dateFilter, setDateFilter] = useState('');
  const [search, setSearch] = useState('');

  const filteredVisits = mockVisits.filter(v => 
    (!search || v.company.toLowerCase().includes(search.toLowerCase())) &&
    (!dateFilter || v.date >= dateFilter)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Drive Reports & Timeline</h1>
        <p className="text-[#a1a1aa]">Track historical company visits and upcoming placement drives.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 shadow-xl flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-900/30 rounded-full flex items-center justify-center border border-purple-500/20">
               <Building className="text-purple-500 w-6 h-6" />
            </div>
            <div>
               <p className="text-[#a1a1aa] text-sm font-semibold uppercase tracking-wider">Total Companies</p>
               <h3 className="text-3xl font-bold text-white tracking-tight">42</h3>
            </div>
         </div>
         <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 shadow-xl flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-500/20">
               <Calendar className="text-blue-500 w-6 h-6" />
            </div>
            <div>
               <p className="text-[#a1a1aa] text-sm font-semibold uppercase tracking-wider">Drives this Semester</p>
               <h3 className="text-3xl font-bold text-white tracking-tight">18</h3>
            </div>
         </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-[#111111] border border-[#1f1f1f] rounded-2xl p-4 shadow-xl">
         <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" />
            <input 
               type="text" 
               placeholder="Search company..." 
               value={search}
               onChange={e => setSearch(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-[#23232b] text-white rounded-xl focus:ring-1 focus:ring-purple-500 outline-none"
            />
         </div>
         <div className="flex-[0.5]">
            <input 
               type="date" 
               value={dateFilter}
               onChange={e => setDateFilter(e.target.value)}
               className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#23232b] text-[#a1a1aa] rounded-xl focus:ring-1 focus:ring-purple-500 outline-none"
            />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-1 bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 shadow-xl">
           <h2 className="text-xl font-bold text-white mb-6">Visit Timeline</h2>
           <div className="relative border-l border-[#333333] ml-4 space-y-8 pb-4">
              {filteredVisits.map((visit, i) => (
                 <motion.div 
                   key={visit.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="relative pl-8"
                 >
                    <div className={`absolute -left-2 top-1.5 w-4 h-4 rounded-full border-4 border-[#111111] ${visit.status === 'Completed' ? 'bg-green-500' : visit.status === 'Upcoming' ? 'bg-blue-500' : 'bg-[#475569]'}`}></div>
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-white">{visit.company}</span>
                       <span className="text-xs text-purple-400 mt-0.5">{visit.date}</span>
                       <span className="text-xs text-[#a1a1aa] mt-1 line-clamp-1">{visit.role}</span>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Table */}
        <div className="lg:col-span-2 bg-[#111111] border border-[#1f1f1f] rounded-2xl shadow-xl overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-[#1a1a1a] border-b border-[#23232b]">
                    <tr>
                       <th className="px-6 py-4 text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Company</th>
                       <th className="px-6 py-4 text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Date</th>
                       <th className="px-6 py-4 text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Role</th>
                       <th className="px-6 py-4 text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#1f1f1f]">
                    {filteredVisits.map((visit) => (
                       <tr key={visit.id} className="hover:bg-[#151515] transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-white font-medium">{visit.company}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-[#a1a1aa]">{visit.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-[#a1a1aa]">{visit.role}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                             <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${visit.status === 'Completed' ? 'bg-green-900/30 text-green-400 border-green-500/20' : visit.status === 'Upcoming' ? 'bg-blue-900/30 text-blue-400 border-blue-500/20' : 'bg-gray-900/30 text-gray-400 border-gray-500/20'}`}>
                                {visit.status}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}
