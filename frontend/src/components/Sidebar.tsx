'use client';

import React from 'react';
import {
  LayoutDashboard,
  ScanLine,
  FlaskConical,
  Wheat,
  CloudSun,
  Bot,
  Mic,
  BrainCircuit,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { Language, translations } from '@/lib/translations';

export type ActiveTab =
  | 'dashboard'
  | 'disease'
  | 'soil'
  | 'seed'
  | 'weather'
  | 'chat'
  | 'voice';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentLanguage: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];

  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: t.dashboard,
      icon: LayoutDashboard,
      badge: 'Home',
    },
    {
      id: 'disease' as ActiveTab,
      label: t.diseaseDetection,
      icon: ScanLine,
      highlight: true,
    },
    {
      id: 'soil' as ActiveTab,
      label: t.soilHealth,
      icon: FlaskConical,
    },
    {
      id: 'seed' as ActiveTab,
      label: t.seedQuality,
      icon: Wheat,
    },
    {
      id: 'weather' as ActiveTab,
      label: t.weather,
      icon: CloudSun,
    },
    {
      id: 'chat' as ActiveTab,
      label: t.chatbot,
      icon: Bot,
    },
    {
      id: 'voice' as ActiveTab,
      label: t.voiceAssistant,
      icon: Mic,
      badge: 'Audio',
    },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white border-r border-slate-200 lg:min-h-[calc(100vh-4rem)] p-3 flex flex-col justify-between shrink-0">
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
          Agricultural Modules
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-500'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-emerald-700/80 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Extension Contact Card */}
      <div className="mt-6 p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/60">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold text-emerald-900">
            KVK Kisan Helpline
          </span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Toll-Free Agricultural Support:
          <span className="block font-semibold text-emerald-700 mt-0.5">1800-180-1551</span>
        </p>
      </div>
    </aside>
  );
};
