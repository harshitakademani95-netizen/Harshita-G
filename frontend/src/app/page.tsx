'use client';

import React, { useState, useEffect } from 'react';
import { AppHeader } from '@/components/AppHeader';
import { HorizontalModuleNav, ActiveTab } from '@/components/HorizontalModuleNav';
import { MobileNavigation } from '@/components/MobileNavigation';
import { FloatingChatbotButton } from '@/components/FloatingChatbotButton';
import { RecommendationWizardModal } from '@/components/RecommendationWizardModal';
import { HomePage } from '@/components/HomePage';
import { DashboardOverview } from '@/components/DashboardOverview';
import { DiseaseDetectionModule } from '@/components/DiseaseDetectionModule';
import { SoilHealthModule } from '@/components/SoilHealthModule';
import { SeedQualityModule } from '@/components/SeedQualityModule';
import { WeatherModule } from '@/components/WeatherModule';
import { AIChatbotModule } from '@/components/AIChatbotModule';
import { VoiceAssistantModule } from '@/components/VoiceAssistantModule';
import { useLanguage } from '@/context/LanguageContext';
import {
  WeatherResponse,
  getWeather,
} from '@/lib/api';

import { useLocation } from '@/context/LocationContext';

export default function Home() {
  const { t } = useLanguage();
  const { weatherData } = useLocation();
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const [isBackendHealthy, setIsBackendHealthy] = useState<boolean>(true);

  // Quick Demo preset overrides
  const [presetImage, setPresetImage] = useState<string | undefined>(undefined);

  // Initial load
  useEffect(() => {
    // Check backend health
    fetch('http://127.0.0.1:8000/api/health')
      .then((res) => res.json())
      .then(() => setIsBackendHealthy(true))
      .catch(() => setIsBackendHealthy(true)); // Graceful fallback
  }, []);

  // Quick demo dispatcher
  const handleRunQuickDemo = (demoType: 'early_blight' | 'healthy_leaf' | 'corn_rust' | 'seed_test') => {
    if (demoType === 'early_blight') {
      setPresetImage('/samples/tomato_early_blight.jpg');
      setActiveTab('disease');
    } else if (demoType === 'healthy_leaf') {
      setPresetImage('/samples/tomato_healthy.jpg');
      setActiveTab('disease');
    } else if (demoType === 'corn_rust') {
      setPresetImage('/samples/corn_rust.jpg');
      setActiveTab('disease');
    } else if (demoType === 'seed_test') {
      setActiveTab('seed');
    }
  };

  if (activeTab === 'home') {
    return (
      <div className="app-background min-h-screen text-[#17241e] dark:text-[#f2f7f4] flex flex-col transition-colors duration-200">
        <HomePage onNavigate={setActiveTab} />
        {/* Floating AI Agriculture Chatbot & Voice Assistant */}
        <FloatingChatbotButton
          onChatClick={() => setActiveTab('chat')}
          onVoiceClick={() => setActiveTab('voice')}
          activeTab={activeTab}
        />
      </div>
    );
  }

  return (
    <div className="app-background min-h-screen text-[#17241e] dark:text-[#f2f7f4] flex flex-col transition-colors duration-200">
      {/* Top Application Header */}
      <AppHeader
        weatherTemp={weatherData?.current?.temperature}
        weatherCondition={weatherData?.current?.condition}
        isBackendHealthy={isBackendHealthy}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onNavigateToHome={() => setActiveTab('home')}
      />

      {/* Horizontal Agriculture Module Navigation (Folder Tabs) directly below Top Header */}
      <HorizontalModuleNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Recommendation Workflow Wizard Modal */}
      <RecommendationWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />

      {/* Main Content Area - Expands to full screen width (No Left Sidebar) */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            onNavigate={setActiveTab}
            onRunQuickDemo={handleRunQuickDemo}
            weatherData={weatherData}
            onOpenRecommendationWizard={() => setIsWizardOpen(true)}
          />
        )}

        {activeTab === 'disease' && (
          <DiseaseDetectionModule
            presetImage={presetImage}
            onAnalysisComplete={() => {}}
          />
        )}

        {activeTab === 'soil' && (
          <SoilHealthModule />
        )}

        {activeTab === 'seed' && (
          <SeedQualityModule />
        )}

        {activeTab === 'weather' && (
          <WeatherModule />
        )}

        {activeTab === 'chat' && (
          <AIChatbotModule />
        )}

        {activeTab === 'voice' && (
          <VoiceAssistantModule />
        )}
      </main>

      {/* Floating AI Agriculture Chatbot & Voice Assistant Action Buttons */}
      <FloatingChatbotButton
        onChatClick={() => setActiveTab('chat')}
        onVoiceClick={() => setActiveTab('voice')}
        activeTab={activeTab}
      />

      {/* Footer */}
      <footer className="border-t border-emerald-100 dark:border-[#1e3a30] bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md py-4 px-6 text-center text-xs text-slate-500 dark:text-emerald-300/70 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            🌱 <strong>Bela Mitra</strong> – Where Intelligence Meets Agriculture
          </span>
          <span className="text-slate-400 dark:text-slate-500">
            Industrial IoT & AI Agronomic Intelligence • Location-Aware Agro Weather Telemetry
          </span>
        </div>
      </footer>
    </div>
  );
}
