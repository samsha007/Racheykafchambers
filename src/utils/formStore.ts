export type FormType = 'Contact Inquiry' | 'Consultation Booking' | 'Fee Estimate Request' | 'General Inquiry';
export type FormStatus = 'New' | 'Reviewed' | 'In Progress' | 'Archived';

export interface FormSubmission {
  id: string;
  formType: FormType;
  submittedAt: string;
  timestamp: number;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject?: string;
  message?: string;
  status: FormStatus;
  details?: Record<string, any>;
}

const STORAGE_KEY = 'racheykaf_form_submissions';
export const FORMS_UPDATED_EVENT = 'racheykaf_forms_updated';

const INITIAL_SUBMISSIONS: FormSubmission[] = [
  {
    id: 'RC-INQ-88301',
    formType: 'Contact Inquiry',
    submittedAt: '2026-07-30 11:45 WAT',
    timestamp: 1785411900000,
    name: 'Dr. Babatunde Alabi',
    email: 'b.alabi@firstcapitang.com',
    phone: '+234 803 445 1199',
    organization: 'First Capital Holdings Ltd',
    subject: 'Cross-Border Joint Venture Regulatory Approval',
    message: 'We require urgent corporate structure advisory and SEC clearance for our upcoming $45M joint venture in the renewable energy sector.',
    status: 'New',
    details: {
      location: 'Lagos & Abuja Office',
      priority: 'High',
    },
  },
  {
    id: 'RC-BOOK-72049',
    formType: 'Consultation Booking',
    submittedAt: '2026-07-30 08:30 WAT',
    timestamp: 1785400200000,
    name: 'Chief Mrs. Folake K. Ogundipe',
    email: 'folake.ogundipe@nexuspetroleum.ng',
    phone: '+234 802 112 3344',
    organization: 'Nexus Petroleum Development Company',
    subject: 'Energy & Upstream Licensing Audit',
    message: 'Preferred Venue: In-Person Abuja Chamber. Scheduled Date: 2026-08-04 at 10:00 AM WAT. Brief: Reviewing NUPRC statutory compliance and production sharing contract clauses.',
    status: 'In Progress',
    details: {
      practiceArea: 'Energy, Oil & Gas Advisory',
      mode: 'In-Person Abuja Chamber',
      preferredDate: '2026-08-04',
      preferredTime: '10:00 AM WAT',
    },
  },
  {
    id: 'RC-FEE-91024',
    formType: 'Fee Estimate Request',
    submittedAt: '2026-07-29 16:15 WAT',
    timestamp: 1785341700000,
    name: 'Engr. Chidi Nnamdi',
    email: 'cnnamdi@transnationalcorp.com',
    phone: '+234 818 900 2211',
    organization: 'Transnational Infrastructure Corp',
    subject: 'Fee Proposal Request for High-Court / Appellate Litigation',
    message: 'Mandate: High-Court / Appellate Litigation (Client Scale: Multinational Corporation - Turnaround: Expedited 48 Hours). Estimated Fee: ₦20,160,000 (~$13,440 USD). Includes Tax & Regulatory Compliance Pre-Audit.',
    status: 'Reviewed',
    details: {
      mandateType: 'High-Court / Appellate Litigation',
      scopeSize: 'Multinational Corporation',
      urgency: 'Expedited (48 Hours)',
      estimateNgn: 20160000,
    },
  },
  {
    id: 'RC-INQ-64910',
    formType: 'Contact Inquiry',
    submittedAt: '2026-07-29 10:00 WAT',
    timestamp: 1785319200000,
    name: 'Amina Yusuf',
    email: 'ayusuf@fintechhorizon.io',
    phone: '+234 703 889 0011',
    organization: 'Fintech Horizon Ltd',
    subject: 'Central Bank of Nigeria (CBN) PSSP License Advisory',
    message: 'Seeking legal representation for payment service solution provider licensing and anti-money laundering compliance setup.',
    status: 'Reviewed',
  },
  {
    id: 'RC-BOOK-40291',
    formType: 'Consultation Booking',
    submittedAt: '2026-07-28 14:20 WAT',
    timestamp: 1785248400000,
    name: 'Sir George Armstrong',
    email: 'g.armstrong@armstrongglobal.co.uk',
    phone: '+44 20 7946 0912',
    organization: 'Armstrong & Partners LLP London',
    subject: 'International Commercial Arbitration',
    message: 'Preferred Venue: Virtual Video Conference. Scheduled Date: 2026-08-02 at 02:00 PM WAT. Discussion regarding cross-border enforcement of LCIA arbitral awards in Federal High Court Abuja.',
    status: 'Archived',
    details: {
      practiceArea: 'Dispute Resolution & Commercial Litigation',
      mode: 'Virtual Video Conference',
      preferredDate: '2026-08-02',
      preferredTime: '02:00 PM WAT',
    },
  },
];

export function getFormSubmissions(): FormSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBMISSIONS));
      return INITIAL_SUBMISSIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length >= 0) {
      return parsed;
    }
    return INITIAL_SUBMISSIONS;
  } catch (e) {
    console.error('Error reading form submissions from localStorage:', e);
    return INITIAL_SUBMISSIONS;
  }
}

export function saveFormSubmissions(submissions: FormSubmission[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    window.dispatchEvent(new Event(FORMS_UPDATED_EVENT));
  } catch (e) {
    console.error('Error saving form submissions to localStorage:', e);
  }
}

export function addFormSubmission(submission: Omit<FormSubmission, 'id' | 'submittedAt' | 'timestamp' | 'status'> & { id?: string; status?: FormStatus }): FormSubmission {
  const now = new Date();
  const dateFormatted = now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) + ' WAT';

  const newSub: FormSubmission = {
    id: submission.id || `RC-${submission.formType === 'Consultation Booking' ? 'BOOK' : submission.formType === 'Fee Estimate Request' ? 'FEE' : 'INQ'}-${Math.floor(10000 + Math.random() * 90000)}`,
    submittedAt: dateFormatted,
    timestamp: now.getTime(),
    status: submission.status || 'New',
    ...submission,
  };

  const list = getFormSubmissions();
  const updated = [newSub, ...list];
  saveFormSubmissions(updated);
  return newSub;
}

export function updateSubmissionStatus(id: string, status: FormStatus): void {
  const list = getFormSubmissions();
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  saveFormSubmissions(updated);
}

export function deleteFormSubmission(id: string): void {
  const list = getFormSubmissions();
  const updated = list.filter((item) => item.id !== id);
  saveFormSubmissions(updated);
}

export function resetToDemoSubmissions(): void {
  saveFormSubmissions(INITIAL_SUBMISSIONS);
}
