import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCpu, FiUser } from 'react-icons/fi';

const AICoach = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Initiating neural interface... Hello, I am TITAN.AI. Do you need a generated workout routine or diet consultation today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, input })
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to connect to neural interface');

      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (error) {
      console.error("AI Proxy Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: `Error establishing neural connection: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 md:px-8 py-10 h-[calc(100vh-80px)] flex flex-col pt-20"
    >
      <div className="text-center mb-6 flex-shrink-0">
        <h1 className="text-4xl font-heading font-black text-white uppercase tracking-tight flex items-center justify-center gap-3">
          <FiCpu className="text-gym-neon" /> TITAN.AI
        </h1>
        <p className="text-gray-400 text-sm mt-1">Your personal machine learning fitness consultant.</p>
      </div>

      <div className="flex-grow glass-card flex flex-col overflow-hidden relative">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-gym-neon to-transparent opacity-50"></div>
        
        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? 'bg-zinc-800 text-gym-neon' : 'bg-gym-neon text-black'}`}>
                {msg.role === 'ai' ? <FiCpu size={20} /> : <FiUser size={20} />}
              </div>
              <div className={`max-w-[70%] p-4 rounded-2xl ${msg.role === 'ai' ? 'bg-zinc-800/80 rounded-tl-sm text-gray-300' : 'bg-gym-neon/10 border border-gym-neon/20 rounded-tr-sm text-white'}`}>
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('**') ? 'font-bold text-gym-neon mt-2' : ''}>
                    {line.replace(/\*\*/g, '')}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex gap-4"
             >
               <div className="w-10 h-10 rounded-full bg-zinc-800 text-gym-neon flex items-center justify-center">
                 <FiCpu size={20} />
               </div>
               <div className="bg-zinc-800/80 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                 <motion.div className="w-2 h-2 bg-gym-neon rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} />
                 <motion.div className="w-2 h-2 bg-gym-neon rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} />
                 <motion.div className="w-2 h-2 bg-gym-neon rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} />
               </div>
             </motion.div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-zinc-950">
          <form onSubmit={handleSend} className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a workout or diet plan..."
              className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 pl-4 pr-16 text-white focus:outline-none focus:border-gym-neon transition-colors"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gym-neon text-black rounded-lg flex items-center justify-center hover:scale-105 transition-transform"
            >
              <FiSend />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AICoach;
