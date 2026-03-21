import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="bg-black min-h-screen pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-12">
          
          <motion.div variants={itemVariants} className="mb-12 border-b border-[#1f1f1f] pb-8">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-[#111111] rounded-full border border-[#1f1f1f] mb-6">
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pb-2 tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-[#a1a1aa]">Last updated: October 24, 2024</p>
          </motion.div>

          <motion.div variants={itemVariants} className="prose prose-invert prose-lg max-w-none text-[#a1a1aa] leading-relaxed">
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing and using Workly, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, you must entirely cease using our platform.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. User Accounts</h2>
            <p className="mb-6">
              You are responsible for maintaining the confidentiality of your account credentials. The information you provide must be accurate and truthful. We reserve the right to suspend or terminate accounts that violate our policies or contain fraudulent information.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. Code of Conduct</h2>
            <p className="mb-4">Users must absolutely NOT engage in:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Submitting false credentials or fabricated portfolio materials</li>
              <li>Spamming applications or harassing prospective employers</li>
              <li>Reverse engineering or attempting to breach platform security</li>
              <li>Using automated scripts to scrape internal job postings</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">4. Employer Obligations</h2>
            <p className="mb-6">
              Companies utilizing the platform agree to provide accurate internship descriptions and engage in fair evaluation practices. Workly does not guarantee placement or candidate performance.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">5. Modifications</h2>
            <p className="mb-6">
              We reserve the right to modify these Terms at any time. Continued use of the platform following any such changes constitutes your acceptance of the new Terms of Service.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
