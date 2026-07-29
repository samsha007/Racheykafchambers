import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhoWeAre } from './components/WhoWeAre';
import { OurFoundation } from './components/OurFoundation';
import { FounderMessage } from './components/FounderMessage';
import { PracticeAreas } from './components/PracticeAreas';
import { Industries } from './components/Industries';
import { Leadership } from './components/Leadership';
import { RepresentativeExperience } from './components/RepresentativeExperience';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals
import { ConsultationModal } from './components/ConsultationModal';
import { PracticeDetailModal } from './components/PracticeDetailModal';
import { TeamDetailModal } from './components/TeamDetailModal';
import { SearchModal } from './components/SearchModal';
import { FeeEstimatorModal } from './components/FeeEstimatorModal';
import { LegalDocsModal } from './components/LegalDocsModal';

import { PracticeArea, TeamMember } from './types';
import { TEAM_MEMBERS } from './data/firmData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Modal states
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationPractice, setConsultationPractice] = useState<string>('Corporate & Commercial');
  
  const [selectedPractice, setSelectedPractice] = useState<PracticeArea | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isFeeEstimatorOpen, setIsFeeEstimatorOpen] = useState<boolean>(false);
  const [legalDocsType, setLegalDocsType] = useState<'privacy' | 'terms' | null>(null);

  // Scroll Progress Tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Section tracking
      const sections = ['home', 'about', 'practices', 'industries', 'leadership', 'experience', 'contact'];
      for (const sectionId of sections) {
        const elem = document.getElementById(sectionId);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenConsultation = (practiceTitle?: string) => {
    if (practiceTitle) {
      setConsultationPractice(practiceTitle);
    }
    setIsConsultationOpen(true);
  };

  const handleOpenTeamMember = (id: string) => {
    const member = TEAM_MEMBERS.find((m) => m.id === id);
    if (member) {
      setSelectedMember(member);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFC] text-[#2A2A2A] font-sans relative selection:bg-[#C8A84F]/30 selection:text-[#081826]">
      
      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gold-gradient z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection
          onOpenConsultation={() => handleOpenConsultation()}
          onNavigateToPractices={() => handleNavigate('practices')}
        />

        <FounderMessage
          onOpenTeamMember={handleOpenTeamMember}
          onOpenConsultation={() => handleOpenConsultation('Founder Executive Advisory')}
        />

        <WhoWeAre
          onNavigateToPractices={() => handleNavigate('practices')}
          onOpenConsultation={() => handleOpenConsultation('Corporate Retainer')}
        />

        <OurFoundation />

        <PracticeAreas
          onSelectPractice={(practice) => setSelectedPractice(practice)}
          onOpenConsultation={(title) => handleOpenConsultation(title)}
        />

        <Leadership
          onSelectMember={(member) => setSelectedMember(member)}
          onOpenConsultation={(title) => handleOpenConsultation(title)}
        />

        <Industries
          onOpenConsultation={(sector) => handleOpenConsultation(sector)}
        />

        <RepresentativeExperience
          onOpenConsultation={(title) => handleOpenConsultation(title)}
        />

        <ContactSection
          onOpenConsultation={() => handleOpenConsultation()}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenLegalDocs={(type) => setLegalDocsType(type)}
      />

      {/* Interactive Modals */}
      {isConsultationOpen && (
        <ConsultationModal
          initialPractice={consultationPractice}
          onClose={() => setIsConsultationOpen(false)}
        />
      )}

      {selectedPractice && (
        <PracticeDetailModal
          practice={selectedPractice}
          onClose={() => setSelectedPractice(null)}
          onOpenConsultation={(title) => handleOpenConsultation(title)}
        />
      )}

      {selectedMember && (
        <TeamDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onOpenConsultation={(title) => handleOpenConsultation(title)}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          onClose={() => setIsSearchOpen(false)}
          onSelectPractice={(p) => setSelectedPractice(p)}
          onSelectMember={(m) => setSelectedMember(m)}
          onNavigate={handleNavigate}
        />
      )}

      {isFeeEstimatorOpen && (
        <FeeEstimatorModal
          onClose={() => setIsFeeEstimatorOpen(false)}
          onOpenConsultation={(details) => handleOpenConsultation(details)}
        />
      )}

      {legalDocsType && (
        <LegalDocsModal
          type={legalDocsType}
          onClose={() => setLegalDocsType(null)}
        />
      )}

    </div>
  );
}
