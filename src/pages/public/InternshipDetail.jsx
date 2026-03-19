import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useInternships } from '../../context/InternshipContext';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Building, Clock, DollarSign, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function InternshipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getInternshipById, applyForInternship, loading: internshipsLoading } = useInternships();
  const { user } = useAuth();
  
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');

  if (internshipsLoading) {
    return <div className="p-20 text-center">Loading...</div>;
  }

  const internship = getInternshipById(id);

  if (!internship) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Internship not found</h2>
        <Link to="/internships"><Button>Back to Marketplace</Button></Link>
      </div>
    );
  }

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'student') {
      setError('Only students can apply for internships.');
      return;
    }

    try {
      setApplying(true);
      setError('');
      await applyForInternship(internship.id, "I'm very interested in this role.");
      setApplied(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/internships" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to all internships
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-100 bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{internship.title}</h1>
                <div className="flex items-center text-lg text-gray-600">
                  <Building className="w-5 h-5 mr-2" />
                  <span className="font-medium">{internship.company}</span>
                </div>
              </div>
              <div>
                {/* Application Section */}
                {applied ? (
                  <div className="flex items-center text-green-600 font-medium px-4 py-2 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Application Submitted
                  </div>
                ) : (
                  <Button 
                    size="lg" 
                    onClick={handleApply} 
                    disabled={applying}
                    className="w-full md:w-auto px-8"
                  >
                    {applying ? 'Applying...' : 'Apply Now'}
                  </Button>
                )}
                {error && <p className="text-sm text-red-600 mt-2 text-center md:text-right">{error}</p>}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                {internship.location}
              </span>
              <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {internship.duration}
              </span>
              <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                {internship.stipend}
              </span>
              <span className="flex items-center bg-blue-50 text-blue-700 font-medium px-3 py-1.5 rounded-lg border border-blue-100">
                {internship.type}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold mb-4 text-gray-900">About the Role</h3>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed mb-8">
                {internship.description}
              </p>

              <h3 className="text-xl font-bold mb-4 text-gray-900">Requirements</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-8">
                {internship.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mt-8">
                <h4 className="font-semibold text-gray-900 mb-2">About {internship.company}</h4>
                <p className="text-sm text-gray-600">
                  This company is a partner of InternConnect and has verified their profile. We are excited to offer this role to potential candidates. Learn more on their external profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
