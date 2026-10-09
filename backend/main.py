"""
AI Crop Doctor - Smart Agriculture Assistant
Main FastAPI Backend Server
Modular, robust, CORS-enabled REST API serving all agricultural intelligence modules.
"""

import os
from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from knowledge_base import DISEASE_DATABASE, CROP_SOIL_PROFILES, SOIL_MICROORGANISMS
from translations_data import DISEASE_TRANSLATIONS
from disease_model import disease_classifier
from soil_service import soil_service
from seed_service import seed_service
from weather_service import weather_service
from multimodal_service import multimodal_doctor
from chatbot_service import chatbot_service

app = FastAPI(
    title="AI Crop Doctor API",
    description="Intelligent Agriculture Platform for Plant Disease Identification, Soil Testing, Weather Advisories, and Seed Quality",
    version="1.0.0"
)

# CORS configuration to allow Next.js frontend communication seamlessly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Request Models ---

class SoilRequest(BaseModel):
    crop: str = Field(default="Tomato", description="Target crop")
    ph: float = Field(default=6.2, ge=3.0, le=10.0, description="Soil pH value")
    moisture: float = Field(default=60.0, ge=0.0, le=100.0, description="Soil moisture percentage")
    nitrogen: float = Field(default=150.0, ge=0.0, description="Nitrogen level in kg/ha or ppm")
    phosphorus: float = Field(default=40.0, ge=0.0, description="Phosphorus level in kg/ha or ppm")
    potassium: float = Field(default=200.0, ge=0.0, description="Potassium level in kg/ha or ppm")
    ec: Optional[float] = Field(default=0.8, description="Electrical conductivity in dS/m")
    organic_matter: Optional[float] = Field(default=2.5, description="Soil Organic Matter %")

class ChatRequest(BaseModel):
    message: str = Field(..., description="Farmer's question")
    language: str = Field(default="en", description="Language code: 'en' or 'kn'")
    crop: Optional[str] = Field(default="Tomato", description="Selected crop context")

class VoiceRequest(BaseModel):
    text: str = Field(..., description="Transcribed voice text")
    language: str = Field(default="en", description="'en' or 'kn'")
    crop: Optional[str] = Field(default="Tomato")

# --- Endpoints ---

@app.get("/")
def root():
    return {
        "project": "AI Crop Doctor – Smart Agriculture Assistant",
        "status": "Operational",
        "version": "1.0.0",
        "endpoints": [
            "/api/disease/predict",
            "/api/soil/analyze",
            "/api/seed/analyze",
            "/api/crop/analyze",
            "/api/weather",
            "/api/chat",
            "/api/voice",
            "/api/diseases",
            "/api/diseases/{disease}"
        ]
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": disease_classifier.is_loaded,
        "inference_engine": "active"
    }

@app.get("/api/crops")
def list_crops():
    """List available supported crops."""
    return {
        "crops": [
            {"id": "Tomato", "name": "Tomato (ಟೊಮೆಟೊ)", "category": "Vegetable"},
            {"id": "Potato", "name": "Potato (ಆಲೂಗಡ್ಡೆ)", "category": "Tuber"},
            {"id": "Corn / Maize", "name": "Corn / Maize (ಮೆಕ್ಕೆಜೋಳ)", "category": "Cereal"},
            {"id": "Bell Pepper / Chili", "name": "Bell Pepper / Chili (ಕ್ಯಾಪ್ಸಿಕಂ / ಮೆಣಸು)", "category": "Vegetable"},
            {"id": "Rice / Paddy", "name": "Rice / Paddy (ಭತ್ತ)", "category": "Cereal"}
        ]
    }

@app.get("/api/diseases")
def list_diseases():
    """List all supported plant conditions in knowledge base."""
    diseases = []
    for k, v in DISEASE_DATABASE.items():
        diseases.append({
            "id": k,
            "crop": v["crop"],
            "disease_name": v["disease_name"],
            "cause_category": v["cause_category"],
            "is_healthy": v["is_healthy"],
            "severity": v["default_severity"]
        })
    return {"total": len(diseases), "diseases": diseases}

@app.get("/api/diseases/{disease_id}")
def get_disease_detail(disease_id: str):
    """Retrieve full scientific, cause, symptom, prevention, and treatment data for a disease."""
    if disease_id not in DISEASE_DATABASE:
        raise HTTPException(status_code=404, detail=f"Disease '{disease_id}' not found in knowledge database")
    return DISEASE_DATABASE[disease_id]

