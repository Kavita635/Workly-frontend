import React from 'react';
import { Users, Briefcase, FileText, TrendingUp, Activity } from 'lucide-react';
import { mockInternships, mockApplications, mockUsers } from '../../api/mockData';

export default function Analytics() {
  const stats = [
    { name: 'Total Users', value: mockUsers.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Active Internships', value: mockInternships.length, icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Total Applications', value: mockApplications.length, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Placement Rate', value: '45%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Platform Overview</h1>
        <p className="text-[#a1a1aa]">Analytics and key metrics for InternConnect.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#111111] rounded-xl shadow-none border border-[#1f1f1f] p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-900/30 px-2 py-1 rounded-md flex items-center">
                +12% <TrendingUp className="w-3 h-3 ml-1" />
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#a1a1aa] mb-1">{stat.name}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placeholder Chart 1 */}
        <div className="bg-[#111111] rounded-xl shadow-none border border-[#1f1f1f] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Application Trends</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-[#333333] rounded-lg bg-[#0a0a0a]">
            <span className="text-sm text-gray-400 font-medium tracking-wide">[Chart Component Placeholder: e.g. Line Chart]</span>
          </div>
        </div>

        {/* Placeholder Chart 2 */}
        <div className="bg-[#111111] rounded-xl shadow-none border border-[#1f1f1f] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">User Demographics</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-[#333333] rounded-lg bg-[#0a0a0a]">
            <span className="text-sm text-gray-400 font-medium tracking-wide">[Chart Component Placeholder: e.g. Donut Chart]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
