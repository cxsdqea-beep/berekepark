import React from 'react';
import { 
  Maximize2, 
  Users, 
  Trees, 
  Compass, 
  Droplets, 
  Armchair, 
  Boxes, 
  ShieldCheck, 
  ArrowUpRight,
  Quote
} from 'lucide-react';
import { PHILOSOPHY_QUOTES, CONTACT_INFO, getLocalizedQuote } from '../data/projectData';
import { ScrollBlurReveal } from './ScrollBlurReveal';
import { useLanguage } from '../context/LanguageContext';

interface ConceptProps {
  onOpenConsultation: () => void;
  onOpenImageModal?: (img: string) => void;
}

export const Concept: React.FC<ConceptProps> = ({ onOpenConsultation, onOpenImageModal }) => {
  const { t, lang } = useLanguage();

  const getIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case 'Maximize2': return <Maximize2 className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Trees': return <Trees className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Armchair': return <Armchair className={className} />;
      case 'Boxes': return <Boxes className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  const localizedStats = [
    {
      value: '3.3',
      unit: t.layouts.meters,
      label: t.hero.stats.ceiling,
      sublabel: t.hero.stats.ceilingSub,
      iconName: 'Maximize2',
    },
    {
      value: '1',
      unit: lang === 'en' ? 'neighbor' : lang === 'kz' ? 'көрші' : 'сосед',
      label: t.hero.stats.neighbors,
      sublabel: t.hero.stats.neighborsSub,
      iconName: 'ShieldCheck',
    },
    {
      value: '10+',
      unit: lang === 'en' ? 'ha' : 'га',
      label: t.hero.stats.park,
      sublabel: t.hero.stats.parkSub,
      iconName: 'Trees',
    },
    {
      value: '5',
      unit: lang === 'en' ? 'min' : lang === 'kz' ? 'мин' : 'мин',
      label: t.hero.stats.infra,
      sublabel: t.hero.stats.infraSub,
      iconName: 'Compass',
    },
  ];

  const localizedAdvantages = {
    ru: [
      {
        title: 'Высота потолков 3.3 м и витражи',
        desc: 'Простор и свобода в каждом помещении. Увеличенные окна от пола до потолка наполняют резиденции естественным дневным светом.',
        icon: 'Maximize2',
      },
      {
        title: 'Собственное озеро и парк 10+ га',
        desc: 'Природный водоем прямо во дворе. Благоустроенная набережная, деревянный пирс, аллеи для пробежек и тихие зоны отдыха.',
        icon: 'Droplets',
      },
      {
        title: 'Всего 1 сосед на лестничной клетке',
        desc: 'Абсолютная приватность и тишина. Отдельный холл на каждом этаже, где ничто не нарушает личное пространство резидентов.',
        icon: 'Users',
      },
      {
        title: 'Вентилируемый керамогранит и монолит',
        desc: 'Экологичные долговечные фасады с тепло- и шумоизоляцией премиум-класса. Сейсмостойкий монолитный каркас.',
        icon: 'Boxes',
      },
      {
        title: '5 минут до ключевых центров Актобе',
        desc: 'Прямой выезд на проспект Алаш без пробок. Рядом НИШ, Дворец единоборств, Ледовая Арена, теннисный центр и супермаркеты.',
        icon: 'Compass',
      },
      {
        title: 'Безопасность 24/7 и Green Smart City',
        desc: 'Закрытый двор без машин, круглосуточное видеонаблюдение, система контроля доступа и современный консьерж-сервис.',
        icon: 'ShieldCheck',
      },
    ],
    kz: [
      {
        title: 'Төбе биіктігі 3.3 м және панорамалық витраждар',
        desc: 'Әрбір бөлмедегі кеңістік пен еркіндік. Еденнен төбеге дейінгі үлкен терезелер үйді табиғи жарықпен толтырады.',
        icon: 'Maximize2',
      },
      {
        title: 'Жеке көл және 10+ га саябақ',
        desc: 'Тура ауладағы табиғи көл. Абаттандырылған жағалау, ағаш пирс, жүгіру аллеялары және тыныш демалыс аймақтары.',
        icon: 'Droplets',
      },
      {
        title: 'Әр қабатта бар болғаны 1 көрші',
        desc: 'Абсолютті жеке кеңістік пен тыныштық. Әр қабатта жеке холл, резиденция иелерінің жайлылығын ештеңе бұзбайды.',
        icon: 'Users',
      },
      {
        title: 'Желдетілетін керамогранит және монолит',
        desc: 'Премиум деңгейдегі жылу және дыбыс оқшаулағышы бар экологиялық таза қасбеттер. Сейсмикалық төзімді монолитті қаңқа.',
        icon: 'Boxes',
      },
      {
        title: 'Ақтөбенің басты орталықтарына 5 минут',
        desc: 'Алаш даңғылына кептеліссіз тікелей шығу. Жанында НЗМ, Жекпе-жек сарайы, Мұз айдыны, Теннис орталығы және сауда үйлері.',
        icon: 'Compass',
      },
      {
        title: '24/7 қауіпсіздік және Green Smart City',
        desc: 'Көліксіз жабық аула, тәулік бойы бейнебақылау, кіруді бақылау жүйесі және заманауи консьерж қызметі.',
        icon: 'ShieldCheck',
      },
    ],
    en: [
      {
        title: '3.3m Ceiling Heights & Panoramic Glass',
        desc: 'Airy spaciousness and freedom in every room. Floor-to-ceiling windows fill each residence with bright daylight.',
        icon: 'Maximize2',
      },
      {
        title: 'Private Lake & 10+ Hectare Park',
        desc: 'Natural body of water in your courtyard. Landscaped promenade, wooden pier, jogging tracks, and tranquil lounge areas.',
        icon: 'Droplets',
      },
      {
        title: 'Only 1 Neighbor per Floor Landing',
        desc: 'Total privacy and peaceful living. Private floor foyers where nothing intrudes upon the tranquility of residents.',
        icon: 'Users',
      },
      {
        title: 'Ventilated Porcelain Stone & Monolithic Build',
        desc: 'Durable eco-friendly facades with superior thermal and acoustic insulation. Seismic-resistant monolithic construction.',
        icon: 'Boxes',
      },
      {
        title: '5 Minutes to All Key Destinations',
        desc: 'Direct highway access to Alash Avenue. Minutes from NIS, Ice Arena, Tennis Center, and shopping malls.',
        icon: 'Compass',
      },
      {
        title: '24/7 Gated Security & Green Smart City',
        desc: 'Car-free enclosed courtyard, round-the-clock video surveillance, smart access control, and dedicated concierge services.',
        icon: 'ShieldCheck',
      },
    ],
  }[lang];

  const standardsCard = {
    ru: {
      badge: 'Стандарты строительства De Luxe',
      title: 'Бескомпромиссная надежность и долговечность',
      desc: 'Архитектурная концепция международного уровня, воплощающая передовые инженерные решения, экологичные премиальные материалы фасадов и абсолютную клубную приватность в Актобе.',
      btnVisit: 'Забронировать визит',
      btnAsk: 'Задать вопрос застройщику',
    },
    kz: {
      badge: 'De Luxe құрылыс стандарттары',
      title: 'Сенімділік пен ұзақ мерзімділік',
      desc: 'Озық инженерлік шешімдерді, экологиялық таза премиум қасбет материалдарын және Ақтөбедегі шынайы клубтық жеке кеңістікті қамтитын халықаралық деңгейдегі сәулет тұжырымдамасы.',
      btnVisit: 'Кездесуге жазылу',
      btnAsk: 'Құрылыс салушыға сұрақ қою',
    },
    en: {
      badge: 'De Luxe Engineering Standards',
      title: 'Uncompromised Quality & Longevity',
      desc: 'An international-standard architectural vision combining innovative engineering, sustainable premium facade materials, and club-level privacy in Aktobe.',
      btnVisit: 'Book a Private Tour',
      btnAsk: 'Contact the Developer',
    },
  }[lang];

  return (
    <section id="concept" className="relative py-20 sm:py-28 bg-gradient-to-b from-[#F8FAFC] via-[#F0F8FF] to-white overflow-hidden">
      {/* Background Subtle Ambient Highlights */}
      <div className="hidden sm:block absolute top-0 right-0 w-[550px] h-[550px] bg-sky-200/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-[450px] h-[450px] bg-sky-100/50 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollBlurReveal className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200/80 mb-4 shadow-sm">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-sky-700">
              {t.concept.badge}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight">
            {t.concept.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {t.concept.desc}
          </p>
        </ScrollBlurReveal>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-16 sm:mb-20">
          {localizedStats.map((stat, idx) => (
            <ScrollBlurReveal key={idx} delay={idx * 0.1}>
              <div className="bg-white rounded-2xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between border border-sky-100 shadow-[0_4px_25px_rgba(2,132,199,0.06)] hover:border-sky-300 hover:shadow-[0_12px_36px_rgba(2,132,199,0.12)] transition-all group h-full">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                  {getIcon(stat.iconName)}
                </div>
                <div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy group-hover:text-sky-600 transition-colors">
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className="text-sm sm:text-lg text-sky-500 font-semibold">
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-brand-navy mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {stat.sublabel}
                  </p>
                </div>
              </div>
            </ScrollBlurReveal>
          ))}
        </div>

        {/* Authentic Philosophy Quotes */}
        <div className="mb-24">
          <ScrollBlurReveal className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200/80 mb-3 shadow-sm">
              <Quote className="w-3.5 h-3.5 text-sky-600" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-sky-700">
                {t.concept.badge}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-brand-navy mb-4">
              {t.concept.quoteTitle}
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              {t.concept.quoteSub}
            </p>
          </ScrollBlurReveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHILOSOPHY_QUOTES.map((rawItem, qIdx) => {
              const item = getLocalizedQuote(rawItem, lang);
              return (
                <ScrollBlurReveal key={item.id} delay={qIdx * 0.08} className="h-full">
                  <div 
                    onClick={() => onOpenImageModal && onOpenImageModal(item.image)}
                    className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg border border-sky-200/80 bg-slate-950 flex flex-col justify-between p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.quote}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-55 group-hover:opacity-75"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30 group-hover:via-slate-950/65 transition-colors duration-500" />

                  {/* Top Header in Card */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-wider font-bold text-white shadow-sm">
                      {item.tag}
                    </span>
                    <span className="font-mono text-xs text-sky-400 font-bold bg-slate-900/60 px-2 py-0.5 rounded-full border border-sky-400/30">
                      0{qIdx + 1}
                    </span>
                  </div>

                  {/* Quote Body with Glass Card Accent */}
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <Quote className="w-6 h-6 text-sky-400 opacity-90 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-mono text-sky-300 font-semibold tracking-wide uppercase">
                        {item.highlightText}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg sm:text-xl font-bold text-white mb-2 leading-snug drop-shadow-md">
                      «{item.quote}»
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal mb-3">
                      {item.subtext}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{t.gallery.zoomHint}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </ScrollBlurReveal>
            );
          })}
          </div>
        </div>

        {/* Feature Highlights: 6 Key Pillars */}
        <div id="advantages" className="pt-8">
          <ScrollBlurReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-sky-200 pb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-sky-600 block mb-2">
                {t.nav.advantages}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-brand-navy">
                {t.concept.specHeader}
              </h3>
            </div>
            <p className="text-sm text-slate-500 max-w-md mt-4 md:mt-0 font-normal">
              {t.concept.specSub}
            </p>
          </ScrollBlurReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localizedAdvantages.map((adv, index) => (
              <ScrollBlurReveal key={index} delay={index * 0.08}>
                <div className="rounded-2xl p-6 sm:p-8 bg-white border border-sky-100 hover:border-sky-300 transition-all duration-300 shadow-[0_4px_20px_rgba(2,132,199,0.05)] hover:shadow-xl hover:shadow-sky-900/10 group flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                        {getIcon(adv.icon, "w-6 h-6")}
                      </div>
                      <span className="font-serif text-2xl font-bold text-sky-200 group-hover:text-sky-400 transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-brand-navy mb-3 group-hover:text-sky-600 transition-colors">
                      {adv.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {adv.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-sky-100 flex items-center gap-2 text-xs font-semibold text-sky-600 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span>De Luxe</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </ScrollBlurReveal>
            ))}
          </div>
        </div>

        {/* Quality & Standards Card */}
        <div className="mt-16 rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-sky-50 via-white to-sky-100/70 border border-sky-200 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl shadow-sky-900/5">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-sky-600 font-bold block mb-2">
              {standardsCard.badge}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy mb-3">
              {standardsCard.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              {standardsCard.desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto sky-gradient-bg text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-sky-500/25"
            >
              {standardsCard.btnVisit}
            </button>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-sky-50 text-sky-700 border border-sky-300 text-xs font-semibold uppercase tracking-wider text-center shadow-sm transition-all"
            >
              {standardsCard.btnAsk}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
