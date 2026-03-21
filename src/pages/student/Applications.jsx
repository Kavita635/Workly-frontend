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

  const StatusBadge = ({ status }) => {
    const styles = {
      pending: 'bg-yellow-900/30 text-yellow-700 border-yellow-900/50',
      reviewed: 'bg-blue-900/30 text-blue-700 border-blue-900/50',
      accepted: 'bg-green-900/30 text-green-700 border-green-900/50',
      rejected: 'bg-red-900/30 text-red-700 border-red-900/50'
    };

    const icons = {
      pending: <Clock className="w-4 h-4 mr-1.5" />,
      reviewed: <CheckCircle className="w-4 h-4 mr-1.5" />,
      accepted: <CheckCircle className="w-4 h-4 mr-1.5" />,
      rejected: <XCircle className="w-4 h-4 mr-1.5" />
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {icons[status]}
        <span className="capitalize">{status}</span>
      </span>
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
            <div key={app.id} className="bg-[#111111] rounded-xl shadow-none border border-[#1f1f1f] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <Link to={`/internships/${app.internshipId}`} className="text-lg font-bold text-white hover:text-blue-600 transition-colors line-clamp-1">
                  {app.internship?.title}
                </Link>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#a1a1aa]">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-1.5 text-gray-400" />
                    {app.internship?.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                    {app.internship?.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                    Applied: {app.appliedAt}
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-3 border-t sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0 border-[#1f1f1f]">
                <StatusBadge status={app.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
