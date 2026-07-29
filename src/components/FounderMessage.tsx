import React from 'react';
import { FOUNDER_IMAGE, TEAM_MEMBERS } from '../data/firmData';
import { Quote, ArrowRight, Award, ShieldCheck, Calendar } from 'lucide-react';

interface FounderMessageProps {
  onOpenTeamMember: (id: string) => void;
  onOpenConsultation: () => void;
}

export const FounderMessage: React.FC<FounderMessageProps> = ({
  onOpenTeamMember,
  onOpenConsultation,
}) => {
  const founder = TEAM_MEMBERS[0];

  return (
    <section id="founder" className="py-24 bg-[#061424] relative overflow-hidden border-b border-[#C8A84F]/30 text-white">
      {/* Background Ambient Colourful Radial Glows */}
      <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-gradient-to-br from-[#143D73]/60 via-[#C8A84F]/25 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-[500px] h-[500px] bg-gradient-to-tr from-[#C8A84F]/20 via-[#143D73]/50 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Founder Portrait Column with Premium 3D Frame */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-28">
            {/* Ambient Background Glow Behind Portrait */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#143D73]/80 via-[#C8A84F]/35 to-transparent rounded-[32px] blur-2xl opacity-80 pointer-events-none" />

            {/* Layered 3D Gold Accent Frame */}
            <div className="relative rounded-[24px] p-[2px] bg-gradient-to-b from-[#C8A84F] via-[#C8A84F]/50 to-[#081826] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(200,168,79,0.3)] group hover:shadow-[0_35px_75px_-12px_rgba(0,0,0,0.95),0_0_50px_rgba(200,168,79,0.45)] hover:-translate-y-2 transition-all duration-300 ease-out">
              {/* Inner Frame Container */}
              <div className="relative rounded-[22px] overflow-hidden bg-[#081826]">
                {/* Specular Edge Highlights */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-transparent to-transparent z-20 pointer-events-none" />

                <div className="aspect-[4/5] overflow-hidden bg-[#081826] relative">
                  <img
                    src={FOUNDER_IMAGE}
                    alt="Mrs. Kate O. Olusuyi - Principal Partner"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Dark Luxury Overlay Badge */}
                <div className="bg-gradient-to-t from-[#081826] via-[#081826]/95 to-[#081826]/85 p-6 text-white border-t border-[#C8A84F]/40 relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8A84F] font-bold block mb-1">
                    Principal Partner & Founder
                  </span>
                  <h3 className="text-2xl font-heading font-extrabold text-white">
                    Mrs. Kate O. Olusuyi
                  </h3>
                  <p className="text-xs text-gray-300 font-medium mt-1">
                    LL.B, BL, LL.M, FCAI
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Experience Badge with 3D Shadow */}
            <div className="absolute -top-6 -left-6 z-20 bg-[#081826] text-white p-4 rounded-2xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.8)] border border-[#C8A84F]/50 hidden md:flex items-center gap-3.5 hover:scale-105 transition-transform duration-300">
              <div className="p-2.5 bg-gradient-to-br from-[#C8A84F] to-[#b09344] rounded-xl text-[#081826] shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-heading font-extrabold block text-[#C8A84F]">08+ Years</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-300 font-semibold">Federal Legal Leadership</span>
              </div>
            </div>

            {/* Action Buttons under Photo */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                onClick={() => onOpenTeamMember(founder.id)}
                className="py-3.5 px-4 bg-white/10 hover:bg-white border border-white/20 text-white hover:text-[#081826] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <span>Full Biography</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="py-3.5 px-4 bg-gradient-to-r from-[#C8A84F] to-[#b09344] text-[#081826] hover:text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-[0_0_25px_rgba(200,168,79,0.4)] flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Direct Legal Inquiry</span>
              </button>
            </div>
          </div>

          {/* Founder Message Content Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A84F]/15 border border-[#C8A84F]/40 shadow-[0_0_15px_rgba(200,168,79,0.15)]">
              <ShieldCheck className="w-4 h-4 text-[#C8A84F]" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C8A84F]">
                MESSAGE FROM THE PRINCIPAL PARTNER
              </span>
            </div>

            {/* 3D Elevated Pull-Quote Callout */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0B223C] via-[#0E2A4B] to-[#0A1E35] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_25px_rgba(200,168,79,0.2)] border-l-4 border-[#C8A84F] border-y border-r border-[#C8A84F]/30 my-6 transition-transform duration-300 hover:-translate-y-1">
              <Quote className="w-9 h-9 text-[#C8A84F]/40 absolute -top-4 -left-4 bg-[#081826] p-1.5 rounded-full border border-[#C8A84F]/40 shadow-md" />
              <p className="text-base sm:text-lg text-white font-serif font-medium leading-relaxed italic">
                &ldquo;Welcome to Racheykaf Chamber, a law firm founded on the enduring principles of integrity, excellence, professionalism, and unwavering commitment to client success.&rdquo;
              </p>
            </div>

            {/* Paragraph Content in high-contrast text on colorful dark background */}
            <div className="space-y-4 text-base leading-relaxed text-gray-200 font-normal">
              <p>
                Our Firm was established with a clear vision—to provide innovative, practical, and commercially focused legal solutions that empower our clients to achieve their personal, institutional, and business objectives with confidence.
              </p>

              <p>
                Today&apos;s legal landscape demands far more than technical legal knowledge. It requires advisers who understand governance, commerce, regulation, public policy, investment, and the realities of an increasingly interconnected global economy. At Racheykaf Chamber, we have intentionally positioned ourselves to meet those demands.
              </p>

              <p>
                Having served for over two decades in strategic legal advisory and leadership roles within the Federal Government of Nigeria, I appreciate that every legal instruction entrusted to a lawyer carries with it significant commercial, financial, and reputational implications. Consequently, our approach is to combine legal excellence with strategic thinking, ensuring that every solution we provide is practical, commercially sound, and legally sustainable.
              </p>

              <p>
                Whether acting for government institutions, multinational corporations, financial institutions, indigenous businesses, development partners, or private individuals, our commitment remains constant—to provide exceptional legal services that inspire confidence, create value, and build lasting relationships.
              </p>

              <p>
                Our multidisciplinary team combines litigation expertise, regulatory advisory, commercial transaction experience, alternative dispute resolution, corporate governance, and public sector insight to deliver services that consistently exceed client expectations.
              </p>

              <p>
                As the legal and regulatory environment continues to evolve, so too will our commitment to innovation, continuous professional development, and delivering solutions that anticipate the future while addressing present realities.
              </p>

              <p className="text-[#C8A84F] font-semibold text-lg pt-2">
                We thank you for considering Racheykaf Chamber as your trusted legal partner and look forward to the opportunity of serving you with distinction.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


