import React, { useState } from 'react';
import { Search, User, Briefcase } from 'lucide-react';
import { mockConversations } from '../../api/mockChatData';

const ChatSidebar = ({ activeChat, setActiveChat }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockConversations.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-80 border-r border-[#1f1f1f] flex flex-col h-full">
      <div className="p-6 border-b border-[#1f1f1f]">
        <h2 className="text-xl font-bold text-white mb-4">Conversations</h2>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-white rounded-xl pl-10 pr-4 py-2 focus:ring-1 focus:ring-purple-500 outline-none placeholder-[#475569]"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto hidden-scrollbar">
        {filtered.map(conv => (
          <div 
            key={conv.id}
            onClick={() => setActiveChat(conv)}
            className={`flex gap-4 p-5 cursor-pointer border-l-4 transition-all hover:scale-[1.02] ${activeChat?.id === conv.id ? 'border-purple-500 bg-[#1a1a1a]' : 'border-transparent hover:bg-[#1a1a1a]'}`}
          >
            <div className="w-12 h-12 rounded-full bg-[#1f1f1f] border border-[#333333] flex items-center justify-center flex-shrink-0 group">
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
        {filtered.length === 0 && (
           <p className="text-center text-[#475569] mt-10 text-sm">No conversations found.</p>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
