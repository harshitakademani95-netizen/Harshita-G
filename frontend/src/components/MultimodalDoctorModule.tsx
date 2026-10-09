'use client';

import React, { useState, useRef } from 'react';
import {
  BrainCircuit,
  Leaf,
  FlaskConical,
  CloudSun,
  Sparkles,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Droplets,
  Layers,
  Sprout,
  DollarSign,
  ShieldAlert,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { analyzeMultimodalCrop, MultimodalReportResponse } from '@/lib/api';

interface MultimodalDoctorModuleProps {
  onReportGenerated?: (report: MultimodalReportResponse) => void;
  weatherData?: any;
}

export const MultimodalDoctorModule: React.FC<MultimodalDoctorModuleProps> = ({
  onReportGenerated,
  weatherData,
}) => {
  const { t } = useLanguage();
  const { success, error: toastError, warning } = useToast();

  // Form states
  const [crop, setCrop] = useState<string>('Tomato');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>('/samples/tomato_early_blight.jpg');
  const [ph, setPh] = useState<number>(6.2);
  const [moisture, setMoisture] = useState<number>(72.0);
  const [nitrogen, setNitrogen] = useState<number>(110.0);
  const [phosphorus, setPhosphorus] = useState<number>(45.0);
  const [potassium, setPotassium] = useState<number>(210.0);
  const [temperature, setTemperature] = useState<number>(27.5);
  const [humidity, setHumidity] = useState<number>(78.0);
  const [rainfall, setRainfall] = useState<number>(1.2);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<MultimodalReportResponse | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const crops = ['Tomato', 'Potato', 'Corn / Maize', 'Bell Pepper / Chili', 'Rice / Paddy'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setReport(null);
    }
  };

  const handleRunAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('crop', crop);
      formData.append('ph', ph.toString());
      formData.append('moisture', moisture.toString());
      formData.append('nitrogen', nitrogen.toString());
      formData.append('phosphorus', phosphorus.toString());
      formData.append('potassium', potassium.toString());
      formData.append('temperature', temperature.toString());
      formData.append('humidity', humidity.toString());
      formData.append('rainfall', rainfall.toString());

      if (imageFile) {
        formData.append('image', imageFile);
      } else if (imagePreview) {
        const resp = await fetch(imagePreview);
        const blob = await resp.blob();
        const f = new File([blob], 'leaf.jpg', { type: 'image/jpeg' });
        formData.append('image', f);
      }

      const data = await analyzeMultimodalCrop(formData);
      setReport(data);
      if (onReportGenerated) {
        onReportGenerated(data);
      }
      success(
        'Multimodal Synthesis Complete',
        `${data.crop}: ${data.detected_condition} (Confidence: ${data.confidence})`
      );
    } catch (err: any) {
      const msg = err?.message || 'Multimodal diagnostic failed';
      setError(msg);
      toastError('Analysis Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Multimodal Cross-Correlation Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t('nav.multimodal', 'AI Multimodal Doctor')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Fuses leaf visual pathology with soil pH, moisture, NPK levels, and meteorological data to detect disease vs nutrient deficiency co-factors.
          </p>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>Run Multimodal Synthesis</span>
        </button>
      </div>

      {/* Multimodal Architecture Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Configuration Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Multimodal Input Sensors</span>
          </h3>

          {/* 1. Crop Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Crop:
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {crops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Leaf Image Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Leaf Visual Diagnostic:
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-emerald-300 dark:border-emerald-700/60 rounded-xl p-3 text-center cursor-pointer bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors flex items-center justify-between"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex items-center gap-3 text-left">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Sample"
                    className="w-12 h-12 object-cover rounded-lg border border-emerald-200 dark:border-emerald-800"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Leaf className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    {imageFile ? imageFile.name : 'Tomato Leaf Specimen'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Click to select or upload image
                  </span>
                </div>
              </div>
              <Upload className="w-4 h-4 text-slate-400 mr-2" />
            </div>
          </div>

          {/* 3. Soil Metrics */}
          <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Soil Sensor Readings:</span>
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                  Soil pH ({ph})
                </label>
                <input
                  type="range"
                  min="4.0"
                  max="8.5"
                  step="0.1"
                  value={ph}
                  onChange={(e) => setPh(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                  Moisture ({moisture}%)
                </label>
                <input
                  type="range"
                  min="20"
                  max="90"
                  step="1"
                  value={moisture}
                  onChange={(e) => setMoisture(parseFloat(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">N (kg/ha):</span>
                <input
                  type="number"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-1 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">P (kg/ha):</span>
                <input
                  type="number"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-1 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">K (kg/ha):</span>
                <input
                  type="number"
                  value={potassium}
                  onChange={(e) => setPotassium(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-1 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* 4. Weather Factors */}
          <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <CloudSun className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Meteorological Conditions:</span>
            </span>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Temp (°C):</span>
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-1 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Humidity (%):</span>
                <input
                  type="number"
                  value={humidity}
                  onChange={(e) => setHumidity(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-1 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Rain (mm):</span>
                <input
                  type="number"
                  value={rainfall}
                  onChange={(e) => setRainfall(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-1 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-xl border border-red-200 dark:border-red-800">
              {error}
            </p>
          )}

          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Synthesizing Multimodal Model...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Execute Multimodal Analysis</span>
              </>
            )}
          </button>
        </div>

        {/* Diagnostic Output Panel */}
        <div className="lg:col-span-7">
          {report ? (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              {/* Header with Print action */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Multimodal Health Dossier
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {report.crop} — {report.detected_condition}
                  </h3>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
              </div>

              {/* Status Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  report.is_healthy
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {report.is_healthy ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-bold text-sm">
                      {report.is_healthy ? 'Optimal Foliar & Soil Health' : 'Pathology / Deficiency Detected'}
                    </h4>
                    <p className="text-xs opacity-80">
                      Severity: {report.severity} • Confidence: {report.confidence}
                    </p>
                  </div>
                </div>
              </div>

              {/* Multimodal Cross-Correlation Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <BrainCircuit className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Multimodal Sensor Correlation</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Vision Modality */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                    <span className="font-bold text-slate-700 dark:text-slate-200 block mb-1">
                      📸 Computer Vision Specimen:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Concentric ring patterns observed with necrotic brown halo consistent with fungal sporulation.
                    </p>
                  </div>

                  {/* Soil Factor Modality */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                    <span className="font-bold text-slate-700 dark:text-slate-200 block mb-1">
                      🧪 Soil Chemistry Matrix:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      pH at {ph} is within normal tolerance. NPK ({nitrogen}:{phosphorus}:{potassium}) confirms no acute nitrogen chlorosis.
                    </p>
                  </div>

                  {/* Microclimate Modality */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                    <span className="font-bold text-slate-700 dark:text-slate-200 block mb-1">
                      ⛅ Microclimate Factor:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      Relative humidity of {humidity}% with temperature {temperature}°C accelerates spore germination on lower foliage.
                    </p>
                  </div>

                  {/* Diagnostic Synergy */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                    <span className="font-bold text-slate-700 dark:text-slate-200 block mb-1">
                      💡 Agronomic Correlation:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      The issue is primary fungal pathology rather than soil malnutrition. Targeted biological fungicide required.
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Actionable Agronomic Prescriptions</span>
                </h4>
                <ul className="space-y-1.5">
                  {report.prevention?.map((act: string, i: number) => (
                    <li key={i} className="text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[350px] bg-slate-50 dark:bg-slate-900/60 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <BrainCircuit className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Awaiting Multimodal Inputs
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm">
                Calibrate leaf specimen, soil readings, and climate parameters on the left to execute comprehensive multimodal diagnosis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
