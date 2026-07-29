import React from 'react';
import { TeamMember } from '../types';
import { X, Award, GraduationCap, Shield, Mail, ArrowRight } from 'lucide-react';

interface TeamDetailModalProps {
  member: TeamMember;
  onClose: () => void;
  onOpenConsultation: (memberName: string) => void;
}

export const TeamDetailModal: React.FC<TeamDetailModalProps> = ({
  member,
  onClose,
  onOpenConsultation,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#081826] text-white w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-sm border border-[#C8A84F]/40 shadow-2xl relative p-8">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-4 space-y-4">
            <div className="rounded-sm overflow-hidden border border-[#C8A84F]/40 shadow-lg">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-auto object-cover object-top max-h-72"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-[#0D2438] p-4 rounded-sm border border-[#143D73] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#C8A84F]">
                <Mail className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px] truncate">{member.email}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C8A84F] font-bold block mb-1">
                {member.role}
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                {member.name}
              </h2>
              <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mt-1">
                {member.title}
              </p>
            </div>

            {/* Philosophy Pull-Quote if present */}
            {member.philosophy && (
              <div className="p-4 rounded-xl bg-[#143D73]/40 border-l-4 border-[#C8A84F] space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C8A84F]">
                  Professional Philosophy
                </span>
                <p className="text-sm font-serif italic text-gray-200 leading-relaxed">
                  &ldquo;{member.philosophy}&rdquo;
                </p>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C8A84F]">
                Executive Biography & Track Record
              </h3>
              {member.fullBio.map((paragraph, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Practice Areas / Expertise */}
            {member.expertise && member.expertise.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#C8A84F]">
                  Practice Areas & Expertise
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {member.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#143D73]/70 border border-[#143D73] text-gray-200"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#0D2438] p-4 rounded-sm border border-[#143D73] space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8A84F] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Academic Qualifications
                </span>
                <ul className="space-y-1">
                  {member.education.map((edu, idx) => (
                    <li key={idx} className="text-[11px] text-gray-300">
                      • {edu}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0D2438] p-4 rounded-sm border border-[#143D73] space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8A84F] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Bar Admissions & Fellowships
                </span>
                <ul className="space-y-1">
                  {member.admissions.map((adm, idx) => (
                    <li key={idx} className="text-[11px] text-gray-300">
                      • {adm}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={onClose}
                className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white"
              >
                Close Profile
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation(`Consultation with ${member.name}`);
                }}
                className="px-6 py-3 bg-gold-gradient text-[#081826] font-heading font-bold text-xs uppercase tracking-wider rounded-sm shadow-md hover:brightness-110 flex items-center gap-2"
              >
                <span>Request Consultation with {member.name.split(' ')[1]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
