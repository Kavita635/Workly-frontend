import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Briefcase, Paperclip, MoreVertical, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import MessageBubble from './MessageBubble';
import { useToast } from '../../context/ToastContext';

const ChatWindow = ({ activeChat, messages, setMessages }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { addToast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);
    addToast('Message sent successfully', 'success');
    
    // Auto-reply mock
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Thanks for reaching out! A representative will connect with you shortly.',
        sender: 'company',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1800);
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0a0a]">
        <div className="w-16 h-16 bg-[#111111] rounded-full border border-[#1f1f1f] flex items-center justify-center mb-4">
           <Send className="w-6 h-6 text-[#475569]" />
        </div>
        <h3 className="text-white font-medium">Select a company to start chatting</h3>
        <p className="text-sm text-[#a1a1aa] mt-2">Your messages will appear right here.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col bg-[#0a0a0a] min-h-0"
    >
      {/* Header */}
      <div className="h-20 border-b border-[#1f1f1f] flex items-center justify-between px-8 bg-[#111111]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1f1f1f] flex items-center justify-center border border-[#333333]">
            {activeChat.role === 'company' ? <Briefcase className="w-6 h-6 text-blue-400" /> : <User className="w-6 h-6 text-green-400" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white tracking-tight">{activeChat.name}</h3>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
               <p className="text-xs text-[#a1a1aa]">Active now</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-[#a1a1aa] hover:text-white transition-colors rounded-full hover:bg-[#1f1f1f]">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#a1a1aa] hover:text-white transition-colors rounded-full hover:bg-[#1f1f1f]">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.map((msg, idx) => (
          <MessageBubble key={msg.id} message={msg} index={idx} />
        ))}
        {isTyping && (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex gap-3 justify-start"
           >
             <div className="w-8 h-8 rounded-full bg-[#1f1f1f] flex items-center justify-center border border-[#333333] self-end mb-4 flex-shrink-0">
               {activeChat.role === 'company' ? <Briefcase className="w-4 h-4 text-blue-400" /> : <User className="w-4 h-4 text-green-400" />}
             </div>
             
             <div className="bg-[#1f1f1f] border border-[#333333] rounded-2xl rounded-bl-sm px-5 py-3.5 shadow-md flex items-center gap-1.5 h-[52px]">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
           </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-[#111111] border-t border-[#1f1f1f]">
        <form onSubmit={handleSend} className="flex gap-4">
          <button type="button" className="p-3.5 bg-[#1f1f1f] rounded-xl text-[#a1a1aa] hover:text-white transition-colors hover:bg-[#333333]">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 shadow-inner outline-none transition-all"
          />
          <Button type="submit" disabled={!input.trim()} className="px-8 !rounded-xl">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
