import React from 'react';
import { motion } from 'framer-motion';
import { BookmarkMinus } from 'lucide-react';
import { useInternships } from '../../context/InternshipContext';
import InternshipCard from '../../components/internship/InternshipCard';
import { InternshipCardSkeleton } from '../../components/ui/Skeleton';

export default function SavedInternships() {
  const { internships, savedInternships, loading } = useInternships();

  const savedList = internships.filter(i => savedInternships.includes(i.id));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Saved Internships</h1>
        <p className="text-[#a1a1aa]">Manage and track the opportunities you've bookmarked.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <InternshipCardSkeleton key={i} />)}
        </div>
      ) : savedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map((internship, index) => (
            <InternshipCard 
              key={internship.id} 
              internship={internship} 
              index={index}
            />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-12 text-center flex flex-col items-center mt-12"
        >
          <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6 border border-[#333333]">
            <BookmarkMinus className="w-10 h-10 text-[#475569]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">No Saved Internships</h3>
          <p className="text-[#a1a1aa] max-w-sm mb-8">You haven't bookmarked any opportunities yet. Explore the marketplace and save your favorites!</p>
          <a href="/internships" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors">
            Explore Marketplace
          </a>
        </motion.div>
      )}
    </div>
  );
}
