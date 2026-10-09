'use client';

import React, { useState } from 'react';
import {
  HeartPulse,
  AlertTriangle as TriangleAlert,
  FlaskConical,
  Droplets,
  CloudSun,
  Activity,
  ArrowRight,
  Sprout,
  ScanSearch,
  Wheat,
  MessageCircle,
  Mic,
  Sliders,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { ActiveTab } from './HorizontalModuleNav';
import { useLanguage } from '@/context/LanguageContext';

interface DashboardOverviewProps {
  onNavigate: (tab: ActiveTab) => void;
  onRunQuickDemo: (demoType: 'early_blight' | 'healthy_leaf' | 'corn_rust' | 'seed_test') => void;
  weatherData?: any;
  onOpenRecommendationWizard: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  onRunQuickDemo,
  weatherData,
  onOpenRecommendationWizard,
}) => {
  const { t } = useLanguage();

  // Carousel state for Featured Agricultural Insights
  const [carouselIndex, setCarouselIndex] = useState(0);

  const insights = [
    {
      id: 1,
      tag: t('dashboard.diseaseAlert', 'Disease Alert'),
      title: t('dashboard.insight1Title', 'Early Blight Risk Advisory for Solanaceous Crops'),
      desc: t(
        'dashboard.insight1Desc',
        'High diurnal temperature range combined with overnight relative humidity above 80% creates favorable sporulation conditions. Preventative bio-fungicide (Trichoderma harzianum) recommended.'
      ),
      actionText: t('dashboard.insight1Action', 'Inspect Leaves'),
      actionTab: 'disease' as ActiveTab,
      badgeColor: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300',
    },
    {
      id: 2,
      tag: t('dashboard.irrigationAdvisory', 'Microclimate & Irrigation'),
      title: t('dashboard.insight2Title', 'Precision Micro-Irrigation Guidance for Red Soils'),
      desc: t(
        'dashboard.insight2Desc',
        'Evapotranspiration rates expected to rise by 12% over next 48 hours. Schedule drip cycles between 06:00 and 08:30 AM to conserve water and prevent foliar humidity.'
      ),
      actionText: t('dashboard.insight2Action', 'View Weather Forecast'),
      actionTab: 'weather' as ActiveTab,
      badgeColor: 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300',
    },
    {
      id: 3,
      tag: t('dashboard.soilChemistry', 'Soil Chemistry'),
      title: t('dashboard.insight3Title', 'NPK Micronutrient Calibration for Vegetative Growth'),
      desc: t(
        'dashboard.insight3Desc',
        'Maintain balanced nitrogen ratios without excessive urea to avoid soft succulent growth vulnerable to sucking pests and bacterial wilt.'
      ),
      actionText: t('dashboard.insight3Action', 'Check NPK Status'),
      actionTab: 'soil' as ActiveTab,
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300',
    },
  ];

  const handleNextInsight = () => {
    setCarouselIndex((prev) => (prev + 1) % insights.length);
  };

  const handlePrevInsight = () => {
    setCarouselIndex((prev) => (prev - 1 + insights.length) % insights.length);
  };

  return (
    <div className="space-y-6">
      {/* 4. Dashboard Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-700 dark:from-[#0d261d] dark:via-[#133a2c] dark:to-[#0f2d22] p-6 sm:p-8 text-white shadow-xl border border-emerald-600/30">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 dark:bg-emerald-500/15 backdrop-blur-md border border-white/20 text-emerald-100 text-xs font-semibold mb-3">
            <img src="/bela-mitra-logo.png" alt="Bela Mitra" className="w-4 h-4 object-contain" />
            <span>Bela Mitra – Where Intelligence Meets Agriculture</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            AI Crop Doctor & Microclimate Diagnostics
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-emerald-50 dark:text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
            Identify leaf pathologies, evaluate real-time plantation weather risks, monitor soil NPK balance, and obtain farmer-friendly organic remedies.
          </p>

          {/* Quick Demo Launchers */}
          <div className="mt-6 pt-5 border-t border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                1-Click Verified Specimens:
              </span>
              <span className="text-[11px] text-emerald-200/75 hidden sm:inline">
                Instant neural evaluation with verified agricultural leaf photos
              </span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              <button
                onClick={() => onRunQuickDemo('early_blight')}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#153026] text-emerald-950 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-[#1a3d30] border border-transparent dark:border-emerald-700/40 font-bold text-xs shadow-md shadow-emerald-950/20 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>🍅 Early Blight Leaf</span>
              </button>
              <button
                onClick={() => onRunQuickDemo('healthy_leaf')}
                className="px-3.5 py-2 rounded-xl bg-emerald-600/70 dark:bg-emerald-800/80 hover:bg-emerald-600 dark:hover:bg-emerald-700 border border-emerald-400/50 dark:border-emerald-600/60 text-white font-bold text-xs flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>🌿 Healthy Foliage</span>
              </button>
              <button
                onClick={() => onRunQuickDemo('corn_rust')}
                className="px-3.5 py-2 rounded-xl bg-emerald-600/70 dark:bg-emerald-800/80 hover:bg-emerald-600 dark:hover:bg-emerald-700 border border-emerald-400/50 dark:border-emerald-600/60 text-white font-bold text-xs flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>🌽 Corn Common Rust</span>
              </button>
              <button
                onClick={() => onRunQuickDemo('seed_test')}
                className="px-3.5 py-2 rounded-xl bg-amber-400 dark:bg-amber-500 hover:bg-amber-300 dark:hover:bg-amber-400 text-amber-950 font-bold text-xs shadow-md shadow-amber-950/20 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t('dashboard.demoDamagedSeeds', '🌾 Damaged / Moldy Seeds')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative background aura */}
        <div className="absolute right-0 top-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Interactive Recommendation Workflow Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-700 to-green-700 dark:from-[#133a2c] dark:to-[#0f2e23] p-5 sm:p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border border-emerald-600/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 flex items-center justify-center shrink-0">
            <Sliders className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <h2 className="font-bold text-base sm:text-lg">
              {t('dashboard.recommendationWorkflowTitle', 'Smart Farm Advisor & Recommendation Workflow')}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 dark:text-emerald-200/80 mt-0.5">
              {t(
                'dashboard.recommendationWorkflowDesc',
                'Configure your crop, soil conditions, and farm parameters for customized agronomic recommendations.'
              )}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenRecommendationWizard}
          className="w-full md:w-auto px-5 py-3 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-black/10 transition-transform transform hover:scale-105 shrink-0 cursor-pointer"
        >
          <span>{t('dashboard.startWorkflow', 'Configure & Get Recommendations')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5. Dashboard Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Card 1: Crop Health */}
        <div className="bg-white dark:bg-[#12241e] p-4 rounded-2xl border border-emerald-100 dark:border-[#1e3a30] shadow-xs hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-emerald-300/70">
              {t('dashboard.cropHealthCard', 'Crop Health')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>{t('dashboard.healthy', 'Healthy')}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>94.2% {t('dashboard.fieldIndex', 'Field Index')}</span>
            </p>
          </div>
        </div>

        {/* Card 2: Disease Risk */}
        <div className="bg-white dark:bg-[#12241e] p-4 rounded-2xl border border-emerald-100 dark:border-[#1e3a30] shadow-xs hover:border-amber-400 dark:hover:border-amber-500 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-emerald-300/70">
              {t('dashboard.diseaseRiskCard', 'Disease Risk')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <TriangleAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
              {weatherData?.current?.humidity > 75
                ? t('dashboard.moderate', 'Moderate')
                : t('dashboard.lowRisk', 'Low Risk')}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              RH {weatherData?.current?.humidity || 76}% ({t('dashboard.fungalFactor', 'Fungal Factor')})
            </p>
          </div>
        </div>

        {/* Card 3: Soil Health */}
        <div className="bg-white dark:bg-[#12241e] p-4 rounded-2xl border border-emerald-100 dark:border-[#1e3a30] shadow-xs hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-emerald-300/70">
              {t('dashboard.soilHealthCard', 'Soil Health')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {t('dashboard.goodScore', 'Good (Score: 85)')}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              pH 6.2 • {t('dashboard.carbon', 'Carbon')} 2.4%
            </p>
          </div>
        </div>

        {/* Card 4: Soil Moisture */}
        <div className="bg-white dark:bg-[#12241e] p-4 rounded-2xl border border-emerald-100 dark:border-[#1e3a30] shadow-xs hover:border-cyan-400 dark:hover:border-cyan-500 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-emerald-300/70">
              {t('dashboard.soilMoistureCard', 'Soil Moisture')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              58% {t('dashboard.optimal', 'Optimal')}
            </div>
            <p className="text-[11px] text-cyan-700 dark:text-cyan-400 font-medium mt-0.5">
              {t('dashboard.target', 'Target')}: 50%–70%
            </p>
          </div>
        </div>

        {/* Card 5: Weather */}
        <div className="bg-white dark:bg-[#12241e] p-4 rounded-2xl border border-emerald-100 dark:border-[#1e3a30] shadow-xs hover:border-amber-400 dark:hover:border-amber-500 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-emerald-300/70">
              {t('dashboard.weatherCard', 'Weather')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <CloudSun className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {weatherData?.current?.temperature || 26.5}°C
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              {weatherData?.current?.condition || 'Partly Cloudy'}
            </p>
          </div>
        </div>

        {/* Card 6: NPK Status */}
        <div className="bg-white dark:bg-[#12241e] p-4 rounded-2xl border border-emerald-100 dark:border-[#1e3a30] shadow-xs hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-emerald-300/70">
              {t('dashboard.npkStatusCard', 'NPK Status')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {t('dashboard.balanced', 'Balanced')}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">N: 110 • P: 45 • K: 210</p>
          </div>
        </div>
      </div>

      {/* Featured Insights Carousel */}
      <div className="bg-white dark:bg-[#12241e] rounded-3xl border border-emerald-100 dark:border-[#1e3a30] p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              {t('dashboard.featuredInsights', 'Featured Agricultural Insights')}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              {carouselIndex + 1} / {insights.length}
            </span>
            <button
              onClick={handlePrevInsight}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-[#224438] text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-[#172e27] transition-colors cursor-pointer"
              aria-label="Previous insight"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextInsight}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-[#224438] text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-[#172e27] transition-colors cursor-pointer"
              aria-label="Next insight"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slide */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 dark:bg-[#172e27] border border-emerald-100 dark:border-[#224438] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${insights[carouselIndex].badgeColor}`}>
              {insights[carouselIndex].tag}
            </span>
            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              {insights[carouselIndex].title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {insights[carouselIndex].desc}
            </p>
          </div>
          <button
            onClick={() => onNavigate(insights[carouselIndex].actionTab)}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-700/20 shrink-0 transition-colors cursor-pointer"
          >
            <span>{insights[carouselIndex].actionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6. Feature Cards for the 6 Remaining Modules */}
      <div>
        <div className="mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {t('nav.modules', 'Core Agricultural Solutions')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('dashboard.heroDesc', 'Dedicated intelligence modules for crop disease identification, soil calibration, and microclimate guidance.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1: Disease Detection */}
          <div className="bg-white dark:bg-[#12241e] rounded-2xl border border-emerald-100 dark:border-[#1e3a30] p-5 shadow-xs flex flex-col justify-between hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <ScanSearch className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {t('features.diseaseTitle', 'Disease Detection')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('features.diseaseSubtitle', 'Computer Vision Classifier')}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {t(
                  'features.diseaseDesc',
                  'Analyze leaves for early blight, late blight, rusts, molds, and viruses. Displays symptoms, environmental causes, and affordable natural remedies.'
                )}
              </p>
            </div>
            <button
              onClick={() => onNavigate('disease')}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-[#172e27] hover:bg-emerald-100 dark:hover:bg-[#1d3a31] text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{t('features.diseaseBtn', 'Launch Vision AI')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 2: Soil Health & NPK */}
          <div className="bg-white dark:bg-[#12241e] rounded-2xl border border-emerald-100 dark:border-[#1e3a30] p-5 shadow-xs flex flex-col justify-between hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-950/80 text-green-700 dark:text-green-400 flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {t('features.soilTitle', 'Soil Health & NPK')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('features.soilSubtitle', 'NPK, pH & Microorganisms')}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {t(
                  'features.soilDesc',
                  'Interactive pH scale, moisture gauges, deficiency detection, and deep guides on beneficial (Rhizobium, Trichoderma) and harmful microorganisms.'
                )}
              </p>
            </div>
            <button
              onClick={() => onNavigate('soil')}
              className="w-full py-2.5 px-3 rounded-xl bg-green-50 dark:bg-[#172e27] hover:bg-green-100 dark:hover:bg-[#1d3a31] text-green-800 dark:text-green-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{t('features.soilBtn', 'Open Soil Health Lab')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 3: Seed Quality Check */}
          <div className="bg-white dark:bg-[#12241e] rounded-2xl border border-emerald-100 dark:border-[#1e3a30] p-5 shadow-xs flex flex-col justify-between hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 flex items-center justify-center">
                  <Wheat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {t('features.seedTitle', 'Seed Quality Check')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('features.seedSubtitle', 'Visuals & Germination Guide')}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {t(
                  'features.seedDesc',
                  'Inspects seed batches for damage, discoloration, and mold. Provides step-by-step paper towel germination tests and water floatation protocols.'
                )}
              </p>
            </div>
            <button
              onClick={() => onNavigate('seed')}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-50 dark:bg-[#172e27] hover:bg-amber-100 dark:hover:bg-[#1d3a31] text-amber-900 dark:text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{t('features.seedBtn', 'Inspect Seeds')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 4: Weather & Forecast */}
          <div className="bg-white dark:bg-[#12241e] rounded-2xl border border-emerald-100 dark:border-[#1e3a30] p-5 shadow-xs flex flex-col justify-between hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-400 flex items-center justify-center">
                  <CloudSun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {t('features.weatherTitle', 'Weather & Forecast')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('features.weatherSubtitle', 'Live Forecast & Risk Alerts')}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {t(
                  'features.weatherDesc',
                  '5-day forecast cards with temperature, rainfall probability, humidity, and actionable irrigation/spraying agricultural warnings.'
                )}
              </p>
            </div>
            <button
              onClick={() => onNavigate('weather')}
              className="w-full py-2.5 px-3 rounded-xl bg-cyan-50 dark:bg-[#172e27] hover:bg-cyan-100 dark:hover:bg-[#1d3a31] text-cyan-900 dark:text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{t('features.weatherBtn', 'View Weather Advisories')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 5: AI Agriculture Chatbot */}
          <div className="bg-white dark:bg-[#12241e] rounded-2xl border border-emerald-100 dark:border-[#1e3a30] p-5 shadow-xs flex flex-col justify-between hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {t('features.chatTitle', 'AI Agriculture Chatbot')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('features.chatSubtitle', 'Multi-Turn Agronomy Intelligence')}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {t(
                  'features.chatDesc',
                  'Chat in your native language about crop pathologies, yellow leaves, organic fertilizers, and weather precautions.'
                )}
              </p>
            </div>
            <button
              onClick={() => onNavigate('chat')}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-[#172e27] hover:bg-emerald-100 dark:hover:bg-[#1d3a31] text-emerald-900 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{t('features.chatBtn', 'Open Chat Assistant')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 6: Voice Assistant */}
          <div className="bg-white dark:bg-[#12241e] rounded-2xl border border-emerald-100 dark:border-[#1e3a30] p-5 shadow-xs flex flex-col justify-between hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-400 flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {t('features.voiceTitle', 'Voice Assistant')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('features.voiceSubtitle', 'Speech Recognition & Playback')}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {t(
                  'features.voiceDesc',
                  'Hands-free microphone interaction for farmers on the go. Speak questions and receive spoken remedies.'
                )}
              </p>
            </div>
            <button
              onClick={() => onNavigate('voice')}
              className="w-full py-2.5 px-3 rounded-xl bg-purple-50 dark:bg-[#172e27] hover:bg-purple-100 dark:hover:bg-[#1d3a31] text-purple-900 dark:text-purple-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{t('features.voiceBtn', 'Launch Voice Assistant')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
