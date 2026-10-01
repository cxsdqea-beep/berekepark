import React from 'react';
import { useLanguage, type Language } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  showIcon?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '',
  showIcon = true 
}) => {
  const { lang, setLang } = useLanguage();

  const options: { code: Language; label: string; full: string }[] = [
    { code: 'kz', label: 'KZ', full: 'Қазақша' },
    { code: 'ru', label: 'RU', full: 'Русский' },
    { code: 'en', label: 'EN', full: 'English' },
  ];

  return (
    <div 
      className={`inline-flex items-center p-1 rounded-full bg-slate-100/90 border border-sky-200/80 shadow-inner backdrop-blur-md ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {showIcon && (
        <Globe className="w-3.5 h-3.5 text-sky-600 ml-1.5 mr-0.5 shrink-0 opacity-80" />
      )}
      <div className="flex items-center gap-0.5">
        {options.map((opt) => (
          <button
            key={opt.code}
            onClick={() => setLang(opt.code)}
            title={opt.full}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200 ${
              lang === opt.code
                ? 'sky-gradient-bg text-white shadow-sm shadow-sky-500/30 scale-[1.03]'
                : 'text-slate-600 hover:text-sky-700 hover:bg-white/60'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
