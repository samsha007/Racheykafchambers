import React, { useState } from 'react';
import { FIRM_INFO, OFFICE_IMAGE } from '../data/firmData';
import { MapPin, Phone, Mail, Clock, Send, Calendar, CheckCircle2, ShieldCheck, Building, ExternalLink } from 'lucide-react';
import { addFormSubmission } from '../utils/formStore';

interface ContactSectionProps {
  onOpenConsultation: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenConsultation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: 'Corporate Advisory Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in your name, email, and message details.');
      return;
    }
    const newSubmission = addFormSubmission({
      formType: 'Contact Inquiry',
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      organization: formData.organization || undefined,
      subject: formData.subject,
      message: formData.message,
    });
    setRefCode(newSubmission.id);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#081826] text-white relative overflow-hidden border-b border-[#C8A84F]/30">
      
      {/* CONTACT & OFFICE DETAILS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#C8A84F] font-bold block mb-2">
                Executive Chambers & Office Address
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Racheykaf Chamber Headquarters
              </h3>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Address - Clickable to Google Maps */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(FIRM_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-[#0D2438] border border-[#143D73] hover:border-[#C8A84F]/60 transition-colors group cursor-pointer block"
              >
                <div className="p-3 bg-[#143D73] text-[#C8A84F] group-hover:bg-[#C8A84F] group-hover:text-[#081826] rounded-xl shrink-0 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A84F]">
                      Office Address
                    </h4>
                    <ExternalLink className="w-3 h-3 text-[#C8A84F] opacity-70 group-hover:opacity-100" />
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed font-normal group-hover:text-white transition-colors">
                    {FIRM_INFO.address}
                  </p>
                </div>
              </a>

              {/* Phones - Clickable tel links */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0D2438] border border-[#143D73]">
                <div className="p-3 bg-[#143D73] text-[#C8A84F] rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A84F] mb-1">
                    Telephone Contacts
                  </h4>
                  <a href={`tel:${FIRM_INFO.phone}`} className="text-sm text-gray-200 font-medium hover:text-[#C8A84F] transition-colors block py-0.5">
                    Primary Desk: <span className="underline decoration-dotted">{FIRM_INFO.phone}</span>
                  </a>
                  <a href={`tel:${FIRM_INFO.phoneSecondary}`} className="text-sm text-gray-300 font-medium hover:text-[#C8A84F] transition-colors block py-0.5">
                    Direct Line: <span className="underline decoration-dotted">{FIRM_INFO.phoneSecondary}</span>
                  </a>
                </div>
              </div>

              {/* Email - Clickable mailto links */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0D2438] border border-[#143D73]">
                <div className="p-3 bg-[#143D73] text-[#C8A84F] rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A84F] mb-1">
                    Electronic Mail
                  </h4>
                  <a href={`mailto:${FIRM_INFO.email}`} className="text-sm text-gray-200 font-medium hover:text-[#C8A84F] transition-colors block py-0.5">
                    General: <span className="underline decoration-dotted">{FIRM_INFO.email}</span>
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0D2438] border border-[#143D73]">
                <div className="p-3 bg-[#143D73] text-[#C8A84F] rounded-xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A84F] mb-1">
                    Chamber Operating Hours
                  </h4>
                  <p className="text-sm text-gray-200 font-normal">
                    {FIRM_INFO.hours}
                  </p>
                </div>
              </div>


            </div>

          </div>

          {/* Right Column: Direct Contact Form */}
          <div className="lg:col-span-7 bg-[#0D2438] p-5 sm:p-8 lg:p-10 rounded-2xl border border-[#143D73] relative shadow-xl">
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-2">
              Send Direct Legal Inquiry
            </h3>
            <p className="text-xs text-gray-300 mb-6 sm:mb-8 font-normal leading-relaxed">
              For urgent corporate, commercial, regulatory, or litigation mandates, complete the encrypted form below. Our managing partner office will respond within 2 business hours.
            </p>

            {submitted ? (
              <div className="bg-[#081826] p-6 sm:p-8 rounded-xl border border-[#C8A84F] text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0F8B6D]/20 text-[#0F8B6D] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                  Inquiry Transmitted Successfully
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#C8A84F]">{formData.name}</strong>. Your inquiry regarding <strong className="text-white">{formData.subject}</strong> has been assigned reference code <span className="font-mono text-[#C8A84F] font-bold">{refCode || 'RC-INQ-88301'}</span>. A partner will contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      organization: '',
                      subject: 'Corporate Advisory Inquiry',
                      message: '',
                    });
                  }}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3 bg-gold-gradient text-[#081826] text-xs font-bold uppercase tracking-wider rounded-xl mt-4 cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Chief Adeleke Johnson"
                      className="w-full min-h-[48px] bg-[#081826] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. adeleke@company.com"
                      className="w-full min-h-[48px] bg-[#081826] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Telephone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234..."
                      className="w-full min-h-[48px] bg-[#081826] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      Organization / Entity
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Company / Government Body"
                      className="w-full min-h-[48px] bg-[#081826] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Inquiry Nature / Practice Area
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full min-h-[48px] bg-[#081826] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white focus:outline-none focus:border-[#C8A84F]"
                  >
                    <option>Corporate Advisory Inquiry</option>
                    <option>Oil, Gas & Energy Regulation</option>
                    <option>High-Court & Appellate Litigation</option>
                    <option>Government & Legislative Drafting</option>
                    <option>Banking, Finance & Taxation</option>
                    <option>Real Estate & PPP Infrastructure</option>
                    <option>Arbitration & ADR Mandates</option>
                    <option>Executive Retainer Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Inquiry Brief & Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide a confidential overview of your legal requirements or mandate..."
                    className="w-full bg-[#081826] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full min-h-[48px] py-3.5 bg-gold-gradient text-[#081826] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Encrypted Inquiry</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>

    </section>
  );
};
