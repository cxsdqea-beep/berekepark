import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Search, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { LAYOUTS_DATA, CONTACT_INFO, getLocalizedLayout } from '../data/projectData';
import type { ApartmentLayout } from '../types';
import { ScrollBlurReveal } from './ScrollBlurReveal';
import { useLanguage } from '../context/LanguageContext';

interface LayoutsProps {
  onSelectLayout: (layout: ApartmentLayout) => void;
  onOpenConsultation: () => void;
}

export const Layouts: React.FC<LayoutsProps> = ({ onSelectLayout, onOpenConsultation }) => {
  const [selectedRooms, setSelectedRooms] = useState<2 | 3 | 4>(3);
  const { t, lang } = useLanguage();

  const fromText = lang === 'en' ? 'from' : lang === 'kz' ? 'бастап' : 'от';

  const roomTabs: { value: 2 | 3 | 4; label: string; badge: string }[] = [
    { value: 2, label: t.layouts.tab2Rooms, badge: `${fromText} 81.4 ${t.layouts.sqm}` },
    { value: 3, label: t.layouts.tab3Rooms, badge: `${fromText} 125.2 ${t.layouts.sqm}` },
    { value: 4, label: t.layouts.tab4Rooms, badge: `${fromText} 165.3 ${t.layouts.sqm}` },
  ];

  const bannerText = {
    ru: {
      title: 'Нужна индивидуальная подборка планировки или объединение квартир?',
      desc: 'Архитектурная служба застройщика подготовит индивидуальный проект и вышлет презентацию всех свободных вариантов.',
      btn: 'Получить подборку',
    },
    kz: {
      title: 'Жеке пәтер жоспарлауын таңдау немесе пәтерлерді біріктіру қажет пе?',
      desc: 'Құрылыс салушының сәулет бөлімі жеке жоба дайындап, барлық бос пәтерлердің тұсаукесерін жібереді.',
      btn: 'Таңдауды алу',
    },
    en: {
      title: 'Need a custom floor plan selection or apartment combination?',
      desc: 'The developer’s architectural team will prepare a personalized layout proposal and present all available residences.',
      btn: 'Get Custom Selection',
    },
  }[lang];

  const filteredLayouts = LAYOUTS_DATA.filter((layout) => layout.rooms === selectedRooms);

  return (
    <section id="layouts" className="relative py-20 sm:py-28 bg-gradient-to-b from-[#F8FAFC] via-[#F0F8FF] to-white overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="hidden sm:block absolute top-1/3 right-0 w-[550px] h-[550px] bg-sky-100/60 rounded-full blur-[180px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-10 left-10 w-[400px] h-[400px] bg-sky-200/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200/80 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-sky-700">
              {t.layouts.badge}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            {t.layouts.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {t.layouts.desc}
          </p>
        </div>

        {/* Room Switcher Tabs */}
        <div className="flex justify-start sm:justify-center mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
          <div className="inline-flex p-1 sm:p-1.5 rounded-2xl bg-white border border-sky-200/90 shadow-md shadow-sky-900/5 shrink-0 mx-auto">
            {roomTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedRooms(tab.value)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                  selectedRooms === tab.value
                    ? 'sky-gradient-bg text-white shadow-md shadow-sky-500/25 font-bold'
                    : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold ${
                    selectedRooms === tab.value
                      ? 'bg-white/20 text-white'
                      : 'bg-sky-100 text-sky-700'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Layouts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredLayouts.map((rawLayout, idx) => {
            const layout = getLocalizedLayout(rawLayout, lang);
            return (
              <ScrollBlurReveal key={layout.id} delay={idx * 0.12} className="h-full">
                <div
                  className="bg-white rounded-3xl overflow-hidden border border-sky-200/90 shadow-md shadow-sky-900/5 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-900/10 transition-all duration-300 flex flex-col justify-between group h-full"
                >
                <div>
                {/* Image Container with Plan Render */}
                <div
                  onClick={() => onSelectLayout(layout)}
                  className="relative h-72 sm:h-80 bg-gradient-to-b from-sky-50/80 via-white to-sky-50/40 p-6 flex items-center justify-center cursor-pointer overflow-hidden border-b border-sky-100"
                >
                  <img
                    src={layout.image}
                    alt={layout.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = layout.fallbackImage;
                    }}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_10px_20px_rgba(2,132,199,0.15)]"
                    loading="lazy"
                  />

                  {/* Badges on plan preview */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-3 py-1 rounded-full bg-brand-navy/90 backdrop-blur-md border border-sky-300/50 text-xs font-serif font-bold text-white shadow-sm">
                      {layout.totalArea} {t.layouts.sqm}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-sky-200 text-[10px] font-semibold text-slate-700 shadow-sm">
                      {t.layouts.ceiling} {layout.ceilingHeight} {t.layouts.meters}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[10px] font-bold text-emerald-700 shadow-sm">
                      1 {t.hero.stats.neighbors}
                    </span>
                  </div>

                  {/* Hover zoom hint */}
                  <div className="absolute inset-0 bg-sky-900/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs uppercase tracking-wider font-semibold">
                    <div className="px-5 py-2.5 rounded-full bg-brand-navy text-white font-bold flex items-center gap-1.5 shadow-xl border border-sky-400">
                      <Search className="w-4 h-4 text-sky-400" />
                      <span>{t.layouts.btnDetails}</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-brand-navy group-hover:text-sky-600 transition-colors">
                        {layout.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-sky-600 font-semibold mt-0.5">
                        {layout.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Quick Metrics Bar */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 py-3 sm:py-4 my-4 border-y border-sky-100 bg-sky-50/50 rounded-xl px-2 sm:px-3">
                    <div className="text-center px-1 min-w-0">
                      <span className="block text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-tight sm:tracking-wider font-semibold truncate">{t.layouts.totalArea}</span>
                      <span className="font-mono font-bold text-xs sm:text-base text-brand-navy block mt-0.5">{layout.totalArea} {t.layouts.sqm}</span>
                    </div>
                    <div className="text-center border-x border-sky-200/60 px-1 min-w-0">
                      <span className="block text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-tight sm:tracking-wider font-semibold truncate">{t.layouts.livingArea}</span>
                      <span className="font-mono font-bold text-xs sm:text-base text-brand-navy block mt-0.5">{layout.livingArea} {t.layouts.sqm}</span>
                    </div>
                    <div className="text-center px-1 min-w-0">
                      <span className="block text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-tight sm:tracking-wider font-semibold truncate">{t.layouts.kitchenArea}</span>
                      <span className="font-mono font-bold text-xs sm:text-base text-brand-navy block mt-0.5">{layout.kitchenArea} {t.layouts.sqm}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {layout.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                    {layout.highlights.slice(0, 4).map((hl, hlIdx) => (
                      <div key={hlIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onSelectLayout(layout)}
                  className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs uppercase tracking-wider border border-sky-200 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Search className="w-3.5 h-3.5 text-sky-600" />
                  <span>{t.layouts.btnDetails}</span>
                </button>

                <a
                  href={CONTACT_INFO.whatsappDirect(layout.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 py-3 px-4 rounded-xl sky-gradient-bg text-white font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.layouts.btnReserve}</span>
                </a>
              </div>
            </div>
          </ScrollBlurReveal>
        );
      })}
      </div>

        {/* Custom Layout Consultation Banner */}
        <div className="mt-14 rounded-3xl p-8 bg-gradient-to-r from-sky-50 via-white to-sky-100/70 border border-sky-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md shadow-sky-900/5">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy mb-2">
              {bannerText.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              {bannerText.desc}
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="shrink-0 px-8 py-3.5 rounded-full sky-gradient-bg text-white font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2"
          >
            <span>{bannerText.btn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
