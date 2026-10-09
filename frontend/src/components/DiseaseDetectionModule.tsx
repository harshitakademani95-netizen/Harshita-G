'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  ShieldAlert,
  Leaf,
  Bug,
  DollarSign,
  Layers,
  Sparkles,
  ZoomIn,
  CloudSun,
  MapPin,
  AlertTriangle,
  Compass,
  Thermometer,
  Droplets,
  CloudRain,
  Info,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { useLocation } from '@/context/LocationContext';
import { LocationSelectorModal } from '@/components/LocationSelectorModal';
import { predictDisease, DiseasePredictionResponse } from '@/lib/api';
import { ImagePreviewModal } from './ImagePreviewModal';

interface DiseaseDetectionModuleProps {
  onAnalysisComplete?: (res: DiseasePredictionResponse) => void;
  presetImage?: string;
  presetCrop?: string;
}

export const DiseaseDetectionModule: React.FC<DiseaseDetectionModuleProps> = ({
  onAnalysisComplete,
  presetImage,
}) => {
  const { t, language } = useLanguage();
  const { success, error: toastError, warning } = useToast();
  const { currentLocation, weatherData } = useLocation();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(presetImage || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiseasePredictionResponse | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleSelectSample = async (samplePath: string) => {
    setImagePreview(samplePath);
    setResult(null);
    setError(null);

    try {
      const resp = await fetch(samplePath);
      const blob = await resp.blob();
      const file = new File([blob], 'sample.jpg', { type: 'image/jpeg' });
      setImageFile(file);
    } catch (err) {
      console.error('Could not load sample file', err);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile && !imagePreview) {
      setError(t('disease.dropText', 'Please upload or select a plant leaf image first.'));
      warning('Missing Specimen', 'Please select or upload a leaf photograph.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let fileToUpload = imageFile;
      if (!fileToUpload && imagePreview) {
        const resp = await fetch(imagePreview);
        const blob = await resp.blob();
        fileToUpload = new File([blob], 'leaf.jpg', { type: 'image/jpeg' });
      }

      if (!fileToUpload) throw new Error('No image file ready');

      // Synthesize with live plantation weather parameters (Requirement 4)
      const weatherOptions = weatherData
        ? {
            temperature: weatherData.current.temperature,
            humidity: weatherData.current.humidity,
            rainfall: weatherData.current.rainfall,
            location_name: currentLocation.name,
          }
        : undefined;

      const data = await predictDisease(fileToUpload, undefined, language, weatherOptions);
      setResult(data);
      if (onAnalysisComplete) {
        onAnalysisComplete(data);
      }
      success(
        'Pathology Analysis Completed',
        `Classified condition: ${data.condition_name} (${data.confidence})`
      );
    } catch (err: any) {
      const msg = err?.message || 'Failed to analyze plant disease.';
      setError(msg);
      toastError('Analysis Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const localizedData = (result as any)?.localized || (language === 'kn' ? result?.kannada : null);
  const displayConditionName = localizedData?.disease_name || result?.condition_name;
  const displayCauseCategory = localizedData?.cause_category || result?.possible_cause_category;
  const displaySymptoms = localizedData?.symptoms || result?.symptoms || [];
  const displayNaturalApproach = localizedData?.natural_approach || result?.natural_low_chemical_approach || [];
  const displayAffordableTreatment = localizedData?.affordable_treatment || result?.affordable_treatment;

  return (
    <div className="space-y-6">
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      {/* Zoom Modal */}
      <ImagePreviewModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        imageUrl={imagePreview}
        title="Plant Leaf Specimen"
        subtitle={result ? `Classified: ${displayConditionName}` : 'Awaiting diagnostic run'}
      />

      {/* Module Title Banner - Cleanly adjusted without Target Crop field gap */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-2">
              <Leaf className="w-3.5 h-3.5" />
              <span>{t('disease.badge', 'Plant Pathology Diagnostics')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t('disease.title', 'Plant Leaf Disease Detection')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Upload a leaf photograph to classify fungal, bacterial, or viral pathologies and synthesize live microclimate disease risk for your plantation.
            </p>
          </div>

          {/* Active Plantation Location Badge */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Plantation Region
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate max-w-[160px]">
                {currentLocation.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="ml-2 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Input / Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('disease.uploadTitle', 'Upload or Capture Leaf Photo')}</span>
            </h3>

            {/* Dropzone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[220px] ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-100/30 dark:bg-emerald-950/40'
                  : 'border-emerald-300 dark:border-emerald-700/60 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative w-full flex flex-col items-center group">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Leaf Preview"
                      className="w-52 h-52 object-cover rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsZoomOpen(true);
                      }}
                      className="absolute bottom-2 right-2 p-2 rounded-xl bg-slate-900/80 text-white hover:bg-slate-900 backdrop-blur-xs transition-colors"
                      title={t('disease.zoom', 'Zoom Specimen')}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 mt-2 font-medium">
                    {t('disease.changePhoto', 'Click to change photo')}
                  </span>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {t('disease.dropText', 'Drag & drop leaf photo here')}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t('disease.formatHint', 'JPEG, PNG, or WEBP (Max 10MB)')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Preloaded Samples Buttons */}
            <div className="mt-4">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-2">
                {t('disease.orTestSamples', 'Or test pre-loaded samples:')}
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectSample('/samples/tomato_early_blight.jpg')}
                  className="px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-900 dark:hover:text-emerald-300 transition-all text-center cursor-pointer"
                >
                  🍅 Tomato Blight
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSample('/samples/tomato_healthy.jpg')}
                  className="px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-900 dark:hover:text-emerald-300 transition-all text-center cursor-pointer"
                >
                  🌿 Healthy Leaf
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSample('/samples/corn_rust.jpg')}
                  className="px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-900 dark:hover:text-emerald-300 transition-all text-center cursor-pointer"
                >
                  🌽 Corn Rust
                </button>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-5">
            {error && (
              <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-xl border border-red-200 dark:border-red-800 mb-3">
                {error}
              </p>
            )}
            <button
              onClick={handleAnalyze}
              disabled={loading || (!imagePreview && !imageFile)}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t('disease.analyzingModel', 'Analyzing with AI Model...')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t('disease.analyzeBtn', 'Analyze Leaf Specimen')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              {/* Header result banner */}
              <div
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  result.is_healthy
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        result.is_healthy
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {result.is_healthy ? t('disease.healthy', 'Healthy') : t('disease.affected', 'Affected')}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Crop: {result.crop}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold mt-1 text-slate-900 dark:text-white">
                    {displayConditionName}
                  </h3>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {result.confidence}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Vision Confidence Score
                  </div>
                </div>
              </div>

              {/* Low Confidence Warning */}
              {result.confidence_warning && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-2 text-xs text-red-800 dark:text-red-300">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="font-semibold">{result.confidence_warning}</span>
                </div>
              )}

              {/* Badges: Severity and Cause Category */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                    {t('disease.severity', 'Severity Level')}
                  </span>
                  <span
                    className={`inline-block mt-0.5 text-xs font-bold px-2.5 py-0.5 rounded-md ${
                      result.severity === 'High'
                        ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                        : result.severity === 'Moderate'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {result.severity}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                    {t('disease.causeClassification', 'Cause Classification')}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">
                    {displayCauseCategory}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                    {t('disease.visionClassifier', 'Vision Classifier')}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
                    {t('disease.pretrainedResnet', 'Pretrained ResNet/Vision')}
                  </span>
                </div>
              </div>

              {/* Requirement 4: Dedicated Weather-Driven Crop Health & Environmental Risk Analysis */}
              {result.weather_risk && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-teal-950/30 to-emerald-950/40 border border-teal-500/30 dark:border-teal-700/50 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-500/20 pb-3">
                    <div className="flex items-center gap-2">
                      <CloudSun className="w-4 h-4 text-cyan-400 shrink-0" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-900 dark:text-cyan-200">
                        Weather-Informed Plantation Risk ({result.location_name || currentLocation.name})
                      </h4>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                        result.weather_risk.risk_level.includes('High')
                          ? 'bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/40'
                          : result.weather_risk.risk_level.includes('Moderate')
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {result.weather_risk.risk_level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    {result.weather_risk.summary}
                  </p>

                  {/* Meteorological Drivers */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Meteorological Drivers at Plantation:
                    </span>
                    <ul className="space-y-1">
                      {result.weather_risk.meteorological_drivers.map((driver, i) => (
                        <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                          <span>{driver}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weather-Adaptive Recommendations */}
                  {result.weather_risk.recommendations.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        Weather-Adaptive Actions:
                      </span>
                      <ul className="space-y-1">
                        {result.weather_risk.recommendations.map((rec, i) => (
                          <li key={i} className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Soil limitation notice */}
                  {result.soil_limitation && (
                    <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      <span>{result.soil_limitation}</span>
                    </div>
                  )}

                  {/* Scientific separation disclaimer */}
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 italic pt-1">
                    {result.weather_risk.disclaimer}
                  </p>
                </div>
              )}

              {/* Observed Symptoms */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Bug className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{t('disease.symptoms', 'Observed Symptoms')}</span>
                </h4>
                <ul className="space-y-1.5">
                  {displaySymptoms.map((symptom: string, i: number) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disease Causes */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{t('disease.contributingCauses', 'Contributing Causes')}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-200 block">
                      {t('disease.mainPathogen', 'Main Pathogen')}:
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">{result.causes.main}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-200 block">
                      {t('disease.environmentalFactor', 'Environmental Factor')}:
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">{result.causes.environmental}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-200 block">
                      {t('disease.soilFactor', 'Soil Factor')}:
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">{result.causes.soil}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-200 block">
                      {t('disease.weatherFactor', 'Weather Factor')}:
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">{result.causes.weather}</span>
                  </div>
                </div>
              </div>

              {/* Natural / Organic Remedies */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('disease.naturalApproach', 'Natural & Low-Chemical Remedies')}</span>
                </h4>
                <ul className="space-y-1.5">
                  {displayNaturalApproach.map((item: string, i: number) => (
                    <li key={i} className="text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Affordable Treatment Strategy */}
              {displayAffordableTreatment && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('disease.affordableTreatment', 'Affordable Treatment Strategy')}</span>
                    </h4>
                    {typeof displayAffordableTreatment === 'object' && displayAffordableTreatment.cost_category && (
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                        {displayAffordableTreatment.cost_category}
                      </span>
                    )}
                  </div>

                  {typeof displayAffordableTreatment === 'object' && displayAffordableTreatment.prioritized_steps ? (
                    <ol className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {displayAffordableTreatment.prioritized_steps.map((step: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400 shrink-0">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {typeof displayAffordableTreatment === 'string' ? displayAffordableTreatment : ''}
                    </p>
                  )}

                  {typeof displayAffordableTreatment === 'object' && displayAffordableTreatment.caution && (
                    <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{displayAffordableTreatment.caution}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[360px] bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center text-slate-400">
              <Leaf className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
              <h4 className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">
                Awaiting Specimen Analysis
              </h4>
              <p className="text-xs text-slate-400 max-w-sm">
                Upload a plant leaf photo or choose a sample to execute neural pathology diagnostics and live microclimate risk evaluation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
