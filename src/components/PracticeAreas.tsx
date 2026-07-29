import React, { useState, useMemo } from 'react';
import { PRACTICE_AREAS } from '../data/firmData';
import { PracticeArea } from '../types';
import { IconRenderer } from './IconRenderer';
import { Search, ChevronRight, Layers, ArrowUpRight } from 'lucide-react';

interface PracticeAreasProps {
  onSelectPractice: (practice: PracticeArea) => void;
  onOpenConsultation: (practiceTitle?: string) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({
  onSelectPractice,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Corporate',
    'Dispute Resolution',
    'Energy & Resources',
    'Regulatory & Public Sector',
    'Specialized Services',
  ];

  const filteredPractices = useMemo(() => {
    return PRACTICE_AREAS.filter((practice) => {
      const matchesCategory =
        selectedCategory === 'All' || practice.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        practice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.keyServices.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const isFiltered = selectedCategory !== 'All' || searchQuery !== '';

  // Desktop Slices: 9, 8, 8
  const desktopCol1 = PRACTICE_AREAS.slice(0, 9);
  const desktopCol2 = PRACTICE_AREAS.slice(9, 17);
  const desktopCol3 = PRACTICE_AREAS.slice(17, 25);

  // Tablet Slices: 13, 12
  const tabletCol1 = PRACTICE_AREAS.slice(0, 13);
  const tabletCol2 = PRACTICE_AREAS.slice(13, 25);

  // Mobile Slice: All 25
  const mobileCol = PRACTICE_AREAS;

  const renderCard = (practice: PracticeArea, keySuffix: string | number = '', isMarquee = false) => (
    <div
      key={`${practice.id}-${keySuffix}`}
      className={`bg-[#0D2438]/95 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-[#143D73]/60 hover:border-[#C8A84F] shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group/card ${
        isMarquee ? 'w-[300px] sm:w-[350px] md:w-[380px] shrink-0' : 'w-full'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-[#143D73]/80 rounded-xl text-[#C8A84F] group-hover/card:bg-[#C8A84F] group-hover/card:text-[#081826] transition-colors duration-300">
            <IconRenderer name={practice.iconName} className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A84F] px-2.5 py-1 rounded-full bg-[#143D73]/60 border border-[#C8A84F]/30">
            {practice.category}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white mb-2.5 group-hover/card:text-[#C8A84F] transition-colors duration-300">
          {practice.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal mb-5 line-clamp-3">
          {practice.shortDesc}
        </p>

        {/* Key Services Preview */}
        <div className="space-y-1.5 mb-6 pt-4 border-t border-white/10">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-1">
            Key Capabilities:
          </span>
          {practice.keyServices.slice(0, 3).map((service, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A84F] shrink-0" />
              <span className="truncate">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Footer */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
        <button
          onClick={() => onSelectPractice(practice)}
          className="text-xs font-heading font-bold uppercase tracking-wider text-[#C8A84F] hover:text-white flex items-center gap-1 group/btn"
        >
          <span>Explore Scope</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>

        <button
          onClick={() => onOpenConsultation(practice.title)}
          className="text-[11px] font-semibold text-gray-300 hover:text-[#C8A84F] transition-colors flex items-center gap-1"
        >
          <span>Retain Team</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );

  const renderMarqueeRow = (items: PracticeArea[], animClass: string, rowId: string) => (
    <div className="relative overflow-hidden rounded-2xl group row-pause bg-[#05111B]/40 p-2 border border-[#143D73]/40 shadow-xl">
      {/* Left & Right Gradient Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#081826] via-[#081826]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#081826] via-[#081826]/90 to-transparent z-10 pointer-events-none" />

      {/* Horizontal Scrolling Track */}
      <div className={`flex gap-6 w-max ${animClass} py-1`}>
        {/* Duplicated for infinite continuous loop */}
        {[...items, ...items].map((practice, index) =>
          renderCard(practice, `${rowId}-${index}`, true)
        )}
      </div>
    </div>
  );

  return (
    <section id="practices" className="py-24 bg-[#051322] text-white relative overflow-hidden border-b border-[#C8A84F]/30">
      {/* Background Radial Glow Accents */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[400px] bg-[#143D73]/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[500px] bg-[#C8A84F]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#143D73]/60 border border-[#C8A84F]/30 backdrop-blur-md">
              <Layers className="w-3.5 h-3.5 text-[#C8A84F]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C8A84F]">
                Legal Services Directory • 25 Specialized Practice Areas
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
              Our Practice Areas.{' '}
              <span className="text-gold-gradient block mt-1">
                Precision Across Every Discipline.
              </span>
            </h2>


          </div>

          {/* Practice Search Bar */}
          <div className="w-full lg:w-80 relative shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 25 practice areas..."
              className="w-full bg-[#0D2438] border border-[#143D73] rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#C8A84F] transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-gold-gradient text-[#081826] shadow-md'
                  : 'bg-[#0D2438] text-gray-300 hover:text-white hover:bg-[#143D73]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mode 1: Default View - Animated Horizontal Marquee Rows */}
        {!isFiltered ? (
          <div>
            {/* Desktop: 3 Alternating Horizontal Rows */}
            <div className="hidden lg:flex lg:flex-col gap-6">
              {renderMarqueeRow(desktopCol1, 'animate-marquee-left-slow', 'd1')}
              {renderMarqueeRow(desktopCol2, 'animate-marquee-right-slow', 'd2')}
              {renderMarqueeRow(desktopCol3, 'animate-marquee-left-fast', 'd3')}
            </div>

            {/* Tablet: 2 Alternating Horizontal Rows */}
            <div className="hidden md:flex lg:hidden md:flex-col gap-6">
              {renderMarqueeRow(tabletCol1, 'animate-marquee-left-slow', 't1')}
              {renderMarqueeRow(tabletCol2, 'animate-marquee-right-slow', 't2')}
            </div>

            {/* Mobile: 1 Horizontal Row */}
            <div className="flex md:hidden flex-col gap-6">
              {renderMarqueeRow(mobileCol, 'animate-marquee-mobile-horiz', 'm1')}
            </div>
          </div>
        ) : (
          /* Mode 2: Filtered / Search View - Responsive Grid */
          <div>
            <div className="mb-6 flex items-center justify-between text-xs text-gray-400">
              <span>Showing {filteredPractices.length} of {PRACTICE_AREAS.length} Practice Areas</span>
              {searchQuery && <span>Search: &ldquo;{searchQuery}&rdquo;</span>}
            </div>

            {filteredPractices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPractices.map((practice) => renderCard(practice, 'filter'))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#0D2438] rounded-2xl border border-[#143D73]">
                <p className="text-base text-gray-300 mb-4">No practice areas matched your query &ldquo;{searchQuery}&rdquo;.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-6 py-2.5 bg-gold-gradient text-[#081826] text-xs font-bold uppercase tracking-wider rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
