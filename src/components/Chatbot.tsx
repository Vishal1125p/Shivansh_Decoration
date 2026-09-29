'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  Phone, 
  ArrowRight, 
  User, 
  Minimize2 
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  quickReplies?: string[];
  showQuoteCTA?: boolean;
  showWhatsAppCTA?: boolean;
  timestamp: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: 'Namaste! 🙏 Welcome to **Shivansh Decoration** – *"We Make Your Moments Beautiful."*\n\nI am your **Shivansh AI Assistant**. I can help you with mandap design ideas, theme recommendations, packages, budget estimates, and booking enquiries.\n\nWhat type of event are you planning?',
      quickReplies: ['Wedding / Mandap', 'Engagement', 'Haldi & Mehendi', 'Birthday Party', 'Baby Shower', 'Check Packages & Rates'],
      showQuoteCTA: false,
      showWhatsAppCTA: true,
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();

      const assistantMsg: Message = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Thank you for your enquiry! Would you like to request a free quote or connect on WhatsApp?',
        quickReplies: data.quickReplies || ['Get Free Quote', 'Chat on WhatsApp', 'View Mandap Gallery'],
        showQuoteCTA: data.showQuoteCTA ?? true,
        showWhatsAppCTA: data.showWhatsAppCTA ?? true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ast-err-${Date.now()}`,
          role: 'assistant',
          content: 'Namaste! Please click below to request a direct quotation or speak with our decorator on WhatsApp.',
          quickReplies: ['Get Free Quote', 'Chat on WhatsApp'],
          showQuoteCTA: true,
          showWhatsAppCTA: true,
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-green fixed bottom-6 right-6 z-40 p-4 rounded-full text-white shadow-green-glow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2.5 group"
          aria-label="Open Shivansh Assistant Chatbot"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full border-2 border-emerald-600 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full border-2 border-emerald-600" />
          </div>
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider pr-1 text-white">
            Shivansh Assistant
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Chat Header */}
          <div className="bg-emerald-800 p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 p-[1.5px] shadow-sm flex items-center justify-center">
                <div className="w-full h-full bg-emerald-900 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-300" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-sm font-bold text-white tracking-wide">
                    Shivansh Assistant
                  </h3>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-300" />
                  <span>Online • AI Event Planner</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-emerald-700 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-1 border border-emerald-200">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 ${
                  msg.role === 'user'
                    ? 'btn-green text-white font-medium rounded-tr-none shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}>
                  <div className="whitespace-pre-line leading-relaxed">
                    {msg.content}
                  </div>

                  {/* Action Buttons inside message if assistant */}
                  {msg.role === 'assistant' && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                      {/* Action CTAs */}
                      <div className="flex flex-wrap gap-2">
                        {msg.showQuoteCTA && (
                          <Link
                            href="/quote"
                            onClick={() => setIsOpen(false)}
                            className="btn-green px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Get Free Quote</span>
                          </Link>
                        )}
                        {msg.showWhatsAppCTA && (
                          <a
                            href="https://wa.me/919766686373?text=Hello%20Shivansh%20Decoration,%20I%20am%20chatting%20with%20your%20AI%20assistant%20and%20need%20expert%20decoration%20advice."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-all"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp Us</span>
                          </a>
                        )}
                      </div>

                      {/* Quick suggestions */}
                      {msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {msg.quickReplies.map((qr) => (
                            <button
                              key={qr}
                              onClick={() => handleSendMessage(qr)}
                              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-600 hover:text-white border border-slate-200 text-slate-700 text-[11px] font-medium transition-colors text-left"
                            >
                              {qr}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className={`text-[9px] mt-1 text-right ${
                    msg.role === 'user' ? 'text-white/80' : 'text-slate-400'
                  }`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-1 font-bold shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-emerald-700 italic p-2">
                <Bot className="w-4 h-4 animate-bounce" />
                <span>Shivansh Assistant is crafting recommendations...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask for mandap ideas, guest packages, rates..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-xl btn-green text-white disabled:opacity-40 transition-colors shadow-sm flex items-center justify-center"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
