import React, { useState } from 'react';
import { ARTICLES } from '../data/firmData';
import { Article } from '../types';
import { BookOpen, X, Clock, Calendar, Tag, ArrowRight, Share2, Heart, Award } from 'lucide-react';

export const ThoughtLeadership: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="insights" className="py-24 bg-[#081826] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#143D73]/60 border border-[#C8A84F]/30 backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-[#C8A84F]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C8A84F]">
              Thought Leadership & Corporate Social Responsibility
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            Insights & Impact.{' '}
            <span className="text-gold-gradient block mt-1">
              Shaping Policy & Empowering Communities.
            </span>
          </h2>

          <p className="text-base text-gray-300 font-normal leading-relaxed">
            Legal analysis on regulatory updates, corporate governance white papers, executive training masterclasses, and our dedicated pro bono access to justice initiatives.
          </p>
        </div>

        {/* Magazine-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              className="glass-card-dark rounded-sm border border-[#143D73]/40 hover:border-[#C8A84F]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between group transform hover:-translate-y-1.5"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#081826]/90 border border-[#C8A84F]/40 text-[#C8A84F] px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C8A84F]" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C8A84F]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-extrabold text-white group-hover:text-[#C8A84F] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#C8A84F]">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="hover:underline flex items-center gap-1"
                >
                  <span>Read Publication</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* CSR & Pro Bono Spotlight Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#143D73] via-[#0D2438] to-[#143D73] p-8 lg:p-12 rounded-sm border border-[#C8A84F]/40 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#C8A84F]/20 text-[#C8A84F] text-[11px] font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 text-[#C8A84F]" />
                Pro Bono & Community Access to Justice
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Racheykaf Chamber Legal Aid & Mentorship Initiative
              </h3>

              <p className="text-sm text-gray-200 leading-relaxed">
                We dedicate over 500 hours annually to pro bono representation for under-represented individuals, community mediation in FCT Abuja, and sponsoring young law graduates through mentorship and university scholarships.
              </p>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <div className="p-6 bg-[#081826]/80 rounded-sm border border-[#C8A84F]/30 text-white space-y-2">
                <span className="text-3xl font-heading font-extrabold text-gold-gradient block">
                  500+ Hours
                </span>
                <span className="text-xs uppercase tracking-wider text-gray-300 font-bold block">
                  Annual Pro Bono Service Dedicated
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Full View Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#081826] text-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-sm border border-[#C8A84F]/40 shadow-2xl relative p-8">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-xs text-[#C8A84F]">
                  <span className="px-2.5 py-1 bg-[#143D73] rounded-xs uppercase font-bold tracking-wider">
                    {selectedArticle.category}
                  </span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  {selectedArticle.title}
                </h2>

                <p className="text-xs text-gray-400 italic font-medium">
                  By {selectedArticle.author} • Racheykaf Chamber Thought Leadership Series
                </p>

                <div className="h-64 rounded-sm overflow-hidden my-4 border border-white/10">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4 text-sm text-gray-200 leading-relaxed">
                  {selectedArticle.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#C8A84F]" />
                    {selectedArticle.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 bg-[#143D73] text-gray-200 rounded-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: selectedArticle.title,
                          text: selectedArticle.summary,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Publication link copied to clipboard!');
                      }
                    }}
                    className="px-4 py-2 border border-[#C8A84F]/40 text-[#C8A84F] text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#C8A84F] hover:text-[#081826] flex items-center gap-2"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Insights</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
