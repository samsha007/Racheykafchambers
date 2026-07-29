import React from 'react';
import {
  Award,
  ShieldCheck,
  ChevronRight,
  Landmark,
  Building2,
  Flame,
  Briefcase,
  GraduationCap,
  HeartHandshake,
} from 'lucide-react';

interface RepresentativeExperienceProps {
  onOpenConsultation: (caseTitle?: string) => void;
}

const REPRESENTATIVE_CLIENTS = [
  {
    category: 'Government & Public Institutions',
    icon: Landmark,
    color: 'border-[#143D73]/30 bg-[#143D73]/5',
    iconBg: 'bg-[#143D73] text-[#C8A84F]',
    clients: [
      'Federal Ministries',
      'Government Agencies',
      'Public Institutions',
      'Regulatory Authorities',
    ],
  },
  {
    category: 'Financial Institutions',
    icon: Building2,
    color: 'border-[#C8A84F]/40 bg-[#C8A84F]/5',
    iconBg: 'bg-[#081826] text-[#C8A84F]',
    clients: ['Asset Management Corporation of Nigeria (AMCON)'],
  },
  {
    category: 'Oil & Gas',
    icon: Flame,
    color: 'border-amber-500/30 bg-amber-500/5',
    iconBg: 'bg-amber-600 text-white',
    clients: ['Danmadu Oil & Gas', 'Jesty Oil & Gas Ltd'],
  },
  {
    category: 'Corporate Organisations',
    icon: Briefcase,
    color: 'border-[#081826]/20 bg-[#081826]/5',
    iconBg: 'bg-[#081826] text-white',
    clients: [
      'Pine Project Ltd',
      'Christopher Igirikpa Ltd',
      'Paragon Investment and Resource Innovation Nigeria Ltd',
    ],
  },
  {
    category: 'Education',
    icon: GraduationCap,
    color: 'border-blue-500/30 bg-blue-500/5',
    iconBg: 'bg-blue-700 text-white',
    clients: ['Safehands School Limited'],
  },
  {
    category: 'Non-Profit Organisations',
    icon: HeartHandshake,
    color: 'border-emerald-500/30 bg-emerald-500/5',
    iconBg: 'bg-emerald-700 text-white',
    clients: ['Touch Life Food Sufficiency Foundation'],
  },
];

export const RepresentativeExperience: React.FC<RepresentativeExperienceProps> = ({
  onOpenConsultation,
}) => {
  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] relative overflow-hidden border-b border-gray-200 text-[#081826]">
      {/* Background Ambient Accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#C8A84F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-[#143D73]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081826]/5 border border-[#081826]/15 shadow-sm">
            <Award className="w-4 h-4 text-[#C8A84F]" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#081826]">
              Track Record & Client Base
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#081826] leading-tight">
            Representative Experience.
          </h2>

          <p className="text-base text-gray-600 font-normal leading-relaxed">
            A selection of key institutional mandates, corporate advisory accounts, and regulatory advisory engagements across major sectors of the economy.
          </p>
        </div>

        {/* REPRESENTATIVE CLIENTS SECTION */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A84F]/10 rounded-bl-full pointer-events-none" />
          
          <div className="mb-8 max-w-3xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C8A84F] block">
              Trusted Institutional Relationships
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#081826]">
              REPRESENTATIVE CLIENTS
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Over the years, Racheykaf Chamber has had the privilege of acting for and advising a diverse range of clients across multiple sectors of the Nigerian economy. Our representative client base includes:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REPRESENTATIVE_CLIENTS.map((group, idx) => {
              const IconComponent = group.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border ${group.color} transition-all duration-300 hover:shadow-md flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-lg shadow-sm ${group.iconBg}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="font-heading font-extrabold text-sm text-[#081826] leading-snug">
                        {group.category}
                      </h4>
                    </div>

                    <ul className="space-y-2">
                      {group.clients.map((client, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#C8A84F] shrink-0 mt-0.5" />
                          <span>{client}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3 border-t border-gray-200/50 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                      Institutional Sector
                    </span>
                    <button
                      onClick={() => onOpenConsultation(`Client Advisory: ${group.category}`)}
                      className="text-[11px] font-bold text-[#143D73] hover:text-[#C8A84F] flex items-center gap-1 transition-colors"
                    >
                      <span>Inquire</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
