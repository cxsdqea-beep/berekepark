import React, { useState } from 'react';
import { ZoomIn, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { GALLERY_DATA, CONTACT_INFO } from '../data/projectData';
import type { GalleryItem } from '../types';
import { ScrollBlurReveal } from './ScrollBlurReveal';
import { useLanguage } from '../context/LanguageContext';

interface GalleryProps {
  onSelectImage: (item: GalleryItem, index: number) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectImage }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { t, lang } = useLanguage();

  const categories = [
    { id: 'all', label: t.gallery.tabAll },
    { id: 'construction', label: t.gallery.tabConstruction },
    { id: 'lake', label: t.gallery.tabLake },
    { id: 'architecture', label: t.gallery.tabArchitecture },
    { id: 'interior', label: t.gallery.tabInterior },
    { id: 'eco', label: lang === 'en' ? 'Eco Park & Grounds' : lang === 'kz' ? 'Экосаябақ & Аула' : 'Экопарк & Двор' },
  ];

  const instagramHint = {
    ru: 'Следите за ходом строительства:',
    kz: 'Құрылыс барысын бақылаңыз:',
    en: 'Follow construction progress:',
  }[lang];

  const getLocalizedCategoryLabel = (category: string) => {
    switch (category) {
      case 'architecture': return t.gallery.tabArchitecture;
      case 'lake': return t.gallery.tabLake;
      case 'interior': return t.gallery.tabInterior;
      case 'construction': return t.gallery.tabConstruction;
      case 'eco': return lang === 'en' ? 'Eco Park & Grounds' : lang === 'kz' ? 'Экосаябақ & Аула' : 'Экопарк & Двор';
      default: return t.gallery.tabAll;
    }
  };

  const getLocalizedStatusBadge = (badge?: string) => {
    if (!badge) return '';
    const map: Record<string, { ru: string; kz: string; en: string }> = {
      'Официальный буклет': { ru: 'Официальный буклет', kz: 'Ресми буклет', en: 'Official Brochure' },
      'Презентация проекта': { ru: 'Презентация проекта', kz: 'Жоба тұсаукесері', en: 'Project Presentation' },
      'Архитектура': { ru: 'Архитектура', kz: 'Сәулет', en: 'Architecture' },
      'Экосистема': { ru: 'Экосистема', kz: 'Экожүйе', en: 'Ecosystem' },
      'Дизайн интерьера': { ru: 'Дизайн интерьера', kz: 'Интерьер дизайны', en: 'Interior Design' },
      'Официальный рендер': { ru: 'Официальный рендер', kz: 'Ресми рендер', en: 'Official Render' },
      'Дизайн лобби': { ru: 'Дизайн лобби', kz: 'Лобби дизайны', en: 'Lobby Design' },
      'Стройка вживую': { ru: 'Стройка вживую', kz: 'Нақты құрылыс', en: 'Live Construction' },
    };
    return map[badge]?.[lang] || badge;
  };

  const filteredItems = activeCategory === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="relative py-20 sm:py-28 bg-gradient-to-b from-white via-[#F0F8FF] to-[#F8FAFC] overflow-hidden">
      {/* Background decorations */}
      <div className="hidden sm:block absolute top-1/2 left-0 w-96 h-96 bg-sky-100/60 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200/80 mb-4 shadow-sm">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-sky-700">
                {t.gallery.badge}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-navy">
              {t.gallery.title}
            </h2>
          </div>

          {/* Instagram Profile Link */}
          <a
            href={CONTACT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-white hover:bg-sky-50 border border-sky-200 text-slate-700 hover:text-pink-600 transition-all duration-300 text-xs sm:text-sm font-semibold shadow-sm group"
          >
            <InstagramIcon className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform shrink-0" />
            <span className="hidden xs:inline">{instagramHint}</span>
            <span className="font-mono text-sky-600 group-hover:text-pink-600 group-hover:underline">
              {CONTACT_INFO.instagram}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          </a>
        </div>

        {/* Filter Categories Tabs */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-8 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'sky-gradient-bg text-white shadow-md shadow-sky-500/25 font-bold'
                  : 'bg-white text-slate-600 hover:text-sky-600 hover:bg-sky-50 border border-sky-200/80 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <ScrollBlurReveal key={item.id} delay={(index % 4) * 0.08} className="h-full">
              <div
                onClick={() => onSelectImage(item, index)}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-sky-100 bg-slate-900"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = item.fallbackImage;
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Status Badge */}
                {item.statusBadge && (
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-sky-800 shadow-sm">
                      {getLocalizedStatusBadge(item.statusBadge)}
                    </span>
                  </div>
                )}

                {/* Zoom Trigger Icon */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md group-hover:scale-105">
                  <ZoomIn className="w-4 h-4 text-sky-600" />
                </div>

                {/* Bottom Details Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 transform transition-transform duration-300">
                  <span className="text-[10px] font-semibold text-sky-300 uppercase tracking-widest block mb-1">
                    {getLocalizedCategoryLabel(item.category)}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white leading-snug drop-shadow line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollBlurReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
