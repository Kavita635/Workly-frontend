import React, { useState } from 'react';
import { Building, Users, Activity, Filter } from 'lucide-react';

const mockReports = [
  { companyName: 'TechCorp Innovations', visitDate: '2023-10-20', studentsApplied: 120, studentsSelected: 15 },
  { companyName: 'DataSystems Inc.', visitDate: '2023-11-05', studentsApplied: 85, studentsSelected: 8 },
  { companyName: 'Creative Studio', visitDate: '2023-11-15', studentsApplied: 40, studentsSelected: 3 },
  { companyName: 'Global Finance', visitDate: '2023-12-01', studentsApplied: 210, studentsSelected: 25 },
  { companyName: 'NextGen Auto', visitDate: '2023-12-10', studentsApplied: 95, studentsSelected: 12 },
];

const TNPDashboard = () => {
  const [reports] = useState(mockReports);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filtered = reports.filter(r =>
    (!search || r.companyName.toLowerCase().includes(search.toLowerCase())) &&
    (!dateFilter || r.visitDate === dateFilter)
  );

  const totalCompanies = filtered.length;
  const totalPlaced = filtered.reduce((sum, r) => sum + (r.studentsSelected || 0), 0);

  return (
    <div className="min-h-screen bg-[#000000] pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8 border-b border-[#1f1f1f] pb-6">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">TNP Administration</h1>
        <p className="text-[#a1a1aa]">Real-time campus placement tracking and funnel metrics.</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col shadow-xl">
          <div className="flex items-center gap-3 text-[#a1a1aa] mb-4">
             <Building className="w-5 h-5 text-purple-500" />
             <span className="text-sm font-semibold uppercase tracking-wider">Total Companies</span>
          </div>
          <span className="text-4xl font-bold text-white tracking-tighter">{totalCompanies}</span>
        </div>
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col shadow-xl">
          <div className="flex items-center gap-3 text-[#a1a1aa] mb-4">
             <Users className="w-5 h-5 text-green-500" />
             <span className="text-sm font-semibold uppercase tracking-wider">Students Placed</span>
          </div>
          <span className="text-4xl font-bold text-white tracking-tighter">{totalPlaced}</span>
        </div>
        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col shadow-xl">
          <div className="flex items-center gap-3 text-[#a1a1aa] mb-4">
             <Activity className="w-5 h-5 text-blue-500" />
             <span className="text-sm font-semibold uppercase tracking-wider">Upcoming Drives</span>
          </div>
          <span className="text-4xl font-bold text-white tracking-tighter">2</span>
        </div>
      </div>
      
      {/* Chart Mockup */}
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 mb-10 shadow-xl">
         <h2 className="text-lg font-bold text-white mb-8 border-b border-[#1f1f1f] pb-4">Placement Funnel Ratio</h2>
         <div className="flex items-end gap-6 h-56 pt-6">
            {mockReports.map((r, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-3 relative group">
                 <div className="w-full max-w-[80px] bg-[#1f1f1f] rounded-t-lg relative" style={{ height: `${(r.studentsApplied / 250) * 100}%` }}>
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-purple-700 to-purple-400 rounded-t-lg transition-all duration-500" style={{ height: `${(r.studentsSelected / r.studentsApplied) * 100}%` }}></div>
                 </div>
                 <span className="text-xs text-[#a1a1aa] truncate w-full text-center font-medium px-2">{r.companyName}</span>
                 
                 {/* Tooltip */}
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#23232b] border border-[#333333] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-xl text-xs flex flex-col items-center">
                    <span className="text-white font-bold">{r.studentsSelected} Hired</span>
                    <span className="text-[#a1a1aa]">{r.studentsApplied} Applied</span>
                 </div>
               </div>
            ))}
         </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by company name..."
            className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none shadow-inner"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" />
        </div>
        <input
          type="date"
          className="w-full md:w-1/4 px-4 py-3 bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none shadow-inner"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-[#111111] rounded-2xl shadow-xl border border-[#1f1f1f]">
        <table className="min-w-full divide-y divide-[#1f1f1f]">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Company Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Visit Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Students Applied</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">Students Selected</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f1f1f]">
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-8 text-[#a1a1aa]">No records found.</td></tr>
            ) : (
              filtered.map((r, i) => (
                <tr key={i} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap text-white font-medium">{r.companyName}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-[#a1a1aa]">{r.visitDate}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-[#a1a1aa]">{r.studentsApplied}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-green-400 font-medium">{r.studentsSelected}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TNPDashboard;
