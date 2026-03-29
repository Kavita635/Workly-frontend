import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, User } from 'lucide-react';

const MessageBubble = ({ message, index }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#1f1f1f] flex items-center justify-center border border-[#333333] self-end mb-4 flex-shrink-0">
          <Briefcase className="w-4 h-4 text-blue-400" />
        </div>
      )}
      
      <div className={`max-w-[75%] rounded-2xl px-5 py-3.5 shadow-md ${isUser ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm' : 'bg-[#1f1f1f] text-gray-200 border border-[#333333] rounded-bl-sm'}`}>
        <p className="text-sm leading-relaxed">{message.text}</p>
        <span className={`text-[10px] mt-2 block ${isUser ? 'text-blue-200 text-right' : 'text-[#a1a1aa]'}`}>
          {message.time}
        </span>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-[#1f1f1f] flex items-center justify-center border border-[#333333] self-end mb-4 flex-shrink-0">
          <User className="w-4 h-4 text-green-400" />
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
