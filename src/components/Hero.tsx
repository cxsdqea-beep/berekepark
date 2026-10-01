import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, ChevronDown, ShieldCheck, Waves, Maximize2, Users, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, lang } = useLanguage();

  const slideTitles: Record<'ru' | 'kz' | 'en', string[]> = {
    ru: [
      'Архитектурный ансамбль и озеро',
      'Парковая набережная озера',
      'Вечерняя подсветка резиденций',
    ],
    kz: [
      'Сәулеттік ансамбль және көл',
      'Көл жанындағы саябақ жағалауы',
      'Резиденциялардың кешкі жарығы',
    ],
    en: [
      'Architectural ensemble and lake',
      'Lakeside park promenade',
      'Evening illuminated residences',
    ],
  };

  const heroSlides = [
    {
      url: 'https://berekepark.kz/wp-content/uploads/2021/09/LG-I-638.jpg',
      fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
      title: slideTitles[lang][0],
    },
    {
      url: 'https://berekepark.kz/wp-content/uploads/2021/09/Lakeside-Promenade_1080.jpg',
      fallback: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85',
      title: slideTitles[lang][1],
    },
    {
      url: 'https://berekepark.kz/wp-content/uploads/2021/09/LG-I-856.jpg',
      fallback: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=85',
      title: slideTitles[lang][2],
    }
  ];

  // Auto-cycle through architectural photos every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between items-center overflow-hidden bg-brand-bg pt-[calc(env(safe-area-inset-top,20px)+80px)] sm:pt-28 pb-10 sm:pb-8">
      {/* Background Slideshow: Real Architecture & Lake Concept Photos */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = slide.fallback;
              }}
              className="w-full h-full object-cover sm:scale-105 filter brightness-[0.72] contrast-[1.05] sm:transition-transform sm:duration-10000 ease-out"
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
            />
          </div>
        ))}

        {/* Multi-layer Sky-Blue Celestial Vignette & Ambient Light */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#0C2340]/40 to-[#0C2340]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/50 via-transparent to-[#F8FAFC]" />
        
        {/* Soft celestial sky glow */}
        <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-400/20 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center my-auto w-full">
        {/* Upper Tag / Project Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-sky-200/90 mb-4 sm:mb-6 shadow-md shadow-sky-900/10 text-[10px] sm:text-xs max-w-[94vw]">
          <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <span className="font-bold tracking-wider sm:tracking-[0.16em] uppercase text-brand-navy truncate">
            {t.hero.badge}
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
          <span className="text-sky-600 font-bold uppercase tracking-wider hidden sm:inline-block whitespace-nowrap">
            De Luxe
          </span>
        </div>

        {/* Main H1 Headline */}
        <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-5xl leading-[1.22] sm:leading-[1.14] mb-4 sm:mb-6 drop-shadow-md break-words px-2 sm:px-0">
          {t.hero.titleMain}{' '}
          <span className="text-sky-300 font-extrabold inline sm:inline-block drop-shadow">
            {t.hero.titleSub}
          </span>
        </h1>

        {/* Subtitle description */}
        <p className="max-w-2xl text-xs xs:text-sm sm:text-base md:text-lg text-sky-100 font-normal leading-relaxed mb-6 sm:mb-8 drop-shadow px-2 sm:px-0">
          {t.hero.desc}
        </p>

        {/* Badges Bar (Grid on mobile, inline on desktop) */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-4xl mb-8 sm:mb-10 text-left">
          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-100 shadow-md shadow-sky-900/5 hover:border-sky-300 hover:shadow-lg transition-all">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 border border-sky-200/50">
              <Maximize2 className="w-4 h-4 text-sky-600" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-brand-navy leading-tight">{t.hero.stats.ceiling} 3.3 {t.layouts.meters}</span>
              <span className="block text-[11px] text-slate-500 leading-tight mt-0.5">{t.hero.stats.ceilingSub}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-100 shadow-md shadow-sky-900/5 hover:border-sky-300 hover:shadow-lg transition-all">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 border border-sky-200/50">
              <Waves className="w-4 h-4 text-sky-600" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-brand-navy leading-tight">{t.hero.stats.park}</span>
              <span className="block text-[11px] text-slate-500 leading-tight mt-0.5">{t.hero.stats.parkSub}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-100 shadow-md shadow-sky-900/5 hover:border-sky-300 hover:shadow-lg transition-all">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 border border-sky-200/50">
              <Users className="w-4 h-4 text-sky-600" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-brand-navy leading-tight">1 {t.hero.stats.neighbors}</span>
              <span className="block text-[11px] text-slate-500 leading-tight mt-0.5">{t.hero.stats.neighborsSub}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-100 shadow-md shadow-sky-900/5 hover:border-sky-300 hover:shadow-lg transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-200/50">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-brand-navy leading-tight">{t.hero.stats.infra}</span>
              <span className="block text-[11px] text-slate-500 leading-tight mt-0.5">{t.hero.stats.infraSub}</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <a
            href="#layouts"
            className="sky-gradient-bg text-white px-8 py-3.5 sm:py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>{t.hero.btnLayouts}</span>
          </a>

          <button
            onClick={onOpenConsultation}
            className="px-8 py-3.5 sm:py-4 rounded-full bg-white/95 hover:bg-white text-brand-navy font-semibold text-xs sm:text-sm uppercase tracking-wider border border-sky-200 hover:border-sky-300 active:scale-95 transition-all shadow-md shadow-sky-900/5 backdrop-blur-md flex items-center justify-center gap-2"
          >
            <span>{t.hero.btnVisit}</span>
          </button>
        </div>

        {/* Photo concept slide indicator */}
        <div className="mt-6 sm:mt-8 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 max-w-[94vw] overflow-hidden">
          <ImageIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="text-[10px] sm:text-[11px] text-white/90 font-medium truncate">
            {heroSlides[currentSlide].title}
          </span>
          <div className="flex gap-1 ml-2 shrink-0">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === i ? 'w-5 bg-sky-400' : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#architecture-3d"
        className="relative z-10 mt-4 sm:mt-0 flex flex-col items-center gap-1 text-slate-500 hover:text-sky-600 transition-colors duration-300 group py-1"
        aria-label={t.hero.btn3D}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-80 group-hover:opacity-100">
          {t.hero.btn3D}
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-sky-600" />
      </a>
    </section>
  );
};
