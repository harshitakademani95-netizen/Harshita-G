'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Sliders,
  CheckCircle2,
  Droplets,
  Sprout,
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';

interface RecommendationWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecommendationWizardModal: React.FC<RecommendationWizardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  const { success, warning } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Form states
  const [cropType, setCropType] = useState('Tomato');
  const [farmLocation, setFarmLocation] = useState('Bengaluru Rural, Karnataka');
  const [farmSize, setFarmSize] = useState('2.5');
  const [farmUnit, setFarmUnit] = useState<'Acres' | 'Hectares'>('Acres');
  const [irrigationMethod, setIrrigationMethod] = useState('Drip Irrigation');

  const [soilType, setSoilType] = useState('Red Sandy Loam');
  const [soilPh, setSoilPh] = useState(6.4);
  const [soilMoisture, setSoilMoisture] = useState(55);
  const [nitrogen, setNitrogen] = useState(115);
  const [phosphorus, setPhosphorus] = useState(42);
  const [potassium, setPotassium] = useState(190);
  const [weatherCondition, setWeatherCondition] = useState('Partly Cloudy / Moderate Humidity');

  const [observedSymptoms, setObservedSymptoms] = useState<string[]>(['Slight lower leaf yellowing']);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSymptom = (symptom: string) => {
    if (observedSymptoms.includes(symptom)) {
      setObservedSymptoms(observedSymptoms.filter((s) => s !== symptom));
    } else {
      setObservedSymptoms([...observedSymptoms, symptom]);
    }
  };

  const handleRunAnalysis = () => {
    if (!cropType || !farmLocation) {
      warning('Missing Farm Details', 'Please fill in crop type and location');
      return;
    }

    setIsAnalyzing(true);
    setProgress(15);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsAnalyzing(false);
      setStep(4);
      success('Recommendation Generated', `Customized advisory prepared for ${cropType} cultivation.`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Dialog Window */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-700 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {t('dashboard.recommendationWorkflowTitle', 'Smart Farm Advisor & Recommendation Workflow')}
              </h2>
              <p className="text-xs text-emerald-100">
                Calibrated agronomic guidance based on soil, irrigation & weather telemetry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          {[
            { num: 1, label: t('recommendWorkflow.step1', 'Farm & Crop') },
            { num: 2, label: t('recommendWorkflow.step2', 'Soil & Climate') },
            { num: 3, label: t('recommendWorkflow.step3', 'Symptoms') },
            { num: 4, label: t('recommendWorkflow.step4', 'Advisory') },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                  step === s.num
                    ? 'bg-emerald-600 text-white'
                    : step > s.num
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </span>
              <span
                className={`hidden sm:inline font-medium ${
                  step === s.num ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-500'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isAnalyzing ? (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 animate-bounce">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Synthesizing Multi-Parameter Agronomic Model...
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Correlating soil pH {soilPh}, moisture {soilMoisture}%, and NPK readings with weather telemetry
                </p>
              </div>
              <div className="w-64 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : step === 1 ? (
            /* STEP 1: Farm & Crop Profile */
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" />
                Step 1: Farm Configuration & Crop Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Select Target Crop
                  </label>
                  <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-emerald-500"
                  >
                    <option value="Tomato">Tomato (Solanum lycopersicum)</option>
                    <option value="Potato">Potato (Solanum tuberosum)</option>
                    <option value="Corn / Maize">Corn / Maize (Zea mays)</option>
                    <option value="Chili / Pepper">Chili / Pepper (Capsicum)</option>
                    <option value="Rice / Paddy">Rice / Paddy (Oryza sativa)</option>
                    <option value="Cotton">Cotton (Gossypium)</option>
                    <option value="Groundnut">Groundnut / Peanut (Arachis hypogaea)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Farm Location / District
                  </label>
                  <input
                    type="text"
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-emerald-500"
                    placeholder="e.g. Mandya, Karnataka"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Farm Holding Size
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.5"
                      min="0.1"
                      value={farmSize}
                      onChange={(e) => setFarmSize(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100"
                    />
                    <select
                      value={farmUnit}
                      onChange={(e) => setFarmUnit(e.target.value as any)}
                      className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100"
                    >
                      <option value="Acres">Acres</option>
                      <option value="Hectares">Hectares</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Irrigation Method
                  </label>
                  <select
                    value={irrigationMethod}
                    onChange={(e) => setIrrigationMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-emerald-500"
                  >
                    <option value="Drip Irrigation">Drip Irrigation (Micro-irrigation)</option>
                    <option value="Sprinkler Irrigation">Sprinkler Irrigation</option>
                    <option value="Furrow / Surface">Furrow / Surface Flood</option>
                    <option value="Rainfed / Dryland">Rainfed / Monsoon dependent</option>
                  </select>
                </div>
              </div>
            </div>
          ) : step === 2 ? (
            /* STEP 2: Soil & Weather Telemetry */
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-emerald-600" />
                Step 2: Soil Physico-Chemical & Climate Readings
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Soil Texture / Classification
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100"
                  >
                    <option value="Red Sandy Loam">Red Sandy Loam</option>
                    <option value="Black Clay (Regur)">Black Clay (Regur)</option>
                    <option value="Alluvial Silt">Alluvial Silt</option>
                    <option value="Laterite Acidic">Laterite Acidic</option>
                    <option value="Clay Loam">Clay Loam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Current Weather / Atmosphere
                  </label>
                  <select
                    value={weatherCondition}
                    onChange={(e) => setWeatherCondition(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100"
                  >
                    <option value="Partly Cloudy / Moderate Humidity">Partly Cloudy / Moderate Humidity</option>
                    <option value="High Humidity / Cloudy (Disease Prone)">High Humidity / Overcast (Disease Prone)</option>
                    <option value="Hot & Dry / Clear Sky">Hot & Dry / Clear Sky</option>
                    <option value="Recent Rainfall / Wet Field">Recent Rainfall / Wet Field</option>
                  </select>
                </div>
              </div>

              {/* Sliders for pH and Moisture */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Soil pH</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{soilPh}</span>
                  </div>
                  <input
                    type="range"
                    min="4.5"
                    max="9.0"
                    step="0.1"
                    value={soilPh}
                    onChange={(e) => setSoilPh(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>Acidic (4.5)</span>
                    <span>Neutral (7.0)</span>
                    <span>Alkaline (9.0)</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Soil Moisture</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{soilMoisture}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="1"
                    value={soilMoisture}
                    onChange={(e) => setSoilMoisture(parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>Dry (10%)</span>
                    <span>Field Capacity (55%)</span>
                    <span>Saturated (100%)</span>
                  </div>
                </div>
              </div>

              {/* NPK Inputs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  NPK Macronutrient Readings (mg/kg or kg/ha)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2.5 bg-blue-50/50 dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 block">Nitrogen (N)</span>
                    <input
                      type="number"
                      value={nitrogen}
                      onChange={(e) => setNitrogen(parseFloat(e.target.value) || 0)}
                      className="w-full mt-1 bg-transparent font-bold text-sm text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="p-2.5 bg-amber-50/50 dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 block">Phosphorus (P)</span>
                    <input
                      type="number"
                      value={phosphorus}
                      onChange={(e) => setPhosphorus(parseFloat(e.target.value) || 0)}
                      className="w-full mt-1 bg-transparent font-bold text-sm text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="p-2.5 bg-emerald-50/50 dark:bg-slate-800 rounded-xl border border-emerald-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 block">Potassium (K)</span>
                    <input
                      type="number"
                      value={potassium}
                      onChange={(e) => setPotassium(parseFloat(e.target.value) || 0)}
                      className="w-full mt-1 bg-transparent font-bold text-sm text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : step === 3 ? (
            /* STEP 3: Symptoms Observed */
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-emerald-600" />
                Step 3: Visual Canopy & Disease Symptoms (Select all observed)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Healthy green foliage (Preventative check)',
                  'Slight lower leaf yellowing',
                  'Dark brown spots / concentric rings',
                  'Powdery white or rust pustules on leaf underside',
                  'Leaf curling / stunted shoots',
                  'Wilting despite moist soil',
                  'Fruit / pod spotting or blossom drop',
                  'Visible insect chewing / leaf miner trails',
                ].map((symptom) => {
                  const isSelected = observedSymptoms.includes(symptom);
                  return (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => toggleSymptom(symptom)}
                      className={`p-3 rounded-xl border text-xs text-left font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <span>{symptom}</span>
                      <span
                        className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ml-2 ${
                          isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && '✓'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* STEP 4: Comprehensive Advisory Report */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    Comprehensive Agricultural Advisory Generated
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                    Customized for {farmSize} {farmUnit} of {cropType} in {farmLocation}.
                  </p>
                </div>
              </div>

              {/* 3 Pillars of Recommendation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Irrigation & Moisture */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400">
                    <Droplets className="w-4 h-4" />
                    <span>Irrigation Schedule</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Soil moisture is currently at <strong>{soilMoisture}%</strong> with {soilType}.
                  </p>
                  <div className="text-[11px] bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    <strong>Recommended Run:</strong> 1.5 hrs every 2 days via {irrigationMethod}. Avoid evening overhead wetting to mitigate fungal spore germination.
                  </div>
                </div>

                {/* 2. Soil & Nutrient Balancing */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <Sprout className="w-4 h-4" />
                    <span>Nutrient Balancing</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    pH {soilPh} is optimal. N:P:K is calibrated at {nitrogen}:{phosphorus}:{potassium}.
                  </p>
                  <div className="text-[11px] bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    <strong>Organic Amendment:</strong> Apply 200 kg/acre well-decomposed vermicompost enriched with <i>Trichoderma viride</i>. Supplement with rock phosphate if blooming begins.
                  </div>
                </div>

                {/* 3. Crop Protection */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pathology & IPM</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Weather: {weatherCondition}.
                  </p>
                  <div className="text-[11px] bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    <strong>Bio-Pesticide Spray:</strong> Cold-pressed 10,000 ppm Neem Oil at 3 ml/L water with soap emulsifier within 48 hours to prevent early blight and sucking pests.
                  </div>
                </div>
              </div>

              {/* Economic & Resource Optimization */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Estimated Resource Efficiency Gain:</span>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Estimated ~22% water conservation and ₹3,500/acre savings through biological IPM vs broad-spectrum synthetics.
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('recommendWorkflow.back', 'Back')}</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((step + 1) as any)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <span>{t('recommendWorkflow.next', 'Continue')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : step === 3 ? (
            <button
              onClick={handleRunAnalysis}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('recommendWorkflow.run', 'Analyze and Recommend')}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setStep(1);
                onClose();
              }}
              className="px-5 py-2.5 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>{t('recommendWorkflow.close', 'Done & Close')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
