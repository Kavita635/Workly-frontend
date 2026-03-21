import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, MapPin, Clock, DollarSign, Calendar, ArrowLeft, CheckCircle } from 'lucide-react';
import { useInternships } from '../../context/InternshipContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';

export default function InternshipDetail() {
  const { id } = useParams();
  const { internships, applyForInternship } = useInternships();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  // In a real app, you'd fetch the specific internship if not found in context
  const internship = internships.find(i => i.id === parseInt(id));

  if (!internship) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center bg-black">
        <h2 className="text-2xl font-bold text-white mb-2">Internship Not Found</h2>
        <p className="text-[#a1a1aa] mb-6">The internship you're looking for doesn't exist or has been removed.</p>
        <Link to="/internships">
          <Button>Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const handleApply = async () => {
    if (!user) {
      // Redirect to login or show modal
      alert("Please login as a student to apply.");
      return;
    }
    if (user.role !== 'student') {
      alert("Only students can apply for internships.");
      return;
    }

    setApplying(true);
    // Simulate API call
    setTimeout(() => {
      applyForInternship(internship.id, user.id, "I am very interested in this position...");
      setApplying(false);
      setApplied(true);
      addToast('Application submitted successfully!', 'success');
    }, 1500);
  };

  return (
    <div className="bg-black min-h-screen py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/internships" className="inline-flex items-center text-sm font-medium text-[#a1a1aa] hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all internships
        </Link>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111] border border-[#1f1f1f] rounded-3xl p-8 md:p-12 shadow-2xl mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#1a1a1a] border border-[#333333] text-[#a1a1aa] text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {internship.type}
                </span>
                <span className="text-sm text-[#475569] flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  Posted 2 days ago
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{internship.title}</h1>
              <div className="text-xl text-[#a1a1aa] flex items-center">
                <Building className="w-6 h-6 mr-3 text-white" />
                {internship.company}
              </div>
            </div>
            
            <div className="flex-shrink-0 mt-4 md:mt-0 w-full md:w-auto flex flex-col items-center md:items-end gap-3">
              {applied && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-green-500 text-sm font-semibold flex items-center bg-green-900/20 px-4 py-2 rounded-full border border-green-900/50">
                  <CheckCircle className="w-4 h-4 mr-2" /> Application successful!
                </motion.div>
              )}
              <Button 
                size="lg" 
                className={`w-full md:w-auto min-w-[160px] text-lg py-4 ${applied ? 'bg-green-900/30 text-green-500 border border-green-900/50 hover:bg-green-900/30' : ''}`}
                onClick={handleApply}
                disabled={applying || applied}
              >
                {applying ? 'Applying...' : applied ? (
                  <span className="flex items-center"><CheckCircle className="w-5 h-5 mr-2"/> Applied</span>
                ) : 'Apply Now'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[#1f1f1f] relative z-10">
             <div>
              <p className="text-[#475569] text-sm font-medium mb-1 flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> Location</p>
              <p className="font-semibold text-white">{internship.location}</p>
             </div>
             <div>
              <p className="text-[#475569] text-sm font-medium mb-1 flex items-center"><Clock className="w-4 h-4 mr-1.5" /> Duration</p>
              <p className="font-semibold text-white">{internship.duration}</p>
             </div>
             <div>
              <p className="text-[#475569] text-sm font-medium mb-1 flex items-center"><DollarSign className="w-4 h-4 mr-1.5" /> Stipend</p>
              <p className="font-semibold text-white">{internship.stipend}</p>
             </div>
             <div>
              <p className="text-[#475569] text-sm font-medium mb-1 flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> Start Date</p>
              <p className="font-semibold text-white">Immediate</p>
             </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 space-y-8"
          >
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-white mb-6">About the Role</h3>
              <div className="prose prose-invert max-w-none text-[#a1a1aa] leading-relaxed">
                <p className="mb-4">{internship.description}</p>
                <p className="mb-4">As an intern, you will have the opportunity to work alongside experienced professionals, contribute to real-world projects, and gain invaluable industry experience. We are looking for passionate individuals who are eager to learn and make an impact.</p>
                
                <h4 className="text-white font-bold text-lg mt-8 mb-4">Key Responsibilities</h4>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#475569]">
                  <li>Collaborate with cross-functional teams to design, develop, and test new features.</li>
                  <li>Participate in code reviews and maintain high code quality standards.</li>
                  <li>Assist in troubleshooting and resolving technical issues.</li>
                  <li>Research and prototype new technologies to improve platform performance.</li>
                </ul>

                <h4 className="text-white font-bold text-lg mt-8 mb-4">Requirements</h4>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#475569]">
                  <li>Currently pursuing a degree in Computer Science, Engineering, or a related field.</li>
                  <li>Strong understanding of fundamental programming concepts and data structures.</li>
                  <li>Familiarity with web technologies (HTML, CSS, JavaScript) or backend languages.</li>
                  <li>Excellent problem-solving and communication skills.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="space-y-6"
          >
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">About {internship.company}</h3>
              <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">
                We are a fast-growing tech company dedicated to building innovative solutions that empower businesses worldwide. Join our dynamic team and help shape the future of technology.
              </p>
              <div className="pt-6 border-t border-[#1f1f1f]">
                <a href="#" className="text-white font-medium hover:text-blue-400 transition-colors inline-flex items-center text-sm">
                  Visit Company Website <span aria-hidden="true" className="ml-1">&rarr;</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
