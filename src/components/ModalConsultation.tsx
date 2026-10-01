import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { useLanguage } from '../context/LanguageContext';

interface ModalConsultationProps {
  isOpen: boolean;
  onClose: () => void;
  presetRoom?: string;
}

export const ModalConsultation: React.FC<ModalConsultationProps> = ({
  isOpen,
  onClose,
  presetRoom = '3-комнатная (140.6 м²)',
}) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-consultation"
      className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 pt-[calc(env(safe-area-inset-top,12px)+8px)] pb-[calc(env(safe-area-inset-bottom,12px)+8px)] bg-slate-900/65 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-sky-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[calc(100dvh-env(safe-area-inset-top,16px)-env(safe-area-inset-bottom,16px)-20px)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-200/40 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-sky-100 border border-sky-200 text-slate-700 flex items-center justify-center transition-colors focus:outline-none shadow-sm"
          aria-label={t.modals.close}
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-700 text-[10px] uppercase font-bold tracking-wider mb-2 shadow-sm">
            <Sparkles className="w-3 h-3 text-sky-600" />
            <span>Bereke Park</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-brand-navy">
            {t.modals.consultationTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {t.modals.consultationSubtitle}
          </p>
        </div>

        <LeadForm
          initialRoomChoice={presetRoom}
          isModal={true}
          onSuccess={() => {
            // keep open for confirmation message
          }}
        />
      </div>
    </div>
  );
};
