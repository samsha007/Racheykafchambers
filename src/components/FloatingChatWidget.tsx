import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Paperclip,
  Smile,
  Bot,
  User,
  CheckCheck,
  Calendar,
  Phone,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Image as ImageIcon,
  FileText,
  Building2,
  ExternalLink,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { LOGO_IMAGE, FIRM_INFO, PRACTICE_AREAS } from '../data/firmData';

interface FloatingChatWidgetProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: (topic?: string) => void;
  onOpenFeeEstimator?: () => void;
  onSelectPractice?: (practice: any) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    type: 'image' | 'file';
    url?: string;
  };
}

const QUICK_ACTIONS = [
  '• Book a Consultation',
  '• Corporate & Commercial Law',
  '• Litigation & Dispute Resolution',
  '• Property & Real Estate',
  '• Employment Law',
  '• Regulatory Compliance',
  '• Speak to a Lawyer',
  '• Other Enquiries',
];

const QUICK_EMOJIS = ['⚖️', '📜', '💼', '🏛️', '👍', '🙏', '📄', '📞', '🤝'];

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  isOpenExternal,
  onCloseExternal,
  onNavigate,
  onOpenConsultation,
  onOpenFeeEstimator,
  onSelectPractice,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);
  const [dismissedWelcome, setDismissedWelcome] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync external open trigger (e.g. header click)
  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
      if (isOpenExternal) {
        setShowWelcomeBubble(false);
      }
    }
  }, [isOpenExternal]);

  // Initial welcome message history
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting-1',
      sender: 'ai',
      text: 'Hello and welcome to Racheykaf Chamber.\nThank you for visiting our website.\nHow may we assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Welcome Bubble Timer logic
  useEffect(() => {
    // Show welcome bubble 5 seconds after page load
    const timer = setTimeout(() => {
      if (!isOpen && !dismissedWelcome) {
        setShowWelcomeBubble(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, dismissedWelcome]);

  // Auto-hide welcome bubble after 8 seconds
  useEffect(() => {
    if (showWelcomeBubble) {
      const timer = setTimeout(() => {
        setShowWelcomeBubble(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeBubble]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const toggleChat = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setShowWelcomeBubble(false);
    }
    if (onCloseExternal && !nextState) {
      onCloseExternal();
    }
  };

  const handleButtonHover = () => {
    if (!isOpen && !dismissedWelcome) {
      setShowWelcomeBubble(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPendingFile(e.target.files[0]);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if ((!query && !pendingFile) || isLoading) return;

    let fileAttachment: Message['attachment'] = undefined;
    if (pendingFile) {
      fileAttachment = {
        name: pendingFile.name,
        type: pendingFile.type.startsWith('image/') ? 'image' : 'file',
        url: pendingFile.type.startsWith('image/') ? URL.createObjectURL(pendingFile) : undefined,
      };
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query || (pendingFile ? `[Attached: ${pendingFile.name}]` : ''),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachment: fileAttachment,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setPendingFile(null);
    setShowEmojiPicker(false);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.sender, content: m.text })),
          userMessage: query || 'File attached for legal review',
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || 'Thank you for reaching out to Racheykaf Chamber. A senior counsel will review your inquiry. [Action: Book Consultation]';

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Thank you for your message. Please click below to schedule a direct confidential partner consultation.\n\n[Action: Book Consultation]',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (actionText: string) => {
    const cleanAction = actionText.replace(/^•\s*/, '');
    if (cleanAction === 'Book a Consultation' || cleanAction === 'Speak to a Lawyer') {
      onOpenConsultation(cleanAction);
    } else {
      handleSend(`Enquiry regarding: ${cleanAction}`);
    }
  };

  const openWhatsApp = () => {
    const whatsappNum = '2348033119456'; // Clean digits for wa.me
    const defaultMsg = encodeURIComponent(
      'Hello Racheykaf Chamber. I visited your website and would like to make an enquiry.'
    );
    window.open(`https://wa.me/${whatsappNum}?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
  };

  // Render text with interactive action buttons for [Action: ...] tags
  const renderMessageContent = (text: string) => {
    const actionRegex = /\[Action:\s*([^\]]+)\]/g;
    const actions: string[] = [];
    let match;
    while ((match = actionRegex.exec(text)) !== null) {
      actions.push(match[1]);
    }

    const cleanText = text.replace(actionRegex, '').trim();

    return (
      <div className="space-y-3">
        <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-gray-100 font-sans">
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
                      onOpenConsultation('Inquiry from Instant Chat');
                    }}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-gold-gradient text-[#081826] font-heading font-extrabold text-[11px] uppercase tracking-wider shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Partner Consultation</span>
                  </button>
                );
              }

              if (act.includes('Fee Estimator') && onOpenFeeEstimator) {
                return (
                  <button
                    key={idx}
                    onClick={() => onOpenFeeEstimator()}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[#143D73] text-[#C8A84F] border border-[#C8A84F]/40 font-heading font-bold text-[11px] uppercase tracking-wider hover:bg-[#C8A84F] hover:text-[#081826] flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <span>Fee Calculator</span>
                  </button>
                );
              }

              if (act.includes('Contact Chambers')) {
                return (
                  <button
                    key={idx}
                    onClick={() => onNavigate('contact')}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[#081826] text-gray-200 border border-[#143D73] hover:border-[#C8A84F] text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer"
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
                    }}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[#0D2438] text-[#C8A84F] border border-[#C8A84F]/30 hover:border-[#C8A84F] text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>View: {practiceName || 'Practices'}</span>
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
    <>
      {/* Floating Widget Container fixed at bottom-6 right-6 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        
        {/* Welcome Bubble (Positioned above chat button) */}
        {showWelcomeBubble && !isOpen && (
          <div
            className="pointer-events-auto mb-3 max-w-[290px] sm:max-w-[320px] bg-[#081826] text-white p-4 rounded-2xl border border-[#C8A84F]/50 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300 relative group cursor-pointer"
            onClick={toggleChat}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowWelcomeBubble(false);
                setDismissedWelcome(true);
              }}
              className="absolute top-2.5 right-2.5 text-gray-400 hover:text-white p-1 rounded-full transition-colors"
              title="Dismiss Welcome Message"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-2.5 pr-4">
              <div className="w-7 h-7 rounded-full bg-gold-gradient text-[#081826] flex items-center justify-center font-bold text-xs shrink-0 shadow-md mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="font-heading font-extrabold text-xs text-[#C8A84F] mb-1">
                  👋 Welcome to Racheykaf Chamber
                </p>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Need legal advice or have a question? Our team is here to help.
                </p>
              </div>
            </div>

            {/* Bubble Tail Arrow pointing to button */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#081826] border-r border-b border-[#C8A84F]/50 rotate-45" />
          </div>
        )}

        {/* Floating Chat Button */}
        <div className="pointer-events-auto relative">
          {/* Gentle Pulsing Ring Accent */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#C8A84F]/30 animate-ping duration-1000 pointer-events-none" />
          )}

          <button
            onClick={toggleChat}
            onMouseEnter={handleButtonHover}
            aria-label="Open Racheykaf Chamber Instant Legal Chat"
            className={`w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-full bg-gradient-to-br from-[#081826] via-[#0D2438] to-[#050F18] border-2 border-[#C8A84F] text-[#C8A84F] hover:text-white shadow-[0_10px_25px_rgba(200,168,79,0.35)] hover:shadow-[0_15px_35px_rgba(200,168,79,0.5)] transition-all duration-300 hover:scale-105 flex items-center justify-center cursor-pointer active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#C8A84F] ${
              isOpen ? 'bg-[#C8A84F] text-[#081826] border-white' : ''
            }`}
          >
            {isOpen ? (
              <X className="w-7 h-7 transition-transform duration-300 rotate-90" />
            ) : (
              <div className="relative flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-[#C8A84F] group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#081826]" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Luxury Chat Window Panel */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 w-full h-full sm:w-[380px] sm:h-[600px] bg-[#081826] text-white sm:rounded-2xl border border-[#C8A84F]/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#051322] via-[#0D2438] to-[#051322] border-b border-[#C8A84F]/30 flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D2438] to-[#081826] border border-[#C8A84F]/60 flex items-center justify-center p-1 shadow-md">
                  <img
                    src={LOGO_IMAGE}
                    alt="Racheykaf Chamber Crest"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#081826]" />
              </div>

              <div>
                <h3 className="text-sm font-heading font-extrabold text-white leading-tight">
                  {FIRM_INFO.name}
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-300 mt-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-emerald-400">Online</span>
                  <span className="text-gray-400">• Replies in minutes</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {/* WhatsApp Quick Link */}
              <button
                onClick={openWhatsApp}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="Continue on WhatsApp"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              <button
                onClick={toggleChat}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Chat Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050F18]/80 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-bold text-[10px] ${
                    msg.sender === 'user'
                      ? 'bg-[#143D73] text-white border border-[#C8A84F]/40'
                      : 'bg-gold-gradient text-[#081826]'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 shadow-md border ${
                    msg.sender === 'user'
                      ? 'bg-[#143D73] border-[#C8A84F]/30 text-white rounded-tr-none'
                      : 'bg-[#0D2438] border-[#143D73] text-gray-100 rounded-tl-none'
                  }`}
                >
                  {/* Attachment Preview */}
                  {msg.attachment && (
                    <div className="mb-2 p-2 rounded-lg bg-[#081826] border border-[#143D73] flex items-center gap-2">
                      {msg.attachment.type === 'image' && msg.attachment.url ? (
                        <img
                          src={msg.attachment.url}
                          alt="Attachment"
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <FileText className="w-5 h-5 text-[#C8A84F]" />
                      )}
                      <span className="text-[10px] text-gray-300 truncate max-w-[150px]">
                        {msg.attachment.name}
                      </span>
                    </div>
                  )}

                  {msg.sender === 'ai' ? (
                    renderMessageContent(msg.text)
                  ) : (
                    <p className="whitespace-pre-line leading-relaxed font-sans">{msg.text}</p>
                  )}

                  <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] text-gray-400">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'user' && (
                      <CheckCheck className="w-3 h-3 text-emerald-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gold-gradient text-[#081826] flex items-center justify-center font-bold">
                  <Bot className="w-3.5 h-3.5 animate-bounce" />
                </div>
                <div className="bg-[#0D2438] border border-[#143D73] p-3 rounded-2xl rounded-tl-none text-xs text-gray-300 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-[#C8A84F] rounded-full animate-ping" />
                  <span>Racheykaf Chamber is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-3 py-2 bg-[#051322] border-t border-[#143D73]/60 shrink-0">
            <p className="text-[10px] font-bold text-[#C8A84F] uppercase tracking-wider mb-1.5">
              Quick Inquiries:
            </p>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {QUICK_ACTIONS.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickAction(action)}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-[#0D2438] hover:bg-[#143D73] border border-[#143D73] hover:border-[#C8A84F]/60 text-gray-200 hover:text-white whitespace-nowrap cursor-pointer transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Emoji Picker Bar */}
          {showEmojiPicker && (
            <div className="px-3 py-2 bg-[#081826] border-t border-[#143D73] flex items-center gap-2 overflow-x-auto">
              {QUICK_EMOJIS.map((emoji, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setInput((prev) => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="text-base p-1 hover:bg-[#143D73] rounded transition-colors cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Pending File attachment preview */}
          {pendingFile && (
            <div className="px-3 py-1.5 bg-[#0D2438] border-t border-[#143D73] flex items-center justify-between text-xs text-[#C8A84F]">
              <span className="truncate max-w-[250px] font-mono text-[11px]">
                📎 {pendingFile.name}
              </span>
              <button
                onClick={() => setPendingFile(null)}
                className="text-gray-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#081826] border-t border-[#C8A84F]/30 flex items-center gap-2 shrink-0"
          >
            {/* Attachment input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-[#C8A84F] rounded-lg hover:bg-[#0D2438] transition-colors cursor-pointer"
              title="Attach Document or Image"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Emoji picker toggle */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-400 hover:text-[#C8A84F] rounded-lg hover:bg-[#0D2438] transition-colors cursor-pointer"
              title="Add Emoji"
            >
              <Smile className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a legal question or request counsel..."
              className="flex-1 bg-[#0D2438] border border-[#143D73] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C8A84F]"
            />

            <button
              type="submit"
              disabled={(!input.trim() && !pendingFile) || isLoading}
              className="p-2.5 bg-gold-gradient text-[#081826] rounded-xl font-bold shadow-md hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* WhatsApp Direct Option */}
          <div className="px-3 py-1.5 bg-[#051322] border-t border-[#143D73]/60 flex items-center justify-between text-[11px] text-gray-300 shrink-0">
            <span className="text-[10px] text-gray-400">Prefer WhatsApp?</span>
            <button
              type="button"
              onClick={openWhatsApp}
              className="text-emerald-400 hover:underline font-bold text-[10px] flex items-center gap-1 cursor-pointer"
            >
              <span>Continue on WhatsApp (+234 803 311 9456)</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Confidentiality Footer */}
          <div className="bg-[#040D18] px-3 py-1.5 text-center text-[9px] text-gray-400 border-t border-white/5 shrink-0">
            🔒 Your conversation is confidential and handled in accordance with our professional legal obligations.
          </div>

        </div>
      )}
    </>
  );
};
