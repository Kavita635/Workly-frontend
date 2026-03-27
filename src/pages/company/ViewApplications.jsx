import React from 'react';
import { useInternships } from '../../context/InternshipContext';
import { useAuth } from '../../context/AuthContext';
import { Users, CheckCircle, XCircle, Clock, FileText, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function ViewApplications() {
  const { getCompanyApplications, updateApplicationStatus } = useInternships();
  const { user } = useAuth();

  const applications = getCompanyApplications(user.id);

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
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Candidate Applications</h1>
        <p className="text-[#a1a1aa]">Review and manage applications for your posted internships.</p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-[#111111] rounded-xl shadow-none border border-[#1f1f1f]">
          <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No applications yet</h3>
          <p className="text-[#a1a1aa]">Applications for your internships will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {applications.map(app => (
            <div key={app.id} className="bg-[#111111] rounded-2xl shadow-xl border border-[#1f1f1f] p-8 flex flex-col transition-all hover:border-[#333333] hover:shadow-2xl gap-2">

              <div className="flex flex-col md:flex-row gap-6 justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white">Applicant ID: {app.studentId}</h3>
                  </div>
                <div className="text-sm font-medium text-blue-600 mb-4">
                  Applied for: {app.internship?.title}
                </div>

                <div className="bg-[#0a0a0a] p-4 rounded-lg border border-[#1f1f1f] text-sm text-gray-300 mb-4">
                  <span className="block font-semibold mb-1 text-white">Cover Letter:</span>
                  <p className="whitespace-pre-wrap">{app.coverLetter}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="w-4 h-4" /> View Resume
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="w-4 h-4" /> Message
                  </Button>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-start md:justify-center gap-2 border-t md:border-t-0 md:border-l border-[#1f1f1f] pt-4 md:pt-0 md:pl-6">
                <p className="w-full text-xs text-[#a1a1aa] text-left md:text-right mb-2">Applied: {app.appliedAt}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-900/30"
                    onClick={() => updateApplicationStatus(app.id, 'reviewed')}
                    disabled={app.status === 'reviewed'}
                  >
                    <Clock className="w-4 h-4 mr-1.5" /> Mark Reviewed
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white border-transparent focus:ring-green-500"
                    onClick={() => updateApplicationStatus(app.id, 'accepted')}
                    disabled={app.status === 'accepted'}
                  >
                    <CheckCircle className="w-4 h-4 mr-1.5" /> Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => updateApplicationStatus(app.id, 'rejected')}
                    disabled={app.status === 'rejected'}
                  >
                    <XCircle className="w-4 h-4 mr-1.5" /> Reject
                  </Button>
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
