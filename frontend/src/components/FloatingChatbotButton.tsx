'use client';

import React from 'react';
import { MessageCircle, Mic } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ActiveTab } from './HorizontalModuleNav';

interface FloatingChatbotButtonProps {
  onChatClick?: () => void;
  onVoiceClick?: () => void;
  activeTab?: ActiveTab;
  onClick?: () => void;
  isActive?: boolean;
}

export const FloatingChatbotButton: React.FC<FloatingChatbotButtonProps> = ({
  onChatClick,
  onVoiceClick,
  activeTab,
  onClick,
}) => {
  const { t } = useLanguage();

  const handleChat = onChatClick || onClick || (() => {});
  const handleVoice = onVoiceClick || (() => {});

  const isChatActive = activeTab === 'chat';
  const isVoiceActive = activeTab === 'voice';

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none"
      role="region"
      aria-label="Floating AI Launchers"
    >
      {/* 1. Voice Assistant Launcher (Microphone Icon Only) */}
      <div className="relative group">
        <button
          type="button"
          onClick={handleVoice}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer border border-emerald-500/30 dark:border-emerald-400/25 ${
            isVoiceActive
              ? 'bg-emerald-800 text-white ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-[#071711] shadow-emerald-950/50'
              : 'bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 hover:from-emerald-600 hover:to-green-500 text-white shadow-emerald-950/40 hover:shadow-emerald-900/50'
          }`}
          aria-label={t('nav.voice', 'Voice Assistant')}
          title={t('nav.voice', 'Voice Assistant')}
        >
          <Mic className="w-5 h-5 text-white" />
        </button>

        {/* Small Tooltip on Hover / Focus Only */}
        <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-900/95 dark:bg-[#12241e] text-white text-[11px] font-semibold rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none shadow-lg border border-slate-700/50 dark:border-emerald-800/40">
          {t('nav.voice', 'Voice Assistant')}
        </span>
      </div>

      {/* 2. AI Agriculture Chatbot Launcher (Message-Circle Icon Only) */}
      <div className="relative group">
        <button
          type="button"
          onClick={handleChat}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer border border-emerald-500/30 dark:border-emerald-400/25 ${
            isChatActive
              ? 'bg-emerald-800 text-white ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-[#071711] shadow-emerald-950/50'
              : 'bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 hover:from-emerald-600 hover:to-green-500 text-white shadow-emerald-950/40 hover:shadow-emerald-900/50'
          }`}
          aria-label={t('nav.chat', 'AI Agriculture Chatbot')}
          title={t('nav.chat', 'AI Agriculture Chatbot')}
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>

        {/* Small Tooltip on Hover / Focus Only */}
        <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-900/95 dark:bg-[#12241e] text-white text-[11px] font-semibold rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none shadow-lg border border-slate-700/50 dark:border-emerald-800/40">
          {t('nav.chat', 'AI Agriculture Chatbot')}
        </span>
      </div>
    </div>
  );
};
