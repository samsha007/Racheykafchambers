import React, { useState, useEffect } from 'react';
import { FIRM_INFO, LOGO_IMAGE } from '../data/firmData';
import { Phone, Mail, MapPin, Menu, X, ChevronRight, Shield, Calendar } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenConsultation?: (practiceArea?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenConsultation,
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
              <span className="tracking-wide">Central Business District, FCT Abuja</span>
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
            ? 'bg-[#081826]/95 backdrop-blur-xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.7),0_0_20px_rgba(200,168,79,0.15)] py-3'
            : 'bg-[#081826] backdrop-blur-md py-4 shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Mark Lockup */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3.5 text-left group focus:outline-none py-1"
            aria-label="Racheykaf Chamber - Return to Home"
          >
            <div className="relative p-1 rounded-xl bg-white/5 border border-[#C8A84F]/30 group-hover:border-[#C8A84F] transition-colors">
              <img
                src={LOGO_IMAGE}
                alt="Racheykaf Chamber Official Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col border-l border-[#C8A84F]/40 pl-3.5">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white uppercase leading-none group-hover:text-[#C8A84F] transition-colors">
                Racheykaf <span className="font-light text-gray-300">Chamber</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#C8A84F] font-bold mt-1 block drop-shadow-sm">
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
                  className={`text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 px-3.5 py-2 rounded-full ${
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
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#C8A84F] via-[#D4B55E] to-[#B09344] text-[#081826] font-extrabold text-[11px] uppercase tracking-wider shadow-[0_0_20px_rgba(200,168,79,0.35)] hover:shadow-[0_0_25px_rgba(200,168,79,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 border border-[#C8A84F]/50"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/10 border border-[#C8A84F]/40 text-white hover:text-[#C8A84F] focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#C8A84F]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#061424] border-b border-[#C8A84F]/40 text-white px-6 pt-5 pb-8 space-y-4 shadow-[0_25px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-xs uppercase tracking-wider font-extrabold py-3 px-4 rounded-xl flex items-center justify-between transition-all ${
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

          {onOpenConsultation && (
            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full text-center py-3.5 bg-gradient-to-r from-[#C8A84F] to-[#B09344] text-[#081826] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Direct Consultation</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

