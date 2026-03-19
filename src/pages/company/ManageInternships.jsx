import React from 'react';
import { Link } from 'react-router-dom';
import { useInternships } from '../../context/InternshipContext';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Users, Edit2, Trash2, PlusCircle, Clock, DollarSign } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function ManageInternships() {
  const { getCompanyInternships } = useInternships();
  const { user } = useAuth();

  const myInternships = getCompanyInternships(user.id);

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Internships</h1>
          <p className="text-gray-600">View and update your posted opportunities.</p>
        </div>
        <Link to="/company/post-internship">
          <Button className="gap-2">
            <PlusCircle className="w-4 h-4" />
            Post New Role
          </Button>
        </Link>
      </div>

      {myInternships.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No active postings</h3>
          <p className="text-gray-500 mb-6">You haven't posted any internships yet.</p>
          <Link to="/company/post-internship">
            <Button>Post your first internship</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {myInternships.map(internship => (
            <div key={internship.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      <Link to={`/internships/${internship.id}`} className="hover:text-blue-600 transition-colors">
                        {internship.title}
                      </Link>
                    </h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      internship.status === 'active' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      {internship.status === 'active' ? 'Active' : 'Closed'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                      {internship.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                      {internship.duration}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1.5 text-gray-400" />
                      {internship.stipend}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex flex-col items-center justify-center min-w-[100px]">
                    <span className="text-2xl font-bold leading-none mb-1">12</span>
                    <span className="text-xs font-semibold text-blue-600">Applicants</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" className="gap-2 bg-red-50 text-red-600 hover:bg-red-100 border-none">
                      <Trash2 className="w-3.5 h-3.5" />
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
