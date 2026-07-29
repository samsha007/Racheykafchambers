import React, { useState } from 'react';
import { FIRM_INFO, OFFICE_IMAGE } from '../data/firmData';
import { MapPin, Phone, Mail, Clock, Send, Calendar, CheckCircle2, ShieldCheck, Building, ExternalLink } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in your name, email, and message details.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#081826] text-white relative overflow-hidden">
      
      {/* CONTACT & OFFICE DETAILS GRID */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C8A84F] font-bold block mb-2">
                Executive Chambers & Office Address
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Racheykaf Chamber Headquarters
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-sm bg-[#0D2438] border border-[#143D73]">
                <div className="p-3 bg-[#143D73] text-[#C8A84F] rounded-sm shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A84F] mb-1">
                    Chamber Address
                  </h4>
                  <p className="text-sm text-gray-200 leading-relaxed font-normal">
                    {FIRM_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-sm bg-[#0D2438] border border-[#143D73]">
                <div className="p-3 bg-[#143D73] text-[#C8A84F] rounded-sm shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A84F] mb-1">
                    Telephone Contacts
                  </h4>
                  <p className="text-sm text-gray-200 font-medium">
                    Primary Desk: {FIRM_INFO.phone}
                  </p>
                  <p className="text-sm text-gray-300 font-medium">
                    Direct Line: {FIRM_INFO.phoneSecondary}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-sm bg-[#0D2438] border border-[#143D73]">
                <div className="p-3 bg-[#143D73] text-[#C8A84F] rounded-sm shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8A84F] mb-1">
                    Electronic Mail
                  </h4>
                  <p className="text-sm text-gray-200 font-medium">
                    General: {FIRM_INFO.email}
                  </p>
                  <p className="text-sm text-gray-300 font-medium">
                    Advisory: {FIRM_INFO.consultationEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-sm bg-[#0D2438] border border-[#143D73]">
                <div className="p-3 bg-[#143D73] text-[#C8A84F] rounded-sm shrink-0">
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
          <div className="lg:col-span-7 bg-[#0D2438] p-8 lg:p-10 rounded-sm border border-[#143D73] relative">
            <h3 className="text-2xl font-heading font-extrabold text-white mb-2">
              Send Direct Legal Inquiry
            </h3>
            <p className="text-xs text-gray-300 mb-8 font-normal">
              For urgent corporate, commercial, regulatory, or litigation mandates, complete the encrypted form below. Our managing partner office will respond within 2 business hours.
            </p>

            {submitted ? (
              <div className="bg-[#081826] p-8 rounded-sm border border-[#C8A84F] text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-[#0F8B6D]/20 text-[#0F8B6D] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-heading font-extrabold text-white">
                  Inquiry Transmitted Successfully
                </h4>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  Thank you, <strong className="text-[#C8A84F]">{formData.name}</strong>. Your inquiry regarding <strong className="text-white">{formData.subject}</strong> has been assigned reference code <span className="font-mono text-[#C8A84F] font-bold">RC-INQ-{(Math.random() * 100000).toFixed(0)}</span>. A partner will contact you shortly.
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
                  className="px-6 py-2.5 bg-gold-gradient text-[#081826] text-xs font-bold uppercase tracking-wider rounded-sm mt-4"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Chief Adeleke Johnson"
                      className="w-full bg-[#081826] border border-[#143D73] rounded-sm p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. adeleke@company.com"
                      className="w-full bg-[#081826] border border-[#143D73] rounded-sm p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Telephone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234..."
                      className="w-full bg-[#081826] border border-[#143D73] rounded-sm p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Organization / Entity
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Company / Government Body"
                      className="w-full bg-[#081826] border border-[#143D73] rounded-sm p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Inquiry Nature / Practice Area
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#081826] border border-[#143D73] rounded-sm p-3 text-xs text-white focus:outline-none focus:border-[#C8A84F]"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Inquiry Brief & Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide a confidential overview of your legal requirements or mandate..."
                    className="w-full bg-[#081826] border border-[#143D73] rounded-sm p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gold-gradient text-[#081826] font-heading font-bold text-xs uppercase tracking-wider rounded-sm shadow-xl hover:brightness-110 flex items-center justify-center gap-2"
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
