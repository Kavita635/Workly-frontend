import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Lightbulb, FileCheck2, TrendingUp } from 'lucide-react';

export default function CareerGuide() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
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
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pb-2 tracking-tight mb-4">
              The Ultimate Career Guide
            </h1>
            <p className="text-lg text-[#a1a1aa] leading-relaxed">
              Step-by-step guidance to mapping your career trajectory, from building your resume to negotiating your final offer.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-[#111111] border border-[#1f1f1f] p-8 rounded-2xl hover:border-purple-500/50 transition-colors duration-300">
              <div className="bg-purple-900/30 w-12 h-12 flex items-center justify-center rounded-xl mb-6">
                <Compass className="text-purple-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Discover Your Path</h2>
              <p className="text-[#a1a1aa] leading-relaxed">
                Learn how to identify industries that align with your natural strengths. Understand the nuances between startup agility and enterprise stability.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#1f1f1f] p-8 rounded-2xl hover:border-blue-500/50 transition-colors duration-300">
              <div className="bg-blue-900/30 w-12 h-12 flex items-center justify-center rounded-xl mb-6">
                <FileCheck2 className="text-blue-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Build the Perfect Resume</h2>
              <p className="text-[#a1a1aa] leading-relaxed">
                Discover the exact frameworks that ATS (Applicant Tracking Systems) look for. We provide templates that highlight value over fluff.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#1f1f1f] p-8 rounded-2xl hover:border-orange-500/50 transition-colors duration-300">
              <div className="bg-orange-900/30 w-12 h-12 flex items-center justify-center rounded-xl mb-6">
                <Lightbulb className="text-orange-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Ace the Interview</h2>
              <p className="text-[#a1a1aa] leading-relaxed">
                Master the STAR method for behavioral questions and learn how to navigate complex technical rounds with total confidence.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#1f1f1f] p-8 rounded-2xl hover:border-green-500/50 transition-colors duration-300">
              <div className="bg-green-900/30 w-12 h-12 flex items-center justify-center rounded-xl mb-6">
                <TrendingUp className="text-green-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Negotiate Your Offer</h2>
              <p className="text-[#a1a1aa] leading-relaxed">
                Never leave money on the table. Our proprietary negotiation frameworks help secure competitive stipends and equity variations.
              </p>
            </div>

          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
