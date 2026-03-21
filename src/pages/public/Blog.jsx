import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function Blog() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const posts = [
    {
      id: 1,
      title: "How to Land Your Dream Tech Internship in 2024",
      category: "Tech",
      date: "Oct 24, 2023",
      excerpt: "Expert advice from recruiters at Fortune 500 companies on structuring your resume and portfolio..."
    },
    {
      id: 2,
      title: "Navigating Remote Work Internships",
      category: "Productivity",
      date: "Oct 18, 2023",
      excerpt: "Remote internships require a different set of communication skills. Here's a guide to flourishing remotely..."
    },
    {
      id: 3,
      title: "Ace the Whiteboard Interview",
      category: "Engineering",
      date: "Oct 12, 2023",
      excerpt: "Technical screens can be daunting. We break down the top 5 questions you should prepare for."
    }
  ];

  return (
    <div className="bg-black min-h-screen pt-32 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-12">
          
          <motion.div variants={itemVariants} className="mb-12 border-b border-[#1f1f1f] pb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pb-2 tracking-tight mb-4">
              The Workly Blog
            </h1>
            <p className="text-lg text-[#a1a1aa] max-w-2xl leading-relaxed">
              Stories, tips, and insights to accelerate your professional journey.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <div key={post.id} className="bg-[#111111] border border-[#1f1f1f] rounded-2xl overflow-hidden hover:border-[#333333] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                <div className="h-48 bg-[#0a0a0a] flex items-center justify-center border-b border-[#1f1f1f]">
                  {/* Placeholder for image */}
                  <span className="text-[#333333] font-medium text-sm tracking-widest uppercase">IMAGE</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-purple-400 bg-purple-900/20 px-2.5 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-[#a1a1aa] flex items-center"><Calendar className="w-3 h-3 mr-1" />{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">{post.title}</h2>
                  <p className="text-sm text-[#a1a1aa] mb-6 leading-relaxed flex-grow">{post.excerpt}</p>
                  <a href="#" className="font-semibold text-blue-500 hover:text-blue-400 inline-flex items-center transition-colors text-sm">
                    Read Post <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center pt-8">
            <Button variant="outline" size="lg" className="rounded-full">Load More Articles</Button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
