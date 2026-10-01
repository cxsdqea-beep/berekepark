import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/projectData';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '#architecture-3d', label: t.nav.tour3d },
    { href: '#concept', label: t.nav.concept },
    { href: '#advantages', label: t.nav.advantages },
    { href: '#layouts', label: t.nav.layouts },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#construction', label: t.nav.construction },
    { href: '#location', label: t.nav.location },
    { href: '#contacts', label: t.nav.contacts },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 sm:bg-white/95 sm:backdrop-blur-lg border-b border-sky-100 shadow-[0_8px_30px_rgba(2,132,199,0.08)] py-2.5 sm:py-3'
            : 'bg-white/95 sm:bg-white/85 sm:backdrop-blur-md border-b border-sky-100/70 shadow-[0_4px_20px_rgba(2,132,199,0.04)] py-3 sm:py-4'
        }`}
      >
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0" aria-label="Bereke Park Главная">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-sky-300/80 flex items-center justify-center bg-gradient-to-br from-sky-50 to-white group-hover:border-sky-500 transition-colors duration-300 shadow-sm shrink-0">
                <span className="font-serif text-sky-600 group-hover:text-sky-700 font-bold text-base sm:text-lg tracking-wider">BP</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.18em] sm:tracking-[0.2em] uppercase text-base sm:text-xl font-bold text-brand-navy group-hover:text-sky-700 transition-colors leading-tight">
                  Bereke Park
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-sky-600 font-semibold -mt-0.5">
                  Aktobe • De Luxe
                </span>
              </div>
            </a>

            {/* Desktop Navigation (shown on xl+ screens to prevent any overlap) */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-medium tracking-wide">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-600 hover:text-sky-600 transition-colors relative py-1 group font-medium"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sky-500 transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              ))}
            </nav>

            {/* Right Action Area */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Language Switcher (KZ | RU | EN) */}
              <LanguageSwitcher className="hidden sm:inline-flex" />

              {/* WhatsApp direct button (desktop/tablet) */}
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full border border-emerald-400/50 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 text-xs font-semibold tracking-wide transition-all duration-300 hover:border-emerald-500 shadow-sm shrink-0 whitespace-nowrap"
                title="WhatsApp"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>WhatsApp</span>
              </a>

              {/* Consultation trigger button */}
              <button
                onClick={onOpenConsultation}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider sky-gradient-bg text-white hover:brightness-105 active:scale-95 transition-all duration-200 shadow-md shadow-sky-500/20 shrink-0 whitespace-nowrap"
              >
                <span>{t.nav.consultation}</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              {/* Mobile WhatsApp Quick Icon (screens < 640px) */}
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex sm:hidden w-9 h-9 rounded-full items-center justify-center bg-emerald-50 border border-emerald-300/70 text-emerald-600 active:scale-95 shadow-sm shrink-0"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Hamburger Button (shown below xl screens) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex xl:hidden w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-200/80 text-brand-navy focus:outline-none active:scale-90 transition-all shadow-sm shrink-0"
                aria-label={mobileMenuOpen ? t.floating.closeContacts : t.floating.openContacts}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-sky-600" /> : <Menu className="w-5 h-5 text-slate-700" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile / Tablet Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between p-6 xl:hidden overflow-y-auto ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 24px) + 80px)' }}
      >
        <div className="flex flex-col gap-6 max-w-lg mx-auto w-full">
          <div className="flex items-center justify-between border-b border-sky-100 pb-3 gap-2">
            <span className="text-xs uppercase tracking-[0.25em] text-sky-600 font-bold">{t.nav.siteNavigation}</span>
            <LanguageSwitcher showIcon={false} />
          </div>

          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl sm:text-2xl font-serif text-brand-navy hover:text-sky-600 transition-colors flex items-center justify-between border-b border-sky-50 pb-2.5 group"
              >
                <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                <span className="text-xs text-sky-500 font-sans font-mono tracking-wider">→</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Drawer Bottom Contacts */}
        <div className="flex flex-col gap-4 pt-6 border-t border-sky-100 max-w-lg mx-auto w-full">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium">{t.nav.salesOffice}:</span>
            <a
              href={`tel:${CONTACT_INFO.phoneClean}`}
              className="text-xl font-mono font-bold text-brand-navy hover:text-sky-600 flex items-center gap-2 mt-1"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              {CONTACT_INFO.phoneDisplay}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-1">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 font-semibold text-xs active:scale-95 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl sky-gradient-bg text-white font-bold text-xs uppercase tracking-wider active:scale-95 shadow-md shadow-sky-500/20"
            >
              <span>{t.nav.consultation}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2">
            {t.footer.addressLabel} {t.infrastructure.addressText}
          </div>
        </div>
      </div>
    </>
  );
};
