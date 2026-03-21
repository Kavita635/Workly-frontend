import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Search, Mail, MessageSquare, BookOpen, ShieldQuestion } from 'lucide-react';
import Input from '../../components/ui/Input';

export default function HelpCenter() {
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
          
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-[#111111] rounded-full border border-[#1f1f1f] mb-6">
              <HelpCircle className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              How can we help?
            </h1>
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-[#a1a1aa]" />
              </div>
              <input 
                type="text" 
                placeholder="Search for articles, guides..." 
                className="w-full pl-12 pr-4 py-4 bg-[#111111] border border-[#1f1f1f] text-white rounded-2xl focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-8 rounded-2xl hover:border-[#333333] hover:-translate-y-1 transition-all duration-300">
              <BookOpen className="text-orange-500 w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Getting Started</h3>
              <p className="text-[#a1a1aa] leading-relaxed mb-4">Learn the basics of setting up your profile and finding your first internship.</p>
              <a href="#" className="text-blue-500 font-medium hover:text-blue-400 transition-colors">Read guides →</a>
            </div>

            <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-8 rounded-2xl hover:border-[#333333] hover:-translate-y-1 transition-all duration-300">
              <ShieldQuestion className="text-purple-500 w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Account & Security</h3>
              <p className="text-[#a1a1aa] leading-relaxed mb-4">Manage your password, privacy settings, and data visibility.</p>
              <a href="#" className="text-blue-500 font-medium hover:text-blue-400 transition-colors">Learn more →</a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 md:p-12 text-center mt-12">
            <h3 className="text-2xl font-bold text-white mb-4">Still need help?</h3>
            <p className="text-[#a1a1aa] mb-8 max-w-xl mx-auto">Our support team is available 24/7 to answer any technical or account-related inquiries.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:support@workly.com" className="inline-flex items-center justify-center px-6 py-3 bg-[#1a1a1a] border border-[#333333] hover:bg-[#222222] text-white font-medium rounded-full transition-colors">
                <Mail className="w-5 h-5 mr-2 text-[#a1a1aa]" /> Contact Support
              </a>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors">
                <MessageSquare className="w-5 h-5 mr-2" /> Live Chat
              </button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
