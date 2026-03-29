import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ChatSidebar from '../../components/chat/ChatSidebar';
import ChatWindow from '../../components/chat/ChatWindow';
import { mockConversations, mockMessagesData } from '../../api/mockChatData';

const ChatPage = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(null); // Defaults to null to satisfy empty UX requirement
  const [messages, setMessages] = useState(mockMessagesData);

  // Authentication barrier
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh)] flex flex-col">
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-3xl flex-1 flex flex-col md:flex-row overflow-hidden shadow-2xl relative z-10">
        <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} />
        <ChatWindow activeChat={activeChat} messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default ChatPage;
