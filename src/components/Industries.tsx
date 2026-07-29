import React, { useState } from 'react';
import { INDUSTRIES } from '../data/firmData';
import { Industry } from '../types';
import { IconRenderer } from './IconRenderer';
import { Building2, X, ShieldCheck, ChevronRight, ArrowRight } from 'lucide-react';

interface IndustriesProps {
  onOpenConsultation: (sectorName?: string) => void;
}

export const Industries: React.FC<IndustriesProps> = ({ onOpenConsultation }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);

  return (
    <section id="industries" className="py-24 bg-[#051424] text-white relative overflow-hidden border-b border-[#C8A84F]/30">
      {/* 3D Background Lighting & Radial Mesh Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#143D73]/50 via-[#C8A84F]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#C8A84F]/15 via-[#143D73]/40 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A84F]/15 border border-[#C8A84F]/40 shadow-[0_0_15px_rgba(200,168,79,0.15)]">
            <Building2 className="w-4 h-4 text-[#C8A84F]" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C8A84F]">
              Industry Sectors • 17 Key Market Verticals
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            Sectors We Serve.
          </h2>

          <p className="text-base text-gray-300 font-normal leading-relaxed">
            Our lawyers possess direct operational and regulatory experience in key economic sectors driving trade, infrastructure development, and public policy in Nigeria and across Africa.
          </p>
        </div>

        {/* 17 Industries Interactive 3D Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setSelectedIndustry(ind)}
              className="group relative p-5 rounded-2xl bg-gradient-to-b from-[#0B223C] to-[#071728] border border-white/10 hover:border-[#C8A84F]/70 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(200,168,79,0.3)] transition-all duration-300 transform hover:-translate-y-2 text-left flex flex-col justify-between h-48 overflow-hidden cursor-pointer"
            >
              {/* Subtle Specular Top Highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              {/* Ambient Hover Glow Layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C8A84F]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="w-11 h-11 rounded-xl bg-[#061424] border border-[#C8A84F]/30 text-[#C8A84F] group-hover:bg-[#C8A84F] group-hover:text-[#081826] group-hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.5)] shrink-0">
                <IconRenderer name={ind.iconName} className="w-5 h-5" />
              </div>

              <div className="relative z-10 mt-3">
                <h3 className="text-sm font-heading font-extrabold text-white group-hover:text-[#C8A84F] transition-colors leading-snug mb-1.5">
                  {ind.name}
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium group-hover:text-gray-200 transition-colors flex items-center gap-1">
                  <span>View Scope</span>
                  <ChevronRight className="w-3 h-3 text-[#C8A84F] group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Industry Modal Detail Drawer (Dark Luxury Styled) */}
        {selectedIndustry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#081826] text-white w-full max-w-2xl rounded-2xl shadow-[0_35px_90px_rgba(0,0,0,0.95)] border border-[#C8A84F]/50 overflow-hidden relative animate-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0B223C] via-[#0D2A4B] to-[#081826] text-white p-6 sm:p-7 border-b border-[#C8A84F]/30 relative">
                <button
                  onClick={() => setSelectedIndustry(null)}
                  className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-gradient-to-br from-[#C8A84F] to-[#B09344] text-[#081826] rounded-xl shadow-lg">
                    <IconRenderer name={selectedIndustry.iconName} className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C8A84F] font-extrabold block mb-0.5">
                      Sector Intelligence Profile
                    </span>
                    <h3 className="text-2xl font-heading font-extrabold text-white">
                      {selectedIndustry.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A84F] mb-2">
                    Industry Overview & Legal Strategy
                  </h4>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {selectedIndustry.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#C8A84F] block mb-2">
                      Key Regulatory Frameworks:
                    </span>
                    <ul className="space-y-1.5">
                      {selectedIndustry.keyRegulations.map((reg, idx) => (
                        <li key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#C8A84F]" />
                          <span>{reg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#C8A84F] block mb-2">
                      Representative Client Profile:
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {selectedIndustry.sampleClients}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <button
                    onClick={() => setSelectedIndustry(null)}
                    className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                  >
                    Close Profile
                  </button>

                  <button
                    onClick={() => {
                      const name = selectedIndustry.name;
                      setSelectedIndustry(null);
                      onOpenConsultation(`Industry Advisory: ${name}`);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#C8A84F] to-[#B09344] text-[#081826] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(200,168,79,0.4)] transition-all flex items-center gap-2"
                  >
                    <span>Inquire for {selectedIndustry.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#081826]" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
