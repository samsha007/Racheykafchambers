import React from 'react';
import { WHY_CHOOSE_US } from '../data/firmData';
import { IconRenderer } from './IconRenderer';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenConsultation: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenConsultation }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#081826] text-white relative overflow-hidden border-b border-[#C8A84F]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#143D73]/60 border border-[#C8A84F]/30 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8A84F]" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#C8A84F]">
              Why Choose Racheykaf Chamber
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            The Racheykaf Advantage.{' '}
            <span className="text-gold-gradient block mt-1">
              Distinguished Counsel. Measurable Value.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-gray-300 font-normal leading-relaxed">
            We combine statutory regulatory insight, trial court authority, and rigorous commercial analysis to ensure every client mandate succeeds.
          </p>
        </div>

        {/* 8 Feature Cards Grid: 1 column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.id}
              className="glass-card-dark p-5 sm:p-6 rounded-xl border border-[#143D73]/40 hover:border-[#C8A84F]/60 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#143D73]/60 text-[#C8A84F] group-hover:bg-[#C8A84F] group-hover:text-[#081826] flex items-center justify-center transition-colors mb-4 shadow-sm">
                  <IconRenderer name={item.iconName} className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <h3 className="text-base sm:text-lg font-heading font-extrabold text-white mb-2 group-hover:text-[#C8A84F] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed font-normal">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3.5 mt-5 border-t border-white/5 flex items-center justify-between text-[11px] font-semibold text-[#C8A84F]">
                <span>Institutional Standard</span>
                <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to action: Full width on mobile with min 48px touch target */}
        <div className="mt-10 sm:mt-16 text-center">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-gold-gradient text-[#081826] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:brightness-110 transition-all cursor-pointer active:scale-[0.98]"
          >
            Retain Racheykaf Chamber For Your Next Mandate
          </button>
        </div>

      </div>
    </section>
  );
};
