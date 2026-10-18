'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Globe,
  CloudSun,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useLanguage, SupportedLanguage, LANGUAGES } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';
import { useLocation } from '@/context/LocationContext';
import { LocationSelectorModal } from '@/components/LocationSelectorModal';

interface AppHeaderProps {
  weatherTemp?: number;
  weatherCondition?: string;
  isBackendHealthy?: boolean;
  onOpenMobileMenu: () => void;
  onNavigateToHome?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  weatherTemp = 26.5,
  weatherCondition = 'Partly Cloudy',
  isBackendHealthy = true,
  onOpenMobileMenu,
  onNavigateToHome,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { info } = useToast();
  const { currentLocation, weatherData } = useLocation();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setLangMenuOpen(false);
    const selected = LANGUAGES.find((l) => l.code === code);
    info(
      code === 'en' ? 'Language Updated' : 'ಭಾಷೆ / भाषा बदलली',
      selected ? `${selected.nativeName} (${selected.name})` : code
    );
  };

  const currentLangMeta = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const themeTooltip =
    theme === 'dark'
      ? t('header.themeLight', 'Switch to Light Mode')
      : t('header.themeDark', 'Switch to Dark Mode');

  const displayTemp = weatherData?.current?.temperature ?? weatherTemp;
  const displayCondition = weatherData?.current?.condition ?? weatherCondition;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md border-b border-emerald-100 dark:border-[#1e3a30] transition-colors">
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Mobile Menu Toggle & Official Bela Mitra Logo + Tagline */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-[#172e27] transition-colors"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={onNavigateToHome}
            className="flex items-center gap-3 cursor-pointer group"
            title="Go to Homepage / ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ"
          >
            {/* Official Bela Mitra Logo - Perfect Circular Container */}
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden bg-transparent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform" style={{ borderRadius: '50%' }}>
              <img
                src="/bela-mitra-logo.png"
                alt="Bela Mitra Official Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  Bela Mitra <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-mono">AI Crop Doctor</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Agro Intel
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300/90 hidden sm:block line-clamp-1 font-semibold tracking-tight">
                Where Intelligence Meets Agriculture
              </p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Weather Location Pill, AI Core Status, Language Selector, Single Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Interactive Weather Location Pill */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            title="Change plantation location / ಹವಾಮಾನ ಸ್ಥಳ ಬದಲಿಸಿ"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 dark:bg-[#172e27] dark:hover:bg-[#1e3a30] border border-emerald-200/80 dark:border-[#224438] text-emerald-900 dark:text-emerald-200 text-xs font-medium transition-colors cursor-pointer group"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="whitespace-nowrap font-semibold">
              {currentLocation.name}: {displayTemp}°C, {displayCondition}
            </span>
          </button>

          {/* AI Core Live Status */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50/60 dark:bg-[#172e27] border border-emerald-200/70 dark:border-[#224438] text-xs text-slate-700 dark:text-slate-200">
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendHealthy ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500'
              }`}
            />
            <span className="hidden sm:inline font-semibold text-emerald-900 dark:text-emerald-200">
              {isBackendHealthy ? t('header.statusOnline', 'AI Core Live') : t('header.statusOffline', 'Offline Mode')}
            </span>
          </div>

          {/* Language Selector Dropdown with Globe Icon */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#172e27] hover:bg-slate-200 dark:hover:bg-[#1e3a30] border border-slate-200 dark:border-[#224438] text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              aria-label="Select Language"
              aria-expanded={langMenuOpen}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span className="text-xs">{currentLangMeta.flag}</span>
              <span className="hidden sm:inline">{currentLangMeta.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#142620] border border-slate-200 dark:border-[#234237] shadow-xl py-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-[#1e382f]">
                  {t('header.selectLanguage', 'Select Language')} / {currentLangMeta.nativeName}
                </div>
                <div className="max-h-72 overflow-y-auto py-1">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => handleLanguageSelect(item.code)}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-[#1c352c] transition-colors cursor-pointer ${
                        language === item.code
                          ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-[#1a332a]'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.flag}</span>
                        <div>
                          <p className="font-medium">{item.nativeName}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">{item.name}</p>
                        </div>
                      </div>
                      {language === item.code && <Check className="w-4 h-4 text-emerald-500" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Single Theme Toggle Button (Requirement 1) */}
          <div className="relative group">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#172e27] hover:bg-slate-200 dark:hover:bg-[#1e3a30] border border-slate-200 dark:border-[#224438] text-slate-700 dark:text-slate-200 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label={themeTooltip}
              title={themeTooltip}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform group-hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform group-hover:-rotate-12" />
              )}
            </button>

            {/* Accessible Hover Tooltip */}
            <div className="absolute top-full right-0 mt-2 px-2.5 py-1 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-medium rounded-lg shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
              {themeTooltip}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
