import React from 'react';
import { motion } from 'motion/react';
import { TEAM_MEMBERS } from '../data/firmData';
import { TeamMember } from '../types';
import { ArrowRight, UserCheck, ShieldCheck, Award } from 'lucide-react';

interface LeadershipProps {
  onSelectMember: (member: TeamMember) => void;
  onOpenConsultation: (memberName?: string) => void;
}

export const Leadership: React.FC<LeadershipProps> = ({
  onSelectMember,
  onOpenConsultation,
}) => {
  // First row: 4 cards, Second row: 3 cards
  const firstRowMembers = TEAM_MEMBERS.slice(0, 4);
  const secondRowMembers = TEAM_MEMBERS.slice(4, 7);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCard = (member: TeamMember, index: number) => (
    <motion.div
      key={member.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
      className="bg-gradient-to-b from-[#0B223C]/90 via-[#071828]/95 to-[#040D18]/95 rounded-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(200,168,79,0.25)] hover:border-[#C8A84F]/70 transition-all duration-300 overflow-hidden flex flex-col justify-between group h-full hover:-translate-y-2 transform-gpu backdrop-blur-md relative"
    >
      {/* Top Gold Specular Line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A84F]/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Profile Image with subtle zoom */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#040D18]">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040D18] via-[#040D18]/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
          
          <div className="absolute bottom-4 left-5 right-5">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C8A84F] block mb-1 drop-shadow-sm">
              {member.role}
            </span>
            <h3 className="text-lg font-heading font-extrabold text-white leading-snug drop-shadow-md">
              {member.name}
            </h3>
          </div>
        </div>

        {/* Card Info Content */}
        <div className="p-6 space-y-3.5">
          <p className="text-xs font-semibold text-[#C8A84F] tracking-wide line-clamp-1">
            {member.title}
          </p>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-4 font-normal">
            {member.bio}
          </p>
        </div>
      </div>

      {/* Button & Action */}
      <div className="p-6 pt-0 border-t border-white/10 mt-2">
        <button
          onClick={() => onSelectMember(member)}
          className="w-full py-3 px-4 rounded-xl bg-[#040D18] text-white border border-[#C8A84F]/40 text-xs font-bold uppercase tracking-wider group-hover:bg-[#C8A84F] group-hover:text-[#040D18] group-hover:border-[#C8A84F] transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#C8A84F] group-hover:text-[#040D18]" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <section id="leadership" className="py-24 sm:py-28 bg-[#030C16] text-white relative overflow-hidden border-b border-[#C8A84F]/30">
      {/* ================= 3D VISIBLE PREMIUM BACKGROUND LAYERS ================= */}
      {/* Layer 1: 3D Perspective Grid Matrix */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200, 168, 79, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200, 168, 79, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          transform: 'perspective(700px) rotateX(55deg) scale(1.8) translateY(-30px)',
          transformOrigin: 'top center',
        }}
      />

      {/* Layer 2: Floating 3D Rotating Rings & Wireframes */}
      <motion.div
        animate={{
          rotateZ: [0, 360],
          rotateY: [0, 180],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 right-[6%] w-36 h-36 border-2 border-[#C8A84F]/30 rounded-full pointer-events-none hidden lg:block shadow-[0_0_50px_rgba(200,168,79,0.25)]"
      >
        <div className="absolute inset-4 border border-[#143D73]/70 rounded-full bg-[#143D73]/10 backdrop-blur-xs" />
      </motion.div>

      <motion.div
        animate={{
          rotateX: [0, 360],
          y: [25, -25, 25],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-24 left-[5%] w-28 h-28 border-2 border-[#143D73]/60 rounded-3xl pointer-events-none hidden lg:block shadow-[0_0_40px_rgba(20,61,115,0.4)]"
      >
        <div className="absolute inset-3 border border-[#C8A84F]/40 rounded-2xl bg-[#C8A84F]/5 backdrop-blur-xs" />
      </motion.div>

      {/* Layer 3: Glowing Ambient Volumetric Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#143D73]/30 via-[#0B223C]/40 to-[#C8A84F]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-5 right-0 w-[450px] h-[450px] bg-[#C8A84F]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-5 left-0 w-[450px] h-[450px] bg-[#143D73]/20 rounded-full blur-[110px] pointer-events-none" />

      {/* Layer 4: 3D Radial Grid Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#143D73_1.5px,transparent_1.5px)] [background-size:40px_40px] opacity-25 pointer-events-none" />
      {/* ======================================================================= */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#040D18]/90 border border-[#C8A84F]/50 shadow-[0_4px_20px_rgba(200,168,79,0.25)] backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-[#C8A84F]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A84F]">
              Exceptional People. Exceptional Results.
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            Our Leadership & Lawyers
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-gray-200 font-normal leading-relaxed text-left sm:text-center max-w-3xl mx-auto">
            <p className="font-semibold text-white text-lg sm:text-xl">
              The strength of every great law firm lies in the quality of its people.
            </p>
          </div>
        </div>

        {/* Team Grid Layout */}
        <div className="space-y-8 sm:space-y-10">
          {/* First Row: 4 Cards on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {firstRowMembers.map((member, index) => renderCard(member, index))}
          </div>

          {/* Second Row: 3 Cards perfectly centered on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
            {secondRowMembers.map((member, index) => renderCard(member, index + 4))}
          </div>
        </div>

      </div>
    </section>
  );
};
