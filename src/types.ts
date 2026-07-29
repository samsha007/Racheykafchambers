export interface PracticeArea {
  id: string;
  title: string;
  category: 'Corporate' | 'Dispute Resolution' | 'Energy & Resources' | 'Regulatory & Public Sector' | 'Specialized Services';
  shortDesc: string;
  fullDesc: string;
  keyServices: string[];
  representativeDeal: string;
  iconName: string;
}

export interface Industry {
  id: string;
  name: string;
  iconName: string;
  description: string;
  keyRegulations: string[];
  sampleClients: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  fullBio: string[];
  expertise: string[];
  education: string[];
  admissions: string[];
  email: string;
  linkedin?: string;
  image: string;
  isFounder?: boolean;
  philosophy?: string;
}

export interface ValueProp {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  summary: string;
  iconName: string;
}

export interface RepresentativeCase {
  id: string;
  category: string;
  title: string;
  overview: string;
  outcome: string;
  impact: string;
  year: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Legal Insights' | 'Governance' | 'Executive Training' | 'CSR & Justice';
  date: string;
  readTime: string;
  author: string;
  summary: string;
  content: string[];
  tags: string[];
  image: string;
}

export interface ConsultationBooking {
  practiceArea: string;
  date: string;
  timeSlot: string;
  mode: 'In-Person Abuja Chamber' | 'Virtual Video Conference' | 'Executive Briefing at Client Premises';
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  notes: string;
  referenceCode?: string;
}
