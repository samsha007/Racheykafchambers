import React from 'react';
import { X, Map, Layers, Users, Building2, BookOpen, ShieldCheck, FileText, ChevronRight } from 'lucide-react';
import { PRACTICE_AREAS, TEAM_MEMBERS, INDUSTRIES, ARTICLES } from '../data/firmData';

interface SitemapModalProps {
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectPractice?: (practice: any) => void;
  onSelectMember?: (member: any) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  onClose,
  onNavigate,
  onSelectPractice,
  onSelectMember,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#081826] text-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#C8A84F]/40 shadow-2xl relative p-6 sm:p-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full bg-white/10 transition-colors cursor-pointer"
          aria-label="Close Sitemap"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#143D73]/60 border border-[#C8A84F]/30">
            <Map className="w-3.5 h-3.5 text-[#C8A84F]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C8A84F]">
              Enterprise HTML Sitemap & Directory Index
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Racheykaf Chamber Website Architecture
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Comprehensive index of all 25 practice areas, leadership profiles, industry sectors, thought leadership publications, and legal tools.
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Main Navigation */}
          <div className="space-y-4 bg-[#0D2438] p-5 rounded-xl border border-[#143D73]">
            <h3 className="text-sm font-heading font-extrabold uppercase tracking-wider text-[#C8A84F] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C8A84F]" />
              Core Pages
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              {[
                { id: 'home', label: 'Home Page & Overview' },
                { id: 'about', label: 'About Racheykaf & Pillars' },
                { id: 'practices', label: '25 Practice Areas Directory' },
                { id: 'leadership', label: 'Lawyers & Senior Leadership' },
                { id: 'industries', label: 'Sectors & Industries Served' },
                { id: 'experience', label: 'Representative Case Track Record' },
                { id: 'contact', label: 'Contact Chambers & Office Address' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className="hover:text-[#C8A84F] transition-colors flex items-center gap-1.5 py-1 min-h-[36px] w-full text-left cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C8A84F]" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="space-y-4 bg-[#0D2438] p-5 rounded-xl border border-[#143D73] lg:col-span-2">
            <h3 className="text-sm font-heading font-extrabold uppercase tracking-wider text-[#C8A84F] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#C8A84F]" />
              Featured Practice Areas (25 Disciplines)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
              {PRACTICE_AREAS.map((pa) => (
                <button
                  key={pa.id}
                  onClick={() => {
                    if (onSelectPractice) onSelectPractice(pa);
                    onClose();
                  }}
                  className="hover:text-[#C8A84F] transition-colors flex items-center gap-1.5 py-1 min-h-[36px] text-left cursor-pointer truncate"
                >
                  <ChevronRight className="w-3 h-3 text-[#C8A84F] shrink-0" />
                  <span className="truncate">{pa.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Leadership & Attorneys */}
          <div className="space-y-4 bg-[#0D2438] p-5 rounded-xl border border-[#143D73]">
            <h3 className="text-sm font-heading font-extrabold uppercase tracking-wider text-[#C8A84F] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C8A84F]" />
              Lawyers & Partners
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              {TEAM_MEMBERS.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => {
                      if (onSelectMember) onSelectMember(m);
                      onClose();
                    }}
                    className="hover:text-[#C8A84F] transition-colors flex items-center gap-1.5 py-1 min-h-[36px] w-full text-left cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C8A84F]" />
                    <span>{m.name} ({m.role})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Publications & Articles */}
          <div className="space-y-4 bg-[#0D2438] p-5 rounded-xl border border-[#143D73]">
            <h3 className="text-sm font-heading font-extrabold uppercase tracking-wider text-[#C8A84F] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C8A84F]" />
              Legal Insights & Briefings
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              {ARTICLES.map((art) => (
                <li key={art.id}>
                  <button
                    onClick={() => {
                      onNavigate('insights');
                      onClose();
                    }}
                    className="hover:text-[#C8A84F] transition-colors flex items-center gap-1.5 py-1 min-h-[36px] w-full text-left cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C8A84F] shrink-0" />
                    <span className="truncate">{art.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Served */}
          <div className="space-y-4 bg-[#0D2438] p-5 rounded-xl border border-[#143D73]">
            <h3 className="text-sm font-heading font-extrabold uppercase tracking-wider text-[#C8A84F] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C8A84F]" />
              Sectors Served
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              {INDUSTRIES.map((ind) => (
                <li key={ind.id}>
                  <button
                    onClick={() => {
                      onNavigate('industries');
                      onClose();
                    }}
                    className="hover:text-[#C8A84F] transition-colors flex items-center gap-1.5 py-1 min-h-[36px] w-full text-left cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C8A84F]" />
                    <span>{ind.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>Racheykaf Chamber • 102 PHDL Shopping Complex, Asokoro, Abuja FCT, Nigeria</p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gold-gradient text-[#081826] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
          >
            Close Sitemap
          </button>
        </div>

      </div>
    </div>
  );
};
