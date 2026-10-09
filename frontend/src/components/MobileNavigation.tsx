'use client';

import React, { useEffect } from 'react';
import {
  Home,
  LayoutDashboard,
  ScanSearch,
  Sprout,
  Wheat,
  CloudSun,
  MessageCircle,
  Mic,
  X,
  PhoneCall,
} from 'lucide-react';
import { ActiveTab } from './HorizontalModuleNav';
import { useLanguage } from '@/context/LanguageContext';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
}) => {
  const { t } = useLanguage();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navItems = [
    { id: 'home' as ActiveTab, label: t('homepage.navHome', 'Home'), icon: Home },
    { id: 'dashboard' as ActiveTab, label: t('nav.dashboard', 'Dashboard'), icon: LayoutDashboard },
    { id: 'disease' as ActiveTab, label: t('nav.disease', 'Disease Detection'), icon: ScanSearch },
    { id: 'soil' as ActiveTab, label: t('nav.soil', 'Soil Health & NPK'), icon: Sprout },
    { id: 'seed' as ActiveTab, label: t('nav.seed', 'Seed Quality Check'), icon: Wheat },
    { id: 'weather' as ActiveTab, label: t('nav.weather', 'Weather & Forecast'), icon: CloudSun },
    { id: 'chat' as ActiveTab, label: t('nav.chat', 'AI Agriculture Chatbot'), icon: MessageCircle },
    { id: 'voice' as ActiveTab, label: t('nav.voice', 'Voice Assistant'), icon: Mic },
  ];

  const handleSelect = (tab: ActiveTab) => {
    onTabChange(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-72 max-w-[85vw] bg-white dark:bg-[#12241e] h-full shadow-2xl flex flex-col z-10 border-r border-emerald-100 dark:border-[#1e3a30]">
        {/* Header */}
        <div className="p-4 border-b border-emerald-50 dark:border-[#1e3a30] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              Bele Mitra
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-emerald-50 dark:hover:bg-[#172e27]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 dark:bg-emerald-600'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-[#172e27]'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-emerald-50 dark:border-[#1e3a30] bg-emerald-50/50 dark:bg-[#0e1c17]">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
            <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('nav.helplineTitle', 'Kisan Agri Helpline')}</span>
          </div>
          <a
            href="tel:18001801551"
            className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-1"
          >
            1800-180-1551 (Toll-Free)
          </a>
        </div>
      </div>
    </div>
  );
};
