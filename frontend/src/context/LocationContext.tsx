'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LocationItem, WeatherResponse, getWeather, searchLocations } from '@/lib/api';

export const PRESET_LOCATIONS: LocationItem[] = [
  { name: 'Bengaluru Rural', state: 'Karnataka', country: 'India', lat: 12.9716, lon: 77.5946 },
  { name: 'Mysuru', state: 'Karnataka', country: 'India', lat: 12.2958, lon: 76.6394 },
  { name: 'Shivamogga', state: 'Karnataka', country: 'India', lat: 13.9299, lon: 75.5681 },
  { name: 'Belagavi', state: 'Karnataka', country: 'India', lat: 15.8497, lon: 74.4977 },
  { name: 'Hassan', state: 'Karnataka', country: 'India', lat: 13.0068, lon: 76.1004 },
  { name: 'Kodagu (Coorg)', state: 'Karnataka', country: 'India', lat: 12.3375, lon: 75.8069 },
  { name: 'Pune', state: 'Maharashtra', country: 'India', lat: 18.5204, lon: 73.8567 },
  { name: 'Nashik', state: 'Maharashtra', country: 'India', lat: 19.9975, lon: 73.7898 },
  { name: 'Nagpur', state: 'Maharashtra', country: 'India', lat: 21.1458, lon: 79.0882 },
  { name: 'Ludhiana', state: 'Punjab', country: 'India', lat: 30.9010, lon: 75.8573 },
  { name: 'Coimbatore', state: 'Tamil Nadu', country: 'India', lat: 11.0168, lon: 76.9558 },
  { name: 'Guntur', state: 'Andhra Pradesh', country: 'India', lat: 16.3067, lon: 80.4365 },
  { name: 'Wayanad', state: 'Kerala', country: 'India', lat: 11.6854, lon: 76.1320 },
  { name: 'Salinas Valley', state: 'California', country: 'United States', lat: 36.6777, lon: -121.6555 },
  { name: 'Valencia', state: 'Valencia', country: 'Spain', lat: 39.4699, lon: -0.3763 },
  { name: 'Nakuru', state: 'Rift Valley', country: 'Kenya', lat: -0.3031, lon: 36.0800 },
];

const STORAGE_KEY = 'bela-mitra-selected-location';

interface LocationContextType {
  currentLocation: LocationItem;
  setLocation: (loc: LocationItem) => void;
  weatherData: WeatherResponse | null;
  isWeatherLoading: boolean;
  weatherError: string | null;
  refreshWeather: () => Promise<void>;
  requestGpsLocation: () => Promise<boolean>;
  searchPlaces: (q: string) => Promise<LocationItem[]>;
  presetLocations: LocationItem[];
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocationState] = useState<LocationItem>(PRESET_LOCATIONS[0]);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  // Restore saved location from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name && typeof parsed.lat === 'number' && typeof parsed.lon === 'number') {
          setCurrentLocationState(parsed);
        }
      }
    } catch (e) {
      // Ignore localStorage error
    }
  }, []);

  const fetchWeatherForLocation = useCallback(async (loc: LocationItem) => {
    setIsWeatherLoading(true);
    setWeatherError(null);
    try {
      const data = await getWeather(loc.lat, loc.lon, loc.name);
      setWeatherData(data);
    } catch (err: any) {
      const msg = err?.message || 'Could not retrieve live meteorological telemetry';
      setWeatherError(msg);
    } finally {
      setIsWeatherLoading(false);
    }
  }, []);

  // Fetch weather whenever currentLocation changes
  useEffect(() => {
    fetchWeatherForLocation(currentLocation);
  }, [currentLocation, fetchWeatherForLocation]);

  const setLocation = (loc: LocationItem) => {
    setCurrentLocationState(loc);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
    } catch (e) {
      // Ignore
    }
  };

  const refreshWeather = async () => {
    await fetchWeatherForLocation(currentLocation);
  };

  const requestGpsLocation = async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      setWeatherError('Geolocation is not supported by your browser. Please enter location manually.');
      return false;
    }

    return new Promise((resolve) => {
      setIsWeatherLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const gpsLoc: LocationItem = {
            name: `Plantation (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`,
            state: 'Current GPS Coordinates',
            country: 'Detected Location',
            lat: Number(lat.toFixed(4)),
            lon: Number(lon.toFixed(4)),
          };
          setLocation(gpsLoc);
          resolve(true);
        },
        (error) => {
          setIsWeatherLoading(false);
          let errorMsg = 'Location permission was denied. Please select or enter your plantation location manually.';
          if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = 'Location information is currently unavailable. Please enter your location manually.';
          } else if (error.code === error.TIMEOUT) {
            errorMsg = 'Location request timed out. Please select or search your plantation location manually.';
          }
          setWeatherError(errorMsg);
          resolve(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  };

  const searchPlaces = async (query: string): Promise<LocationItem[]> => {
    try {
      return await searchLocations(query);
    } catch (err) {
      return [];
    }
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        setLocation,
        weatherData,
        isWeatherLoading,
        weatherError,
        refreshWeather,
        requestGpsLocation,
        searchPlaces,
        presetLocations: PRESET_LOCATIONS,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
