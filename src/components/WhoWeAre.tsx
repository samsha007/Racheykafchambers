import React from 'react';
import { motion } from 'motion/react';

interface WhoWeAreProps {
  onNavigateToPractices?: () => void;
  onOpenConsultation?: () => void;
}

export const WhoWeAre: React.FC<WhoWeAreProps> = () => {
  return (
    <section id="about" className="py-24 sm:py-28 bg-[#F8FAFC] text-[#1F2937] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Two-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Professional Boardroom Image with Premium 3D Frame */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Background Glow Behind Image */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#143D73]/60 via-[#C8A84F]/25 to-transparent rounded-[32px] blur-2xl opacity-70 pointer-events-none" />

            {/* Layered 3D Gold Accent Frame */}
            <div className="relative rounded-[24px] p-[2px] bg-gradient-to-b from-[#C8A84F] via-[#C8A84F]/40 to-[#081826]/80 shadow-[0_25px_60px_-15px_rgba(8,24,38,0.35)] group hover:shadow-[0_35px_75px_-12px_rgba(8,24,38,0.5),0_0_30px_rgba(200,168,79,0.25)] hover:-translate-y-2 transition-all duration-300 ease-out">
              {/* Inner Frame Container */}
              <div className="relative rounded-[22px] overflow-hidden bg-[#081826]">
                {/* Specular Edge Highlights */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/40 via-transparent to-transparent z-20 pointer-events-none" />

                <img
                  src="https://res.cloudinary.com/s79rmeha/image/upload/v1785341524/19545aa1-8849-4a96-a83d-2f32a2966cd2_uqfmnb.png"
                  alt="Racheykaf Chamber Legal Advisors"
                  className="w-full h-full object-cover object-center aspect-[4/3] lg:aspect-[4/5] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081826]/30 via-transparent to-transparent z-10 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content & Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Section Label */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#C8A84F]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8A84F]">
                WHO WE ARE
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-extrabold text-[#081826] leading-[1.15] tracking-tight">
              Trusted Legal Advisors. <br className="hidden sm:inline" />
              Strategic Business Partners.
            </h2>

            {/* Main Content Body */}
            <div className="space-y-5 text-base sm:text-lg text-[#1F2937] leading-relaxed font-normal">
              <p>
                Racheykaf Chamber is a premier Nigerian full-service law firm providing innovative legal, regulatory, commercial, and strategic advisory services to government institutions, multinational corporations, financial institutions, development partners, indigenous businesses, diplomatic missions, and private clients.
              </p>

              <p>
                Established on a foundation of excellence, integrity, and professional distinction, the Firm combines over two decades of public sector legal leadership with dynamic private sector practice to deliver sophisticated legal solutions that protect investments, manage risk, resolve disputes, and create sustainable value.
              </p>

              <p>
                Our multidisciplinary team possesses extensive experience across litigation, corporate and commercial law, energy and natural resources, regulatory compliance, public policy, institutional governance, arbitration, company secretarial services, and strategic consultancy.
              </p>

              <p className="text-[#081826] font-medium pt-1">
                At Racheykaf Chamber, we do not merely interpret the law—we provide practical legal strategies that enable our clients to make informed decisions with confidence.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};


