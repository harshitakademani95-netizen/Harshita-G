'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ScanSearch,
  Sprout,
  Wheat,
  CloudSun,
  MessageCircle,
  Mic,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export type ActiveTab =
  | 'dashboard'
  | 'disease'
  | 'soil'
  | 'seed'
  | 'weather'
  | 'chat'
  | 'voice';

interface AppSidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  onTabChange,
  isCollapsed: externalIsCollapsed,
  onToggleCollapse: externalToggleCollapse,
}) => {
  const { t } = useLanguage();
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bele_mitra_sidebar_collapsed');
    if (saved !== null) {
      setInternalCollapsed(saved === 'true');
    }
  }, []);

  const isCollapsed = externalIsCollapsed !== undefined ? externalIsCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (externalToggleCollapse) {
      externalToggleCollapse();
    } else {
      const next = !internalCollapsed;
      setInternalCollapsed(next);
      localStorage.setItem('bele_mitra_sidebar_collapsed', String(next));
    }
  };

  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: t('nav.dashboard', 'Dashboard'),
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'disease' as ActiveTab,
      label: t('nav.disease', 'Disease Detection'),
      icon: ScanSearch,
      badge: 'Vision AI',
    },
    {
      id: 'soil' as ActiveTab,
      label: t('nav.soil', 'Soil Health & NPK'),
      icon: Sprout,
      badge: null,
    },
    {
      id: 'seed' as ActiveTab,
      label: t('nav.seed', 'Seed Quality Check'),
      icon: Wheat,
      badge: null,
    },
    {
      id: 'weather' as ActiveTab,
      label: t('nav.weather', 'Weather & Forecast'),
      icon: CloudSun,
      badge: null,
    },
    {
      id: 'chat' as ActiveTab,
      label: t('nav.chat', 'AI Agriculture Chatbot'),
      icon: MessageCircle,
      badge: 'AI',
    },
    {
      id: 'voice' as ActiveTab,
      label: t('nav.voice', 'Voice Assistant'),
      icon: Mic,
      badge: 'Audio',
    },
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col shrink-0 bg-white dark:bg-[#12241e] border-r border-emerald-100 dark:border-[#1e3a30] transition-all duration-300 ease-in-out select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header / Collapse Toggle */}
      <div className="p-4 border-b border-emerald-50 dark:border-[#1e3a30] flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-400/80">
              {t('nav.modules', 'Agricultural Modules')}
            </span>
          </div>
        )}
        <button
          onClick={handleToggle}
          className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-emerald-50 dark:hover:bg-[#172e27] transition-colors cursor-pointer ${
            isCollapsed ? 'mx-auto' : ''
          }`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto" role="navigation" aria-label="Main Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/25 dark:bg-emerald-600 dark:text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-emerald-50/70 dark:hover:bg-[#172e27] hover:text-emerald-900 dark:hover:text-white'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                />

                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between truncate text-left">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1.5 shrink-0 ${
                          isActive
                            ? 'bg-emerald-800 text-emerald-100'
                            : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>

              {/* Floating Tooltip in collapsed mode */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                  {item.label}
                  {item.badge && ` (${item.badge})`}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Support Card */}
      {!isCollapsed ? (
        <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-[#172e27] dark:to-[#142620] border border-emerald-100 dark:border-[#224438]">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
            <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('nav.helplineTitle', 'Kisan Agri Helpline')}</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
            {t('nav.helplineDesc', 'Toll-Free Agricultural Support:')}
          </p>
          <a
            href="tel:18001801551"
            className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline mt-1"
          >
            1800-180-1551
          </a>
        </div>
      ) : (
        <div className="p-3 text-center">
          <a
            href="tel:18001801551"
            className="inline-flex p-2 rounded-xl text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title="Kisan Helpline: 1800-180-1551"
          >
            <PhoneCall className="w-5 h-5" />
          </a>
        </div>
      )}
    </aside>
  );
};
