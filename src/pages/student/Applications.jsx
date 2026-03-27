import React from 'react';
import { useInternships } from '../../context/InternshipContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Building, MapPin, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function Applications() {
  const { getStudentApplications } = useInternships();
  const { user } = useAuth();

  const applications = getStudentApplications(user.id);

  const Stepper = ({ currentStatus }) => {
    const isRejected = currentStatus === 'rejected';
    const steps = ['pending', 'reviewed', isRejected ? 'rejected' : 'accepted'];
    const activeIndex = steps.indexOf(currentStatus) === -1 ? 0 : steps.indexOf(currentStatus);
    
    return (
      <div className="w-full mt-6 pt-6 border-t border-[#1f1f1f]">
        <div className="flex items-center justify-between relative px-2 sm:px-8">
          <div className="absolute left-4 right-4 sm:left-10 sm:right-10 top-4 -translate-y-1/2 h-1 bg-[#1f1f1f] rounded-full z-0"></div>
          <div className="absolute left-4 sm:left-10 top-4 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full z-0 transition-all duration-700 ease-in-out" style={{ width: `calc(${(activeIndex / (steps.length - 1)) * 100}% - ${activeIndex === 0 ? '0px' : '32px'})` }}></div>
          
          {steps.map((step, idx) => {
            const isActive = idx <= activeIndex;
            const isError = isRejected && idx === 2;
            
            return (
              <div key={step} className="flex flex-col items-center relative z-10 gap-3">
                 <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 border-4 border-[#111111] ${isActive ? (isError ? 'bg-red-600' : 'bg-purple-600') : 'bg-[#2a2a2a]'}`}>
                    {isActive ? (isError ? <XCircle className="w-4 h-4 text-white" /> : <CheckCircle className="w-4 h-4 text-white" />) : <div className="w-1.5 h-1.5 rounded-full bg-[#444444]"></div>}
                 </div>
                 <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${isActive ? (isError ? 'text-red-500' : 'text-purple-400') : 'text-[#475569]'}`}>{step}</span>
              </div>
            )
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">My Applications</h1>
        <p className="text-[#a1a1aa]">Track the status of internships you've applied to.</p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-[#111111] rounded-xl shadow-none border border-[#1f1f1f]">
          <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No applications yet</h3>
          <p className="text-[#a1a1aa] mb-6">You haven't applied to any internships.</p>
          <Link to="/internships">
            <Button>Find Internships</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="bg-[#111111] rounded-2xl shadow-xl border border-[#1f1f1f] p-8 flex flex-col transition-all hover:border-[#333333]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div>
                  <Link to={`/internships/${app.internshipId}`} className="text-xl font-bold text-white hover:text-purple-400 transition-colors line-clamp-1 mb-3 inline-block">
                    {app.internship?.title}
                  </Link>
                  <div className="flex flex-wrap items-center gap-6 mt-1 text-sm font-medium text-[#a1a1aa]">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-[#475569]" />
                      {app.internship?.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-[#475569]" />
                      {app.internship?.location}
                    </div>
                    <div className="flex items-center bg-[#1a1a1a] px-3 py-1 rounded-lg border border-[#333333]">
                      <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                      Applied: <span className="text-white ml-1">{app.appliedAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Stepper currentStatus={app.status || 'pending'} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
