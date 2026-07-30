import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Target,
  Lightbulb,
  ShieldCheck,
  Award,
  Briefcase,
  UserCheck,
  Sparkles,
  Users,
  Lock,
  Crown,
  ChevronRight,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

type TabType = 'vision' | 'mission' | 'philosophy' | 'values';

const PILLARS = [
  {
    id: 'vision' as TabType,
    label: 'Our Vision',
    subtitle: 'Strategic Direction',
    icon: Compass,
  },
  {
    id: 'mission' as TabType,
    label: 'Our Mission',
    subtitle: 'Core Commitment',
    icon: Target,
  },
  {
    id: 'philosophy' as TabType,
    label: 'Our Philosophy',
    subtitle: 'Institutional Ethos',
    icon: Lightbulb,
  },
  {
    id: 'values' as TabType,
    label: 'Our Core Values',
    subtitle: 'Guiding Principles',
    icon: ShieldCheck,
  },
];

const CORE_VALUES = [
  {
    title: 'Integrity',
    icon: ShieldCheck,
    description:
      'We uphold the highest ethical standards in every engagement, ensuring honesty, transparency, confidentiality, and accountability in all our professional relationships.',
  },
  {
    title: 'Excellence',
    icon: Award,
    description:
      'We are committed to delivering services of exceptional quality through technical competence, innovation, continuous learning, and attention to detail.',
  },
  {
    title: 'Professionalism',
    icon: Briefcase,
    description:
      'We conduct ourselves with dignity, respect, discipline, and unwavering commitment to the highest ideals of the legal profession.',
  },
  {
    title: 'Client-Centred Service',
    icon: UserCheck,
    description:
      "Every client is unique. We invest time in understanding our clients' objectives and delivering practical, timely, and cost-effective legal solutions tailored to their specific needs.",
  },
  {
    title: 'Innovation',
    icon: Sparkles,
    description:
      'We embrace creativity, technology, and strategic thinking to solve complex legal and commercial challenges efficiently.',
  },
  {
    title: 'Teamwork',
    icon: Users,
    description:
      'We foster collaboration among our lawyers, consultants, and strategic partners to deliver multidisciplinary solutions that maximise value for our clients.',
  },
  {
    title: 'Confidentiality',
    icon: Lock,
    description:
      'We recognise that trust is the foundation of every lawyer-client relationship and therefore maintain absolute confidentiality regarding all client information.',
  },
  {
    title: 'Leadership',
    icon: Crown,
    description:
      'We strive to influence positive change through legal excellence, thought leadership, mentorship, and meaningful contributions to the development of law, governance, and public policy.',
  },
];

