import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Globe, Award } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="bg-black min-h-screen pt-32 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-12">
          
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pb-2 tracking-tight mb-6">
              About Workly
            </h1>
            <p className="text-lg text-[#a1a1aa] leading-relaxed">
              We are on a mission to democratize early-career opportunities by connecting the brightest minds with world-class companies. 
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#111111] border border-[#1f1f1f] p-8 rounded-2xl hover:border-[#333333] transition-colors duration-300">
              <div className="bg-blue-900/30 w-12 h-12 flex items-center justify-center rounded-xl mb-6">
                <Target className="text-blue-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-[#a1a1aa] leading-relaxed">
                To break down barriers to entry in the professional world. We believe that talent is equally distributed, but opportunity is not. Workly strives to bridge that gap.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#1f1f1f] p-8 rounded-2xl hover:border-[#333333] transition-colors duration-300">
              <div className="bg-purple-900/30 w-12 h-12 flex items-center justify-center rounded-xl mb-6">
                <Globe className="text-purple-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Global Reach</h2>
              <p className="text-[#a1a1aa] leading-relaxed">
                From remote startups to international industry titans, we cultivate a network that transcends geographical boundaries, giving everyone a platform to launch their career.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#0a0a0a] to-[#111111] border border-[#1f1f1f] rounded-2xl p-8 md:p-12 text-center mt-12">
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-10">Why Choose Us?</h3>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-white font-semibold text-xl mb-2">1M+ Users</h4>
                  <p className="text-[#a1a1aa] text-sm">A thriving community of ambitious students and graduates.</p>
                </div>
                <div>
                  <Award className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                  <h4 className="text-white font-semibold text-xl mb-2">Top 500 Companies</h4>
                  <p className="text-[#a1a1aa] text-sm">Partnered with the most prestigious tech and finance firms.</p>
                </div>
                <div>
                  <Globe className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                  <h4 className="text-white font-semibold text-xl mb-2">150+ Countries</h4>
                  <p className="text-[#a1a1aa] text-sm">Connecting talent globally without borders.</p>
                </div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
