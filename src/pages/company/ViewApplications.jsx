import React from 'react';
import { useInternships } from '../../context/InternshipContext';
import { useAuth } from '../../context/AuthContext';
import { Users, CheckCircle, XCircle, Clock, FileText, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function ViewApplications() {
  const { getCompanyApplications, updateApplicationStatus } = useInternships();
  const { user } = useAuth();

  const applications = getCompanyApplications(user.id);

  const StatusBadge = ({ status }) => {
    const styles = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      reviewed: 'bg-blue-50 text-blue-700 border-blue-200',
      accepted: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200'
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Candidate Applications</h1>
        <p className="text-gray-600">Review and manage applications for your posted internships.</p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-500">Applications for your internships will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {applications.map(app => (
            <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">Applicant ID: {app.studentId}</h3>
                  <StatusBadge status={app.status} />
                </div>
                <div className="text-sm font-medium text-blue-600 mb-4">
                  Applied for: {app.internship?.title}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm text-gray-700 mb-4">
                  <span className="block font-semibold mb-1 text-gray-900">Cover Letter:</span>
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

              <div className="flex flex-row md:flex-col items-center md:items-end justify-start md:justify-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                <p className="w-full text-xs text-gray-500 text-left md:text-right mb-2">Applied: {app.appliedAt}</p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
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
          ))}
        </div>
      )}
    </div>
  );
}
