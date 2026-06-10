"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

type Message = {
  role: "user" | "model";
  content: string;
};

export default function AIChatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hi! I'm your Vital AI Coach. How can I help you optimize your health today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // If user is not authenticated, don't render the chatbot globally
  if (!user) return null;

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", content: data.message }]);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [...prev, { role: "model", content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`glass-card rounded-2xl w-[320px] sm:w-[380px] flex flex-col overflow-hidden transition-all duration-300 ease-in-out origin-bottom-right mb-4 border border-[#424754]/50 shadow-2xl shadow-black/50 ${
          isOpen ? "opacity-100 scale-100 h-[500px]" : "opacity-0 scale-90 h-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#171f33]/80 backdrop-blur-md border-b border-[#424754]/50 p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#adc6ff] flex items-center justify-center shadow-lg shadow-[#adc6ff]/20">
              <span className="material-symbols-outlined text-[#0b1326] text-[18px]">smart_toy</span>
            </div>
            <div>
              <h3 className="text-[#dae2fd] font-['Plus_Jakarta_Sans'] font-semibold text-[15px]">Vital AI Coach</h3>
              <p className="text-[#4edea3] text-[11px] font-['Inter'] flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#c2c6d6] hover:text-[#dae2fd] hover:bg-[#2d3449]/50 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#0b1326]/60 backdrop-blur-sm">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} w-full`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-3 text-[14px] font-['Inter'] leading-relaxed shadow-md ${
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-[#005ac2] to-[#3b82f6] text-white rounded-br-sm" 
                    : "bg-[#1e293b]/80 border border-[#424754]/50 text-[#dae2fd] rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="bg-[#1e293b]/80 border border-[#424754]/50 rounded-2xl rounded-bl-sm p-4 flex gap-1.5 items-center shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-[#adc6ff] animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#adc6ff] animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#adc6ff] animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-[#171f33]/90 backdrop-blur-md border-t border-[#424754]/50 shrink-0">
          <form 
            onSubmit={sendMessage}
            className="flex items-center gap-2 bg-[#0b1326] border border-[#424754] rounded-full px-4 py-2 focus-within:border-[#adc6ff] focus-within:shadow-[0_0_10px_rgba(173,198,255,0.1)] transition-all"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for insights..."
              className="flex-1 bg-transparent text-[#dae2fd] text-[14px] font-['Inter'] outline-none placeholder:text-[#8c909f]"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="text-[#adc6ff] hover:text-white disabled:opacity-30 disabled:hover:text-[#adc6ff] transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
        </div>
      </div>

      {/* FAB Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-gradient-to-tr from-[#005ac2] to-[#adc6ff] text-[#001a42] flex items-center justify-center shadow-2xl shadow-[#3b82f6]/30 hover:scale-105 active:scale-95 transition-all duration-300 relative ${
          isOpen ? "scale-90 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        <span className="material-symbols-outlined text-[28px]">smart_toy</span>
      </button>
    </div>
  );
}
