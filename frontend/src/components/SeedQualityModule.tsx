'use client';

import React, { useState, useRef } from 'react';
import {
  Wheat,
  Upload,
  Sparkles,
  ClipboardList,
  Waves,
  ShieldAlert,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { analyzeSeed, SeedAnalysisResponse } from '@/lib/api';

export const SeedQualityModule: React.FC = () => {
  const { t } = useLanguage();
  const { success, error: toastError, warning } = useToast();

  const [crop] = useState<string>('Tomato');
  const [seedImage, setSeedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SeedAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSeedImage(file);
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
      const file = new File([blob], 'seed_sample.jpg', { type: 'image/jpeg' });
      setSeedImage(file);
    } catch (err) {
      console.error('Could not load sample file', err);
    }
  };

  const handleAnalyze = async () => {
    if (!seedImage && !imagePreview) {
      setError(t('seed.spreadPrompt', 'Please upload or select a seed sample image.'));
      warning('Missing Specimen', 'Please select or upload a seed photograph.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let fileToUpload = seedImage;
      if (!fileToUpload && imagePreview) {
        const resp = await fetch(imagePreview);
        const blob = await resp.blob();
        fileToUpload = new File([blob], 'seed.jpg', { type: 'image/jpeg' });
      }

      if (!fileToUpload) throw new Error('No seed image available');

      const data = await analyzeSeed(fileToUpload, crop);
      setResult(data);
      success('Seed Inspection Complete', `Visual Quality: ${data.visual_assessment.estimated_quality}`);
    } catch (err: any) {
      const msg = err?.message || 'Failed to inspect seeds.';
      setError(msg);
      toastError('Analysis Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-2">
          <Wheat className="w-3.5 h-3.5" />
          <span>{t('seed.badge', 'Seed Pathology & Viability Assessment')}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {t('nav.seed', 'Seed Quality Check')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t(
            'seed.subtitle',
            'Perform preliminary computer-vision screening on seed lots for cracked coats, discoloration, and mold signs before seasonal planting.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Column */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Upload className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{t('seed.uploadSample', 'Upload Seed Sample')}</span>
            </h3>

            {/* Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-amber-300 dark:border-amber-700/60 rounded-2xl p-4 text-center cursor-pointer bg-amber-50/30 dark:bg-amber-950/20 hover:bg-amber-50/60 dark:hover:bg-amber-950/40 transition-all flex flex-col items-center justify-center min-h-[190px]"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative w-full flex flex-col items-center">
                  <img
                    src={imagePreview}
                    alt="Seed Lot Preview"
                    className="w-44 h-44 object-cover rounded-xl border border-amber-200 dark:border-amber-800 shadow-xs"
                  />
                  <span className="mt-2 text-xs font-semibold text-amber-800 dark:text-amber-300 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-amber-200 dark:border-slate-700 shadow-xs">
                    {t('seed.clickChange', 'Click to change seed photo')}
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto">
                    <Wheat className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {t('seed.spreadPrompt', 'Upload photo of seed spread')}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t('seed.spreadDesc', 'Spread 20–50 seeds evenly on a plain white paper background')}
                  </p>
                </div>
              )}
            </div>

            {/* 1-Click Sample Testing */}
            <div className="mt-4">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-2">
                {t('seed.demos', '1-Click Seed Demos:')}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectSample('/samples/seeds_healthy.jpg')}
                  className="px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-900 transition-all text-center cursor-pointer"
                >
                  {t('seed.demoHealthy', '🌾 Healthy Certified Seeds')}
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSample('/samples/seeds_damaged.jpg')}
                  className="px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 bg-slate-50 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-amber-900 transition-all text-center cursor-pointer"
                >
                  {t('seed.demoDamaged', '⚠️ Damaged / Moldy Seeds')}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            {error && (
              <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-xl border border-red-200 dark:border-red-800 mb-3">
                {error}
              </p>
            )}
            <button
              onClick={handleAnalyze}
              disabled={loading || (!imagePreview && !seedImage)}
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-700/20 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t('seed.inspecting', 'Inspecting Seed Quality...')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t('seed.analyzeAction', 'Analyze Seed Appearance')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-5">
          {result ? (
            <>
              {/* Visual Assessment Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {t('seed.visualResult', 'VISUAL ASSESSMENT RESULT')}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {result.visual_assessment.estimated_quality}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                      {result.visual_assessment.visual_score}/100
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {t('seed.purityScore', 'Visual Purity Score')}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  {result.visual_assessment.seed_appearance}
                </p>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t('seed.brokenDeformed', 'Broken / Deformed')}</span>
                    <strong className="text-slate-800 dark:text-slate-200 mt-1 block">
                      {result.visual_assessment.broken_deformed_signs}
                    </strong>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t('seed.discoloration', 'Discoloration')}</span>
                    <strong className="text-slate-800 dark:text-slate-200 mt-1 block">
                      {result.visual_assessment.discoloration_level}
                    </strong>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 col-span-2 sm:col-span-1">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{t('seed.moldFungi', 'Mold / Fungi Signs')}</span>
                    <strong
                      className={`mt-1 block ${
                        result.visual_assessment.mold_fungal_signs.includes('None')
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-red-700 dark:text-red-400'
                      }`}
                    >
                      {result.visual_assessment.mold_fungal_signs}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Recommended Germination Test */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                    <ClipboardList className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {result.germination_test_guide.title || t('seed.germinationTitle', 'Recommended Standard Germination Test')}
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Standard protocol to test actual viable germination %
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {result.germination_test_guide.steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0 border border-emerald-200 dark:border-emerald-800 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{st.substring(st.indexOf('.') + 1)}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl text-xs text-blue-950 dark:text-blue-200 flex items-start gap-2">
                  <Waves className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{t('seed.floatationTest', 'Floatation Density Test')}:</strong>{' '}
                    {result.germination_test_guide.floatation_test}
                  </span>
                </div>
              </div>

              {/* Scientific Disclaimer */}
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  {result.scientific_disclaimer || t('seed.disclaimer', 'Always perform a germination test before sowing.')}
                </p>
              </div>
            </>
          ) : (
            <div className="h-full min-h-[350px] bg-slate-50 dark:bg-slate-900/60 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Wheat className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {t('seed.awaiting', 'Awaiting Seed Photo')}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm">
                {t(
                  'seed.awaitingDesc',
                  'Upload a photo of seeds or select one of the demo samples on the left to assess seed coats and view germination protocols.'
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
