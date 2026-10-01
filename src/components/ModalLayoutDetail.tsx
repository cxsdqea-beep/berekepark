import React, { useState, useEffect } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  MessageCircle, 
  Maximize2, 
  Users, 
  CheckCircle2, 
  Calendar 
} from 'lucide-react';
import type { ApartmentLayout } from '../types';
import { CONTACT_INFO, getLocalizedLayout } from '../data/projectData';
import { useLanguage } from '../context/LanguageContext';

interface ModalLayoutDetailProps {
  layout: ApartmentLayout | null;
  onClose: () => void;
  onBookConsultation: (layoutName: string) => void;
}

export const ModalLayoutDetail: React.FC<ModalLayoutDetailProps> = ({
  layout,
  onClose,
  onBookConsultation,
}) => {
  const { t, lang } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const currentLayout = layout ? getLocalizedLayout(layout, lang) : null;

  // Reset zoom whenever a new layout opens
  useEffect(() => {
    setZoomLevel(1);
  }, [layout]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (layout) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [layout, onClose]);

  if (!currentLayout) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      id="modal-layout-detail"
      className="fixed inset-0 z-[999] flex items-center justify-center p-2.5 sm:p-6 pt-[calc(env(safe-area-inset-top,12px)+8px)] pb-[calc(env(safe-area-inset-bottom,12px)+8px)] bg-slate-900/65 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white border border-sky-200 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[calc(100dvh-env(safe-area-inset-top,16px)-env(safe-area-inset-bottom,16px)-20px)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-sky-100 bg-sky-50/80 shrink-0">
          <div className="min-w-0 pr-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-sky-700 block truncate">
              {t.modals.layoutTitle} • Bereke Park
            </span>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-brand-navy leading-tight truncate">
              {currentLayout.title} ({currentLayout.totalArea} {t.layouts.sqm})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-sky-100 border border-sky-200 text-slate-700 flex items-center justify-center transition-colors focus:outline-none shadow-sm shrink-0"
            aria-label={t.modals.close}
          >
            <X className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {/* Modal Body: Two columns (Visual Plan Left, Specs Right) */}
        <div className="flex-1 overflow-y-auto overscroll-contain grid grid-cols-1 lg:grid-cols-12 bg-white">
          
          {/* Left Column: Interactive Floor Plan with Zoom */}
          <div className="lg:col-span-7 bg-slate-50/60 p-4 sm:p-6 flex flex-col items-center justify-center relative min-h-[240px] sm:min-h-[420px] border-b lg:border-b-0 lg:border-r border-sky-100 overflow-hidden">
            {/* Zoom Controls */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1 p-1 rounded-xl bg-white/95 backdrop-blur-md border border-sky-200 shadow-md">
              <button
                onClick={handleZoomIn}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-sky-100 text-sky-700 flex items-center justify-center transition-colors"
                title={t.modals.zoomIn}
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-sky-100 text-sky-700 flex items-center justify-center transition-colors"
                title={t.modals.zoomOut}
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
              </button>
              <button
                onClick={handleResetZoom}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-sky-100 text-slate-500 flex items-center justify-center transition-colors"
                title={t.modals.resetZoom}
              >
                <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>

            {/* Plan Image Container */}
            <div className="w-full h-full flex items-center justify-center overflow-auto p-2 sm:p-4">
              <img
                src={currentLayout.image}
                alt={currentLayout.title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = currentLayout.fallbackImage;
                }}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.25s ease-out',
                }}
                className="max-h-[220px] sm:max-h-[380px] max-w-full object-contain filter drop-shadow-[0_15px_20px_rgba(2,132,199,0.15)]"
              />
            </div>

            <div className="text-[11px] text-slate-500 text-center pt-1 sm:pt-2">
              {t.modals.zoomHint}
            </div>
          </div>

          {/* Right Column: Room Details & Specs */}
          <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-white relative">
            <div>
              {/* Quick specs grid */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">{t.modals.ceilingHeight}</span>
                  <span className="font-mono font-bold text-brand-navy text-base flex items-center gap-1.5 mt-0.5">
                    <Maximize2 className="w-3.5 h-3.5 text-sky-600" />
                    {currentLayout.ceilingHeight} {t.layouts.meters}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 uppercase tracking-wider block font-semibold">{t.modals.neighbors}</span>
                  <span className="font-mono font-bold text-emerald-700 text-base flex items-center gap-1.5 mt-0.5">
                    <Users className="w-3.5 h-3.5" />
                    {t.modals.oneNeighbor}
                  </span>
                </div>
              </div>

              {/* Room Breakdown (Экспликация) */}
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-sky-700 mb-3">
                {t.modals.roomBreakdown}
              </h4>
              <div className="space-y-1.5 mb-6 max-h-56 overflow-y-auto pr-1">
                {currentLayout.roomDetails.map((room, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-sky-50/50 border border-sky-100"
                  >
                    <span className="text-slate-700 font-medium">{room.name}</span>
                    <span className="font-mono font-bold text-brand-navy shrink-0">
                      {room.area} {t.layouts.sqm}
                    </span>
                  </div>
                ))}
              </div>

              {/* Core Features */}
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-sky-700 mb-3">
                {t.modals.lotFeatures}
              </h4>
              <div className="space-y-2 mb-6">
                {currentLayout.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: sticky on mobile so buttons are never clipped */}
            <div className="sticky bottom-0 lg:static bg-white/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none pt-3 pb-3 sm:pb-4 lg:py-0 px-4 -mx-4 sm:px-6 sm:-mx-6 lg:mx-0 lg:px-0 mt-4 border-t border-sky-100 flex flex-col gap-2.5 z-20 shadow-[0_-8px_16px_rgba(0,0,0,0.04)] lg:shadow-none">
              <a
                href={CONTACT_INFO.whatsappDirect(currentLayout.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{t.modals.priceInWhatsapp}</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onBookConsultation(currentLayout.title);
                }}
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl sky-gradient-bg text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 text-center"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="truncate">{t.modals.bookTourOnSite}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
