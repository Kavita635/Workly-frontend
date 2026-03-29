import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { Sparkles, BrainCircuit, Target, TrendingUp, ArrowRight, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { generateRecommendations } from '../../utils/recommendationEngine';
import Button from '../../components/ui/Button';

export default function CareerRecommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    // Artificial AI processing delay for UX effect
    const timer = setTimeout(() => {
      if (user) {
         setRecommendations(generateRecommendations(user));
      }
      setAnalyzing(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400 text-sm font-semibold mb-4"
          >
             <Sparkles className="w-4 h-4" /> AI-Powered
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Career Recommendations
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
             className="text-[#a1a1aa] text-lg max-w-2xl"
          >
            Based on an analysis of your current skillset and profile, our neural engine has identified the highest-probability growth tracks for you.
          </motion.p>
        </div>

        {analyzing ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#111111] rounded-3xl border border-[#1f1f1f] shadow-2xl">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#333] rounded-full"></div>
              <div className="w-20 h-20 border-4 border-purple-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
              <BrainCircuit className="w-8 h-8 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-white mt-6 mb-2">Analyzing Profile...</h3>
            <p className="text-[#a1a1aa] text-sm text-center max-w-xs">
               Processing {user.skills?.length || 0} skills against 5,000+ industry data points to find your exact match.
            </p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {recommendations.map((rec, index) => (
              <motion.div 
                key={rec.role}
                variants={cardVariants}
                className={`relative overflow-hidden rounded-3xl border p-8 md:p-10 transition-all duration-300 ${
                  index === 0 
                  ? 'bg-gradient-to-br from-[#111111] to-[#1a1225] border-purple-500/50 shadow-[0_0_40px_-15px_rgba(168,85,247,0.3)] hover:border-purple-500' 
                  : 'bg-[#111111] border-[#1f1f1f] shadow-xl hover:border-[#333333]'
                }`}
              >
                {index === 0 && (
                   <div className="absolute top-0 right-0 py-1.5 px-4 bg-purple-600 rounded-bl-2xl font-bold text-xs tracking-wider text-white uppercase shadow-lg">
                      Top Match
                   </div>
                )}
                
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${index === 0 ? 'bg-purple-900/40 border-purple-500/30' : 'bg-[#1a1a1a] border-[#333333]'}`}>
                         <Target className={`w-6 h-6 ${index === 0 ? 'text-purple-400' : 'text-[#a1a1aa]'}`} />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{rec.role}</h2>
                    </div>
                    <p className="text-[#a1a1aa] leading-relaxed mb-6 mt-4">
                      {rec.description}
                    </p>

                    <div className="bg-[#0a0a0a] rounded-2xl p-5 border border-[#1f1f1f] mb-6">
                       <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-400" /> Career Growth Path
                       </h4>
                       <p className="text-[#a1a1aa] text-sm tabular-nums tracking-wide">{rec.growthPath}</p>
                    </div>

                    <div className="bg-blue-900/10 rounded-xl p-4 border border-blue-500/20 inline-flex items-start">
                       <Sparkles className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                       <p className="text-blue-300 text-sm font-medium leading-relaxed">
                          <span className="text-white font-bold block mb-1">Why this was recommended:</span>
                          {rec.matchReason}
                       </p>
                    </div>
                  </div>

                  <div className="md:w-80 flex flex-col gap-6">
                    <div>
                       <h4 className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider mb-3">Target Skillset</h4>
                       <div className="flex flex-wrap gap-2">
                          {rec.requiredSkills.map(skill => (
                            <span key={skill} className="px-3 py-1.5 rounded-full bg-[#1a1a1a] text-gray-300 text-xs font-medium border border-[#333333]">
                               {skill}
                            </span>
                          ))}
                       </div>
                    </div>
                    
                    <div className="mt-auto pt-6">
                      <Link to="/internships">
                         <Button className="w-full py-4 text-sm group shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Explore {rec.role} Roles
                            <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                         </Button>
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
