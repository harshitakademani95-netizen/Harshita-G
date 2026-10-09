'use client';

import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Droplets,
  Activity,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Bug,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { analyzeSoil, SoilAnalysisResponse } from '@/lib/api';

interface SoilHealthModuleProps {
  onSoilAnalysisChange?: (res: SoilAnalysisResponse) => void;
}

export const SoilHealthModule: React.FC<SoilHealthModuleProps> = ({
  onSoilAnalysisChange,
}) => {
  const { t } = useLanguage();
  const { success, warning } = useToast();

  const [crop, setCrop] = useState<string>('Tomato');
  const [ph, setPh] = useState<number>(6.2);
  const [moisture, setMoisture] = useState<number>(58.0);
  const [nitrogen, setNitrogen] = useState<number>(170.0);
  const [phosphorus, setPhosphorus] = useState<number>(45.0);
  const [potassium, setPotassium] = useState<number>(220.0);
  const [organicMatter] = useState<number>(2.4);

  const [loading, setLoading] = useState<boolean>(false);
  const [soilResult, setSoilResult] = useState<SoilAnalysisResponse | null>(null);

  const crops = ['Tomato', 'Potato', 'Corn / Maize', 'Bell Pepper / Chili', 'Rice / Paddy'];

  const triggerAnalysis = async (c = crop, p = ph, m = moisture, n = nitrogen, phos = phosphorus, pot = potassium) => {
    setLoading(true);
    try {
      const data = await analyzeSoil({
        crop: c,
        ph: p,
        moisture: m,
        nitrogen: n,
        phosphorus: phos,
        potassium: pot,
        organic_matter: organicMatter,
      });
      setSoilResult(data);
      if (onSoilAnalysisChange) {
        onSoilAnalysisChange(data);
      }
    } catch (err) {
      console.error('Soil test error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    triggerAnalysis();
  }, [crop]);

  // Preset Soil Scenarios for instant hackathon demonstrations
  const loadScenario = (type: 'balanced' | 'n_deficient' | 'acidic_wet') => {
    if (type === 'balanced') {
      setPh(6.5);
      setMoisture(60);
      setNitrogen(190);
      setPhosphorus(48);
      setPotassium(230);
      triggerAnalysis(crop, 6.5, 60, 190, 48, 230);
      success('Loaded Optimal Soil Scenario', 'Balanced NPK & neutral pH calibrated.');
    } else if (type === 'n_deficient') {
      setPh(6.3);
      setMoisture(50);
      setNitrogen(85);
      setPhosphorus(42);
      setPotassium(210);
      triggerAnalysis(crop, 6.3, 50, 85, 42, 210);
      warning('Loaded Low Nitrogen Scenario', 'Nitrogen at 85 kg/ha triggers foliar chlorosis warning.');
    } else if (type === 'acidic_wet') {
      setPh(5.1);
      setMoisture(82);
      setNitrogen(140);
      setPhosphorus(25);
      setPotassium(160);
      triggerAnalysis(crop, 5.1, 82, 140, 25, 160);
      warning('Loaded Acidic/Wet Scenario', 'Low pH 5.1 & 82% moisture indicates waterlogging risk.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-semibold mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>{t('soil.badge', 'Soil Agronomy Laboratory')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t('nav.soil', 'Soil Health & NPK')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t(
              'soil.subtitle',
              'Test and adjust soil pH, moisture levels, and NPK macronutrient balances with visual scales and biological microorganism guides.'
            )}
          </p>
        </div>

        {/* Demo Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block w-full sm:w-auto">
            {t('soil.presets', 'Presets:')}
          </span>
          <button
            onClick={() => loadScenario('balanced')}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            {t('soil.presetOptimal', '✓ Optimal Soil')}
          </button>
          <button
            onClick={() => loadScenario('n_deficient')}
            className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors cursor-pointer"
          >
            {t('soil.presetLowN', '⚠️ Low Nitrogen')}
          </button>
          <button
            onClick={() => loadScenario('acidic_wet')}
            className="px-2.5 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-300 text-xs font-semibold border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900 transition-colors cursor-pointer"
          >
            {t('soil.presetAcidic', '⚠️ Acidic & Waterlogged')}
          </button>
        </div>
      </div>

      {/* Main Grid: Controls on left, Results on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>{t('soil.parameters', 'Soil Parameters & Sensors')}</span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
              {t('soil.targetCrop', 'Target Crop')}: {crop}
            </span>
          </h3>

          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('soil.selectReference', 'Select Crop Reference:')}
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {crops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Slider 1: Soil pH */}
          <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{t('soil.ph', 'Soil pH')}</span>
              <span className="font-bold text-blue-700 dark:text-blue-400 px-2 py-0.5 bg-blue-100 dark:bg-blue-950 rounded-md">
                {ph.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="4.0"
              max="9.0"
              step="0.1"
              value={ph}
              onChange={(e) => setPh(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>{t('soil.acidic', 'Acidic (< 6.0)')}</span>
              <span>{t('soil.neutral', 'Neutral (6.0 - 7.5)')}</span>
              <span>{t('soil.alkaline', 'Alkaline (> 7.5)')}</span>
            </div>
          </div>

          {/* Slider 2: Soil Moisture */}
          <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{t('soil.moisture', 'Soil Moisture')}</span>
              <span className="font-bold text-cyan-700 dark:text-cyan-400 px-2 py-0.5 bg-cyan-100 dark:bg-cyan-950 rounded-md">
                {moisture}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              step="1"
              value={moisture}
              onChange={(e) => setMoisture(parseFloat(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>{t('soil.dry', 'Dry (<30%)')}</span>
              <span>{t('soil.optimal', 'Optimal (50-70%)')}</span>
              <span>{t('soil.wet', 'Wet (>75%)')}</span>
            </div>
          </div>

          {/* NPK Inputs */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                {t('soil.nitrogen', 'Nitrogen (N)')}
              </label>
              <input
                type="number"
                value={nitrogen}
                onChange={(e) => setNitrogen(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-800 dark:text-white"
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">kg/ha</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                {t('soil.phosphorus', 'Phosphorus (P)')}
              </label>
              <input
                type="number"
                value={phosphorus}
                onChange={(e) => setPhosphorus(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-800 dark:text-white"
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">kg/ha</span>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                {t('soil.potassium', 'Potassium (K)')}
              </label>
              <input
                type="number"
                value={potassium}
                onChange={(e) => setPotassium(parseFloat(e.target.value) || 0)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-800 dark:text-white"
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">kg/ha</span>
            </div>
          </div>

          <button
            onClick={() => triggerAnalysis()}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            {loading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>{t('soil.calculate', 'Calculate Soil Health & Deficiencies')}</span>
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 space-y-5">
          {soilResult && (
            <>
              {/* Overall Soil Health Summary Card */}
              <div
                className={`p-5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs ${
                  soilResult.overall_health.status === 'Good'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                    : soilResult.overall_health.status === 'Moderate'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                    : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-950 dark:text-red-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        soilResult.overall_health.status === 'Good'
                          ? 'bg-emerald-600 text-white'
                          : soilResult.overall_health.status === 'Moderate'
                          ? 'bg-amber-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      {t('soil.health', 'SOIL HEALTH')}: {soilResult.overall_health.status.toUpperCase()}
                    </span>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {t('soil.indexScore', 'Index Score')}: {soilResult.overall_health.score}/100
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                    {soilResult.overall_health.summary}
                  </p>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  <div className="space-y-1">
                    {soilResult.overall_health.reasons.map((r, i) => (
                      <div key={i} className="text-[11px] flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dedicated pH Section with Visual Scale */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{t('soil.ph', 'Soil pH')}: {soilResult.ph_analysis.value} ({soilResult.ph_analysis.category})</span>
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                      soilResult.ph_analysis.is_suitable
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {soilResult.ph_analysis.suitability_text}
                  </span>
                </div>

                {/* Visual Scale: Acidic <- Neutral -> Alkaline */}
                <div className="space-y-1.5">
                  <div className="relative h-4 rounded-full overflow-hidden flex bg-gradient-to-r from-red-500 via-emerald-500 to-blue-500">
                    <div
                      className="absolute top-0 bottom-0 w-2.5 bg-white border-2 border-slate-900 shadow-md transform -translate-x-1/2"
                      style={{
                        left: `${Math.min(100, Math.max(0, ((soilResult.ph_analysis.value - 4) / 5) * 100))}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    <span className="text-red-500 font-bold">{t('soil.acidic', 'Acidic (< 6.0)')}</span>
                    <span className="text-emerald-600 font-bold">{t('soil.neutral', 'Neutral (6.0 - 7.5)')}</span>
                    <span className="text-blue-500 font-bold">{t('soil.alkaline', 'Alkaline (> 7.5)')}</span>
                  </div>
                </div>

                <div className="text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">{t('soil.nutrientImpact', 'Nutrient Availability Impact')}:</strong>{' '}
                    {soilResult.ph_analysis.nutrient_impact}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">{t('soil.managementRec', 'Management Recommendation')}:</strong>{' '}
                    {soilResult.ph_analysis.management_recommendation}
                  </p>
                </div>
              </div>

              {/* Dedicated Soil Moisture Section */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>{t('soil.moisture', 'Soil Moisture')}: {soilResult.moisture_analysis.value}% ({soilResult.moisture_analysis.status})</span>
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {t('soil.target', 'Target')}: {soilResult.moisture_analysis.target_range}
                  </span>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      soilResult.moisture_analysis.status === 'Optimal'
                        ? 'bg-emerald-500'
                        : soilResult.moisture_analysis.status.includes('Dry')
                        ? 'bg-amber-500'
                        : 'bg-cyan-500'
                    }`}
                    style={{ width: `${soilResult.moisture_analysis.value}%` }}
                  />
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 bg-cyan-50/70 dark:bg-cyan-950/40 p-3 rounded-2xl border border-cyan-200/60 dark:border-cyan-800 font-medium">
                  💧 {soilResult.moisture_analysis.irrigation_recommendation}
                </p>
              </div>

              {/* NPK Dashboard + Interactive Charts */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>{t('soil.npkCalibration', 'NPK Macronutrient Calibration')}</span>
                </h4>

                <div className="space-y-3">
                  {/* Nitrogen */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{t('soil.nitrogen', 'Nitrogen (N)')}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          {soilResult.npk_analysis.nitrogen.value} kg/ha ({t('soil.target', 'Target')}: {soilResult.npk_analysis.nitrogen.target})
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            soilResult.npk_analysis.nitrogen.status === 'LOW'
                              ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                              : soilResult.npk_analysis.nitrogen.status === 'HIGH'
                              ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          }`}
                        >
                          {soilResult.npk_analysis.nitrogen.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.min(100, (soilResult.npk_analysis.nitrogen.value / 300) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Phosphorus */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{t('soil.phosphorus', 'Phosphorus (P)')}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          {soilResult.npk_analysis.phosphorus.value} kg/ha ({t('soil.target', 'Target')}: {soilResult.npk_analysis.phosphorus.target})
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            soilResult.npk_analysis.phosphorus.status === 'LOW'
                              ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                              : soilResult.npk_analysis.phosphorus.status === 'HIGH'
                              ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          }`}
                        >
                          {soilResult.npk_analysis.phosphorus.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${Math.min(100, (soilResult.npk_analysis.phosphorus.value / 100) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Potassium */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{t('soil.potassium', 'Potassium (K)')}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          {soilResult.npk_analysis.potassium.value} kg/ha ({t('soil.target', 'Target')}: {soilResult.npk_analysis.potassium.target})
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            soilResult.npk_analysis.potassium.status === 'LOW'
                              ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                              : soilResult.npk_analysis.potassium.status === 'HIGH'
                              ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          }`}
                        >
                          {soilResult.npk_analysis.potassium.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(100, (soilResult.npk_analysis.potassium.value / 350) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Soil Deficiency Detection */}
              {soilResult.deficiencies.length > 0 && (
                <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-5 rounded-3xl space-y-3">
                  <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>{t('soil.deficiencyTitle', 'Nutrient Deficiency Diagnosis')}</span>
                  </h4>
                  <div className="space-y-3">
                    {soilResult.deficiencies.map((def, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-xs space-y-1.5 text-xs">
                        <div className="font-bold text-amber-950 dark:text-amber-200 text-sm">
                          {def.title} ({def.element})
                        </div>
                        <p className="text-slate-700 dark:text-slate-300">
                          <strong>{t('soil.visibleSymptoms', 'Visible Symptoms')}:</strong> {def.symptoms}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300">
                          <strong>{t('soil.cropEffects', 'Crop Effects')}:</strong> {def.crop_effects}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300">
                          <strong>{t('soil.recommendedMgmt', 'Recommended Management')}:</strong> {def.soil_management}
                        </p>
                        <p className="text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 p-2 rounded-xl font-medium">
                          🌱 <strong>{t('soil.naturalOption', 'Affordable/Natural Option')}:</strong> {def.affordable_natural_options}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Beneficial vs Harmful Microorganisms */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Bug className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('soil.microbesTitle', 'Soil Microorganisms Guide')}</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Soil bacteria and fungi suppress pathogens and unlock mineral nutrition for root uptake.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Beneficial */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                    <span className="font-bold text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('soil.beneficial', 'Beneficial Microorganisms')}</span>
                    </span>
                    <ul className="space-y-2">
                      {soilResult.microorganisms.beneficial.map((m, i) => (
                        <li key={i} className="border-b border-emerald-200/50 dark:border-emerald-800/50 pb-1.5 last:border-none">
                          <strong className="text-emerald-950 dark:text-emerald-100 block">{m.name}</strong>
                          <span className="text-[11px] text-emerald-800 dark:text-emerald-300 block">{m.role}</span>
                          <span className="text-[11px] text-slate-600 dark:text-slate-400">{m.impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Harmful Pathogens */}
                  <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/40 border border-red-200 dark:border-red-800 space-y-2">
                    <span className="font-bold text-red-900 dark:text-red-200 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      <span>{t('soil.harmful', 'Harmful Pathogens')}</span>
                    </span>
                    <ul className="space-y-2">
                      {soilResult.microorganisms.harmful.map((m, i) => (
                        <li key={i} className="border-b border-red-200/50 dark:border-red-800/50 pb-1.5 last:border-none">
                          <strong className="text-red-950 dark:text-red-100 block">{m.name}</strong>
                          <span className="text-[11px] text-red-800 dark:text-red-300 block">{m.role}</span>
                          <span className="text-[11px] text-slate-600 dark:text-slate-400">{m.impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
