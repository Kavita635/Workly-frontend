import React from 'react';
import { motion } from 'framer-motion';

export const InternshipCardSkeleton = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#111111] rounded-3xl border border-[#1f1f1f] p-8 flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-full">
          <div className="h-8 bg-[#1f1f1f] rounded-lg w-3/4 mb-4 animate-pulse"></div>
          <div className="h-5 bg-[#1f1f1f] rounded-lg w-1/2 animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-3 mb-8 flex-grow">
        <div className="h-4 bg-[#1f1f1f] rounded-md animate-pulse w-full"></div>
        <div className="h-4 bg-[#1f1f1f] rounded-md animate-pulse w-full"></div>
        <div className="h-4 bg-[#1f1f1f] rounded-md animate-pulse w-5/6"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="h-5 bg-[#1f1f1f] rounded-md animate-pulse w-3/4"></div>
        <div className="h-5 bg-[#1f1f1f] rounded-md animate-pulse w-3/4 justify-self-end"></div>
        <div className="h-5 bg-[#1f1f1f] rounded-md animate-pulse col-span-2 w-1/2"></div>
      </div>

      <div className="pt-6 border-t border-[#1f1f1f] flex justify-between items-center">
        <div className="h-6 w-20 bg-[#1f1f1f] rounded-full animate-pulse"></div>
        <div className="h-5 w-24 bg-[#1f1f1f] rounded-md animate-pulse"></div>
      </div>
    </motion.div>
  );
};
