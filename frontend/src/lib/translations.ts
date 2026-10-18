export type Language = 'en' | 'kn' | 'hi' | 'te' | 'ta' | 'mr';

export interface Translations {
  appName: string;
  tagline: string;
  dashboard: string;
  diseaseDetection: string;
  soilHealth: string;
  seedQuality: string;
  weather: string;
  multimodalDoctor: string;
  chatbot: string;
  voiceAssistant: string;
  reports: string;
  selectCrop: string;
  analyzeImage: string;
  uploadLeafImage: string;
  dropImageHere: string;
  orChooseSample: string;
  sampleTomatoEarlyBlight: string;
  sampleTomatoHealthy: string;
  sampleCornRust: string;
  sampleHealthySeeds: string;
  sampleDamagedSeeds: string;
  predictedCondition: string;
  confidence: string;
  severity: string;
  causeCategory: string;
  status: string;
  healthy: string;
  affected: string;
  symptoms: string;
  causes: string;
  prevention: string;
  naturalApproach: string;
  affordableTreatment: string;
  lowConfidenceWarning: string;
  overallSoilHealth: string;
  soilPh: string;
  soilMoisture: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  npkStatus: string;
  deficiencyDetection: string;
  microorganismsGuide: string;
  beneficialMicrobes: string;
  harmfulMicrobes: string;
  visualQuality: string;
  recommendedGerminationTest: string;
  forecast: string;
  agriAdvisories: string;
  askDoctor: string;
  speechPrompt: string;
  speakNow: string;
  listening: string;
  disclaimer: string;
  quickDemo: string;
  runMultimodalAnalysis: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "AI Crop Doctor",
    tagline: "Smart Agriculture Assistant for Resilient Farming",
    dashboard: "Dashboard",
    diseaseDetection: "Disease Detection",
    soilHealth: "Soil Health & NPK",
    seedQuality: "Seed Quality Check",
    weather: "Weather & Forecast",
    multimodalDoctor: "AI Multimodal Doctor",
    chatbot: "AI Agriculture Chatbot",
    voiceAssistant: "Voice Assistant",
    reports: "Crop Health Reports",
    selectCrop: "Select Target Crop",
    analyzeImage: "Analyze Plant Image",
    uploadLeafImage: "Upload or Take Leaf Photo",
    dropImageHere: "Drag & drop image here or click to browse",
    orChooseSample: "Or test with pre-loaded demo samples:",
    sampleTomatoEarlyBlight: "Tomato: Early Blight",
    sampleTomatoHealthy: "Tomato: Healthy Leaf",
    sampleCornRust: "Corn: Common Rust",
    sampleHealthySeeds: "Healthy Seed Lot",
    sampleDamagedSeeds: "Damaged / Moldy Seeds",
    predictedCondition: "Predicted Condition",
    confidence: "Confidence Score",
    severity: "Severity Level",
    causeCategory: "Possible Cause Category",
    status: "Plant Status",
    healthy: "Healthy",
    affected: "Disease Detected",
    symptoms: "Observed Symptoms",
    causes: "Underlying Causes",
    prevention: "Prevention & Cultural Practices",
    naturalApproach: "Natural / Low-Chemical Approach",
    affordableTreatment: "Affordable Treatment & Management",
    lowConfidenceWarning: "Low confidence – please consult an agricultural extension specialist.",
    overallSoilHealth: "Overall Soil Health",
    soilPh: "Soil pH Balance",
    soilMoisture: "Soil Moisture Level",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    npkStatus: "NPK Nutrient Status",
    deficiencyDetection: "Detected Soil Deficiencies",
    microorganismsGuide: "Soil Microorganisms Guide",
    beneficialMicrobes: "Beneficial Microorganisms",
    harmfulMicrobes: "Harmful Pathogens",
    visualQuality: "Visual Seed Quality",
    recommendedGerminationTest: "Recommended Germination Test",
    forecast: "5-Day Weather Forecast",
    agriAdvisories: "Weather Agricultural Advisories",
    askDoctor: "Ask the AI Crop Doctor",
    speechPrompt: "Tap the microphone and ask your crop query",
    speakNow: "Speak now... listening to your voice",
    listening: "Listening...",
    disclaimer: "AI guidance is for informational and educational purposes. For severe crop issues, consult local agricultural extension officers.",
    quickDemo: "⚡ 1-Click Hackathon Demos",
    runMultimodalAnalysis: "Run Holistic Multimodal Diagnostic"
  },
  kn: {
    appName: "ಎಐ ಬೆಳೆ ವೈದ್ಯ (AI Crop Doctor)",
    tagline: "ರೈತರ ಆಪ್ತ ಡಿಜಿಟಲ್ ಕೃಷಿ ಸಹಾಯಕ",
    dashboard: "ಮುಖಪುಟ (Dashboard)",
    diseaseDetection: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ (Disease Detection)",
    soilHealth: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಎನ್‌ಪಿಕೆ (Soil & NPK)",
    seedQuality: "ಬೀಜದ ಗುಣಮಟ್ಟ ಪರೀಕ್ಷೆ (Seed Quality)",
    weather: "ಹವಾಮಾನ ಮತ್ತು ಮುನ್ಸೂಚನೆ (Weather)",
    multimodalDoctor: "ಮಲ್ಟಿಮೋಡಲ್ ಬೆಳೆ ಪರೀಕ್ಷೆ (Multimodal Doctor)",
    chatbot: "ಕೃಷಿ ಚಾಟ್‌ಬಾಟ್ (AI Chatbot)",
    voiceAssistant: "ಧ್ವನಿ ಸಹಾಯಕ (Voice Assistant)",
    reports: "ಬೆಳೆ ಆರೋಗ್ಯ ವರದಿಗಳು (Reports)",
    selectCrop: "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    analyzeImage: "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    uploadLeafImage: "ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    dropImageHere: "ಇಲ್ಲಿ ಫೋಟೋ ಎಳೆಯಿರಿ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ",
    orChooseSample: "ಅಥವಾ ಸ್ಯಾಂಪಲ್ ಫೋಟೋಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ:",
    sampleTomatoEarlyBlight: "ಟೊಮೆಟೊ: ಮುಂಚಿನ ಅಂಗಮಾರಿ",
    sampleTomatoHealthy: "ಟೊಮೆಟೊ: ಆರೋಗ್ಯಕರ ಎಲೆ",
    sampleCornRust: "ಮೆಕ್ಕೆಜೋಳ: ತುಕ್ಕು ರೋಗ",
    sampleHealthySeeds: "ಆರೋಗ್ಯಕರ ಬೀಜಗಳು",
    sampleDamagedSeeds: "ಹಾಳಾದ / ಬೂಜು ಹಿಡಿದ ಬೀಜಗಳು",
    predictedCondition: "ಗುರುತಿಸಲಾದ ರೋಗ / ಸ್ಥಿತಿ",
    confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆ (Confidence)",
    severity: "ತೀವ್ರತೆ (Severity)",
    causeCategory: "ಸಂಭಾವ್ಯ ಕಾರಣ ವರ್ಗ",
    status: "ಬೆಳೆಯ ಸ್ಥಿತಿ",
    healthy: "ಆರೋಗ್ಯಕರ",
    affected: "ರೋಗ ಪತ್ತೆಯಾಗಿದೆ",
    symptoms: "ರೋಗದ ಲಕ್ಷಣಗಳು (Symptoms)",
    causes: "ರೋಗದ ಕಾರಣಗಳು (Causes)",
    prevention: "ತಡೆಗಟ್ಟುವ ವಿಧಾನಗಳು (Prevention)",
    naturalApproach: "ನೈಸರ್ಗಿಕ / ಕಡಿಮೆ-ರಾಸಾಯನಿಕ ವಿಧಾನ",
    affordableTreatment: "ಕಡಿಮೆ ವೆಚ್ಚದ ಪರಿಹಾರಗಳು (Affordable)",
    lowConfidenceWarning: "ಕಡಿಮೆ ವಿಶ್ವಾಸಾರ್ಹತೆ – ದಯವಿಟ್ಟು ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    overallSoilHealth: "ಒಟ್ಟಾರೆ ಮಣ್ಣಿನ ಆರೋಗ್ಯ",
    soilPh: "ಮಣ್ಣಿನ pH ಮಟ್ಟ",
    soilMoisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
    nitrogen: "ಸಾರಜನಕ (N)",
    phosphorus: "ರಂಜಕ (P)",
    potassium: "ಪೊಟ್ಯಾಷ್ (K)",
    npkStatus: "ಎನ್‌ಪಿಕೆ ಪೋಷಕಾಂಶ ಸ್ಥಿತಿ",
    deficiencyDetection: "ಮಣ್ಣಿನ ಕೊರತೆಗಳು (Deficiencies)",
    microorganismsGuide: "ಮಣ್ಣಿನ ಸೂಕ್ಷ್ಮಜೀವಿಗಳ ಮಾರ್ಗದರ್ಶಿ",
    beneficialMicrobes: "ಉಪಯುಕ್ತ ಸೂಕ್ಷ್ಮಜೀವಿಗಳು",
    harmfulMicrobes: "ಹಾನಿಕಾರಕ ರೋಗಾಣುಗಳು",
    visualQuality: "ಬೀಜದ ದೃಶ್ಯ ಗುಣಮಟ್ಟ",
    recommendedGerminationTest: "ಶಿಫಾರಸು ಮಾಡಿದ ಮೊಳಕೆ ಪರೀಕ್ಷೆ",
    forecast: "೫ ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
    agriAdvisories: "ಕೃಷಿ ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು",
    askDoctor: "ಬೆಳೆ ವೈದ್ಯರನ್ನು ಪ್ರಶ್ನಿಸಿ",
    speechPrompt: "ಮೈಕ್ರೊಫೋನ್ ಒತ್ತಿ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಮಾತನಾಡಿ",
    speakNow: "ಮಾತನಾಡಿ... ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಆಲಿಸುತ್ತಿದೆ",
    listening: "ಆಲಿಸುತ್ತಿದೆ...",
    disclaimer: "ಎಐ ಮಾರ್ಗದರ್ಶನವು ಕೇವಲ ಮಾಹಿತಿ ಉದ್ದೇಶಗಳಿಗಾಗಿದೆ. ಗಂಭೀರ ಬೆಳೆ ಸಮಸ್ಯೆಗಳಿಗಾಗಿ ಕೃಷಿ ಅಧಿಕಾರಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    quickDemo: "⚡ ೧-ಕ್ಲಿಕ್ ಪ್ರಾತ್ಯಕ್ಷಿಕೆ (Quick Demo)",
    runMultimodalAnalysis: "ಸಮಗ್ರ ಮಲ್ಟಿಮೋಡಲ್ ಪರೀಕ್ಷೆ ನಡೆಸಿ"
  },
  hi: {} as any,
  te: {} as any,
  ta: {} as any,
  mr: {} as any,
};
translations.hi = translations.en;
translations.te = translations.en;
translations.ta = translations.en;
translations.mr = translations.en;
