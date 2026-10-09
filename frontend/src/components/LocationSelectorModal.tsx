'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Search,
  Crosshair,
  X,
  Check,
  AlertCircle,
  Loader2,
  Compass,
  Globe2,
} from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { LocationItem } from '@/lib/api';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    currentLocation,
    setLocation,
    presetLocations,
    searchPlaces,
    requestGpsLocation,
    weatherError,
  } = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSearchResults([]);
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setErrorMessage(null);
    try {
      const results = await searchPlaces(query);
      if (results && results.length > 0) {
        setSearchResults(results);
      } else {
        setSearchResults([]);
        setErrorMessage(`No plantation or city found matching "${query}". Please check the spelling or try a nearby district.`);
      }
    } catch (err: any) {
      setErrorMessage('Search query failed. Please verify your internet connection or choose from preset plantations below.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (loc: LocationItem) => {
    setLocation(loc);
    onClose();
  };

  const handleUseGps = async () => {
    setIsGpsLoading(true);
    setErrorMessage(null);
    const success = await requestGpsLocation();
    setIsGpsLoading(false);
    if (success) {
      onClose();
    } else {
      setErrorMessage(
        weatherError || 'Location permission was denied. Please select your plantation from the list below or search manually.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Select Plantation Location
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Retrieve live microclimate telemetry for your specific agricultural region
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {/* Current Selection Bar */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                  Active Plantation Location
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {currentLocation.name}
                  {currentLocation.state ? `, ${currentLocation.state}` : ''}
                  {currentLocation.country ? ` (${currentLocation.country})` : ''}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-300 shrink-0">
              {currentLocation.lat.toFixed(2)}°, {currentLocation.lon.toFixed(2)}°
            </span>
          </div>

          {/* Action: GPS auto-detect */}
          <button
            type="button"
            onClick={handleUseGps}
            disabled={isGpsLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-emerald-300 dark:border-emerald-700/80 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-60"
          >
            {isGpsLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            ) : (
              <Crosshair className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            )}
            <span>Use My Current Device Location (GPS)</span>
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Manual Search (City, District, State, or Country)
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Mysuru, Nashik, Ludhiana, Wayanad, Salinas..."
                className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 transition-all"
              >
                {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Search'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Search Results ({searchResults.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                {searchResults.map((loc, idx) => (
                  <button
                    key={`${loc.lat}-${loc.lon}-${idx}`}
                    onClick={() => handleSelectLocation(loc)}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 text-left transition-all flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                        {loc.name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                        {[loc.state, loc.country].filter(Boolean).join(', ')}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {loc.lat.toFixed(1)}°, {loc.lon.toFixed(1)}°
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Agriculture & Plantation Hubs */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Popular Agricultural Hubs & Plantations</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-52 overflow-y-auto p-1">
              {presetLocations.map((loc, idx) => {
                const isSelected =
                  currentLocation.lat === loc.lat && currentLocation.lon === loc.lon;
                return (
                  <button
                    key={`preset-${idx}`}
                    onClick={() => handleSelectLocation(loc)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-1.5 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="text-xs block truncate">{loc.name}</span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {loc.state}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
