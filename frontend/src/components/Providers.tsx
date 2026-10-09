'use client';

import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastProvider } from '@/context/ToastContext';

import { LocationProvider } from '@/context/LocationContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LocationProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </LocationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
