import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const { t, lang } = useLanguage();
  const currentItem = items[currentIndex];

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (!currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 pt-[calc(env(safe-area-inset-top,16px)+20px)] pb-[calc(env(safe-area-inset-bottom,16px)+16px)] bg-slate-950/95 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Close button top right with safe area */}
      <button
        onClick={onClose}
        className="absolute top-[calc(env(safe-area-inset-top,16px)+10px)] right-4 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors focus:outline-none shadow-lg"
        aria-label={t.modals.close}
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Prev Navigation Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + items.length) % items.length);
        }}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all focus:outline-none shadow-md"
        aria-label={t.modals.prevPhoto}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
      </button>

      {/* Next Navigation Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % items.length);
        }}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all focus:outline-none shadow-md"
        aria-label={t.modals.nextPhoto}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
      </button>

      {/* Main Lightbox Card */}
      <div
        className="relative max-w-5xl w-full flex flex-col items-center justify-center max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[58vh] sm:max-h-[72vh] flex items-center justify-center overflow-hidden rounded-2xl">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = currentItem.fallbackImage;
            }}
            className="max-h-[58vh] sm:max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl"
          />
        </div>

        {/* Caption & Counter */}
        <div className="mt-4 w-full bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-sky-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-300 px-2.5 py-0.5 rounded-full bg-sky-500/20">
                {getLocalizedCategoryLabel(currentItem.category)}
              </span>
              <span className="text-xs text-sky-200/70 font-mono">
                {currentIndex + 1} / {items.length}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              {currentItem.title}
            </h3>
            <p className="text-xs text-sky-100/70 font-normal mt-0.5">
              {currentItem.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <span className="text-[11px] text-sky-300/80">Bereke Park • Aktobe</span>
          </div>
        </div>
      </div>
    </div>
  );
};
