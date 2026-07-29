import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalDocsModalProps {
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalDocsModal: React.FC<LegalDocsModalProps> = ({ type, onClose }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#081826] text-white w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-sm border border-[#C8A84F]/40 shadow-2xl relative p-8">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#C8A84F]" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A84F]">
                Racheykaf Chamber Statutory Regulatory Notices
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-white">
                {isPrivacy ? 'Privacy Policy & NDPA 2023 Compliance' : 'Terms of Use & Legal Disclaimer'}
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs text-gray-200 leading-relaxed font-normal">
            {isPrivacy ? (
              <>
                <p>
                  <strong>1. Data Controller Identity:</strong> Racheykaf Chamber (&ldquo;The Firm&rdquo;), operating from Suite 401, Grand Pavilion Tower, Central Business District, Abuja, Nigeria, acts as a Data Controller under the Nigeria Data Protection Act (NDPA 2023).
                </p>
                <p>
                  <strong>2. Information Collection:</strong> We collect personal identification data, corporate representation details, contact information, and legal mandate briefing details exclusively for conducting conflict-of-interest checks, executing legal retainers, and communicating regarding legal representation.
                </p>
                <p>
                  <strong>3. Confidentiality & Legal Privilege:</strong> All client communications received via this portal are protected under attorney-client privilege in accordance with the Legal Practitioners Act of Nigeria.
                </p>
                <p>
                  <strong>4. Data Subject Rights:</strong> You retain statutory rights to inspect, rectify, or request deletion of personal information held by the firm, subject to statutory record retention laws governing legal practitioners.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>1. No Attorney-Client Relationship:</strong> Transmitting information through this website or completing a consultation request form does not automatically establish a formal attorney-client relationship. Official legal representation commences only upon the execution of a written Engagement Letter signed by a Partner of Racheykaf Chamber.
                </p>
                <p>
                  <strong>2. Information Disclaimer:</strong> The articles, publications, and legal updates published on this website are provided strictly for general informational purposes and do not constitute formal legal advice.
                </p>
                <p>
                  <strong>3. Intellectual Property:</strong> All content, logos, publications, and materials published on this website are the exclusive intellectual property of Racheykaf Chamber.
                </p>
              </>
            )}
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gold-gradient text-[#081826] font-heading font-bold text-xs uppercase tracking-wider rounded-sm"
            >
              Acknowledge & Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
