const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export interface DiseasePredictionResponse {
  prediction: {
    predicted_class: string;
    confidence: number;
    is_healthy: boolean;
    top_predictions: Array<{ label: string; score: number }>;
    mode: string;
  };
  crop: string;
  condition_name: string;
  confidence: string;
  confidence_score: number;
  is_healthy: boolean;
  severity: string;
  possible_cause_category: string;
  confidence_warning?: string | null;
  causes: {
    main: string;
    environmental: string;
    soil: string;
    weather: string;
    pathogen: string;
  };
  symptoms: string[];
  prevention: string[];
  natural_low_chemical_approach: string[];
  affordable_treatment: {
    cost_category: string;
    prioritized_steps: string[];
    caution?: string;
  };
  weather_risk?: {
    risk_level: string;
    summary: string;
    meteorological_drivers: string[];
    recommendations: string[];
    disclaimer: string;
  };
  location_name?: string;
  soil_limitation?: string;
  kannada?: any;
}

export interface LocationItem {
  name: string;
  state?: string;
  country?: string;
  lat: number;
  lon: number;
}

export interface SoilAnalysisResponse {
  crop: string;
  overall_health: {
    status: 'Good' | 'Moderate' | 'Poor';
    score: number;
    color: string;
    summary: string;
    reasons: string[];
  };
  ph_analysis: {
    value: number;
    category: string;
    target_range: string;
    is_suitable: boolean;
    suitability_text: string;
    nutrient_impact: string;
    management_recommendation: string;
    color: string;
  };
  moisture_analysis: {
    value: number;
    status: string;
    target_range: string;
    badge_color: string;
    irrigation_recommendation: string;
  };
  npk_analysis: {
    nitrogen: { value: number; unit: string; status: 'LOW' | 'NORMAL' | 'HIGH'; target: string; color: string };
    phosphorus: { value: number; unit: string; status: 'LOW' | 'NORMAL' | 'HIGH'; target: string; color: string };
    potassium: { value: number; unit: string; status: 'LOW' | 'NORMAL' | 'HIGH'; target: string; color: string };
  };
  deficiencies: Array<{
    element: string;
    title: string;
    symptoms: string;
    crop_effects: string;
    soil_management: string;
    affordable_natural_options: string;
  }>;
  microorganisms: {
    beneficial: Array<{ name: string; role: string; mechanism: string; impact: string }>;
    harmful: Array<{ name: string; role: string; mechanism: string; impact: string }>;
  };
  safety_note: string;
}

export interface SeedAnalysisResponse {
  crop: string;
  visual_assessment: {
    estimated_quality: string;
    visual_score: number;
    badge_color: string;
    seed_appearance: string;
    discoloration_level: string;
    broken_deformed_signs: string;
    mold_fungal_signs: string;
    surface_uniformity: string;
  };
  germination_test_guide: {
    title: string;
    steps: string[];
    floatation_test: string;
  };
  scientific_disclaimer: string;
}

export interface WeatherResponse {
  source: string;
  is_live?: boolean;
  last_updated?: string;
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  current: {
    temperature: number;
    humidity: number;
    rainfall: number;
    wind_speed: number;
    cloud_cover?: number;
    condition: string;
    icon: string;
    unit_temp: string;
    unit_wind: string;
    unit_rain: string;
    unit_humidity?: string;
  };
  forecast: Array<{
    day: string;
    date?: string;
    temp_max: number;
    temp_min: number;
    condition: string;
    icon: string;
    rain_probability: number;
    rain_sum?: number;
    humidity: number;
  }>;
  agricultural_advisories: Array<{
    type: string;
    severity: string;
    icon: string;
    title: string;
    message: string;
  }>;
}

export interface MultimodalReportResponse {
  crop: string;
  detected_condition: string;
  confidence: string;
  confidence_raw: number;
  is_healthy: boolean;
  severity: string;
  cause_category: string;
  confidence_warning?: string | null;
  symptoms: string[];
  causes: {
    main: string;
    environmental: string;
    soil: string;
    weather: string;
    pathogen: string;
  };
  contributing_factors: string[];
  soil_summary: {
    ph: string;
    moisture: string;
    n_status: string;
    p_status: string;
    k_status: string;
    overall_soil_health: string;
  };
  weather_summary: {
    temperature: string;
    humidity: string;
    rainfall: string;
    condition: string;
  };
  prevention: string[];
  natural_approach: string[];
  affordable_management: {
    cost_category: string;
    prioritized_steps: string[];
    caution?: string;
  };
  farmer_recommendation: string;
  kannada?: any;
}

