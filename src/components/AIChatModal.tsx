import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Scale,
  Calendar,
  Calculator,
  Building2,
  FileText,
  ChevronRight,
  RefreshCw,
  MessageSquare,
  ShieldCheck,
  Zap,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { PRACTICE_AREAS } from '../data/firmData';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: (topic?: string) => void;
  onOpenFeeEstimator: () => void;
  onSelectPractice?: (practice: any) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const QUICK_SUGGESTIONS = [
  '🏢 How to register a company in Nigeria?',
  '⚡ PIA 2021 Energy & Oil Gas Compliance',
  '⚖️ Commercial Litigation & Dispute Track Record',
  '📜 Land Title & C of O Verification in Abuja',
  '💰 How much are legal retainers?',
  '📅 Book a Confidential Partner Consultation',
];

export const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenConsultation,
  onOpenFeeEstimator,
  onSelectPractice,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Greetings. I am Racheykaf AI Legal Concierge, your virtual executive guide to Racheykaf Chamber. How can I assist your business today with Nigerian corporate advisory, PIA 2021 energy compliance, commercial litigation, real estate titles, or legal retention?\n\n[Action: Book Consultation] [Action: Fee Estimator] [Action: View Practice Areas]',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.sender, content: m.text })),
          userMessage: query,
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || 'Thank you for contacting Racheykaf Chamber. Please click below to connect with a senior advocate. [Action: Book Consultation]';

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Speech synthesis if enabled
      if (isSpeechEnabled && 'speechSynthesis' in window) {
        const cleanText = aiReply.replace(/\[Action:[^\]]+\]/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText.substring(0, 200));
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Our AI engine is currently processing high volume. You can speak directly with our senior legal team using the booking button below.\n\n[Action: Book Consultation]',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: 'Chat history cleared. How can Racheykaf Chamber assist your commercial legal mandate today?\n\n[Action: Book Consultation] [Action: Fee Estimator]',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Render text with interactive action buttons for [Action: ...] tags
  const renderMessageContent = (text: string) => {
    // Separate actions from normal text
    const actionRegex = /\[Action:\s*([^\]]+)\]/g;
    const actions: string[] = [];
    let match;
    while ((match = actionRegex.exec(text)) !== null) {
      actions.push(match[1]);
    }

    const cleanText = text.replace(actionRegex, '').trim();

    return (
      <div className="space-y-3">
        <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-gray-200 font-sans">
          {cleanText}
        </p>

        {actions.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-2">
            {actions.map((act, idx) => {
              if (act.includes('Book Consultation')) {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onOpenConsultation('Inquiry from AI Chat Concierge');
                      onClose();
                    }}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-gold-gradient text-[#081826] font-heading font-extrabold text-[11px] uppercase tracking-wider shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Partner Consultation</span>
                  </button>
                );
              }

              if (act.includes('Fee Estimator')) {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onOpenFeeEstimator();
                      onClose();
                    }}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-[#143D73] text-[#C8A84F] border border-[#C8A84F]/40 font-heading font-bold text-[11px] uppercase tracking-wider hover:bg-[#C8A84F] hover:text-[#081826] flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Calculate Fee Estimate</span>
                  </button>
                );
              }

              if (act.includes('Contact Chambers')) {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigate('contact');
                      onClose();
                    }}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-[#081826] text-gray-200 border border-[#143D73] hover:border-[#C8A84F] text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Contact Chambers</span>
                  </button>
                );
              }

              if (act.includes('View Practice')) {
                const practiceName = act.replace('View Practice:', '').trim();
                const foundPractice = PRACTICE_AREAS.find((p) =>
                  p.title.toLowerCase().includes(practiceName.toLowerCase())
                );

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (foundPractice && onSelectPractice) {
                        onSelectPractice(foundPractice);
                      } else {
                        onNavigate('practices');
                      }
                      onClose();
                    }}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-[#0D2438] text-[#C8A84F] border border-[#C8A84F]/30 hover:border-[#C8A84F] text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Explore Practice: {practiceName || 'Directory'}</span>
                  </button>
                );
              }

              if (act.includes('View Leadership')) {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigate('leadership');
                      onClose();
                    }}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-[#081826] text-[#C8A84F] border border-[#143D73] text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Leadership Team</span>
                  </button>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#081826] text-white w-full max-w-2xl h-[92vh] sm:h-[650px] rounded-t-2xl sm:rounded-2xl border border-[#C8A84F]/40 shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#051322] via-[#0D2438] to-[#051322] border-b border-[#C8A84F]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gold-gradient text-[#081826] flex items-center justify-center font-bold shadow-lg">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#081826]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-heading font-extrabold text-white">
                  Racheykaf AI Legal Concierge
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#143D73] text-[#C8A84F] text-[9px] uppercase tracking-widest font-extrabold">
                  Instant AI
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Corporate Law • PIA 2021 • Commercial Disputes • Abuja Legal Advice
              </p>
            </div>
          </div>

          {/* Top Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                isSpeechEnabled ? 'bg-[#C8A84F] text-[#081826]' : 'bg-[#0D2438] text-gray-400 hover:text-white'
              }`}
              title={isSpeechEnabled ? 'Disable Audio Voice' : 'Enable Audio Voice'}
            >
              {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl bg-[#0D2438] text-gray-400 hover:text-white text-xs transition-colors cursor-pointer"
              title="Clear Conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Close AI Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#050F18]/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#143D73] text-white border border-[#C8A84F]/40'
                    : 'bg-[#C8A84F] text-[#081826]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Chat Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm shadow-md border ${
                  msg.sender === 'user'
                    ? 'bg-[#143D73] border-[#C8A84F]/30 text-white rounded-tr-none'
                    : 'bg-[#0D2438] border-[#143D73] text-gray-100 rounded-tl-none'
                }`}
              >
                {msg.sender === 'ai' ? (
                  renderMessageContent(msg.text)
                ) : (
                  <p className="whitespace-pre-line leading-relaxed font-sans">{msg.text}</p>
                )}
                <span className="block text-[9px] text-gray-400 mt-2 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#C8A84F] text-[#081826] flex items-center justify-center font-bold">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="bg-[#0D2438] border border-[#143D73] p-3 rounded-2xl rounded-tl-none text-xs text-gray-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C8A84F] animate-spin" />
                <span>Racheykaf AI Concierge is reviewing legal regulations...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-[#051322] border-t border-[#143D73]/60 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A84F] shrink-0">
            Suggested FAQs:
          </span>
          {QUICK_SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSend(sug.replace(/^[^\s]+\s*/, ''))}
              className="text-[11px] px-3 py-1.5 rounded-full bg-[#0D2438] hover:bg-[#143D73] border border-[#143D73] hover:border-[#C8A84F]/60 text-gray-300 hover:text-white transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-[#081826] border-t border-[#C8A84F]/30 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about corporate law, PIA 2021, retainers, litigation..."
            className="flex-1 min-h-[48px] bg-[#0D2438] border border-[#143D73] rounded-xl px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#C8A84F]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="min-h-[48px] px-5 py-3 bg-gold-gradient text-[#081826] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Notice */}
        <div className="bg-[#050F18] px-4 py-1.5 text-center text-[10px] text-gray-500 border-t border-white/5">
          Racheykaf AI Concierge provides statutory information & general firm intelligence. For binding formal opinion, please execute a counsel engagement.
        </div>

      </div>
    </div>
  );
};
