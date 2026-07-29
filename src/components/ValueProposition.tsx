import React from 'react';
import { VALUE_PROPOSITIONS } from '../data/firmData';
import { IconRenderer } from './IconRenderer';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface ValuePropositionProps {
  onOpenConsultation: () => void;
}

export const ValueProposition: React.FC<ValuePropositionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="py-24 bg-[#F9FAFC] relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#143D73]/10 border border-[#143D73]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#143D73]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#143D73]">
              Our Strategic Advantage
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#081826] leading-tight">
            Value Proposition Designed for{' '}
            <span className="text-[#143D73]">Institutional Impact.</span>
          </h2>

          <p className="text-base text-gray-600 font-normal leading-relaxed">
            We bridge deep legal mastery with practical commercial intelligence to ensure every decision protects client value and accelerates enterprise growth.
          </p>
        </div>

        {/* 6 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUE_PROPOSITIONS.map((val) => (
            <div
              key={val.id}
              className="bg-white p-8 rounded-sm border border-gray-200 shadow-luxury hover:shadow-luxury-lg hover:border-[#C8A84F] transition-all duration-300 transform hover:-translate-y-1.5 group relative flex flex-col justify-between"
            >
              {/* Subtle Corner Gold Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 group-hover:bg-gold-gradient transition-colors rounded-t-sm" />

              <div>
                <div className="w-14 h-14 rounded-sm bg-[#081826] text-[#C8A84F] flex items-center justify-center mb-6 group-hover:bg-[#143D73] transition-colors shadow-md">
                  <IconRenderer name={val.iconName} className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-heading font-extrabold text-[#081826] mb-3 group-hover:text-[#143D73] transition-colors">
                  {val.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#143D73] group-hover:text-[#C8A84F] transition-colors">
                <span>Core Strategic Pillar</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenConsultation}
            className="px-8 py-4 bg-[#081826] text-white hover:bg-[#143D73] font-heading font-bold text-xs uppercase tracking-widest rounded-sm shadow-xl transition-all border border-[#C8A84F]/40 hover:border-[#C8A84F]"
          >
            Partner With Racheykaf Chamber
          </button>
        </div>
      </div>
    </section>
  );
};
