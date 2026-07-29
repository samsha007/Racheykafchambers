import React, { useState } from 'react';
import { PRACTICE_AREAS, INDUSTRIES, TEAM_MEMBERS, ARTICLES } from '../data/firmData';
import { Search, X, ChevronRight, ArrowRight, BookOpen, Users, Briefcase, Building } from 'lucide-react';

interface SearchModalProps {
  onClose: () => void;
  onSelectPractice: (practice: any) => void;
  onSelectMember: (member: any) => void;
  onNavigate: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  onClose,
  onSelectPractice,
  onSelectMember,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const matchingPractices = query
    ? PRACTICE_AREAS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDesc.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchingIndustries = query
    ? INDUSTRIES.filter(
        (i) =>
          i.name.toLowerCase().includes(query.toLowerCase()) ||
          i.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchingTeam = query
    ? TEAM_MEMBERS.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.role.toLowerCase().includes(query.toLowerCase()) ||
          m.expertise.some((e) => e.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const matchingArticles = query
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.summary.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const totalResults =
    matchingPractices.length +
    matchingIndustries.length +
    matchingTeam.length +
    matchingArticles.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#081826] text-white w-full max-w-3xl rounded-sm border border-[#C8A84F]/40 shadow-2xl overflow-hidden relative flex flex-col max-h-[80vh]">
        
        {/* Search Header Input */}
        <div className="p-4 bg-[#0D2438] border-b border-[#143D73] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C8A84F]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search practices, energy regulations, lawyers, insights..."
            className="w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!query && (
            <div className="text-center py-12 text-gray-400 space-y-3">
              <Search className="w-8 h-8 text-[#C8A84F] mx-auto opacity-60" />
              <p className="text-xs">Type to search Racheykaf Chamber practice areas, lawyers, and legal insights.</p>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No results found for &ldquo;{query}&rdquo;.</p>
            </div>
          )}

          {matchingPractices.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8A84F] flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Practice Areas ({matchingPractices.length})
              </span>
              <div className="space-y-2">
                {matchingPractices.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectPractice(p);
                    }}
                    className="w-full text-left p-3 rounded-sm bg-[#0D2438] hover:bg-[#143D73] border border-[#143D73] transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{p.title}</h4>
                      <p className="text-[11px] text-gray-300 truncate max-w-md">{p.shortDesc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C8A84F]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingTeam.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8A84F] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Leadership & Lawyers ({matchingTeam.length})
              </span>
              <div className="space-y-2">
                {matchingTeam.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onClose();
                      onSelectMember(m);
                    }}
                    className="w-full text-left p-3 rounded-sm bg-[#0D2438] hover:bg-[#143D73] border border-[#143D73] transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{m.name}</h4>
                      <p className="text-[11px] text-[#C8A84F]">{m.role}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C8A84F]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingArticles.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8A84F] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Insights & Publications ({matchingArticles.length})
              </span>
              <div className="space-y-2">
                {matchingArticles.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      onClose();
                      onNavigate('insights');
                    }}
                    className="w-full text-left p-3 rounded-sm bg-[#0D2438] hover:bg-[#143D73] border border-[#143D73] transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{a.title}</h4>
                      <p className="text-[11px] text-gray-400">{a.category} • {a.readTime}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C8A84F]" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
