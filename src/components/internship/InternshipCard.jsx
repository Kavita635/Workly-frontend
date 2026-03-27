import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Building, Clock, DollarSign, Bookmark } from 'lucide-react';
import { useInternships } from '../../context/InternshipContext';
import { useBookmarks } from '../../context/BookmarkContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const InternshipCard = ({ internship, showApply = false, index = 0 }) => {
  const { savedInternships, toggleBookmark } = useBookmarks();
  const { addToast } = useToast();
  const { user } = useAuth();

  const isSaved = savedInternships?.includes(internship.id);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      toggleBookmark(internship.id);
      addToast(isSaved ? 'Removed from saved internships' : 'Saved successfully', 'success');
    } else {
      window.location.href = '/login';
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-[#111111] rounded-3xl border border-[#1f1f1f] p-8 flex flex-col hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group hover:border-orange-500 hover:ring-2 hover:ring-orange-400/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/5 to-transparent pointer-events-none" />

      <div className="flex justify-between items-start mb-6 relative z-10 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#ff6a00] transition-colors pr-2">{internship.title}</h3>
            {internship.recommended && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-700 text-white border border-green-500 animate-pulse">Recommended</span>
            )}
          </div>
          <div className="flex items-center text-sm text-[#a1a1aa]">
            <Building className="w-4 h-4 mr-2" />
            <span className="font-medium">{internship.company}</span>
          </div>
        </div>

        <motion.button whileTap={{ scale: 0.8 }} onClick={handleBookmark} className="absolute right-0 top-0 p-2 -mr-2 -mt-2 rounded-full hover:bg-[#1f1f1f] transition-colors group/btn z-20">
          <Bookmark className={`w-6 h-6 transition-all duration-300 ${isSaved ? 'fill-orange-500 text-orange-500 scale-110 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'text-[#a1a1aa] group-hover/btn:text-orange-400'}`} />
        </motion.button>
      </div>

      <p className="text-sm text-[#a1a1aa] mb-8 line-clamp-2 flex-grow relative z-10 leading-relaxed">
        {internship.description}
      </p>

      <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8 relative z-10">
        <div className="flex items-center text-sm font-medium text-gray-300">
          <MapPin className="w-4 h-4 mr-2 text-[#475569]" />
          <span className="truncate">{internship.location}</span>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-300 justify-end">
          <Clock className="w-4 h-4 mr-2 text-[#475569]" />
          <span>{internship.duration}</span>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-300 col-span-2">
          <DollarSign className="w-4 h-4 mr-2 text-[#475569]" />
          <span>{internship.stipend}</span>
        </div>
      </div>

      <div className="relative z-10 pt-6 border-t border-[#1f1f1f] flex items-center justify-between">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1a1a1a] text-[#a1a1aa] border border-[#333333]">
          {internship.type}
        </span>
        <Link to={`/internships/${internship.id}`} className="inline-flex items-center justify-center font-semibold text-sm text-white hover:text-blue-400 transition-colors">
          View Details <span aria-hidden="true" className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">&rarr;</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
