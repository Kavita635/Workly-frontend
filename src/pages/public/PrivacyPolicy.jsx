import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
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
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pb-2 tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-[#a1a1aa]">Last updated: October 24, 2024</p>
          </motion.div>

          <motion.div variants={itemVariants} className="prose prose-invert prose-lg max-w-none text-[#a1a1aa] leading-relaxed">
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">1. Information We Collect</h2>
            <p className="mb-6">
              We collect information you provide directly to us when you create an account, update your profile, apply for an internship, or communicate with us. This includes your name, email address, educational background, resume details, and any other information you choose to provide.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide, maintain, and improve our platform</li>
              <li>Match you with relevant internship opportunities</li>
              <li>Process your applications and share them with prospective employers</li>
              <li>Communicate with you about platform updates, security alerts, and support messages</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. Information Sharing</h2>
            <p className="mb-6">
              When you apply for an internship, your profile and application details are shared with the respective company. We do not sell your personal data to third-party data brokers. We may share anonymized, aggregated data for analytical purposes.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">4. Data Security</h2>
            <p className="mb-6">
              We implement industry-standard security measures to protect your personal information. However, no absolute security guarantees can be made over data transmission on the internet.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">5. Your Rights</h2>
            <p className="mb-6">
              You have the right to access, correct, or delete your personal data at any time through your account settings. For inquiries regarding data portability or erasure, please contact our privacy compliance team.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
