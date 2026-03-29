import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInternships } from '../../context/InternshipContext';
import { useAuth } from '../../context/AuthContext';
import { 
  BarChart3, Target, Send, Calendar, 
  CheckCircle, XCircle, Clock
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const { user } = useAuth();
  const { internships, getStudentApplications } = useInternships();
  
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const [stats, setStats] = useState({
    applied: 0,
    shortlisted: 0,
    rejected: 0,
    selected: 0
  });

  useEffect(() => {
    // Simulate complex data aggregation delay mapping relational arrays
    const timer = setTimeout(() => {
      // Pull all mock applications targeting this student ID
      const userApps = getStudentApplications(user.id);
      
      // Inject pseudo-data locally mapping back to internship objects for the table
      const enrichedApps = userApps.map(app => {
        const matchingJob = internships.find(i => i.id.toString() === app.internshipId.toString()) || {};
        return {
          ...app,
          company: matchingJob.company || 'Unknown Corp',
          role: matchingJob.title || 'Unknown Role',
          // Random mock fallback paths if appliedAt is missing
          date: app.appliedAt || '2023-10-15' 
        };
      });

      // Compute aggregate layout counts
      const counts = {
        applied: enrichedApps.length,
        shortlisted: enrichedApps.filter(a => a.status === 'reviewed' || a.status === 'shortlisted').length,
        rejected: enrichedApps.filter(a => a.status === 'rejected').length,
        selected: enrichedApps.filter(a => a.status === 'accepted' || a.status === 'selected').length
      };

      // Since MockData only has 1 app natively, inject pseudo apps to demonstrate UI if empty
      const demoApps = enrichedApps.length > 0 ? enrichedApps : [
        { id: 101, company: 'Google', role: 'SWE Intern', status: 'accepted', date: '2023-09-12' },
        { id: 102, company: 'Meta', role: 'Frontend Engineer', status: 'pending', date: '2023-10-01' },
        { id: 103, company: 'Amazon', role: 'Backend Dev', status: 'rejected', date: '2023-08-22' },
        { id: 104, company: 'Stripe', role: 'Product Manager', status: 'reviewed', date: '2023-10-10' }
      ];

      const demoCounts = enrichedApps.length > 0 ? counts : {
        applied: 12, shortlisted: 3, rejected: 8, selected: 1
      };

      setApps(demoApps);
      setStats(demoCounts);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [user.id, getStudentApplications, internships]);

  const StatusBadge = ({ status }) => {
    const maps = {
      'pending': { color: 'text-yellow-400 bg-yellow-900/20 border-yellow-900/50', icon: Clock, label: 'In Process' },
      'reviewed': { color: 'text-yellow-400 bg-yellow-900/20 border-yellow-900/50', icon: Clock, label: 'Shortlisted' },
      'shortlisted': { color: 'text-yellow-400 bg-yellow-900/20 border-yellow-900/50', icon: Clock, label: 'Shortlisted' },
      'accepted': { color: 'text-green-400 bg-green-900/20 border-green-900/50', icon: CheckCircle, label: 'Selected' },
      'selected': { color: 'text-green-400 bg-green-900/20 border-green-900/50', icon: CheckCircle, label: 'Selected' },
      'rejected': { color: 'text-red-400 bg-red-900/20 border-red-900/50', icon: XCircle, label: 'Rejected' },
    };
    const mapped = maps[status] || maps['pending'];
    const Icon = mapped.icon;

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${mapped.color}`}>
        <Icon className="w-3.5 h-3.5" /> {mapped.label}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
         <div className="w-12 h-12 border-4 border-[#333] border-t-blue-500 rounded-full animate-spin mb-4" />
         <p className="text-[#a1a1aa] animate-pulse">Aggregating application metrics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Analytics Dashboard</h1>
        <p className="text-[#a1a1aa]">Track your internship journey, application outcomes, and growth performance.</p>
      </div>

      {/* Stats Pipeline Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Applied', val: stats.applied, icon: Send, color: 'text-blue-400', bg: 'bg-blue-900/20' },
          { label: 'Shortlisted', val: stats.shortlisted, icon: Target, color: 'text-yellow-400', bg: 'bg-yellow-900/20' },
          { label: 'Selected', val: stats.selected, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-900/20' },
          { label: 'Rejected', val: stats.rejected, icon: XCircle, color: 'text-red-400', bg: 'bg-red-900/20' }
        ].map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6 shadow-xl relative overflow-hidden group"
          >
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${stat.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`} />
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-[#a1a1aa] text-sm font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
                <div className="text-4xl font-black text-white">{stat.val}</div>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center border border-[#1f1f1f]`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Timeline & Faux-Chart */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4 }}
           className="bg-[#111111] border border-[#1f1f1f] rounded-3xl p-8 shadow-xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Application Trend</h2>
            <BarChart3 className="w-5 h-5 text-[#a1a1aa]" />
          </div>

          <div className="flex-1 flex items-end justify-between gap-2 h-48 border-b border-[#1f1f1f] pb-4 px-2">
            {/* CSS Faux Chart Rendering Mock Weekly Metrics */}
            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
              <div key={i} className="w-full relative group flex justify-center">
                 <div className="absolute -top-8 bg-[#1f1f1f] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                   {Math.floor(h/5)} apps
                 </div>
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${h}%` }}
                   transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                   className="w-full max-w-[24px] bg-gradient-to-t from-blue-900/40 to-blue-500 rounded-t-sm hover:to-purple-500 transition-colors cursor-pointer"
                 />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[#475569] text-xs font-medium uppercase mt-4 px-2 tracking-wider">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </motion.div>

        {/* Right Column: History Data Table */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-[#111111] border border-[#1f1f1f] rounded-3xl overflow-hidden shadow-xl flex flex-col"
        >
          <div className="p-8 border-b border-[#1f1f1f] flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">Internship History</h2>
              <p className="text-sm text-[#a1a1aa] mt-1">Chronological log of all submitted applications.</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-x-auto min-h-[300px]">
             {apps.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-[#475569] p-8">
                  <Calendar className="w-12 h-12 mb-4 opacity-50" />
                  <p>You haven't submitted any internship applications yet.</p>
               </div>
             ) : (
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-[#0a0a0a] border-b border-[#1f1f1f] text-[#a1a1aa] text-xs uppercase tracking-wider">
                     <th className="py-4 px-8 font-semibold">Company & Role</th>
                     <th className="py-4 px-8 font-semibold text-center">Status</th>
                     <th className="py-4 px-8 font-semibold text-right">Applied Date</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[#1f1f1f]">
                   {apps.map((app) => (
                     <tr key={app.id} className="hover:bg-[#1a1a1a] transition-colors group cursor-default">
                       <td className="py-5 px-8">
                         <p className="font-bold text-white mb-0.5">{app.company}</p>
                         <p className="text-xs text-[#a1a1aa]">{app.role}</p>
                       </td>
                       <td className="py-5 px-8 text-center">
                         <StatusBadge status={app.status} />
                       </td>
                       <td className="py-5 px-8 text-right text-sm text-[#a1a1aa] font-medium font-mono">
                         {app.date}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
