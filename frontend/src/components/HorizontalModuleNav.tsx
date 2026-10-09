'use client';

import React, { useRef } from 'react';
import {
  Home,
  LayoutDashboard,
  ScanSearch,
  Sprout,
  Wheat,
  CloudSun,
  MessageCircle,
  Mic,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export type ActiveTab =
  | 'home'
  | 'dashboard'
  | 'disease'
  | 'soil'
  | 'seed'
  | 'weather'
  | 'chat'
  | 'voice';

interface HorizontalModuleNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const HorizontalModuleNav: React.FC<HorizontalModuleNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const modules = [
    {
      id: 'home' as ActiveTab,
      label: t('homepage.navHome', 'Home'),
      icon: Home,
      tooltip: t('homepage.navBackToHome', 'Return to Home'),
      badge: null,
    },
    {
      id: 'dashboard' as ActiveTab,
      label: t('nav.dashboard', 'Dashboard'),
      icon: LayoutDashboard,
      tooltip: t('nav.dashboard', 'Dashboard overview & quick vitals'),
      badge: null,
    },
    {
      id: 'disease' as ActiveTab,
      label: t('nav.disease', 'Disease Detection'),
      icon: ScanSearch,
      tooltip: t('nav.disease', 'Leaf pathology computer vision diagnosis'),
      badge: 'AI',
    },
    {
      id: 'soil' as ActiveTab,
      label: t('nav.soil', 'Soil Health & NPK'),
      icon: Sprout,
      tooltip: t('nav.soil', 'Soil pH, moisture & NPK macronutrient calibration'),
      badge: null,
    },
    {
      id: 'seed' as ActiveTab,
      label: t('nav.seed', 'Seed Quality Check'),
      icon: Wheat,
      tooltip: t('nav.seed', 'Seed coat integrity & germination protocols'),
      badge: null,
    },
    {
      id: 'weather' as ActiveTab,
      label: t('nav.weather', 'Weather & Forecast'),
      icon: CloudSun,
      tooltip: t('nav.weather', 'Microclimate telemetry & 5-day agro forecast'),
      badge: null,
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-16 z-30 bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md border-b border-emerald-100/90 dark:border-[#1e3a30] shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 relative flex items-center">
        {/* Left Scroll Arrow (Visible when scrollable) */}
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex lg:hidden items-center justify-center w-7 h-7 rounded-full bg-white dark:bg-[#172e27] border border-slate-200 dark:border-[#224438] text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-[#1e3a30] shadow-2xs mr-1 shrink-0 cursor-pointer"
          aria-label="Scroll navigation left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Horizontal Navigation Folder Strip */}
        <div
          ref={scrollContainerRef}
          role="tablist"
          aria-label="Agriculture Modules"
          className="flex-1 flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
        >
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeTab === mod.id;

            return (
              <button
                key={mod.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(mod.id)}
                title={mod.tooltip}
                className={`group relative flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer shrink-0 select-none border ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-600 dark:to-emerald-700 text-white shadow-md shadow-emerald-700/25 border-emerald-500 scale-[1.02]'
                    : 'bg-slate-50/90 dark:bg-[#162e24] text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-[#224438] hover:bg-emerald-50/80 dark:hover:bg-[#1c392d] hover:border-emerald-300 dark:hover:border-emerald-600/50 hover:text-emerald-900 dark:hover:text-emerald-200 hover:-translate-y-0.5 shadow-2xs'
                }`}
              >
                {/* Icon Container with subtle background badge */}
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-100/80 dark:bg-[#1e3a2f] text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-200/60 dark:group-hover:bg-emerald-900/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Module Label */}
                <span className="tracking-tight whitespace-nowrap">
                  {mod.label}
                </span>

                {/* Optional Mini Indicator Badge */}
                {mod.badge && (
                  <span
                    className={`hidden md:inline-flex text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    {mod.badge}
                  </span>
                )}

                {/* Active Underline Glow */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Scroll Arrow */}
        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex lg:hidden items-center justify-center w-7 h-7 rounded-full bg-white dark:bg-[#172e27] border border-slate-200 dark:border-[#224438] text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-[#1e3a30] shadow-2xs ml-1 shrink-0 cursor-pointer"
          aria-label="Scroll navigation right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