@app.post("/api/disease/predict")
async def predict_disease(
    image: UploadFile = File(...),
    crop: Optional[str] = Form(None),
    language: str = Form("en"),
    temperature: Optional[float] = Form(None),
    humidity: Optional[float] = Form(None),
    rainfall: Optional[float] = Form(None),
    location_name: Optional[str] = Form(None),
    ph: Optional[float] = Form(None),
    soil_moisture: Optional[float] = Form(None)
):
    """
    Requirement 1 & 4: Plant Disease Detection with Weather Integration
    Upload leaf image, classify with pretrained model, and synthesize meteorological
    risk factors without requiring a manual Target Crop input.
    """
    try:
        contents = await image.read()
        if len(contents) == 0:
            raise HTTPException(status_code=400, detail="Uploaded image is empty")

        prediction = disease_classifier.predict(contents, crop_hint=crop)
        pred_class = prediction["predicted_class"]

        # Fetch enriched knowledge base entry
        info = DISEASE_DATABASE.get(pred_class, DISEASE_DATABASE.get("Tomato_Early_Blight"))

        detected_crop = crop if (crop and crop.strip()) else info.get("crop", "Cultivated Crop")

        is_low_conf = prediction["confidence"] < 0.65
        confidence_alert = "Low confidence – please consult an agricultural expert or university extension specialist." if is_low_conf else None

        # Look up localized translations
        localized_data = DISEASE_TRANSLATIONS.get(pred_class, {}).get(language)
        if not localized_data and language == "kn":
            localized_data = info.get("kannada")

        condition_name = localized_data["disease_name"] if (localized_data and "disease_name" in localized_data) else info["disease_name"]
        cause_category = localized_data["cause_category"] if (localized_data and "cause_category" in localized_data) else info["cause_category"]
        symptoms = localized_data["symptoms"] if (localized_data and "symptoms" in localized_data) else info["symptoms"]
        natural_approach = localized_data["natural_approach"] if (localized_data and "natural_approach" in localized_data) else info["natural_approach"]

        # Assess epidemiological weather risk (Requirement 4)
        weather_risk = weather_service.assess_weather_disease_risk(
            temp=temperature,
            humidity=humidity,
            rain=rainfall,
            predicted_disease=pred_class
        )

        soil_limitation = (
            "Soil sensors not connected. Environmental risk is formulated using real-time atmospheric conditions and visual symptoms alone."
            if ph is None else None
        )

        return {
            "prediction": prediction,
            "crop": detected_crop,
            "condition_name": condition_name,
            "confidence": f"{int(prediction['confidence'] * 100)}%",
            "confidence_score": prediction["confidence"],
            "is_healthy": prediction.get("is_healthy", info["is_healthy"]),
            "severity": prediction.get("severity") or info["default_severity"],
            "possible_cause_category": cause_category,
            "confidence_warning": confidence_alert,
            "causes": info["causes"],
            "symptoms": symptoms,
            "prevention": info["prevention"],
            "natural_low_chemical_approach": natural_approach,
            "affordable_treatment": info["affordable_treatment"],
            "weather_risk": weather_risk,
            "location_name": location_name,
            "soil_limitation": soil_limitation,
            "localized": localized_data,
            "kannada": info.get("kannada", {})
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/soil/analyze")
def analyze_soil(req: SoilRequest):
    """
    Requirements 8, 9, 10, 12, 13, 14:
    Soil health, pH, Moisture, NPK chart, Microorganisms, Deficiencies.
    """
    try:
        result = soil_service.analyze_soil(
            ph=req.ph,
            moisture=req.moisture,
            nitrogen=req.nitrogen,
            phosphorus=req.phosphorus,
            potassium=req.potassium,
            ec=req.ec,
            organic_matter=req.organic_matter,
            crop=req.crop
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/seed/analyze")
async def analyze_seed(
    image: UploadFile = File(...),
    crop: str = Form("Tomato")
):
    """
    Requirement 11: Seed Quality Visual Inspection
    Assesses appearance, discoloration, mold, damaged seeds and outlines germination tests.
    """
    try:
        contents = await image.read()
        if len(contents) == 0:
            raise HTTPException(status_code=400, detail="Uploaded seed image is empty")

        result = seed_service.analyze_seed_image(contents, crop=crop)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/weather")
def get_weather(
    lat: Optional[float] = Query(None),
    lon: Optional[float] = Query(None),
    city: Optional[str] = Query(None)
):
    """
    Requirements 2, 3, 15, 16: Live Location-Based Weather & Forecast
    Returns real-time Open-Meteo observation, 7-day agricultural forecast, and advisories for any coordinates.
    """
    return weather_service.get_weather(lat=lat, lon=lon, city_name=city)

@app.get("/api/weather/locations")
def search_locations(q: str = Query("")):
    """
    Search agricultural plantation hubs & global cities via Open-Meteo geocoding.
    """
    return {"locations": weather_service.search_locations(q)}

@app.post("/api/crop/analyze")
async def analyze_multimodal_crop(
    image: Optional[UploadFile] = File(None),
    crop: str = Form("Tomato"),
    ph: float = Form(6.2),
    moisture: float = Form(72.0),
    nitrogen: float = Form(110.0),
    phosphorus: float = Form(45.0),
    potassium: float = Form(210.0),
    temperature: Optional[float] = Form(None),
    humidity: Optional[float] = Form(None),
    rainfall: Optional[float] = Form(None)
):
    """
    Requirement 20 & 26:
    Multimodal Crop Health Analysis combining Image + Soil + Weather + Crop.
    """
    try:
        img_bytes = None
        if image:
            img_bytes = await image.read()

        report = multimodal_doctor.analyze_crop_health(
            image_bytes=img_bytes,
            crop=crop,
            ph=ph,
            moisture=moisture,
            nitrogen=nitrogen,
            phosphorus=phosphorus,
            potassium=potassium,
            temperature=temperature,
            humidity=humidity,
            rainfall=rainfall
        )
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat")
def chat_with_crop_doctor(req: ChatRequest):
    """
    Requirement 17 & 19: AI Agriculture Chatbot (English & Kannada)
    """
    return chatbot_service.answer_query(
        message=req.message,
        language=req.language,
        crop_context=req.crop
    )

@app.post("/api/voice")
def voice_assistant(req: VoiceRequest):
    """
    Requirement 18: Voice Assistant Endpoint
    """
    result = chatbot_service.answer_query(
        message=req.text,
        language=req.language,
        crop_context=req.crop
    )
    return {
        "recognized_text": req.text,
        "reply": result["response"],
        "disclaimer": result["disclaimer"],
        "language": result["language"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
