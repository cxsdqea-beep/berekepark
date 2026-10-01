import React, { useState } from 'react';
import { MessageCircle, Phone, ArrowUp, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/projectData';
import { useLanguage } from '../context/LanguageContext';

interface FloatingContactProps {
  isHidden?: boolean;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({ isHidden = false }) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isHidden) return null;

  return (
    <aside
      aria-label={t.floating.quickContact}
      className="fixed right-3 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 18px)' }}
    >
      {/* Expanded quick contact actions */}
      {expanded && (
        <div className="flex flex-col gap-2.5 mb-1 animate-fade-in">
          {/* Quick Call */}
          <a
            href={`tel:${CONTACT_INFO.phoneClean}`}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white border border-sky-200 text-brand-navy shadow-xl hover:border-sky-400 transition-all text-xs font-semibold group min-h-[44px]"
            title={t.floating.callSales}
          >
            <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span>{t.floating.callSales}: {CONTACT_INFO.phoneDisplay}</span>
          </a>

          {/* Quick Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center justify-end gap-3 px-4 py-2 rounded-full bg-white border border-sky-200 text-slate-600 hover:text-sky-600 shadow-lg text-xs font-medium transition-all min-h-[44px]"
            title={t.floating.scrollToTop}
          >
            <span>{t.floating.scrollToTop}</span>
            <div className="w-6 h-6 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Main Action Group: WhatsApp Button with Pulse & Quick Trigger */}
      <div className="flex items-center gap-2.5">
        {/* Toggle helper */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-10 h-10 rounded-full bg-white border border-sky-200 text-slate-700 hover:text-sky-600 flex items-center justify-center shadow-md transition-transform active:scale-90"
          aria-label={expanded ? t.floating.closeContacts : t.floating.openContacts}
        >
          {expanded ? <X className="w-4 h-4 text-sky-600" /> : <Phone className="w-4 h-4 text-sky-600" />}
        </button>

        {/* Primary WhatsApp Floating Button */}
        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group flex items-center gap-2.5 pl-3.5 pr-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-900/20 active:scale-95 transition-all duration-300 min-h-[48px] min-w-[48px]"
          aria-label="WhatsApp"
        >
          {/* Pulsing Green Indicator Badge */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 text-[9px] font-bold text-black items-center justify-center shadow-sm">
              1
            </span>
          </span>

          <MessageCircle className="w-5 h-5 text-white" />

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[10px] leading-none uppercase font-bold tracking-wider text-emerald-100">
              {t.floating.salesOffice}
            </span>
            <span className="text-xs leading-none font-bold text-white mt-1">
              {t.floating.whatsappOnline}
            </span>
          </div>
        </a>
      </div>
    </aside>
  );
};
