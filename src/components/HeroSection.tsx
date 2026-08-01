import React from 'react';
import { HERO_IMAGE } from '../data/firmData';
import { Shield, ChevronRight, Sparkles, Flame, Briefcase, Layers, Scale, FileCheck, Landmark } from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onNavigateToPractices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onNavigateToPractices,
}) => {
  const stats = [
    { value: '08+', label: 'Years Experience' },
    { value: '25+', label: 'Practice Areas' },
    { value: '2018', label: 'Founded in Abuja' },
    { value: 'Abuja', label: 'Headquarters' },
  ];

  const practiceAreasList = [
    { name: 'Government Advisory', icon: Landmark },
    { name: 'Oil, Gas & Energy', icon: Flame },
    { name: 'Corporate Finance', icon: Briefcase },
    { name: 'Infrastructure & PPP', icon: Layers },
    { name: 'Litigation & ADR', icon: Scale },
    { name: 'Public Procurement', icon: FileCheck },
  ];

  return (
    <section id="home" className="relative min-h-[calc(100vh-70px)] pt-16 sm:pt-20 flex flex-col lg:flex-row bg-[#F9FAFC] overflow-hidden">
      {/* Decorative Left Edge Bar */}
      <div className="absolute top-1/2 left-0 w-1 bg-[#C8A84F] h-24 -translate-y-1/2 hidden lg:block z-20" />

      {/* Left Column: Content */}
      <div className="w-full lg:w-[60%] p-5 sm:p-10 lg:p-16 flex flex-col justify-center relative z-10">
        <div className="mb-4 inline-flex items-center gap-2.5 text-[#C8A84F] font-semibold text-xs tracking-[0.18em] uppercase">
          <div className="w-6 sm:w-8 h-[1.5px] bg-[#D3A77E]" />
          <span>Premier Commercial Law Firm • Nigeria</span>
        </div>

        <h1 className="text-[32px] sm:text-5xl lg:text-[50px] leading-[1.15] font-extrabold text-[#081826] mb-5 tracking-tight">
          Trusted Counsel. <br />
          <span className="text-[#C8A84F]">Strategic Solutions.</span> <br />
          Enduring Partnerships.
        </h1>

        <div className="mb-8 sm:mb-10 max-w-xl pl-4 sm:pl-5 border-l-2 border-[#C8A84F]/80">
          <p className="text-base sm:text-lg text-gray-700 italic leading-relaxed font-serif">
            &ldquo;The practice of law is not merely about resolving disputes; it is about building confidence, protecting investments, advancing institutions, and creating enduring value for every client we serve.&rdquo;
          </p>
          <div className="mt-3 text-xs font-bold uppercase tracking-wider text-[#081826]">
            Kate O. Olusuyi, <span className="text-gray-500 font-semibold text-[11px] uppercase tracking-normal">LL.B, BL, LL.M, FCAI,</span> Principal Partner
          </div>
        </div>

        {/* Action Buttons: Full width on mobile with min 48px touch height */}
        <div className="flex flex-col sm:flex-row gap-3.5 mb-10">
          <button
            onClick={onNavigateToPractices}
            className="w-full sm:w-auto min-h-[48px] bg-[#081826] text-white px-8 py-3.5 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-blue-900/10 hover:bg-[#143D73] transition-colors cursor-pointer active:scale-[0.98]"
          >
            <span>Explore Expertise</span>
            <ChevronRight className="w-4 h-4 text-[#C8A84F]" />
          </button>

          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto min-h-[48px] border-2 border-[#081826] text-[#081826] px-8 py-3.5 font-bold text-xs uppercase tracking-wider hover:bg-[#081826] hover:text-white transition-colors flex items-center justify-center gap-2 rounded-xl cursor-pointer active:scale-[0.98]"
          >
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-gray-200/80 pt-6 sm:pt-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/70 p-3 sm:p-0 rounded-xl sm:rounded-none sm:bg-transparent border border-gray-100 sm:border-0 shadow-xs sm:shadow-none">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#081826]">
                {stat.value}
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Dark Panel Showcase with 3D Styled Border Frame */}
      <div className="w-full lg:w-[40%] bg-[#081826] relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[480px]">
        {/* Ambient Background Glow Angle */}
        <div className="absolute top-0 right-0 w-[150%] h-full bg-gradient-to-bl from-[#143D73] to-transparent opacity-30 -rotate-12 translate-x-1/2 translate-y-[-20%] pointer-events-none" />

        {/* Hero Image Showcase - Full Width with 3D Border styling */}
        <div className="w-full flex-1 relative min-h-[300px] sm:min-h-[420px] lg:min-h-[480px] overflow-hidden group p-4 sm:p-0">
          <div className="relative w-full h-full rounded-2xl sm:rounded-none overflow-hidden border border-[#C8A84F]/40 sm:border-0 shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#143D73]/40 via-transparent to-[#C8A84F]/20 opacity-60 pointer-events-none" />

            <img
              src={HERO_IMAGE}
              alt="Racheykaf Chamber Corporate Legal Practice"
              className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="eager"
              referrerPolicy="no-referrer"
            />

            {/* Smooth Gradient Blending into Practice Focus Footer */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#081826] via-[#081826]/75 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#081826]/50 to-transparent z-10 pointer-events-none" />
          </div>
        </div>

        {/* Strategic Practice Focus Footer */}
        <div className="mt-auto p-5 sm:p-8 border-t border-[#C8A84F]/25 bg-gradient-to-t from-[#040C14] via-[#081826]/95 to-transparent backdrop-blur-md z-10">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#C8A84F]/15 border border-[#C8A84F]/40 text-[#C8A84F]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-[#C8A84F] font-extrabold text-[11px] sm:text-xs tracking-[0.18em] uppercase">
                Strategic Practice Focus
              </h3>
            </div>
            <button
              onClick={onNavigateToPractices}
              className="text-[11px] font-bold text-gray-300 hover:text-[#C8A84F] transition-colors flex items-center gap-1 group min-h-[36px] px-2 cursor-pointer"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C8A84F] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {practiceAreasList.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  onClick={onNavigateToPractices}
                  className="group relative flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-[#C8A84F]/60 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer overflow-hidden min-h-[44px]"
                >
                  <div className="p-1.5 sm:p-2 rounded-lg bg-[#081826] border border-white/15 group-hover:border-[#C8A84F]/50 text-[#C8A84F] shrink-0 shadow-sm">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-white/95 group-hover:text-white transition-colors truncate">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
