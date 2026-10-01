import React, { useState } from 'react';
import { 
  Phone, 
  User, 
  Send, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  Clock, 
  Building2 
} from 'lucide-react';
import { CONTACT_INFO } from '../data/projectData';
import { ScrollBlurReveal } from './ScrollBlurReveal';
import { useLanguage } from '../context/LanguageContext';

interface LeadFormProps {
  initialRoomChoice?: string;
  onSuccess?: () => void;
  isModal?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({ 
  initialRoomChoice = '3-комнатная (140.6 м²)', 
  onSuccess, 
  isModal = false 
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [roomType, setRoomType] = useState(initialRoomChoice);
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'call'>('whatsapp');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Kazakhstan / CIS phone format helper
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.startsWith('8')) raw = '7' + raw.slice(1);
    if (!raw.startsWith('7') && raw.length > 0) raw = '7' + raw;

    let formatted = '+7';
    if (raw.length > 1) formatted += ' (' + raw.substring(1, 4);
    if (raw.length >= 5) formatted += ') ' + raw.substring(4, 7);
    if (raw.length >= 8) formatted += '-' + raw.substring(7, 9);
    if (raw.length >= 10) formatted += '-' + raw.substring(9, 11);

    setPhone(formatted);
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(t.leadForm.errorName);
      return;
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 11) {
      setError(t.leadForm.errorPhone);
      return;
    }

    setSubmitted(true);
    if (onSuccess) onSuccess();

    // Prepare direct WhatsApp message in background for instant follow-up
    const waText = encodeURIComponent(
      `Здравствуйте! Заявка с сайта Bereke Park:\nИмя: ${name}\nТелефон: ${phone}\nИнтересует: ${roomType}\nУдобный способ связи: ${preferredContact === 'whatsapp' ? 'WhatsApp' : 'Звонок'}`
    );
    const directWaUrl = `https://wa.me/77777118080?text=${waText}`;

    setTimeout(() => {
      if (preferredContact === 'whatsapp') {
        window.open(directWaUrl, '_blank');
      }
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="text-center py-10 px-4 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 mb-6 animate-bounce shadow-sm">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy mb-2">
          {t.leadForm.successTitle}
        </h3>
        <p className="text-sm text-slate-600 max-w-md font-normal mb-6">
          {t.leadForm.successDesc}
        </p>

        <a
          href={CONTACT_INFO.whatsappDirect(roomType)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs uppercase font-bold tracking-wider transition-all shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.leadForm.chatWhatsappNow}</span>
        </a>
      </div>
    );
  }

  const formElement = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs uppercase tracking-wider text-sky-700 font-bold mb-1.5">
          {t.leadForm.inputName}
        </label>
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            placeholder={t.leadForm.namePlaceholder}
            required
            className="w-full px-4 py-3.5 pl-11 rounded-xl bg-white border border-sky-200 text-brand-navy placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-sm"
          />
          <User className="w-4 h-4 text-sky-600 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-sky-700 font-bold mb-1.5">
          {t.leadForm.inputPhone}
        </label>
        <div className="relative">
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+7 (777) 123-45-67"
            required
            className="w-full px-4 py-3.5 pl-11 rounded-xl bg-white border border-sky-200 text-brand-navy placeholder:text-slate-400 font-mono text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-sm"
          />
          <Phone className="w-4 h-4 text-sky-600 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-sky-700 font-bold mb-1.5">
          {t.leadForm.selectLayout}
        </label>
        <div className="relative">
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full px-4 py-3.5 pl-11 rounded-xl bg-white border border-sky-200 text-brand-navy text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all appearance-none cursor-pointer shadow-sm"
          >
            <option value="2-комнатная (81.4 м²)">{t.leadForm.options.comfort81}</option>
            <option value="2-комнатная (93.8 м²)">{t.leadForm.options.grand93}</option>
            <option value="3-комнатная (125.2 м²)">{t.leadForm.options.premium125}</option>
            <option value="3-комнатная (140.6 м²)">{t.leadForm.options.lakeDeluxe140}</option>
            <option value="4-комнатная (165.3 м²)">{t.leadForm.options.grandRes165}</option>
            <option value="4-комнатный Пентхаус (188.5 м²)">{t.leadForm.options.penthouse188}</option>
            <option value="Коммерческое помещение">{t.leadForm.options.commercial}</option>
          </select>
          <Building2 className="w-4 h-4 text-sky-600 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">
          {t.leadForm.preferredContact}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPreferredContact('whatsapp')}
            className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              preferredContact === 'whatsapp'
                ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-sm'
                : 'bg-white border-sky-100 text-slate-600 hover:bg-sky-50'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.leadForm.viaWhatsapp}</span>
          </button>

          <button
            type="button"
            onClick={() => setPreferredContact('call')}
            className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              preferredContact === 'call'
                ? 'bg-sky-50 border-sky-400 text-sky-700 shadow-sm'
                : 'bg-white border-sky-100 text-slate-600 hover:bg-sky-50'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-sky-600" />
            <span>{t.leadForm.phoneCall}</span>
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl sky-gradient-bg text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-105 active:scale-98 transition-all shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 mt-4"
      >
        <Send className="w-4 h-4" />
        <span>{t.leadForm.btnSubmit}</span>
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2 text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
        <span>{t.leadForm.privacyNote}</span>
      </div>
    </form>
  );

  if (isModal) {
    return formElement;
  }

  return (
    <section id="contacts" className="relative pt-16 pb-24 sm:pt-20 sm:pb-28 bg-gradient-to-b from-[#F0F8FF] via-[#EBF5FB] to-white overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="hidden sm:block absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollBlurReveal>
          <div className="rounded-2xl sm:rounded-3xl border border-sky-200 bg-white p-5 sm:p-10 lg:p-16 shadow-xl shadow-sky-900/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Call to Action Information */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200/80 mb-4 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-sky-700">
                    {t.leadForm.badge}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-brand-navy mb-4 sm:mb-6 leading-tight">
                  {t.leadForm.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed mb-6 sm:mb-8">
                  {t.leadForm.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-4 border-t border-sky-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-brand-navy">{t.leadForm.workingHoursTitle}</span>
                      <span className="block text-[11px] text-slate-500">{t.leadForm.workingHoursValue}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-brand-navy">{t.leadForm.directWhatsapp}</span>
                      <span className="block text-[11px] text-slate-500 font-mono font-medium">{CONTACT_INFO.phoneDisplay}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-sky-50/70 via-white to-sky-50/50 p-5 sm:p-8 rounded-2xl border border-sky-200 shadow-lg shadow-sky-900/5 relative">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy mb-1.5 sm:mb-2">
                  {t.leadForm.fillForm}
                </h3>
                <p className="text-xs text-slate-500 mb-5 sm:mb-6">
                  {t.leadForm.fillFormDesc}
                </p>
                {formElement}
              </div>

            </div>
          </div>
        </ScrollBlurReveal>
      </div>
    </section>
  );
};

