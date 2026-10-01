import React, { useState } from 'react';
import { 
  HardHat, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  ZoomIn, 
  ArrowRight,
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { CONSTRUCTION_REPORTS, getLocalizedConstructionReport } from '../data/projectData';
import { useLanguage } from '../context/LanguageContext';

interface ConstructionProgressProps {
  onOpenImageModal: (imageSrc: string, title: string) => void;
}

export const ConstructionProgress: React.FC<ConstructionProgressProps> = ({ onOpenImageModal }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { t, lang } = useLanguage();

  const currentReport = getLocalizedConstructionReport(CONSTRUCTION_REPORTS[activeIndex], lang);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CONSTRUCTION_REPORTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === CONSTRUCTION_REPORTS.length - 1 ? 0 : prev + 1));
  };

  const labels = {
    ru: {
      stage: 'Этап строительства',
      readiness: 'Готовность монолита и кладки',
      officialConfirmation: 'Официальное подтверждение застройщика',
      guarantee: '100% соблюдение СНиП РК и стандартов безопасности',
      viewAll: 'Смотреть все фотографии в галерее',
      zoom: 'Увеличить фото',
    },
    kz: {
      stage: 'Құрылыс кезеңі',
      readiness: 'Монолит пен қалаудың дайындығы',
      officialConfirmation: 'Құрылыс салушының ресми растауы',
      guarantee: 'ҚР ҚНжЕ және қауіпсіздік талаптарының 100% орындалуы',
      viewAll: 'Галереядағы барлық фотосуреттерді көру',
      zoom: 'Фотоны үлкейту',
    },
    en: {
      stage: 'Construction Stage',
      readiness: 'Monolithic Structure & Masonry Readiness',
      officialConfirmation: 'Official Developer Verification',
      guarantee: '100% compliance with Kazakhstan construction codes & standards',
      viewAll: 'Explore All Construction Photos',
      zoom: 'Enlarge Photo',
    },
  }[lang];

  return (
    <section id="construction" className="relative py-20 sm:py-28 bg-gradient-to-b from-[#F8FAFC] via-[#F0F8FF] to-white overflow-hidden scroll-mt-20">
      {/* Background Ambience */}
      <div className="hidden sm:block absolute top-1/3 left-0 w-96 h-96 bg-sky-100/70 rounded-full blur-[140px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-10 right-0 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200/80 mb-4 shadow-sm">
              <HardHat className="w-3.5 h-3.5 text-sky-600" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-sky-700">
                {t.construction.badge}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-navy">
              {t.construction.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mt-3 leading-relaxed">
              {t.construction.desc}
            </p>
          </div>

          {/* Slider Arrows & Counter */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-500 mr-2">
              0{activeIndex + 1} / 0{CONSTRUCTION_REPORTS.length}
            </span>
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 flex items-center justify-center text-slate-700 hover:text-sky-600 transition-all shadow-sm active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-xl sky-gradient-bg text-white flex items-center justify-center shadow-md shadow-sky-500/25 hover:brightness-105 transition-all active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Big Card with Interactive Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          
          {/* Left: Big Interactive Photo */}
          <div className="lg:col-span-7">
            <div 
              onClick={() => onOpenImageModal(currentReport.image, currentReport.title)}
              className="group relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-sky-200/90 shadow-2xl"
            >
              <img
                src={currentReport.image}
                alt={currentReport.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-sky-200 text-xs font-bold text-sky-800 shadow-md">
                  {currentReport.badge}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-md flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.construction.inProgress}</span>
                </span>
              </div>

              {/* Zoom Trigger Button */}
              <div className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-sky-200 flex items-center justify-center text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <ZoomIn className="w-5 h-5" />
              </div>

              {/* Bottom Photo Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                <span className="text-xs text-sky-300 font-mono flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentReport.date}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight drop-shadow-md">
                  {currentReport.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Right: Stage Details & Progress Bar */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-white rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-xl shadow-sky-900/5">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider mb-4">
                <TrendingUp className="w-4 h-4" />
                <span>{labels.stage}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy mb-4 leading-tight">
                {currentReport.stage}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-8">
                {currentReport.description}
              </p>

              {/* Progress Percentage Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="text-slate-500 uppercase tracking-wider">
                    {labels.readiness}
                  </span>
                  <span className="font-mono text-base text-sky-600 font-extrabold">
                    {currentReport.progressPercent}%
                  </span>
                </div>
                <div className="h-3 w-full bg-sky-100 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-sky-600 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${currentReport.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Quality Guarantee Box */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3 mb-8">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-brand-navy block font-semibold mb-0.5">{labels.officialConfirmation}</strong>
                  {labels.guarantee}
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <a
              href="#gallery"
              className="w-full py-3.5 px-6 rounded-2xl border border-sky-200 hover:border-sky-400 bg-sky-50/50 hover:bg-sky-100/70 text-sky-700 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group text-center shadow-sm"
            >
              <span>{labels.viewAll}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

        {/* Thumbnail Selector Strip */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {CONSTRUCTION_REPORTS.map((rawReport, idx) => {
            const report = getLocalizedConstructionReport(rawReport, lang);
            return (
              <button
                type="button"
                key={report.id}
                onClick={() => setActiveIndex(idx)}
                className={`p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all duration-300 border flex items-center gap-3 text-left w-full ${
                  activeIndex === idx
                    ? 'bg-white border-sky-500 shadow-md shadow-sky-900/10 ring-1 ring-sky-400'
                    : 'bg-white/80 border-sky-100 hover:border-sky-300 hover:bg-white shadow-sm'
                }`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 relative bg-slate-800">
                  <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover"
                  />
                  {activeIndex === idx && (
                    <div className="absolute inset-0 bg-sky-500/20 ring-2 ring-sky-500 inset-ring rounded-xl" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-xs font-mono text-sky-600 font-bold block">
                    {report.date}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-brand-navy block mt-0.5 truncate">
                    {report.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
