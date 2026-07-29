import React from 'react';
import { PracticeArea } from '../types';
import { IconRenderer } from './IconRenderer';
import { X, CheckCircle, Award, ArrowRight } from 'lucide-react';

interface PracticeDetailModalProps {
  practice: PracticeArea;
  onClose: () => void;
  onOpenConsultation: (practiceTitle: string) => void;
}

export const PracticeDetailModal: React.FC<PracticeDetailModalProps> = ({
  practice,
  onClose,
  onOpenConsultation,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#081826] text-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-sm border border-[#C8A84F]/40 shadow-2xl relative p-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gold-gradient text-[#081826] rounded-sm">
              <IconRenderer name={practice.iconName} className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A84F]">
                {practice.category} Practice Scope
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                {practice.title}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Practice Overview & Capability Statement
            </h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              {practice.fullDesc}
            </p>
          </div>

          <div className="bg-[#0D2438] p-6 rounded-sm border border-[#143D73] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C8A84F]">
              Key Legal Services & Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {practice.keyServices.map((service, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-200">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0F8B6D] shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#143D73]/30 p-6 rounded-sm border border-[#C8A84F]/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8A84F]">
              <Award className="w-4 h-4" />
              <span>Representative Deal / Mandate Landmark</span>
            </div>
            <p className="text-xs text-gray-200 italic leading-relaxed">
              &ldquo;{practice.representativeDeal}&rdquo;
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white"
            >
              Close Detail
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenConsultation(practice.title);
              }}
              className="px-6 py-3 bg-gold-gradient text-[#081826] font-heading font-bold text-xs uppercase tracking-wider rounded-sm shadow-md hover:brightness-110 flex items-center gap-2"
            >
              <span>Retain Team for {practice.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
