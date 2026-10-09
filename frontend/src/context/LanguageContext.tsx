'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import kn from '@/locales/kn.json';
import te from '@/locales/te.json';
import ta from '@/locales/ta.json';
import ml from '@/locales/ml.json';
import mr from '@/locales/mr.json';
import bn from '@/locales/bn.json';

export type SupportedLanguage = 'en' | 'kn' | 'hi' | 'te' | 'ta' | 'mr';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी (Marathi)', flag: '🇮🇳' },
];

const dictionaries: Record<SupportedLanguage, any> = {
  en,
  kn,
  hi,
  te,
  ta,
  mr,
};

const STORAGE_KEY = 'bele-mitra-language';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (path: string, fallback?: string) => string;
  dict: any;
  languages: LanguageMeta[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to resolve dot notation e.g. "nav.dashboard"
function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj) return undefined;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return typeof current === 'string' ? current : undefined;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem('ai_crop_doctor_lang')) as SupportedLanguage | null;
    if (saved && ['en', 'kn', 'hi', 'te', 'ta', 'mr'].includes(saved)) {
      setLanguageState(saved);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = saved;
      }
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem('ai_crop_doctor_lang', lang);
    } catch (e) {
      console.warn('Could not save language to localStorage:', e);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  const t = (path: string, fallback?: string): string => {
    const activeDict = dictionaries[language] || dictionaries.en;
    const value = getNestedValue(activeDict, path);
    if (value !== undefined) return value;

    // Fallback to English dictionary
    const fallbackValue = getNestedValue(dictionaries.en, path);
    if (fallbackValue !== undefined) return fallbackValue;

    return fallback || path;
  };

  const dict = dictionaries[language] || dictionaries.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dict, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
