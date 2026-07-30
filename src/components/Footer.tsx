import React, { useState } from 'react';
import { FIRM_INFO, LOGO_IMAGE } from '../data/firmData';
import { MapPin, Phone, Mail, Clock, ArrowUp, Send, CheckCircle2, Linkedin, Facebook, Youtube, Instagram, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
  onOpenLegalDocs: (type: 'privacy' | 'terms') => void;
  onOpenBackend?: () => void;
  onOpenSitemap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenLegalDocs,
  onOpenBackend,
  onOpenSitemap,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050F18] text-gray-300 border-t border-[#C8A84F]/30 pt-12 sm:pt-20 pb-8 sm:pb-12 relative overflow-hidden">
      
      {/* Top Footer Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Brand Col */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5 sm:space-y-6">
            <div className="flex items-center space-x-3.5">
              <img
                src={LOGO_IMAGE}
                alt="Racheykaf Chamber Logo"
                className="h-12 sm:h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="border-l border-[#D3A77E]/40 pl-3">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white block uppercase">
                  Racheykaf <span className="text-[#C8A84F] font-normal">Chamber</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium block">
                  Barristers & Legal Consultants
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              Racheykaf Chamber is a premier Nigerian full-service commercial law firm providing strategic advisory, regulatory, dispute resolution, energy, and corporate legal services to sovereign entities, multinationals, and private clients.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-gray-400">
              <span className="text-[11px] font-semibold text-[#D3A77E] block w-full sm:w-auto mt-1 sm:mt-0">
                Join Our Online Conversation,
              </span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-[#081826] border border-[#143D73] text-[#C8A84F] hover:bg-[#D3A77E] hover:border-[#D3A77E] hover:text-[#081826] transition-colors flex items-center justify-center cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-[#081826] border border-[#143D73] text-[#C8A84F] hover:bg-[#D3A77E] hover:border-[#D3A77E] hover:text-[#081826] transition-colors flex items-center justify-center cursor-pointer"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-[#081826] border border-[#143D73] text-[#C8A84F] hover:bg-[#D3A77E] hover:border-[#D3A77E] hover:text-[#081826] transition-colors flex items-center justify-center cursor-pointer"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-[#081826] border border-[#143D73] text-[#C8A84F] hover:bg-[#D3A77E] hover:border-[#D3A77E] hover:text-[#081826] transition-colors flex items-center justify-center cursor-pointer"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Practice Links */}
          <div className="lg:col-span-3 space-y-3.5 sm:space-y-4">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-widest text-[#C8A84F]">
              Key Practice Areas
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {[
                'Corporate & Commercial',
                'Litigation & Dispute Resolution',
                'Oil, Gas & Energy (PIA 2021)',
                'Government & Regulatory Advisory',
                'Banking, Finance & Tax',
                'Real Estate & PPP Infrastructure',
                'Technology & Data Protection (NDPA)',
                'Legislative Policy Drafting',
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate('practices')}
                    className="hover:text-[#C8A84F] transition-colors text-left py-1 inline-block min-h-[36px] cursor-pointer"
                  >
                    • {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Nav & Sectors */}
          <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-widest text-[#C8A84F]">
              Firm Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#C8A84F] py-1 inline-block min-h-[36px] cursor-pointer">
                  About Racheykaf
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('leadership')} className="hover:text-[#C8A84F] py-1 inline-block min-h-[36px] cursor-pointer">
                  Leadership & Lawyers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('practices')} className="hover:text-[#C8A84F] py-1 inline-block min-h-[36px] cursor-pointer">
                  Practice Areas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-[#C8A84F] py-1 inline-block min-h-[36px] cursor-pointer">
                  Sectors Served
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('experience')} className="hover:text-[#C8A84F] py-1 inline-block min-h-[36px] cursor-pointer">
                  Representative Experience
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#C8A84F] py-1 inline-block min-h-[36px] cursor-pointer">
                  Contact Chambers
                </button>
              </li>
              {onOpenSitemap && (
                <li>
                  <button onClick={onOpenSitemap} className="hover:text-[#C8A84F] py-1 inline-block min-h-[36px] cursor-pointer text-[#C8A84F]">
                    HTML Sitemap Directory
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3.5 sm:space-y-4">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-widest text-[#C8A84F]">
              Legal Regulatory Briefing
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to receive executive legal summaries, petroleum regulatory alerts, and legislative briefings.
            </p>

            {newsletterSubscribed ? (
              <div className="p-3.5 bg-[#081826] border border-[#0F8B6D] text-[#0F8B6D] rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! You will receive our monthly legal dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2.5">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter corporate email..."
                  className="w-full min-h-[48px] bg-[#081826] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                />
                <button
                  type="submit"
                  className="w-full min-h-[48px] py-3 bg-gold-gradient text-[#081826] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <span>Subscribe To Briefings</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4 text-center sm:text-left">
        <p>© {new Date().getFullYear()} Racheykaf Chamber. All Rights Reserved. RC: 2018-ABJ.</p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {onOpenBackend && (
            <button
              onClick={onOpenBackend}
              className="text-[#C8A84F] hover:text-white flex items-center gap-1.5 font-semibold min-h-[44px] px-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#C8A84F]" />
              <span>Admin Portal</span>
            </button>
          )}
          <button onClick={() => onOpenLegalDocs('privacy')} className="hover:text-[#C8A84F] min-h-[44px] px-2 flex items-center cursor-pointer">
            Privacy Policy & NDPA
          </button>
          <button onClick={() => onOpenLegalDocs('terms')} className="hover:text-[#C8A84F] min-h-[44px] px-2 flex items-center cursor-pointer">
            Terms of Use
          </button>
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-xl bg-[#081826] border border-[#143D73] text-[#C8A84F] hover:bg-[#C8A84F] hover:text-[#081826] transition-colors flex items-center justify-center cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

    </footer>
  );
};
