import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, User, Briefcase, Paperclip, MoreVertical } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

// Mock Conversations
const mockConversations = [
  { id: 1, name: 'TechCorp Innovations', role: 'company', lastMessage: 'We would like to schedule an interview.', time: '10:30 AM', unread: 2 },
  { id: 2, name: 'DataSystems Inc.', role: 'company', lastMessage: 'Can you share your GitHub portfolio?', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'Creative Studio', role: 'company', lastMessage: 'Your application is under review.', time: 'Monday', unread: 0 },
];

const mockMessages = [
  { id: 1, text: 'Hello! Thanks for applying to our Frontend Developer Intern position.', sender: 'them', time: '10:00 AM' },
  { id: 2, text: 'Hi! Thank you for the opportunity. I am very excited about the role.', sender: 'me', time: '10:05 AM' },
  { id: 3, text: 'We reviewed your portfolio and were really impressed by your React projects.', sender: 'them', time: '10:15 AM' },
  { id: 4, text: 'We would like to schedule an interview. Are you available this Thursday at 2 PM EST?', sender: 'them', time: '10:30 AM' },
];

export default function Chat() {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(mockConversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!user) return <Navigate to="/login" replace />;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      text: input,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Auto-reply mock
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Thanks for your message. We will get back to you shortly.',
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh)] flex flex-col">
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-3xl flex-1 flex overflow-hidden shadow-2xl relative z-10">
        
        {/* Sidebar */}
        <div className="w-80 border-r border-[#1f1f1f] flex flex-col">
          <div className="p-6 border-b border-[#1f1f1f]">
            <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl pl-10 pr-4 py-2 focus:ring-1 focus:ring-purple-500 outline-none placeholder-[#475569]"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map(conv => (
              <div 
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className={`flex gap-4 p-5 cursor-pointer border-l-4 transition-all ${activeChat.id === conv.id ? 'border-purple-500 bg-[#1a1a1a]' : 'border-transparent hover:bg-[#1a1a1a]'}`}
              >
                <div className="w-12 h-12 rounded-full bg-[#1f1f1f] border border-[#333333] flex items-center justify-center flex-shrink-0">
                  {conv.role === 'company' ? <Briefcase className="w-5 h-5 text-blue-400" /> : <User className="w-5 h-5 text-green-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white font-medium text-sm truncate pr-2">{conv.name}</h3>
                    <span className="text-xs text-[#475569] whitespace-nowrap">{conv.time}</span>
                  </div>
                  <p className="text-xs text-[#a1a1aa] truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white self-center shadow-[0_0_8px_rgba(249,115,22,0.5)]">
                    {conv.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-[#0a0a0a]">
          {/* Header */}
          <div className="h-20 border-b border-[#1f1f1f] flex items-center justify-between px-8 bg-[#111111]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1f1f1f] flex items-center justify-center border border-[#333333]">
                {activeChat.role === 'company' ? <Briefcase className="w-6 h-6 text-blue-400" /> : <User className="w-6 h-6 text-green-400" />}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white tracking-tight">{activeChat.name}</h3>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
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
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`flex gap-3 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'them' && (
                  <div className="w-8 h-8 rounded-full bg-[#1f1f1f] flex items-center justify-center border border-[#333333] self-end mb-4 flex-shrink-0">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                  </div>
                )}
                
                <div className={`max-w-[75%] rounded-2xl px-5 py-3.5 shadow-md ${msg.sender === 'me' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm' : 'bg-[#1f1f1f] text-gray-200 border border-[#333333] rounded-bl-sm'}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span className={`text-[10px] mt-2 block ${msg.sender === 'me' ? 'text-blue-200 text-right' : 'text-[#a1a1aa]'}`}>
                    {msg.time}
                  </span>
                </div>
                
                {msg.sender === 'me' && (
                  <div className="w-8 h-8 rounded-full bg-[#1f1f1f] flex items-center justify-center border border-[#333333] self-end mb-4 flex-shrink-0">
                    <User className="w-4 h-4 text-green-400" />
                  </div>
                )}
              </motion.div>
            ))}
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
        </div>
      </div>
    </div>
  );
}
