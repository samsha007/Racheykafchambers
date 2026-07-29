import React, { useState } from 'react';
import { Calculator, X, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface FeeEstimatorModalProps {
  onClose: () => void;
  onOpenConsultation: (details: string) => void;
}

export const FeeEstimatorModal: React.FC<FeeEstimatorModalProps> = ({
  onClose,
  onOpenConsultation,
}) => {
  const [mandateType, setMandateType] = useState('Corporate Advisory Retainer');
  const [scopeSize, setScopeSize] = useState('Medium Enterprise');
  const [urgency, setUrgency] = useState('Standard (14 Days)');
  const [additionalAudits, setAdditionalAudits] = useState(false);

  const calculateEstimate = () => {
    let base = 2500000; // NGN 2.5m
    if (mandateType === 'Oil & Energy Regulatory Audit') base = 6500000;
    if (mandateType === 'High-Court / Appellate Litigation') base = 8000000;
    if (mandateType === 'M&A Cross-Border Transaction') base = 12000000;
    if (mandateType === 'Legislative Policy Drafting') base = 5000000;

    if (scopeSize === 'Multinational Corporation') base *= 1.8;
    if (scopeSize === 'Government Agency / Statutory Body') base *= 1.5;

    if (urgency === 'Expedited (48 Hours)') base *= 1.4;

    if (additionalAudits) base += 1500000;

    return Math.round(base);
  };

  const estimateNgn = calculateEstimate();
  const estimateUsd = Math.round(estimateNgn / 1500);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#081826] text-white w-full max-w-2xl rounded-sm border border-[#C8A84F]/40 shadow-2xl relative overflow-hidden p-8">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gold-gradient text-[#081826] rounded-sm">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A84F]">
                Institutional Advisory Budgeting Tool
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-white">
                Interactive Fee Estimator
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-bold uppercase tracking-wider mb-2">
                Mandate Category
              </label>
              <select
                value={mandateType}
                onChange={(e) => setMandateType(e.target.value)}
                className="w-full bg-[#0D2438] border border-[#143D73] rounded-sm p-3 text-white focus:outline-none focus:border-[#C8A84F]"
              >
                <option>Corporate Advisory Retainer</option>
                <option>Oil & Energy Regulatory Audit</option>
                <option>High-Court / Appellate Litigation</option>
                <option>M&A Cross-Border Transaction</option>
                <option>Legislative Policy Drafting</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-bold uppercase tracking-wider mb-2">
                  Client Scale
                </label>
                <select
                  value={scopeSize}
                  onChange={(e) => setScopeSize(e.target.value)}
                  className="w-full bg-[#0D2438] border border-[#143D73] rounded-sm p-3 text-white focus:outline-none focus:border-[#C8A84F]"
                >
                  <option>Medium Enterprise</option>
                  <option>Multinational Corporation</option>
                  <option>Government Agency / Statutory Body</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-bold uppercase tracking-wider mb-2">
                  Turnaround Timeline
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full bg-[#0D2438] border border-[#143D73] rounded-sm p-3 text-white focus:outline-none focus:border-[#C8A84F]"
                >
                  <option>Standard (14 Days)</option>
                  <option>Priority (7 Days)</option>
                  <option>Expedited (48 Hours)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#0D2438] rounded-sm border border-[#143D73]">
              <input
                type="checkbox"
                id="auditCheck"
                checked={additionalAudits}
                onChange={(e) => setAdditionalAudits(e.target.checked)}
                className="accent-[#C8A84F] w-4 h-4"
              />
              <label htmlFor="auditCheck" className="text-gray-300 cursor-pointer">
                Include Statutory Tax & Regulatory Compliance Pre-Audit (+₦1,500,000)
              </label>
            </div>
          </div>

          {/* Result Calculation Box */}
          <div className="bg-[#0D2438] p-6 rounded-sm border-2 border-[#C8A84F] text-center space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold block">
              Indicative Retainer / Professional Fee Range
            </span>
            <div className="text-3xl font-heading font-extrabold text-gold-gradient">
              ₦{estimateNgn.toLocaleString()} <span className="text-sm text-gray-300 font-normal"> (~${estimateUsd.toLocaleString()} USD)</span>
            </div>
            <p className="text-[11px] text-gray-400 italic">
              * Indicative budget estimate. Final proposal rendered after partner conflict check and formal engagement terms.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white"
            >
              Close Estimator
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenConsultation(
                  `Fee Proposal Request for ${mandateType} (${scopeSize} - Est ₦${estimateNgn.toLocaleString()})`
                );
              }}
              className="px-6 py-3 bg-gold-gradient text-[#081826] font-heading font-bold text-xs uppercase tracking-wider rounded-sm shadow-md hover:brightness-110 flex items-center gap-2"
            >
              <span>Request Formal Proposal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
