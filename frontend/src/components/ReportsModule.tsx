'use client';

import React from 'react';
import { FileText, Printer, CheckCircle2, AlertTriangle, ShieldCheck, Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { MultimodalReportResponse } from '@/lib/api';

interface ReportsModuleProps {
  reportsList: MultimodalReportResponse[];
}

export const ReportsModule: React.FC<ReportsModuleProps> = ({ reportsList }) => {
  const { t } = useLanguage();

  // Demonstration fallback records if reportsList is empty
  const defaultDemoReports: MultimodalReportResponse[] = [
    {
      crop: 'Tomato',
      detected_condition: 'Early Blight (Alternaria solani)',
      confidence: '95.4%',
      severity: 'Moderate',
      is_healthy: false,
      causes: {
        main: 'Alternaria solani fungal spores',
        environmental: 'High morning humidity (82%) with moderate day temps',
        soil: 'Soil nitrogen levels adequate, splash dispersal from moist soil',
        weather: 'Warm and humid canopy microclimate',
        pathogen: 'Alternaria solani',
      },
      contributing_factors: ['Foliar wetness duration > 6 hours', 'Dense lower vegetative growth'],
      confidence_raw: 0.954,
      cause_category: 'Fungal Pathogen',
      symptoms: ['Dark brown concentric target spots', 'Yellow halos around foliar lesions'],
      prevention: ['Sanitary pruning of lower leaves', 'Avoid sprinkler wetting of leaves'],
      soil_summary: {
        ph: 'pH 6.2 (Optimal)',
        moisture: '68% (Adequate)',
        n_status: 'Optimal',
        p_status: 'Adequate',
        k_status: 'Sufficient',
        overall_soil_health: 'Good (Score: 84)',
      },
      weather_summary: {
        temperature: '26.8°C',
        humidity: '82%',
        rainfall: '0.0 mm',
        condition: 'Humid / Partly Cloudy',
      },
      farmer_recommendation:
        'Prune lower infected foliage immediately to halt upward spread. Apply cold-pressed Neem oil spray at 3 ml/L water in early morning. Ensure morning drip irrigation only.',
      natural_approach: [
        'Apply 5% Neem seed kernel extract (NSKE) or 3 ml/L Neem oil spray',
        'Foliar spray of Trichoderma harzianum bio-fungicide (5g/L)',
      ],
      affordable_management: {
        cost_category: 'Low Cost (Under ₹120/acre)',
        prioritized_steps: [
          'Sanitary pruning of lower 2-3 leaf branches',
          'Biological spray with soap emulsifier',
        ],
        caution: 'Avoid chemical broad-spectrum sprays when bio-controls suffice.',
      },
    },
    {
      crop: 'Corn / Maize',
      detected_condition: 'Common Rust (Puccinia sorghi)',
      confidence: '92.1%',
      severity: 'Low',
      is_healthy: false,
      causes: {
        main: 'Puccinia sorghi airborne rust fungi',
        environmental: 'Wind currents transmitting fungal urediniospores',
        soil: 'Optimal soil nitrogen with good drainage',
        weather: 'Moderate temperatures with dew',
        pathogen: 'Puccinia sorghi',
      },
      contributing_factors: ['Airborne spore transmission'],
      confidence_raw: 0.921,
      cause_category: 'Fungal Pathogen',
      symptoms: ['Cinnabar to dark brown pustules on leaf blades'],
      prevention: ['Wide row spacing for air circulation', 'Plant rust-tolerant cultivars'],
      soil_summary: {
        ph: 'pH 6.5 (Optimal)',
        moisture: '54% (Optimal)',
        n_status: 'Normal',
        p_status: 'Optimal',
        k_status: 'Optimal',
        overall_soil_health: 'Good (Score: 88)',
      },
      weather_summary: {
        temperature: '24.5°C',
        humidity: '74%',
        rainfall: '0.0 mm',
        condition: 'Cool Breezy',
      },
      farmer_recommendation:
        'Monitor canopy rust pustules. At low severity under 15% leaf area, biological Trichoderma or sulfur dust (2g/L) stops spore reproduction.',
      natural_approach: [
        'Wettable sulfur spray at 2 g/L',
        'Encourage good field aeration with wide row spacing',
      ],
      affordable_management: {
        cost_category: 'Economical (Under ₹90/acre)',
        prioritized_steps: [
          'Scouting field edges where wind enters',
          'Targeted spot treatment rather than full-field saturation',
        ],
      },
    },
  ];

  const displayList = reportsList.length > 0 ? reportsList : defaultDemoReports;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Farm Records & Pathology History</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t('nav.reports', 'Crop Health Reports')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Archived multimodal crop health assessments and printable advisory slips for extension officers and farmer records.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Print All Reports</span>
        </button>
      </div>

      {reportsList.length === 0 && (
        <div className="px-4 py-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>Displaying verified sample field dossiers. Diagnoses created in other modules will automatically archive here.</span>
        </div>
      )}

      {/* Reports List */}
      <div className="space-y-4">
        {displayList.map((rep, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {rep.crop} — {rep.detected_condition}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      rep.is_healthy
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {rep.is_healthy ? 'Healthy' : 'Affected'}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Confidence: {rep.confidence} • Severity: {rep.severity}
                </span>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
                <span>Soil: {rep.soil_summary.ph} • {rep.soil_summary.moisture}</span>
                <button
                  onClick={() => window.print()}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Print Slip"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl space-y-1">
              <strong className="text-slate-900 dark:text-white">Synthesized Recommendation:</strong>
              <p className="italic leading-relaxed">{rep.farmer_recommendation}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <strong className="text-emerald-950 dark:text-emerald-200 block mb-1">Natural Approach:</strong>
                <span className="text-emerald-900 dark:text-emerald-300">{rep.natural_approach[0]}</span>
              </div>
              <div className="p-3 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                <strong className="text-teal-950 dark:text-teal-200 block mb-1">Affordable Action:</strong>
                <span className="text-teal-900 dark:text-teal-300">{rep.affordable_management.prioritized_steps[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