export async function predictDisease(
  imageFile: File,
  crop?: string,
  language: string = 'en',
  weatherOptions?: {
    temperature?: number;
    humidity?: number;
    rainfall?: number;
    location_name?: string;
    ph?: number;
    soil_moisture?: number;
  }
): Promise<DiseasePredictionResponse> {
  const formData = new FormData();
  formData.append('image', imageFile);
  if (crop && crop.trim()) {
    formData.append('crop', crop.trim());
  }
  formData.append('language', language);
  if (weatherOptions) {
    if (weatherOptions.temperature !== undefined) formData.append('temperature', String(weatherOptions.temperature));
    if (weatherOptions.humidity !== undefined) formData.append('humidity', String(weatherOptions.humidity));
    if (weatherOptions.rainfall !== undefined) formData.append('rainfall', String(weatherOptions.rainfall));
    if (weatherOptions.location_name) formData.append('location_name', weatherOptions.location_name);
    if (weatherOptions.ph !== undefined) formData.append('ph', String(weatherOptions.ph));
    if (weatherOptions.soil_moisture !== undefined) formData.append('soil_moisture', String(weatherOptions.soil_moisture));
  }

  const res = await fetch(`${API_BASE_URL}/api/disease/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Disease analysis failed: ${res.statusText}`);
  }
  return res.json();
}

export async function analyzeSoil(payload: {
  crop: string;
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ec?: number;
  organic_matter?: number;
}): Promise<SoilAnalysisResponse> {
  const res = await fetch(`${API_BASE_URL}/api/soil/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Soil analysis failed: ${res.statusText}`);
  }
  return res.json();
}

export async function analyzeSeed(imageFile: File, crop: string): Promise<SeedAnalysisResponse> {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('crop', crop);

  const res = await fetch(`${API_BASE_URL}/api/seed/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Seed analysis failed: ${res.statusText}`);
  }
  return res.json();
}

export async function getWeather(lat?: number, lon?: number, city?: string): Promise<WeatherResponse> {
  const params = new URLSearchParams();
  if (lat !== undefined) params.append('lat', String(lat));
  if (lon !== undefined) params.append('lon', String(lon));
  if (city) params.append('city', city);
  const query = params.toString() ? `?${params.toString()}` : '';

  const res = await fetch(`${API_BASE_URL}/api/weather${query}`);
  if (!res.ok) {
    throw new Error(`Weather fetch failed: ${res.statusText}`);
  }
  return res.json();
}

export async function searchLocations(query: string): Promise<LocationItem[]> {
  const res = await fetch(`${API_BASE_URL}/api/weather/locations?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error(`Locations search failed: ${res.statusText}`);
  }
  const data = await res.json();
  return data.locations || [];
}

export async function analyzeMultimodalCrop(formData: FormData): Promise<MultimodalReportResponse> {
  const res = await fetch(`${API_BASE_URL}/api/crop/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Multimodal analysis failed: ${res.statusText}`);
  }
  return res.json();
}

export async function sendChatMessage(message: string, language: string = 'en', crop: string = 'Tomato') {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, language, crop }),
  });

  if (!res.ok) {
    throw new Error(`Chat request failed: ${res.statusText}`);
  }
  return res.json();
}

export async function sendVoiceQuery(text: string, language: string = 'en', crop: string = 'Tomato') {
  try {
    const res = await fetch(`${API_BASE_URL}/api/voice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language, crop }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        response: data.reply || data.response || '',
        disclaimer: data.disclaimer || '',
        language: data.language || language,
        recognized_text: data.recognized_text || text,
      };
    }
  } catch (err) {
    console.warn('Backend /api/voice failed, falling back to /api/chat:', err);
  }

  // Fallback to sendChatMessage
  const chatData = await sendChatMessage(text, language, crop);
  return {
    response: chatData.response || chatData.reply || '',
    disclaimer: chatData.disclaimer || '',
    language: chatData.language || language,
    recognized_text: text,
  };
}

