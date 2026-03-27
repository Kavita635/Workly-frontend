import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { sender: 'user' | 'ai', text: string }
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: 'user', text: input }]);
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, userId }),
      });
      if (!res.ok) throw new Error('Failed to get response');
      const data = await res.json();
      setMessages(msgs => [...msgs, { sender: 'ai', text: data.reply || 'No response.' }]);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        onClick={() => setOpen(true)}
        aria-label="Open Chatbot"
        style={{ display: open ? 'none' : 'block' }}
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chat Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-sm m-6 bg-[#18181b] rounded-2xl shadow-2xl flex flex-col h-[500px] border border-[#27272a]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#27272a]">
              <span className="font-semibold text-white">Internship Chatbot</span>
              <button onClick={() => setOpen(false)} className="text-[#a1a1aa] hover:text-red-400"><X className="w-5 h-5" /></button>
            </div>
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-[#18181b]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-[#27272a] text-[#e4e4e7] rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-2xl bg-[#27272a] text-[#e4e4e7] text-sm animate-pulse">Typing...</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {/* Error */}
            {error && <div className="text-red-400 text-xs px-4 pb-1">{error}</div>}
            {/* Input */}
            <form
              className="flex items-center gap-2 p-4 border-t border-[#27272a] bg-[#18181b]"
              onSubmit={e => { e.preventDefault(); sendMessage(); }}
            >
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-xl bg-[#23232b] text-white border border-[#27272a] focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                autoFocus
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                disabled={loading || !input.trim()}
                aria-label="Send"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
