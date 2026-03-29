import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInternships } from '../../context/InternshipContext';
import { useAuth } from '../../context/AuthContext';
import InternshipCard from '../../components/internship/InternshipCard';
import Button from '../../components/ui/Button';
import heroImage from '../../assets/internship-hero.png';

const LandingPage = () => {
  const { internships, loading } = useInternships();
  const { user } = useAuth();
  
  const recommendedInternships = user?.skills?.length > 0 
    ? internships.filter(i => i.requirements?.some(r => user.skills.includes(r))).slice(0, 3)
    : [];
    
  const featuredInternships = internships.slice(0, 3);
  const displayInternships = recommendedInternships.length > 0 ? recommendedInternships : featuredInternships;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-hidden px-4 md:px-0">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col justify-center items-center text-center pt-24 overflow-hidden">
        
        {/* Subtle background glow element */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] max-w-[1000px] max-h-[600px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants}
            className="flex flex-col items-center"
          >
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-[140px] font-black tracking-tighter leading-none mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pb-2 pr-4 drop-shadow-[0_0_25px_rgba(37,99,235,0.3)]">
              Workly.
            </motion.h1>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-7xl font-bold text-[#a1a1aa] tracking-tight mb-10 max-w-4xl leading-tight">
              The future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">internships</span> is here.
            </motion.h2>
            
            <motion.div variants={itemVariants} className="flex justify-center w-full max-w-md">
              <Link to="/internships" className="w-full">
                <Button size="lg" className="w-full h-16 text-lg rounded-full border border-white/20">
                  Start Exploring
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mt-14 relative group perspective-1000"
          >
            {/* Soft background glow bleeding underneath */}
            <div className="absolute inset-x-10 -inset-y-5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Image Wrapper */}
            <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-[#1f1f1f]/50 bg-black/50 backdrop-blur-sm group-hover:-translate-y-2 transition-transform duration-700">
               
               {/* Core Image mapping to layout constraints */}
               <img 
                 src={heroImage} 
                 alt="Students Collaborating in Internships" 
                 className="w-full aspect-[21/9] object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
               />
               
               {/* Deep Purple Overlay overlaying the image directly */}
               <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/80 via-purple-900/30 to-blue-900/20 mix-blend-overlay pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />

               {/* Absolute Badges */}
               <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3"
               >
                 <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-[#111]" />
                   ))}
                 </div>
                 <div className="flex flex-col text-left">
                   <span className="text-white font-bold text-sm leading-tight">Trusted by students & companies</span>
                 </div>
               </motion.div>
               
               <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="absolute top-6 right-6 md:top-10 md:right-10 bg-black/40 backdrop-blur-md border border-purple-500/30 px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2"
               >
                 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                 <span className="text-white font-medium text-sm">1,000+ internships available</span>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Internships */}
      <section className="py-32 bg-gradient-to-b from-[#0a0a0a] to-[#111111] relative z-20 border-t border-[#1f1f1f]" id="featured">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              {recommendedInternships.length > 0 ? 'Recommended for You' : 'Premium Opportunities'}
            </h2>
            <p className="text-xl text-[#a1a1aa] max-w-2xl mx-auto">
              {recommendedInternships.length > 0 ? 'Tailored matches based on your unique skill set.' : 'Explore hand-picked roles from world-class teams.'}
            </p>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayInternships.map((internship, index) => (
                <InternshipCard 
                  key={internship.id} 
                  internship={{ ...internship, recommended: recommendedInternships.length > 0 }} 
                  index={index} 
                />
              ))}
            </div>
          )}
          
          <div className="mt-20 text-center">
            <Link to="/internships">
               <Button variant="outline" size="lg" className="rounded-full px-8 py-4">
                 View all opportunities <span aria-hidden="true" className="ml-2">&rarr;</span>
               </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-40 bg-black border-t border-[#1f1f1f]" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">Effortless Process</h2>
            <p className="text-xl text-[#a1a1aa] max-w-2xl mx-auto">A seamless experience designed for ambition.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { id: "01", title: "Create Profile", desc: "Build a standout profile highlighting your skills and portfolio." },
              { id: "02", title: "Apply Instantly", desc: "Filter through elite listings and apply with a single click." },
              { id: "03", title: "Get Hired", desc: "Connect with recruiters directly and land your dream role." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-10 rounded-3xl bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#333333] transition-colors duration-500 group"
              >
                <div className="text-5xl font-black text-[#1f1f1f] group-hover:text-white transition-colors duration-500 mb-8">{step.id}</div>
                <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{step.title}</h3>
                <p className="text-[#a1a1aa] leading-relaxed text-lg">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
