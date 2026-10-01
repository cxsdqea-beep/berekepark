import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  GraduationCap, 
  ShoppingBag, 
  Activity, 
  Trophy, 
  Medal, 
  Waves, 
  Trees, 
  Car, 
  ExternalLink, 
  Clock, 
  Sparkles,
  Footprints,
  Compass
} from 'lucide-react';
import { INFRASTRUCTURE_DATA, CONTACT_INFO } from '../data/projectData';
import { ScrollBlurReveal } from './ScrollBlurReveal';
import { useLanguage } from '../context/LanguageContext';

export const Infrastructure: React.FC = () => {
  const { t } = useLanguage();
  const [activeItem, setActiveItem] = useState<string>(INFRASTRUCTURE_DATA[0].id);

  const rawSelected = INFRASTRUCTURE_DATA.find((item) => item.id === activeItem) || INFRASTRUCTURE_DATA[0];
  const override = t.infrastructure.items[rawSelected.id];
  const selectedLocation = {
    ...rawSelected,
    title: override?.title || rawSelected.title,
    badge: override?.badge || rawSelected.badge,
    description: override?.desc || rawSelected.description,
    routeTip: override?.routeTip || rawSelected.routeTip,
  };

  const getIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Trophy': return <Trophy className={className} />;
      case 'Medal': return <Medal className={className} />;
      case 'Waves': return <Waves className={className} />;
      case 'Trees': return <Trees className={className} />;
      case 'Car': return <Car className={className} />;
      default: return <MapPin className={className} />;
    }
  };

  // Build dynamic 2GIS route URL from Bereke Park (Юго-Запад-2) to selected destination
  const get2GisRouteUrl = () => {
    if (selectedLocation.custom2GisUrl) {
      return selectedLocation.custom2GisUrl;
    }
    if (!selectedLocation.lat || !selectedLocation.lng) {
      return CONTACT_INFO.maps2gisUrl;
    }
    return CONTACT_INFO.build2GisRouteUrl(selectedLocation.lng, selectedLocation.lat);
  };

  // Build dynamic Yandex Maps route URL from Bereke Park (Юго-Запад-2) to selected destination
  const getYandexRouteUrl = () => {
    if (selectedLocation.customYandexUrl) {
      return selectedLocation.customYandexUrl;
    }
    if (!selectedLocation.lat || !selectedLocation.lng) {
      return CONTACT_INFO.mapsYandexUrl;
    }
    return CONTACT_INFO.buildYandexRouteUrl(selectedLocation.lat, selectedLocation.lng);
  };

  return (
    <section id="location" className="relative py-20 sm:py-28 bg-gradient-to-b from-white via-[#F0F8FF] to-[#F8FAFC] overflow-hidden">
      {/* Background Ambience */}
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-sky-100/70 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200/80 mb-4 shadow-sm max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] font-bold text-sky-700 truncate">
              {t.infrastructure.badge}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-navy mb-4 sm:mb-6">
            {t.infrastructure.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed">
            {t.infrastructure.desc}
          </p>
        </div>

        {/* Address and Navigation Bar */}
        <div className="mb-8 sm:mb-10 rounded-2xl p-4 sm:p-6 bg-white border border-sky-200/90 shadow-md shadow-sky-900/5 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-center gap-3.5 sm:gap-4 text-left w-full md:w-auto">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0 text-sky-600 shadow-sm">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-sky-600 font-bold block truncate">
                {t.infrastructure.exactAddress}
              </span>
              <h3 className="text-sm sm:text-lg font-bold text-brand-navy leading-tight">
                {t.infrastructure.addressText}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                {t.infrastructure.directionHint}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
            <a
              href={CONTACT_INFO.maps2gisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 border border-emerald-300 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{t.infrastructure.btnGisComplex}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={CONTACT_INFO.mapsYandexUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-300 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{t.infrastructure.btnYandexComplex}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Infrastructure Interactive Grid & Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Points List */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {INFRASTRUCTURE_DATA.map((item, idx) => {
              const isSelected = activeItem === item.id;
              const itemOverride = t.infrastructure.items[item.id];
              const locItem = {
                ...item,
                title: itemOverride?.title || item.title,
                badge: itemOverride?.badge || item.badge,
                description: itemOverride?.desc || item.description,
                routeTip: itemOverride?.routeTip || item.routeTip,
              };

              return (
                <ScrollBlurReveal key={item.id} delay={(idx % 2) * 0.08} className="h-full">
                  <div
                    onClick={() => setActiveItem(item.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between h-full ${
                      isSelected
                        ? 'bg-sky-50/95 border-sky-500 shadow-md shadow-sky-500/15 ring-2 ring-sky-300/40 -translate-y-0.5'
                        : 'bg-white hover:bg-sky-50/50 border-sky-100 hover:border-sky-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-sky-600 text-white shadow-sm' : 'bg-sky-100/80 text-sky-600'
                      }`}>
                        {getIcon(locItem.iconName)}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-sky-600 text-white' : 'text-sky-700 bg-sky-100'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {locItem.distanceTime}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                          {locItem.distanceKm}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className={`text-sm font-bold leading-snug mb-1 transition-colors ${
                        isSelected ? 'text-sky-800' : 'text-brand-navy'
                      }`}>
                        {locItem.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
                        {locItem.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-2.5 border-t border-sky-200/70 flex items-center justify-between text-[11px] font-semibold text-sky-700">
                        <span>{t.infrastructure.selectedForRoute}</span>
                        <Navigation className="w-3.5 h-3.5 text-sky-600" />
                      </div>
                    )}
                  </div>
                </ScrollBlurReveal>
              );
            })}
          </div>

          {/* Right Column: Dynamic Interactive Route Display Card */}
          <div className="lg:col-span-6 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-sky-200 bg-white shadow-xl flex flex-col justify-between p-4 sm:p-6 lg:p-8">
            
            {/* Top Indicator & Category Badge */}
            <div className="relative z-10 flex items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-sky-100">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-bold text-brand-navy uppercase tracking-wider truncate">
                  {t.infrastructure.routeFromBereke}
                </span>
              </div>

              <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold shrink-0">
                {selectedLocation.badge || 'Инфраструктура'}
              </span>
            </div>

            {/* Middle: Schematic Interactive Route Map */}
            <div className="relative z-10 my-3 sm:my-4 p-3 sm:p-5 rounded-2xl bg-gradient-to-br from-sky-50/90 via-[#F8FBFE] to-sky-100/60 border border-sky-200/80 shadow-inner">
              
              {/* Route Origin & Destination Diagram */}
              <div className="flex items-center justify-between gap-2 sm:gap-3 relative mb-4 sm:mb-6">
                
                {/* Start Point: Bereke Park */}
                <div className="flex flex-col items-center text-center max-w-[85px] sm:max-w-[130px] z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-brand-navy text-white flex items-center justify-center shadow-md border-2 border-sky-300">
                    <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-sky-300" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-brand-navy mt-1.5 leading-tight truncate w-full">
                    Bereke Park
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 truncate w-full">
                    {t.infrastructure.routeStart}
                  </span>
                </div>

                {/* Animated Route Line */}
                <div className="flex-1 flex flex-col items-center px-1 sm:px-2 z-0 min-w-0">
                  <div className="w-full flex items-center justify-center gap-1 sm:gap-1.5 relative">
                    <div className="h-[2px] sm:h-[3px] flex-1 bg-gradient-to-r from-sky-600 via-sky-400 to-emerald-500 rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/60 animate-shimmer" />
                    </div>
                    <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white border border-sky-300 shadow-sm flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-sky-700 whitespace-nowrap shrink-0">
                      <Car className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600" />
                      <span>{selectedLocation.distanceTime}</span>
                    </div>
                    <div className="h-[2px] sm:h-[3px] flex-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 rounded-full" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono mt-1 font-semibold">
                    {selectedLocation.distanceKm}
                  </span>
                </div>

                {/* Destination Point: Selected Landmark */}
                <div className="flex flex-col items-center text-center max-w-[85px] sm:max-w-[130px] z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md border-2 border-emerald-300 animate-bounce">
                    {getIcon(selectedLocation.iconName, "w-5 h-5 sm:w-6 sm:h-6")}
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-emerald-800 mt-1.5 leading-tight truncate w-full">
                    {selectedLocation.title.split(' ')[0]}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold truncate w-full">
                    {t.infrastructure.destination}
                  </span>
                </div>

              </div>

              {/* Destination Details & Route Guidance */}
              <div className="bg-white rounded-xl p-3 sm:p-4 border border-sky-200/90 shadow-sm">
                <div className="flex items-start gap-3">
                  {selectedLocation.image && (
                    <img
                      src={selectedLocation.image}
                      alt={selectedLocation.title}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/yapx/ePvSV.png';
                      }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-sky-200 shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-brand-navy leading-snug truncate">
                      {selectedLocation.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-normal mt-1 leading-relaxed line-clamp-2">
                      {selectedLocation.description}
                    </p>
                    {selectedLocation.routeTip && (
                      <div className="flex items-start sm:items-center gap-1.5 mt-2 text-[10px] sm:text-[11px] text-sky-700 font-medium leading-tight">
                        <Navigation className="w-3 h-3 shrink-0 text-sky-600 mt-0.5 sm:mt-0" />
                        <span className="line-clamp-2">{selectedLocation.routeTip}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transport Options Bar */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mt-3 pt-3 border-t border-sky-100 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-sky-50 text-sky-800">
                    <Car className="w-4 h-4 text-sky-600 shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-[10px] text-slate-500 uppercase font-semibold">{t.infrastructure.byCar}</span>
                      <strong className="text-xs font-mono truncate block">{selectedLocation.distanceTime} ({selectedLocation.distanceKm})</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-800">
                    <Footprints className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-[10px] text-slate-500 uppercase font-semibold">{t.infrastructure.walking}</span>
                      <strong className="text-xs font-mono truncate block">{selectedLocation.walkTime || '15 мин'}</strong>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom: Dynamic Direct Navigation Buttons to Selected Landmark */}
            <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
              <a
                href={get2GisRouteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 py-3 sm:py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 active:scale-98"
                title={`${t.infrastructure.btnBuildRoute} -> ${selectedLocation.title}`}
              >
                <span className="truncate">{t.infrastructure.btnBuildRoute}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>

              <a
                href={getYandexRouteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 py-3 sm:py-3.5 px-4 rounded-xl sky-gradient-bg text-white font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-md shadow-sky-500/25 active:scale-98"
                title={`${t.infrastructure.btnYandex} -> ${selectedLocation.title}`}
              >
                <span className="truncate">{t.infrastructure.btnYandex}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
