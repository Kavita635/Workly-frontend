import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function RoleSelection() {
  const { user, setRole } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Security layer: if no user is active, bounce to login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleRoleSelection = async (selectedRole) => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    try {
       await setRole(selectedRole);
       addToast(`Role set to ${selectedRole === 'student' ? 'Intern' : 'Company'} successfully.`, 'success');
       navigate(`/${selectedRole}`);
    } catch (err) {
       addToast('Failed to lock in role choice.', 'error');
       setIsProcessing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Cinematic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-blue-700/10 via-purple-700/10 to-blue-700/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000')] opacity-5 bg-cover bg-center mix-blend-luminosity pointer-events-none" />

      <motion.div 
         initial="hidden" 
         animate="visible" 
         variants={containerVariants}
         className="relative z-10 w-full max-w-4xl flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Complete your profile</h1>
          <p className="text-[#a1a1aa] text-lg font-medium max-w-xl mx-auto">
            Select your persona to access tailored dashboards, features, and tailored matchmaking ecosystems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 w-full">
          
          {/* Intern / Student Card */}
          <motion.button
            variants={itemVariants}
            onClick={() => handleRoleSelection('student')}
            disabled={isProcessing}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative group text-left w-full h-full p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden hover:border-blue-500/50 shadow-xl transition-all duration-500"
          >
             {/* Glow injection */}
             <div className="absolute -inset-24 bg-blue-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />
             
             <div className="relative z-10 flex flex-col h-full">
               <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                 <GraduationCap className="w-8 h-8 text-blue-400" />
               </div>
               
               <h2 className="text-3xl font-bold text-white tracking-tight mb-2">I'm an Intern</h2>
               <p className="text-[#a1a1aa] text-base leading-relaxed flex-grow pr-4">
                 Find elite internships, generate AI summaries, and track your career growth pipeline comprehensively.
               </p>
               
               <div className="flex items-center mt-8 text-blue-400 font-bold group-hover:underline">
                 <span>Join as Intern</span>
                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
               </div>
             </div>
          </motion.button>

          {/* Company Card */}
          <motion.button
            variants={itemVariants}
            onClick={() => handleRoleSelection('company')}
            disabled={isProcessing}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative group text-left w-full h-full p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden hover:border-purple-500/50 shadow-xl transition-all duration-500"
          >
             {/* Glow injection */}
             <div className="absolute -inset-24 bg-purple-500/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />
             
             <div className="relative z-10 flex flex-col h-full">
               <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                 <Briefcase className="w-7 h-7 text-purple-400" />
               </div>
               
               <h2 className="text-3xl font-bold text-white tracking-tight mb-2">I'm a Company</h2>
               <p className="text-[#a1a1aa] text-base leading-relaxed flex-grow pr-4">
                 Post roles natively, filter premier talent pools, and manage your total hiring lifecycle end-to-end.
               </p>
               
               <div className="flex items-center mt-8 text-purple-400 font-bold group-hover:underline">
                 <span>Join as Company</span>
                 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
               </div>
             </div>
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
}
