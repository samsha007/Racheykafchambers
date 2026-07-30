import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, Scale, ShieldCheck, FileText, ArrowUpRight } from 'lucide-react';

interface LegalFAQSectionProps {
  onOpenConsultation: (topic?: string) => void;
  onOpenFeeEstimator?: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

const FAQS: FAQItem[] = [
  {
    category: 'Corporate & Commercial',
    question: 'How does Racheykaf Chamber assist foreign investors entering the Nigerian market?',
    answer:
      'Racheykaf Chamber provides complete end-to-end legal advisory for international investors and corporate entities entering Nigeria. Our services include Corporate Affairs Commission (CAC) company registration under CAMA 2020, Nigerian Investment Promotion Commission (NIPC) registration, securing Business Permits and Expatriate Quota allocations from the Ministry of Interior, structuring tax-efficient cross-border joint ventures, and drafting resilient shareholder agreements.',
    keywords: ['Foreign Investment Nigeria', 'CAC Company Registration', 'Expatriate Quotas Abuja', 'NIPC Registration'],
  },
  {
    category: 'Corporate & Commercial',
    question: 'What are the statutory requirements for unlisted companies under CAMA 2020 in Nigeria?',
    answer:
      'Under the Companies and Allied Matters Act (CAMA 2020), unlisted public and private companies must maintain updated Registers of Beneficial Ownership (Persons with Significant Control), comply with mandatory electronic filing deadlines, enforce statutory board evaluation standards, and hold Annual General Meetings in accordance with CAC guidelines. Our corporate secretarial desk manages all ongoing compliance to prevent statutory fines or operational suspensions.',
    keywords: ['CAMA 2020 Compliance', 'Beneficial Ownership Register', 'CAC Filing Lawyers', 'Corporate Secretarial Abuja'],
  },
  {
    category: 'Oil, Gas & Energy',
    question: 'How do you advise indigenous energy producers on the Petroleum Industry Act (PIA 2021)?',
    answer:
      'Our Energy & Resources practice handles strategic PIA 2021 compliance for upstream, midstream, and downstream participants. We assist operators with converting legacy OPLs/OMLs into updated Petroleum Prospecting Licenses (PPL) and Petroleum Mining Leases (PML), establishing Host Community Development Trusts (HCDT) registered with the Corporate Affairs Commission, auditing environmental remediation funds, and navigating NUPRC and NMDPRA regulatory directives.',
    keywords: ['Petroleum Industry Act PIA 2021', 'NUPRC Licenses Abuja', 'Host Community Development Trust HCDT', 'Energy Lawyers Nigeria'],
  },
  {
    category: 'Litigation & Dispute Resolution',
    question: 'What is Racheykaf Chamber’s track record in commercial litigation and appellate court advocacy?',
    answer:
      'Our litigation team boasts a formidable record defending corporate clients, government bodies, and financial institutions across the State High Courts, Federal High Court, National Industrial Court, Court of Appeal, and Supreme Court of Nigeria. We specialize in high-stakes breach of contract claims, shareholder disputes, asset recovery, enforcement of arbitral awards, and constitutional administrative law.',
    keywords: ['Commercial Litigation Lawyers Abuja', 'Supreme Court Advocates Nigeria', 'Arbitration Enforcement', 'Appellate Advocacy'],
  },
  {
    category: 'Real Estate & Property',
    question: 'What process does Racheykaf Chamber follow for property acquisition and land title verification in Abuja FCT?',
    answer:
      'Real estate transactions in Abuja require rigorous due diligence. We perform title verification search at the Abuja Geographic Information Systems (AGIS) and Federal Capital Territory Administration (FCTA), inspect land allocation letters, verify Certificate of Occupancy (C of O) authenticity, draft Deed of Assignment and Power of Attorney, and manage Governor’s Consent perfection and stamp duties registration to guarantee flawless legal ownership.',
    keywords: ['Property Lawyers Abuja', 'AGIS Land Search FCT', 'Certificate of Occupancy C of O', 'Real Estate Conveyancing Nigeria'],
  },
  {
    category: 'Employment & Labor',
    question: 'How do you handle workforce restructuring and labor disputes at the National Industrial Court of Nigeria?',
    answer:
      'We advise employers and executive leaders on employment law, statutory severance calculations, union negotiations, trade disputes, and restrictive covenants. When disputes escalate, our litigators defend corporate clients before the National Industrial Court of Nigeria (NICN) with focus on pre-empting liability and upholding statutory trade union standards.',
    keywords: ['Employment Lawyers Abuja', 'NICN Labor Litigation', 'Workforce Restructuring', 'Trade Union Advisory'],
  },
  {
    category: 'Data Protection & Tech',
    question: 'What are the legal compliance mandates under the Nigeria Data Protection Act (NDPA 2023)?',
    answer:
      'Under the NDPA 2023, organizations categorized as Data Controllers or Processors of Major Importance must conduct annual data protection audits, appoint a certified Data Protection Officer (DPO), implement privacy impact assessments, and submit audit returns to the Nigeria Data Protection Commission (NDPC). Racheykaf Chamber provides comprehensive NDPA compliance auditing and data breach response.',
    keywords: ['NDPA 2023 Compliance', 'Data Protection Lawyer Nigeria', 'NDPC Audit Returns', 'Cybersecurity Legal Counsel'],
  },
  {
    category: 'Retainers & Advisory',
    question: 'How are Racheykaf Chamber legal fees structured for corporate retentions and consultations?',
    answer:
      'We offer transparent, predictable fee models tailored to commercial complexity. Options include monthly corporate retainer structures for ongoing legal secretary and advisory support, fixed transaction fees for specific mandates (M&A, property purchase, contract drafting), hourly rates for specialized litigation, and custom fee arrangements. Clients can utilize our instant Online Fee Estimator tool or request a customized proposal.',
    keywords: ['Law Firm Retainer Rates Abuja', 'Corporate Legal Fees Nigeria', 'Transparent Legal Costs', 'Retain Law Firm Abuja'],
  },
];

export const LegalFAQSection: React.FC<LegalFAQSectionProps> = ({
  onOpenConsultation,
  onOpenFeeEstimator,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Corporate & Commercial', 'Oil, Gas & Energy', 'Litigation & Dispute Resolution', 'Real Estate & Property', 'Employment & Labor', 'Data Protection & Tech', 'Retainers & Advisory'];

  const filteredFaqs =
    activeCategory === 'All'
      ? FAQS
      : FAQS.filter((faq) => faq.category === activeCategory);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#051322] text-white relative overflow-hidden border-b border-[#C8A84F]/30">
      {/* Background Accent Blur */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#143D73]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#C8A84F]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143D73]/60 border border-[#C8A84F]/30 backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-[#C8A84F]" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#C8A84F]">
              Frequently Asked Legal Questions & Regulatory Intelligence
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            Client Legal FAQs.{' '}
            <span className="text-gold-gradient block mt-1">
              Clear Answers For Complex Commercial Mandates.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-gray-300 font-normal leading-relaxed">
            Direct guidance on company registration, PIA 2021 compliance, commercial dispute litigation, land titles in Abuja FCT, and retaining senior partners.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar border-b border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95 ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-[#081826] shadow-md'
                  : 'bg-[#0D2438] text-gray-300 hover:text-white hover:bg-[#143D73]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0D2438] border-[#C8A84F]/70 shadow-xl'
                    : 'bg-[#0A1A2A] border-[#143D73]/60 hover:border-[#C8A84F]/40'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 min-h-[56px] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 bg-[#143D73]/60 rounded-lg text-[#C8A84F] shrink-0 mt-0.5">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A84F] block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-heading font-extrabold text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded-full bg-[#143D73]/40 text-[#C8A84F] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#C8A84F] text-[#081826]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 space-y-4 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                      {faq.answer}
                    </p>

                    {/* Keywords tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="text-[10px] font-semibold uppercase text-gray-400">Target Entities:</span>
                      {faq.keywords.map((kw, kwIdx) => (
                        <span
                          key={kwIdx}
                          className="text-[10px] px-2.5 py-1 bg-[#143D73]/60 text-[#C8A84F] rounded-full border border-[#C8A84F]/20 font-medium"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    {/* Action CTA within FAQ */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => onOpenConsultation(faq.question)}
                        className="text-xs font-heading font-bold uppercase tracking-wider text-[#C8A84F] hover:text-white flex items-center gap-1.5 py-1.5 min-h-[40px] cursor-pointer"
                      >
                        <span>Discuss This Mandate With A Partner</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {onOpenFeeEstimator && (
                        <button
                          onClick={onOpenFeeEstimator}
                          className="text-[11px] font-semibold text-gray-400 hover:text-[#C8A84F] transition-colors py-1.5 min-h-[40px] cursor-pointer"
                        >
                          • Estimate Legal Fees Online
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Conversion Box */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#143D73]/80 via-[#0D2438] to-[#143D73]/80 p-6 sm:p-10 rounded-2xl border border-[#C8A84F]/40 text-center space-y-4 max-w-3xl mx-auto shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-[#C8A84F]/20 text-[#C8A84F] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Have a Specific Legal Inquiry or High-Stakes Transaction?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Our principal partner and senior practice heads are available for confidential consultations at our Abuja headquarters or via secure video conference.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenConsultation('General Executive Inquiry')}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-gold-gradient text-[#081826] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:brightness-110 transition-all cursor-pointer active:scale-[0.98]"
            >
              Book Partner Consultation
            </button>
            {onOpenFeeEstimator && (
              <button
                onClick={onOpenFeeEstimator}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 border border-[#C8A84F] text-[#C8A84F] font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#C8A84F] hover:text-[#081826] transition-all cursor-pointer active:scale-[0.98]"
              >
                Calculate Fee Estimate
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
