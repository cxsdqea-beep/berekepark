import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ArrowUp
} from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CONTACT_INFO } from '../data/projectData';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toTopLabels = {
    ru: 'Наверх',
    kz: 'Жоғарыға',
    en: 'To Top',
  };

  return (
    <footer className="w-full bg-[#0C2340] border-t border-sky-900/60 text-white relative z-10">
      <div className="w-full max-w-[1780px] mx-auto px-5 sm:px-12 lg:px-20 pt-12 sm:pt-16 pb-[calc(env(safe-area-inset-bottom,16px)+36px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16 mb-12 sm:mb-14">
          
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-sky-400/40 flex items-center justify-center bg-sky-950/60 shadow-sm">
                <span className="font-serif text-sky-400 font-bold text-lg">BP</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.2em] uppercase text-xl font-bold text-white">
                  Bereke Park
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-sky-400 font-semibold">
                  Aktobe • De Luxe
                </span>
              </div>
            </div>
            
            <p className="text-xs text-sky-200/80 font-normal leading-relaxed">
              {t.footer.aboutText}
            </p>

            <div className="text-xs text-sky-300 font-semibold pt-1">
              {t.footer.developerBadge}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-sky-400 font-bold">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-sky-100/80 font-normal">
              <li>
                <a href="#concept" className="hover:text-sky-300 transition-colors">
                  {t.nav.concept}
                </a>
              </li>
              <li>
                <a href="#advantages" className="hover:text-sky-300 transition-colors">
                  {t.nav.advantages}
                </a>
              </li>
              <li>
                <a href="#layouts" className="hover:text-sky-300 transition-colors">
                  {t.nav.layouts}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-sky-300 transition-colors">
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-sky-300 transition-colors">
                  {t.nav.location}
                </a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-sky-300 transition-colors">
                  {t.nav.contacts}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-sky-400 font-bold">
              {t.footer.contacts}
            </h4>
            <ul className="space-y-2.5 text-xs text-sky-100">
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phoneClean}`}
                  className="flex items-center gap-2 hover:text-sky-300 transition-colors font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 hover:text-sky-300 transition-colors font-mono"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{CONTACT_INFO.instagram}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Working Hours */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-sky-400 font-bold">
              {t.footer.addressLabel}
            </h4>
            <div className="space-y-2 text-xs text-sky-100/90 font-normal">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>{t.infrastructure.addressText}</span>
              </div>
              <p className="text-[11px] text-sky-300/80 pl-5">
                {t.infrastructure.directionHint}
              </p>
              <div className="pt-2 text-[11px] text-sky-200">
                <strong className="text-white block font-semibold">{t.footer.workingHoursLabel}</strong>
                {t.leadForm.workingHoursValue}
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href={CONTACT_INFO.maps2gisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] border border-white/10 transition-colors"
              >
                2ГИС
              </a>
              <a
                href={CONTACT_INFO.mapsYandexUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] border border-white/10 transition-colors"
              >
                Яндекс Карты
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-6 sm:pt-8 border-t border-sky-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-sky-300/70">
          <div>
            © {new Date().getFullYear()} ЖК «Bereke Park» ({lang === 'en' ? 'Aktobe, Kazakhstan' : lang === 'kz' ? 'Ақтөбе қ.' : 'г. Актобе'}). {t.footer.allRightsReserved}
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              {t.footer.privacyPolicy}
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors group font-semibold"
            >
              <span>{toTopLabels[lang]}</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