export const OurFoundation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('vision');
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(null);

  const getNextTab = (): TabType => {
    switch (activeTab) {
      case 'vision':
        return 'mission';
      case 'mission':
        return 'philosophy';
      case 'philosophy':
        return 'values';
      default:
        return 'vision';
    }
  };

  return (
    <section
      id="foundation"
      className="py-16 sm:py-28 bg-[#040D18] text-white relative overflow-hidden border-b border-[#C8A84F]/30"
    >
      {/* Background radial spotlights & particles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#143D73]/35 via-[#0A2540]/40 to-[#C8A84F]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-[#C8A84F]/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header with Badge */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#061424]/90 border border-[#C8A84F]/50 shadow-[0_4px_20px_rgba(200,168,79,0.25)] backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-[#C8A84F]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8A84F]">
              OUR FOUNDATION
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight drop-shadow-md">
            Vision. Mission. Philosophy. Values.
          </h2>

          <p className="text-xs sm:text-base text-gray-300 font-normal leading-relaxed">
            Select a pillar below to explore our purpose, principles, and strategic legal ethos.
          </p>
        </div>

        {/* 3D Tab Navigation Bar: Touch targets min 48px height */}
        <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-2.5 sm:gap-4 mb-8 sm:mb-12">
          {PILLARS.map((pillar) => {
            const IconComponent = pillar.icon;
            const isActive = activeTab === pillar.id;

            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`relative min-h-[48px] px-3.5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-heading font-extrabold tracking-wider transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5 cursor-pointer transform-gpu active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C8A84F] via-[#D4B860] to-[#B09344] text-[#040D18] shadow-[0_10px_30px_rgba(200,168,79,0.4)] scale-102 border border-white/40'
                    : 'bg-[#061424]/90 text-gray-300 hover:text-white hover:bg-[#0A223C] border border-white/10 hover:border-[#C8A84F]/40 backdrop-blur-md shadow-md'
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#040D18]' : 'text-[#C8A84F]'}`}
                />
                <span className="truncate">{pillar.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Content Container */}
        <div className="min-h-[360px] bg-gradient-to-b from-[#0B223C]/95 via-[#071828]/95 to-[#040D18]/95 p-5 sm:p-12 rounded-2xl sm:rounded-3xl border border-[#C8A84F]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden backdrop-blur-xl">
          {/* Top Gold Specular Accent Line */}
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#C8A84F] to-transparent pointer-events-none shadow-[0_0_15px_#C8A84F]" />

          <AnimatePresence mode="wait">
            {/* VISION TAB */}
            {activeTab === 'vision' && (
              <motion.div
                key="vision"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col justify-between h-full space-y-6 sm:space-y-8"
              >
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#040D18] border border-[#C8A84F]/60 text-[#C8A84F] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(200,168,79,0.25)]">
                      <Compass className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#C8A84F] block">
                        Strategic Direction
                      </span>
                      <h3 className="text-xl sm:text-3xl font-heading font-extrabold text-white">
                        Our Vision
                      </h3>
                    </div>
                  </div>

                  <p className="text-base sm:text-2xl text-gray-100 leading-relaxed font-normal pt-2 border-l-3 sm:border-l-4 border-[#C8A84F] pl-4 sm:pl-6 bg-[#040D18]/60 p-4 sm:p-6 rounded-r-2xl border-t border-b border-r border-white/10 shadow-inner">
                    &ldquo;To be one of Africa&apos;s leading law firms, recognised for delivering innovative legal solutions, shaping public policy, advancing commercial success, and setting the benchmark for professional excellence, integrity, and client service.&rdquo;
                  </p>
                </div>

                <div className="pt-5 border-t border-white/15 flex items-center justify-between flex-wrap gap-3">
                  <span className="text-xs text-gray-400 font-medium">
                    Pillar 1 of 4 • Strategic Outlook
                  </span>
                  <button
                    onClick={() => setActiveTab(getNextTab())}
                    className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#C8A84F] hover:text-white flex items-center gap-2 transition-colors cursor-pointer bg-[#040D18] px-4 py-2.5 rounded-lg border border-[#C8A84F]/30 hover:border-[#C8A84F] min-h-[44px]"
                  >
                    <span>Next: Our Mission</span>
                    <ChevronRight className="w-4 h-4 text-[#C8A84F]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* MISSION TAB */}
            {activeTab === 'mission' && (
              <motion.div
                key="mission"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col justify-between h-full space-y-6 sm:space-y-8"
              >
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#040D18] border border-[#C8A84F]/60 text-[#C8A84F] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(200,168,79,0.25)]">
                      <Target className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#C8A84F] block">
                        Core Commitment
                      </span>
                      <h3 className="text-xl sm:text-3xl font-heading font-extrabold text-white">
                        Our Mission
                      </h3>
                    </div>
                  </div>

                  <p className="text-base sm:text-2xl text-gray-100 leading-relaxed font-normal pt-2 border-l-3 sm:border-l-4 border-[#C8A84F] pl-4 sm:pl-6 bg-[#040D18]/60 p-4 sm:p-6 rounded-r-2xl border-t border-b border-r border-white/10 shadow-inner">
                    &ldquo;To provide exceptional legal and business advisory services through intellectual excellence, strategic thinking, ethical practice, and innovative solutions that protect our clients&apos; interests, promote sustainable growth, and contribute meaningfully to the development of society.&rdquo;
                  </p>
                </div>

                <div className="pt-5 border-t border-white/15 flex items-center justify-between flex-wrap gap-3">
                  <span className="text-xs text-gray-400 font-medium">
                    Pillar 2 of 4 • Client Commitment
                  </span>
                  <button
                    onClick={() => setActiveTab(getNextTab())}
                    className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#C8A84F] hover:text-white flex items-center gap-2 transition-colors cursor-pointer bg-[#040D18] px-4 py-2.5 rounded-lg border border-[#C8A84F]/30 hover:border-[#C8A84F] min-h-[44px]"
                  >
                    <span>Next: Our Philosophy</span>
                    <ChevronRight className="w-4 h-4 text-[#C8A84F]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* PHILOSOPHY TAB */}
            {activeTab === 'philosophy' && (
              <motion.div
                key="philosophy"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col justify-between h-full space-y-6 sm:space-y-8"
              >
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#040D18] border border-[#C8A84F]/60 text-[#C8A84F] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(200,168,79,0.25)]">
                      <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#C8A84F] block">
                        Institutional Ethos
                      </span>
                      <h3 className="text-xl sm:text-3xl font-heading font-extrabold text-white">
                        Our Philosophy
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-sm sm:text-lg text-gray-200 leading-relaxed font-normal bg-[#040D18]/60 p-4 sm:p-6 rounded-2xl border border-white/10 shadow-inner">
                    <p className="font-semibold text-white text-base sm:text-xl">
                      We believe that the practice of law extends beyond litigation and legal documentation.
                    </p>
                    <p>
                      It is about understanding our clients&apos; aspirations, anticipating legal and commercial risks, preserving valuable relationships, protecting investments, and creating enduring solutions that enable individuals, businesses, governments, and institutions to thrive.
                    </p>
                    <p>
                      Every brief entrusted to our Firm receives meticulous attention, strategic analysis, commercial insight, and the highest standards of professional ethics.
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/15 flex items-center justify-between flex-wrap gap-3">
                  <span className="text-xs text-gray-400 font-medium">
                    Pillar 3 of 4 • Legal Ethos
                  </span>
                  <button
                    onClick={() => setActiveTab(getNextTab())}
                    className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#C8A84F] hover:text-white flex items-center gap-2 transition-colors cursor-pointer bg-[#040D18] px-4 py-2.5 rounded-lg border border-[#C8A84F]/30 hover:border-[#C8A84F] min-h-[44px]"
                  >
                    <span>Next: Our Core Values</span>
                    <ChevronRight className="w-4 h-4 text-[#C8A84F]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* CORE VALUES TAB */}
            {activeTab === 'values' && (
              <motion.div
                key="values"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col justify-between h-full space-y-6 sm:space-y-8"
              >
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#040D18] border border-[#C8A84F]/60 text-[#C8A84F] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(200,168,79,0.25)]">
                        <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#C8A84F] block">
                          Guiding Principles
                        </span>
                        <h3 className="text-xl sm:text-3xl font-heading font-extrabold text-white">
                          Our Core Values
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* 8 Values Responsive Grid: 1 card per row on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 pt-2">
                    {CORE_VALUES.map((val, idx) => {
                      const IconComp = val.icon;
                      const isExpanded = activeValueIndex === idx;

                      return (
                        <div
                          key={idx}
                          onClick={() => setActiveValueIndex(isExpanded ? null : idx)}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between active:scale-[0.98] ${
                            isExpanded
                              ? 'bg-gradient-to-b from-[#C8A84F] to-[#9E823B] text-[#040D18] border-white shadow-[0_15px_30px_rgba(200,168,79,0.4)]'
                              : 'bg-[#040D18]/80 border-white/10 hover:border-[#C8A84F]/60 hover:bg-[#06182B] text-white shadow-md'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-3 mb-2.5">
                              <div className={`p-2 rounded-xl shrink-0 ${isExpanded ? 'bg-[#040D18] text-[#C8A84F]' : 'bg-[#C8A84F]/15 text-[#C8A84F]'}`}>
                                <IconComp className="w-5 h-5" />
                              </div>
                              <h4 className={`text-base font-heading font-extrabold leading-snug ${isExpanded ? 'text-[#040D18]' : 'text-white'}`}>
                                {val.title}
                              </h4>
                            </div>

                            <p className={`text-xs leading-relaxed font-normal ${isExpanded ? 'text-[#040D18] font-medium' : 'text-gray-300'}`}>
                              {val.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/15 flex items-center justify-between flex-wrap gap-3">
                  <span className="text-xs text-gray-400 font-medium">
                    Pillar 4 of 4 • 8 Principles
                  </span>
                  <button
                    onClick={() => setActiveTab('vision')}
                    className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#C8A84F] hover:text-white flex items-center gap-2 transition-colors cursor-pointer bg-[#040D18] px-4 py-2.5 rounded-lg border border-[#C8A84F]/30 hover:border-[#C8A84F] min-h-[44px]"
                  >
                    <span>Back to Vision</span>
                    <ArrowRight className="w-4 h-4 text-[#C8A84F]" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
