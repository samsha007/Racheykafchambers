import React, { useState } from 'react';
import { PRACTICE_AREAS, FIRM_INFO } from '../data/firmData';
import { X, Calendar, Clock, MapPin, Video, Building, CheckCircle2, Download, ShieldCheck, FileText } from 'lucide-react';
import { addFormSubmission } from '../utils/formStore';

interface ConsultationModalProps {
  initialPractice?: string;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  initialPractice = 'Corporate & Commercial',
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [practiceArea, setPracticeArea] = useState<string>(initialPractice);
  const [date, setDate] = useState<string>('2026-08-03');
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM (WAT)');
  const [mode, setMode] = useState<string>('In-Person Abuja Chamber');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [fileAttached, setFileAttached] = useState<boolean>(false);
  const [refCode, setRefCode] = useState<string>('');

  const timeSlots = [
    '09:00 AM (WAT)',
    '10:30 AM (WAT)',
    '01:00 PM (WAT)',
    '02:30 PM (WAT)',
    '04:00 PM (WAT)',
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert('Please fill in your full name and email address.');
      return;
    }
    const newSubmission = addFormSubmission({
      formType: 'Consultation Booking',
      name: fullName,
      email: email,
      phone: phone || undefined,
      organization: organization || undefined,
      subject: `Advisory Consultation: ${practiceArea}`,
      message: `Preferred Venue/Mode: ${mode}. Scheduled Date: ${date} at ${timeSlot}. Notes: ${notes || 'No extra notes provided.'}${fileAttached ? ' [Brief Document Attached]' : ''}`,
      details: {
        practiceArea,
        mode,
        scheduledDate: date,
        timeSlot,
        fileAttached,
      },
    });
    setRefCode(newSubmission.id);
    setStep(2);
  };

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Racheykaf Chamber//Consultation Booking//EN
BEGIN:VEVENT
SUMMARY:Legal Consultation - Racheykaf Chamber (${practiceArea})
DESCRIPTION:Executive Legal Consultation regarding ${practiceArea} with Racheykaf Chamber. Ref: ${refCode}
LOCATION:${mode}
DTSTART:${date.replace(/-/g, '')}T100000Z
DTEND:${date.replace(/-/g, '')}T110000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Racheykaf_Consultation_${refCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#081826] text-white w-full max-w-2xl rounded-sm border border-[#C8A84F]/40 shadow-2xl relative overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0D2438] p-6 border-b border-[#143D73] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gold-gradient text-[#081826] rounded-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A84F] block">
                Partner Consultation Booking
              </span>
              <h3 className="text-xl font-heading font-extrabold text-white">
                Book Executive Legal Advisory
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {step === 1 ? (
            <form onSubmit={handleBooking} className="space-y-6">
              
              {/* Practice Area Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#C8A84F] mb-2">
                  1. Practice Area / Legal Scope *
                </label>
                <select
                  value={practiceArea}
                  onChange={(e) => setPracticeArea(e.target.value)}
                  className="w-full bg-[#0D2438] border border-[#143D73] rounded-sm p-3 text-xs text-white focus:outline-none focus:border-[#C8A84F]"
                >
                  {PRACTICE_AREAS.map((pa) => (
                    <option key={pa.id} value={pa.title}>
                      {pa.title} ({pa.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Consultation Mode */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#C8A84F] mb-2">
                  2. Consultation Venue / Mode *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'In-Person Abuja Chamber', label: 'Abuja Chamber', icon: MapPin },
                    { id: 'Virtual Video Conference', label: 'Virtual Video', icon: Video },
                    { id: 'Executive Briefing at Client Premises', label: 'Client Premises', icon: Building },
                  ].map((item) => {
                    const ModeIcon = item.icon;
                    const isSelected = mode === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setMode(item.id)}
                        className={`p-3.5 rounded-xl border min-h-[52px] text-left flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer active:scale-95 ${
                          isSelected
                            ? 'bg-gold-gradient text-[#081826] border-[#C8A84F] font-bold'
                            : 'bg-[#0D2438] text-gray-300 border-[#143D73] hover:border-[#C8A84F]/50'
                        }`}
                      >
                        <ModeIcon className="w-4 h-4" />
                        <span className="text-xs font-heading">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#C8A84F] mb-2">
                    3. Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full min-h-[48px] bg-[#0D2438] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white focus:outline-none focus:border-[#C8A84F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#C8A84F] mb-2">
                    4. Time Slot (WAT) *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full min-h-[48px] bg-[#0D2438] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white focus:outline-none focus:border-[#C8A84F]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8A84F] block">
                  5. Client & Representation Details *
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full min-h-[48px] bg-[#0D2438] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Official Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full min-h-[48px] bg-[#0D2438] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Telephone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full min-h-[48px] bg-[#0D2438] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                  />
                  <input
                    type="text"
                    placeholder="Company / Institution Name"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full min-h-[48px] bg-[#0D2438] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                  />
                </div>

                <textarea
                  rows={3}
                  placeholder="Mandate overview or specific legal questions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#0D2438] border border-[#143D73] rounded-xl p-3 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8A84F]"
                />

                {/* File Attachment Mock */}
                <div className="flex items-center justify-between p-3 bg-[#0D2438] rounded-sm border border-[#143D73]">
                  <span className="text-xs text-gray-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C8A84F]" />
                    {fileAttached ? 'Attached: Mandate_Brief_Confidential.pdf' : 'Attach Briefing Document (Optional PDF / DOCX)'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFileAttached(!fileAttached)}
                    className="px-3 py-1 bg-[#143D73] text-xs text-white hover:text-[#C8A84F] rounded-xs"
                  >
                    {fileAttached ? 'Remove' : 'Upload File'}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full min-h-[48px] py-3.5 bg-gold-gradient text-[#081826] font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm & Lock Consultation Slot</span>
              </button>

            </form>
          ) : (
            /* Confirmation Screen */
            <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#0F8B6D]/20 text-[#0F8B6D] flex items-center justify-center mx-auto border border-[#0F8B6D]/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#C8A84F] font-bold block mb-1">
                  Consultation Lock Confirmed
                </span>
                <h3 className="text-2xl font-heading font-extrabold text-white">
                  Reference Code: <span className="font-mono text-[#C8A84F]">{refCode}</span>
                </h3>
              </div>

              <div className="bg-[#0D2438] p-6 rounded-sm border border-[#143D73] text-left text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Client Name:</span>
                  <span className="font-bold text-white">{fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Practice Area:</span>
                  <span className="font-bold text-[#C8A84F]">{practiceArea}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Date & Time:</span>
                  <span className="font-bold text-white">{date} at {timeSlot}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Venue Mode:</span>
                  <span className="font-bold text-white">{mode}</span>
                </div>
              </div>

              <p className="text-xs text-gray-300 max-w-md mx-auto">
                A formal calendar invitation and preliminary conflict-check confirmation have been dispatched to <strong className="text-white">{email}</strong>.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleDownloadICS}
                  className="w-full sm:w-auto px-6 py-3 bg-gold-gradient text-[#081826] font-heading font-bold text-xs uppercase tracking-wider rounded-sm shadow-md hover:brightness-110 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Calendar Invite (.ics)</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 border border-white/20 text-white hover:text-[#C8A84F] font-heading font-bold text-xs uppercase tracking-wider rounded-sm"
                >
                  Close Window
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
