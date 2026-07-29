import React, { useState } from 'react';
import { CLIENT_STEPS } from '../data/firmData';
import { Compass, CheckCircle, ArrowRight } from 'lucide-react';

interface ClientServiceApproachProps {
  onOpenConsultation: () => void;
}

export const ClientServiceApproach: React.FC<ClientServiceApproachProps> = ({ onOpenConsultation }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="py-24 bg-[#081826] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#143D73]/60 border border-[#C8A84F]/30 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#C8A84F]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C8A84F]">
              Client Service Engagement Philosophy
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            Our 5-Step Strategic Framework.{' '}
            <span className="text-gold-gradient block mt-1">
              From Discovery to Lasting Equity.
            </span>
          </h2>

          <p className="text-base text-gray-300 font-normal leading-relaxed">
            Every corporate mandate, regulatory inquiry, or court proceeding follows a disciplined advisory framework engineered for certainty and speed.
          </p>
        </div>

        {/* Desktop Step Tabs Timeline */}
        <div className="hidden lg:grid grid-cols-5 gap-4 mb-12 relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#143D73] -translate-y-1/2 z-0" />

          {CLIENT_STEPS.map((stepItem, index) => {
            const isActive = activeStep === index;
            return (
              <button
                key={stepItem.step}
                onClick={() => setActiveStep(index)}
                className={`relative z-10 p-5 rounded-sm border text-left transition-all duration-300 ${
                  isActive
                    ? 'bg-gold-gradient text-[#081826] border-[#C8A84F] shadow-xl scale-105'
                    : 'bg-[#0D2438] text-white border-[#143D73] hover:border-[#C8A84F]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-extrabold ${
                      isActive ? 'text-[#081826]' : 'text-[#C8A84F]'
                    }`}
                  >
                    STEP {stepItem.step}
                  </span>
                  {isActive && <CheckCircle className="w-4 h-4 text-[#081826]" />}
                </div>
                <h3
                  className={`text-base font-heading font-extrabold ${
                    isActive ? 'text-[#081826]' : 'text-white'
                  }`}
                >
                  {stepItem.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Step Content Showcase */}
        <div className="glass-card-dark p-8 lg:p-12 rounded-sm border border-[#C8A84F]/40 shadow-luxury-lg relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-3 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <span className="text-5xl font-heading font-extrabold text-gold-gradient block mb-2">
                {CLIENT_STEPS[activeStep].step}
              </span>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">
                Engagement Milestone
              </span>
              <h3 className="text-2xl font-heading font-extrabold text-white">
                {CLIENT_STEPS[activeStep].title}
              </h3>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h4 className="text-lg font-heading font-bold text-[#C8A84F]">
                Execution Methodology:
              </h4>
              <p className="text-base text-gray-200 leading-relaxed font-normal">
                {CLIENT_STEPS[activeStep].desc}
              </p>
            </div>

            <div className="lg:col-span-3 text-center lg:text-right">
              <button
                onClick={onOpenConsultation}
                className="w-full lg:w-auto px-6 py-3.5 bg-gold-gradient text-[#081826] font-heading font-bold text-xs uppercase tracking-wider rounded-sm shadow-md hover:brightness-110 flex items-center justify-center gap-2"
              >
                <span>Initiate Step {CLIENT_STEPS[activeStep].step}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Step Selector Buttons */}
        <div className="lg:hidden flex overflow-x-auto gap-2 mt-6 pb-2 no-scrollbar">
          {CLIENT_STEPS.map((stepItem, index) => (
            <button
              key={stepItem.step}
              onClick={() => setActiveStep(index)}
              className={`px-4 py-2 text-xs font-bold uppercase rounded-sm whitespace-nowrap ${
                activeStep === index
                  ? 'bg-gold-gradient text-[#081826]'
                  : 'bg-[#0D2438] text-gray-300'
              }`}
            >
              {stepItem.step}. {stepItem.title}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
