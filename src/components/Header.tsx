import React, { useState, useEffect } from 'react';
import { FIRM_INFO, LOGO_IMAGE } from '../data/firmData';
import { Phone, Mail, MapPin, Menu, X, ChevronRight, Shield, Calendar, Lock, ShieldCheck, Bot, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenConsultation?: (practiceArea?: string) => void;
  onOpenBackend?: () => void;
  onOpenAIChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenConsultation,
  onOpenBackend,
  onOpenAIChat,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'practices', label: 'Practice Areas' },
    { id: 'leadership', label: 'Our Lawyers' },
    { id: 'industries', label: 'Sectors' },
    { id: 'experience', label: 'Mandates' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans">
      {/* Top Luxury Status Ribbon */}
      <div className="bg-[#040C14] text-gray-300 text-[11px] border-b border-[#C8A84F]/30 py-2 hidden lg:block transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-gray-300 hover:text-[#C8A84F] transition-colors cursor-default">
              <MapPin className="w-3.5 h-3.5 text-[#C8A84F]" />
              <span className="tracking-wide">Asokoro, Abuja, FCT, Nigeria</span>
            </span>
            <span className="text-[#C8A84F]/40">•</span>
            <a href={`tel:${FIRM_INFO.phone}`} className="flex items-center gap-1.5 text-gray-300 hover:text-[#C8A84F] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#C8A84F]" />
              <span className="tracking-wide">{FIRM_INFO.phone}</span>
            </a>
            <span className="text-[#C8A84F]/40">•</span>
            <a href={`mailto:${FIRM_INFO.email}`} className="flex items-center gap-1.5 text-gray-300 hover:text-[#C8A84F] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#C8A84F]" />
              <span className="tracking-wide">{FIRM_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#143D73]/60 border border-[#C8A84F]/40 text-[#C8A84F] font-mono text-[10px] font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(200,168,79,0.15)]">
              <Shield className="w-3 h-3" />
              <span>RC: 2018-ABJ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <nav
        className={`transition-all duration-300 border-b border-[#C8A84F]/30 ${
          isScrolled
            ? 'bg-[#081826]/95 backdrop-blur-xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.7),0_0_20px_rgba(200,168,79,0.15)] py-2 sm:py-3'
            : 'bg-[#081826]/90 backdrop-blur-md py-3 sm:py-4 shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between min-h-[54px] sm:min-h-[60px]">
          
          {/* Brand Mark Lockup */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 sm:space-x-3.5 text-left group focus:outline-none py-1 cursor-pointer"
            aria-label="Racheykaf Chamber - Return to Home"
          >
            <div className="relative p-1.5 rounded-xl bg-white/5 border border-[#C8A84F]/30 group-hover:border-[#D3A77E] transition-colors shrink-0">
              <img
                src={LOGO_IMAGE}
                alt="Racheykaf Chamber Official Logo"
                className="h-[38px] md:h-[52px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col border-l border-[#D3A77E]/40 pl-2.5 sm:pl-3.5">
              <span className="font-heading font-extrabold text-base sm:text-xl tracking-tight text-white uppercase leading-none group-hover:text-[#C8A84F] transition-colors">
                Racheykaf <span className="font-light text-gray-300">Chamber</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.20em] sm:tracking-[0.24em] text-[#C8A84F] font-bold mt-1 block drop-shadow-sm">
                Barristers & Legal Consultants
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 px-3.5 py-2 rounded-full cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C8A84F] to-[#B09344] text-[#081826] shadow-[0_0_15px_rgba(200,168,79,0.35)] scale-105'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action CTA Button */}
          <div className="hidden lg:flex items-center space-x-3">
            {onOpenConsultation && (
              <button
                onClick={() => onOpenConsultation()}
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#C8A84F] via-[#D4B55E] to-[#B09344] text-[#081826] font-extrabold text-[11px] uppercase tracking-wider shadow-[0_0_20px_rgba(200,168,79,0.35)] hover:shadow-[0_0_25px_rgba(200,168,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 border border-[#C8A84F]/50 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button (48x48px Touch Target) */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-12 h-12 rounded-xl bg-white/10 border border-[#C8A84F]/40 text-white hover:text-[#C8A84F] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#C8A84F]/50 transition-all cursor-pointer active:scale-95"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#C8A84F]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Right Slide-Over Off-Canvas Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Right Sliding Drawer */}
          <aside className="fixed inset-y-0 right-0 w-[85%] max-w-[360px] bg-[#061424] border-l border-[#C8A84F]/40 text-white z-50 p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2.5">
                  <div className="p-1 rounded-lg bg-white/5 border border-[#D3A77E]/30">
                    <img src={LOGO_IMAGE} alt="Logo" className="h-[38px] w-auto object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-extrabold text-sm uppercase text-white">
                      Racheykaf <span className="text-[#C8A84F]">Chamber</span>
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-[#C8A84F] font-bold">
                      Legal Navigation
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-[#C8A84F]" />
                </button>
              </div>

              {/* Nav Items */}
              <div className="flex flex-col space-y-1.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left text-xs uppercase tracking-wider font-extrabold min-h-[48px] px-4 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#C8A84F] to-[#B09344] text-[#081826] shadow-md'
                          : 'text-gray-200 hover:text-white hover:bg-white/10 border-b border-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#081826]' : 'text-[#C8A84F]'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile CTAs & Status Ribbon Info */}
            <div className="pt-6 border-t border-white/10 space-y-3 mt-6">
              {onOpenConsultation && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full text-center min-h-[48px] py-3.5 bg-gradient-to-r from-[#C8A84F] to-[#B09344] text-[#081826] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Direct Consultation</span>
                </button>
              )}

              <div className="pt-3 flex flex-col space-y-2 text-[11px] text-gray-400">
                <a href={`tel:${FIRM_INFO.phone}`} className="flex items-center gap-2 hover:text-[#C8A84F] min-h-[36px]">
                  <Phone className="w-3.5 h-3.5 text-[#C8A84F]" />
                  <span>{FIRM_INFO.phone}</span>
                </a>
                <a href={`mailto:${FIRM_INFO.email}`} className="flex items-center gap-2 hover:text-[#C8A84F] min-h-[36px]">
                  <Mail className="w-3.5 h-3.5 text-[#C8A84F]" />
                  <span>{FIRM_INFO.email}</span>
                </a>
              </div>
            </div>
          </aside>
        </>
      )}
    </header>
  );
};

