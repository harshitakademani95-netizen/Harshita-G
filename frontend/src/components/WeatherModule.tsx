'use client';

import React, { useState } from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  CloudRain,
  Sun,
  CloudLightning,
  Cloud,
  CloudFog,
  AlertTriangle,
  RefreshCw,
  Compass,
  MapPin,
  Clock,
  Radio,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { useLocation } from '@/context/LocationContext';
import { LocationSelectorModal } from '@/components/LocationSelectorModal';
import { WeatherResponse } from '@/lib/api';

interface WeatherModuleProps {
  onWeatherLoaded?: (data: WeatherResponse) => void;
}

export const WeatherModule: React.FC<WeatherModuleProps> = ({
  onWeatherLoaded,
}) => {
  const { t } = useLanguage();
  const { success, error: toastError } = useToast();
  const {
    currentLocation,
    weatherData,
    isWeatherLoading,
    weatherError,
    refreshWeather,
  } = useLocation();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const handleRefresh = async () => {
    try {
      await refreshWeather();
      success('Weather Feed Refreshed', `${currentLocation.name}: Live telemetry updated successfully.`);
      if (weatherData && onWeatherLoaded) {
        onWeatherLoaded(weatherData);
      }
    } catch (err: any) {
      toastError('Refresh Failed', err?.message || 'Unable to refresh telemetry.');
    }
  };

  const getConditionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'CloudSun':
        return <CloudSun className="w-6 h-6 text-amber-500" />;
      case 'CloudRain':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'CloudLightning':
        return <CloudLightning className="w-6 h-6 text-purple-500" />;
      case 'CloudFog':
        return <CloudFog className="w-6 h-6 text-slate-400" />;
      default:
        return <Cloud className="w-6 h-6 text-slate-400" />;
    }
  };

  const weather = weatherData;

  return (
    <div className="space-y-6">
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      {/* Title & Location Management Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-xs font-semibold mb-2">
            <CloudSun className="w-3.5 h-3.5" />
            <span>{t('weather.badge', 'Agro-Meteorological Station')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t('nav.weather', 'Weather & Forecast')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time Open-Meteo atmospheric telemetry, 7-day microclimate forecasts, and disease risk advisories for plantations.
          </p>
        </div>

        {/* Action Buttons: Change Location & Refresh */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/80 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Change Location</span>
          </button>

          <button
            onClick={handleRefresh}
            disabled={isWeatherLoading}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isWeatherLoading ? 'animate-spin' : ''}`} />
            <span>{t('weather.refresh', 'Refresh')}</span>
          </button>
        </div>
      </div>

      {weatherError && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Telemetry Notice:</span>
            <span>{weatherError}</span>
          </div>
        </div>
      )}

      {isWeatherLoading && !weather ? (
        <div className="h-64 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-6 text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Fetching live coordinates & meteorological data from Open-Meteo...
          </p>
        </div>
      ) : weather ? (
        <>
          {/* Current Weather Card with Real-time Diagnostics */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-950 via-teal-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl border border-teal-800/40">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-cyan-300 text-xs font-semibold">
                  <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{weather.location}</span>
                  </div>
                  <span className="text-cyan-400 font-mono text-[11px]">
                    ({weather.coordinates?.latitude ?? currentLocation.lat.toFixed(2)}°N,{' '}
                    {weather.coordinates?.longitude ?? currentLocation.lon.toFixed(2)}°E)
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    weather.is_live !== false
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span>{weather.is_live !== false ? 'Live Telemetry' : 'Cached Baseline'}</span>
                  </span>
                </div>

                <div className="mt-3 flex items-baseline gap-4">
                  <span className="text-4xl sm:text-6xl font-black tracking-tight">
                    {weather.current.temperature}°C
                  </span>
                  <div>
                    <div className="text-lg font-bold text-cyan-100">
                      {weather.current.condition}
                    </div>
                    <div className="text-xs text-cyan-200/80 flex items-center gap-2 mt-0.5">
                      <span>{t('weather.feelsLike', 'Feels like')} {(weather.current.temperature + 0.8).toFixed(1)}°C</span>
                      {weather.last_updated && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-[11px] text-cyan-300">
                            <Clock className="w-3 h-3" />
                            Updated: {weather.last_updated}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 Real-Time Meteorological Sensor Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="text-center p-2">
                  <Droplets className="w-5 h-5 mx-auto text-cyan-300 mb-1" />
                  <span className="text-[11px] text-cyan-200 block">{t('weather.relativeHumidity', 'Humidity')}</span>
                  <strong className="text-sm sm:text-base font-bold text-white">
                    {weather.current.humidity}%
                  </strong>
                </div>

                <div className="text-center p-2">
                  <CloudRain className="w-5 h-5 mx-auto text-blue-300 mb-1" />
                  <span className="text-[11px] text-cyan-200 block">{t('weather.precipitation', 'Rainfall')}</span>
                  <strong className="text-sm sm:text-base font-bold text-white">
                    {weather.current.rainfall} mm
                  </strong>
                </div>

                <div className="text-center p-2">
                  <Wind className="w-5 h-5 mx-auto text-teal-300 mb-1" />
                  <span className="text-[11px] text-cyan-200 block">{t('weather.windSpeed', 'Wind Speed')}</span>
                  <strong className="text-sm sm:text-base font-bold text-white">
                    {weather.current.wind_speed} km/h
                  </strong>
                </div>

                <div className="text-center p-2">
                  <Cloud className="w-5 h-5 mx-auto text-slate-300 mb-1" />
                  <span className="text-[11px] text-cyan-200 block">Cloud Cover</span>
                  <strong className="text-sm sm:text-base font-bold text-white">
                    {weather.current.cloud_cover ?? 30}%
                  </strong>
                </div>

                <div className="text-center p-2 col-span-2 sm:col-span-1">
                  <Thermometer className="w-5 h-5 mx-auto text-amber-300 mb-1" />
                  <span className="text-[11px] text-cyan-200 block">{t('weather.moistureIndex', 'Vapor Deficit')}</span>
                  <strong className="text-sm sm:text-base font-bold text-white">
                    {weather.current.humidity > 70 ? 'High Wetness' : weather.current.humidity < 40 ? 'Dry Air' : 'Optimal'}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Microclimate Outlook Cards */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Agricultural Forecast ({weather.forecast.length} Days)</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Data source: {weather.source}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {weather.forecast.map((day, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    i === 0
                      ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                    {day.day}
                  </span>
                  {day.date && (
                    <span className="text-[10px] text-slate-400 block -mt-0.5 mb-1.5">
                      {day.date}
                    </span>
                  )}
                  <div className="my-2 flex justify-center">
                    {getConditionIcon(day.icon)}
                  </div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {day.temp_max}° / <span className="text-slate-400 font-normal">{day.temp_min}°</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1 truncate">
                    {day.condition}
                  </span>
                  <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-center gap-1 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                    <Droplets className="w-3 h-3" />
                    <span>{day.rain_probability}%</span>
                    {day.rain_sum !== undefined && day.rain_sum > 0 && (
                      <span className="text-slate-400">({day.rain_sum}mm)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agricultural Advisories */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('weather.agriAdvisories', 'Agri-Meteorological Advisories & Crop Care')}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weather.agricultural_advisories.map((adv, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                    adv.severity === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                      : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs shrink-0 mt-0.5">
                    {adv.severity === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <Droplets className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">{adv.title}</h4>
                    <p className="text-xs mt-1 leading-relaxed opacity-90">{adv.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
