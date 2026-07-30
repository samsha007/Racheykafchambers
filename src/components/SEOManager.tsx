import React, { useEffect } from 'react';
import { PracticeArea, TeamMember, Article } from '../types';
import { FIRM_INFO, LOGO_IMAGE, HERO_IMAGE } from '../data/firmData';

interface SEOManagerProps {
  activeSection: string;
  selectedPractice?: PracticeArea | null;
  selectedMember?: TeamMember | null;
  selectedArticle?: Article | null;
}

export const SEOManager: React.FC<SEOManagerProps> = ({
  activeSection,
  selectedPractice,
  selectedMember,
  selectedArticle,
}) => {
  useEffect(() => {
    let title = 'Racheykaf Chamber | Corporate & Commercial Law Firm in Abuja, Nigeria';
    let description =
      'Racheykaf Chamber is a premier Nigerian full-service commercial law firm providing strategic advisory, regulatory compliance, petroleum industry, litigation, energy, and cross-border investment legal services in Abuja, FCT.';
    let keywords =
      'Racheykaf Chamber, Law Firm Abuja, Corporate Lawyer Nigeria, Commercial Litigation Abuja, Energy Law Firm Nigeria, Petroleum Industry Act Lawyer, Business Law Firm Abuja, Real Estate Lawyer FCT, Kate Olusuyi Lawyer';
    let canonicalUrl = 'https://racheykafchamber.com/';
    let ogImage = HERO_IMAGE || LOGO_IMAGE;
    let schemaType = 'LegalService';

    if (selectedPractice) {
      title = `${selectedPractice.title} Lawyers Abuja | Racheykaf Chamber Nigeria`;
      description = `Premier legal services in ${selectedPractice.title} by Racheykaf Chamber. ${selectedPractice.shortDesc} Strategic commercial counsel in Abuja, Nigeria.`;
      keywords = `${selectedPractice.title} Nigeria, ${selectedPractice.title} Lawyer Abuja, ${selectedPractice.keyServices.join(', ')}, Racheykaf Chamber Legal`;
      canonicalUrl = `https://racheykafchamber.com/#practice-${selectedPractice.id}`;
    } else if (selectedMember) {
      title = `${selectedMember.name} - ${selectedMember.role} | Racheykaf Chamber`;
      description = `${selectedMember.name}, ${selectedMember.role} at Racheykaf Chamber. ${selectedMember.bio.substring(0, 140)}... Expert legal counsel in Abuja.`;
      keywords = `${selectedMember.name}, ${selectedMember.role}, Lawyer Abuja, Supreme Court Nigeria Attorney, Racheykaf Leadership`;
      canonicalUrl = `https://racheykafchamber.com/#lawyer-${selectedMember.id}`;
      ogImage = selectedMember.image;
    } else if (selectedArticle) {
      title = `${selectedArticle.title} | Racheykaf Legal Insights`;
      description = selectedArticle.summary;
      keywords = selectedArticle.tags.join(', ') + ', Legal Analysis Nigeria, Racheykaf Chamber Publications';
      canonicalUrl = `https://racheykafchamber.com/#article-${selectedArticle.id}`;
      ogImage = selectedArticle.image;
      schemaType = 'Article';
    } else {
      switch (activeSection) {
        case 'about':
          title = 'About Racheykaf Chamber | Leading Commercial Law Firm Abuja';
          description =
            'Learn about Racheykaf Chamber, an institutional full-service law firm based in Abuja, Nigeria. Built on statutory regulatory mastery, commercial advocacy, and risk management.';
          canonicalUrl = 'https://racheykafchamber.com/#about';
          break;
        case 'practices':
          title = 'Legal Practice Areas | Corporate, Energy, Dispute Resolution | Racheykaf';
          description =
            'Explore 25 specialized legal practice areas at Racheykaf Chamber including Corporate & Commercial, Oil & Gas PIA 2021, Litigation, Real Estate, Tax, Governance, and Tech Regulatory Compliance.';
          canonicalUrl = 'https://racheykafchamber.com/#practices';
          break;
        case 'industries':
          title = 'Industry Sectors Served | Energy, Finance, Tech & Infrastructure Nigeria';
          description =
            'Racheykaf Chamber provides industry-specific legal advisory across Oil & Gas, Banking & Fintech, Public Infrastructure, Telecommunications, Real Estate, and Foreign Investment in Nigeria.';
          canonicalUrl = 'https://racheykafchamber.com/#industries';
          break;
        case 'leadership':
          title = 'Lawyers & Senior Leadership Team | Racheykaf Chamber Abuja';
          description =
            'Meet our distinguished legal leadership team led by Principal Partner Kate O. Olusuyi (LL.B, BL, LL.M, FCAI) and senior associates handling high-stakes corporate and litigation mandates.';
          canonicalUrl = 'https://racheykafchamber.com/#leadership';
          break;
        case 'experience':
          title = 'Representative Track Record & Case Mandates | Racheykaf Chamber';
          description =
            'Discover our proven track record in high-stakes commercial litigation, $280M PIA energy asset migrations, cross-border telecom joint ventures, and public policy formulation.';
          canonicalUrl = 'https://racheykafchamber.com/#experience';
          break;
        case 'insights':
          title = 'Legal Insights, Regulatory Bulletins & CSR | Racheykaf Chamber';
          description =
            'Executive legal analysis on PIA 2021, CAMA 2020 corporate governance, NDPA 2023 data protection, and community access to justice initiatives in Abuja, Nigeria.';
          canonicalUrl = 'https://racheykafchamber.com/#insights';
          break;
        case 'contact':
          title = 'Contact Racheykaf Chamber | Law Firm Office in Asokoro, Abuja FCT';
          description =
            'Contact Racheykaf Chamber at 102 PHDL Shopping Complex, Mambilla Barracks, Asokoro, Abuja FCT, Nigeria. Retain our legal team or book an executive consultation today.';
          canonicalUrl = 'https://racheykafchamber.com/#contact';
          break;
        default:
          break;
      }
    }

    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMeta = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to update link tags
    const updateLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Primary Meta Tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('author', 'Racheykaf Chamber');
    updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateLink('canonical', canonicalUrl);

    // Local SEO & Geo Metadata
    updateMeta('geo.region', 'NG-FC');
    updateMeta('geo.placename', 'Abuja, FCT, Nigeria');
    updateMeta('geo.position', '9.0765;7.3986');
    updateMeta('ICBM', '9.0765, 7.3986');

    // Open Graph / Facebook / LinkedIn
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:url', canonicalUrl, 'property');
    updateMeta('og:image', ogImage, 'property');
    updateMeta('og:type', schemaType === 'Article' ? 'article' : 'website', 'property');
    updateMeta('og:site_name', 'Racheykaf Chamber', 'property');
    updateMeta('og:locale', 'en_NG', 'property');

    // Twitter Cards
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);

    // AI Engine Metadata (ChatGPT / Gemini / Copilot / Perplexity entity extraction)
    updateMeta('ai-entity-type', 'Legal Practice / Law Firm');
    updateMeta('ai-primary-location', 'Abuja, Federal Capital Territory, Nigeria');
    updateMeta('ai-summary', description);

    // Structured JSON-LD Injection
    let ldJsonScript = document.getElementById('dynamic-ld-json');
    if (!ldJsonScript) {
      ldJsonScript = document.createElement('script');
      ldJsonScript.id = 'dynamic-ld-json';
      ldJsonScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(ldJsonScript);
    }

    const schemas: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        '@id': 'https://racheykafchamber.com/#organization',
        name: FIRM_INFO.name,
        alternateName: ['Racheykaf Chambers', 'Racheykaf Law Firm Abuja'],
        url: 'https://racheykafchamber.com',
        logo: LOGO_IMAGE,
        image: HERO_IMAGE,
        telephone: FIRM_INFO.phone,
        email: FIRM_INFO.email,
        priceRange: '$$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '102 PHDL Shopping Complex, Mambilla Barracks, Asokoro',
          addressLocality: 'Abuja',
          addressRegion: 'FCT',
          postalCode: '900211',
          addressCountry: 'NG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 9.0765,
          longitude: 7.3986,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
        founder: {
          '@type': 'Person',
          name: 'Mrs. Kate O. Olusuyi',
          jobTitle: 'Principal Partner & Founder',
          alumniOf: 'Nigerian Law School, Supreme Court of Nigeria',
          honorificSuffix: 'LL.B, BL, LL.M, FCAI',
        },
        sameAs: [
          'https://www.linkedin.com/company/racheykaf-chamber',
          'https://www.facebook.com/racheykafchamber',
        ],
        areaServed: [
          { '@type': 'Country', name: 'Nigeria' },
          { '@type': 'AdministrativeArea', name: 'Abuja FCT' },
          { '@type': 'AdministrativeArea', name: 'Lagos State' },
          { '@type': 'AdministrativeArea', name: 'Rivers State' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Legal Services & Commercial Practice Areas',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate & Commercial Advisory' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Litigation & Dispute Resolution' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Oil, Gas & Energy Legal Advisory (PIA 2021)' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Government Regulatory Advisory & Legislative Drafting' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real Estate, Land Rights & Infrastructure Concessions' } },
          ],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://racheykafchamber.com/' },
          { '@type': 'ListItem', position: 2, name: activeSection.toUpperCase(), item: canonicalUrl },
        ],
      },
    ];

    if (selectedArticle) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: selectedArticle.title,
        description: selectedArticle.summary,
        image: selectedArticle.image,
        author: {
          '@type': 'Person',
          name: selectedArticle.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Racheykaf Chamber',
          logo: {
            '@type': 'ImageObject',
            url: LOGO_IMAGE,
          },
        },
        datePublished: selectedArticle.date,
        mainEntityOfPage: canonicalUrl,
      });
    }

    ldJsonScript.textContent = JSON.stringify(schemas, null, 2);
  }, [activeSection, selectedPractice, selectedMember, selectedArticle]);

  return null;
};
