'use client';

import React from 'react';
import { Sprout, Globe, CloudSun, ShieldCheck, Radio } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  weatherTemp?: number;
  weatherCondition?: string;
  isBackendHealthy?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  weatherTemp = 26,
  weatherCondition = 'Partly Cloudy',
  isBackendHealthy = true,
}) => {
  const t = translations[currentLanguage];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white p-1 border border-emerald-200 shadow-xs flex items-center justify-center shrink-0">
            <img
              src="/bela-mitra-logo.png"
              alt="Bela Mitra Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                Bela Mitra
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                AI Agro 2.0
              </span>
            </div>
            <p className="text-xs text-emerald-700 font-semibold hidden md:block">
              Where Intelligence Meets Agriculture
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Weather pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-900 text-xs font-medium">
            <CloudSun className="w-4 h-4 text-emerald-600" />
            <span>Bengaluru Rural: {weatherTemp}°C, {weatherCondition}</span>
          </div>

          {/* Backend Status indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700">
            <span className={`w-2 h-2 rounded-full ${isBackendHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="hidden sm:inline font-medium">
              {isBackendHealthy ? 'AI Core Live' : 'Connecting...'}
            </span>
          </div>

          {/* Language Selector Dropdown (Requirement #19) */}
          <div className="relative flex items-center bg-slate-100 hover:bg-slate-200/80 rounded-lg p-1 border border-slate-200 transition-colors">
            <Globe className="w-4 h-4 text-slate-600 ml-1.5 mr-1" />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-xs font-semibold text-slate-800 py-1 pr-2 focus:outline-none cursor-pointer"
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
