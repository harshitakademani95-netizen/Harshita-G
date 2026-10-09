"""
AI Crop Doctor - Soil Health & Deficiency Analysis Service
Evaluates pH, Soil Moisture, NPK macronutrients, EC, and Organic Matter.
Detects nutrient deficiencies, calculates Overall Soil Health (Good/Moderate/Poor),
and provides structured microbial and soil management insights.
"""

from typing import Dict, Any, List, Optional
from knowledge_base import CROP_SOIL_PROFILES, SOIL_MICROORGANISMS

class SoilAnalysisService:
    def analyze_soil(
        self,
        ph: float,
        moisture: float,
        nitrogen: float,
        phosphorus: float,
        potassium: float,
        ec: Optional[float] = 0.8,
        organic_matter: Optional[float] = 2.4,
        crop: str = "Tomato"
    ) -> Dict[str, Any]:
        """Complete soil health and nutrient evaluation."""
        profile = CROP_SOIL_PROFILES.get(crop, CROP_SOIL_PROFILES["General / Other"])

        # 1. pH Evaluation
        ph_info = self._evaluate_ph(ph, profile["target_ph"], crop)

        # 2. Moisture Evaluation
        moisture_info = self._evaluate_moisture(moisture, profile["target_moisture"], crop)

        # 3. NPK Evaluation
        npk_info = self._evaluate_npk(nitrogen, phosphorus, potassium, profile)

        # 4. Deficiency Detection
        deficiencies = self._detect_deficiencies(ph_info, npk_info, crop)

        # 5. Overall Soil Health Index
        overall_health = self._calculate_overall_health(ph_info, moisture_info, npk_info, organic_matter)

        return {
            "crop": crop,
            "overall_health": overall_health,
            "ph_analysis": ph_info,
            "moisture_analysis": moisture_info,
            "npk_analysis": npk_info,
            "deficiencies": deficiencies,
            "microorganisms": SOIL_MICROORGANISMS,
            "safety_note": "Soil estimations are based on agronomic sensor and entry guidelines. For certified nutrient planning, periodic professional soil lab testing is recommended."
        }

    def _evaluate_ph(self, ph: float, target_range: tuple, crop: str) -> Dict[str, Any]:
        min_ph, max_ph = target_range
        if ph < 6.0:
            category = "Acidic"
            color = "#ef4444"
            nutrient_impact = "Phosphorus, Calcium, and Magnesium availability is reduced. Aluminum toxicity may occur if pH < 5.0."
            recommendation = "Incorporate Agricultural Limestone (Calcium Carbonate) or Dolomite at 200–400 kg/acre. Add well-rotted wood ash."
        elif ph > 7.5:
            category = "Alkaline"
            color = "#3b82f6"
            nutrient_impact = "Micronutrients (Iron, Zinc, Manganese) and Phosphorus become locked in insoluble chemical complexes."
            recommendation = "Apply elemental sulfur (50–100 kg/acre) or gypsum, and incorporate generous composted organic manure to lower pH."
        else:
            category = "Neutral / Optimal"
            color = "#10b981"
            nutrient_impact = "Maximum macro and micronutrient availability is maintained for root absorption."
            recommendation = "Maintain current practices. Periodic organic mulching will preserve optimal microbial equilibrium."

        is_suitable = min_ph <= ph <= max_ph
        return {
            "value": round(ph, 2),
            "category": category,
            "target_range": f"{min_ph} - {max_ph}",
            "is_suitable": is_suitable,
            "suitability_text": f"Ideal for {crop} (target {min_ph}–{max_ph})" if is_suitable else f"Sub-optimal for {crop} (needs adjustment toward {min_ph}–{max_ph})",
            "nutrient_impact": nutrient_impact,
            "management_recommendation": recommendation,
            "color": color
        }

    def _evaluate_moisture(self, moisture: float, target_range: tuple, crop: str) -> Dict[str, Any]:
        min_m, max_m = target_range
        if moisture < min_m:
            status = "Dry (Deficit)"
            badge_color = "red"
            recommendation = f"Immediate irrigation is recommended. Soil water is below the {min_m}% minimum threshold for {crop}. Consider early-morning drip irrigation."
        elif moisture > max_m:
            status = "Wet (Excess)"
            badge_color = "amber"
            recommendation = f"Cease irrigation immediately. Soil moisture exceeds {max_m}%, risking root asphyxiation, Pythium root rot, and fertilizer leaching."
        else:
            status = "Optimal"
            badge_color = "emerald"
            recommendation = f"Soil moisture is in the ideal range ({min_m}%–{max_m}%) for active transpiration and nutrient translocation."

        return {
            "value": round(moisture, 1),
            "status": status,
            "target_range": f"{min_m}% - {max_m}%",
            "badge_color": badge_color,
            "irrigation_recommendation": recommendation
        }

    def _evaluate_npk(self, n: float, p: float, k: float, profile: dict) -> Dict[str, Any]:
        def classify(val, target):
            low, high = target
            if val < low * 0.85:
                return "LOW", "#ef4444"
            elif val > high * 1.15:
                return "HIGH", "#3b82f6"
            else:
                return "NORMAL", "#10b981"

        n_status, n_color = classify(n, profile["target_n"])
        p_status, p_color = classify(p, profile["target_p"])
        k_status, k_color = classify(k, profile["target_k"])

        return {
            "nitrogen": {
                "value": round(n, 1),
                "unit": "kg/ha (or ppm)",
                "status": n_status,
                "target": f"{profile['target_n'][0]}-{profile['target_n'][1]}",
                "color": n_color
            },
            "phosphorus": {
                "value": round(p, 1),
                "unit": "kg/ha (or ppm)",
                "status": p_status,
                "target": f"{profile['target_p'][0]}-{profile['target_p'][1]}",
                "color": p_color
            },
            "potassium": {
                "value": round(k, 1),
                "unit": "kg/ha (or ppm)",
                "status": k_status,
                "target": f"{profile['target_k'][0]}-{profile['target_k'][1]}",
                "color": k_color
            }
        }

    def _detect_deficiencies(self, ph_info: dict, npk_info: dict, crop: str) -> List[Dict[str, Any]]:
        deficiencies = []

        # Nitrogen deficiency
        if npk_info["nitrogen"]["status"] == "LOW":
            deficiencies.append({
                "element": "Nitrogen (N)",
                "title": "Possible Nitrogen Deficiency",
                "symptoms": "Uniform pale yellowing (chlorosis) beginning on older lower leaves; stunted slender stems.",
                "crop_effects": "Impaired chlorophyll synthesis, slow vegetative canopy growth, and substantially reduced yield.",
                "soil_management": "Top-dress with nitrogen fertilizer in split applications. Avoid leaching during heavy rains.",
                "affordable_natural_options": "Apply decomposed cow manure, neem-coated urea, or vermicompost; intercrop with nitrogen-fixing pulses."
            })

        # Phosphorus deficiency
        if npk_info["phosphorus"]["status"] == "LOW":
            deficiencies.append({
                "element": "Phosphorus (P)",
                "title": "Possible Phosphorus Deficiency",
                "symptoms": "Dark dull green foliage with distinct purplish-bronze pigmentation on leaf undersides and petioles.",
                "crop_effects": "Poor root system development, delayed flowering, poor fruit or grain setting.",
                "soil_management": "Band-place single superphosphate (SSP) or rock phosphate near root zone rather than broadcasting.",
                "affordable_natural_options": "Inoculate with Phosphate Solubilizing Bacteria (PSB) or VAM Mycorrhizae; apply bone meal."
            })

        # Potassium deficiency
        if npk_info["potassium"]["status"] == "LOW":
            deficiencies.append({
                "element": "Potassium (K)",
                "title": "Possible Potassium Deficiency",
                "symptoms": "Marginal chlorosis turning into dry brown scorching / necrosis along leaf edges ('tip burn').",
                "crop_effects": "Weak stalks prone to lodging, increased susceptibility to disease infection and drought stress.",
                "soil_management": "Apply Muriate of Potash (MOP) or Sulfate of Potash (SOP) before flowering.",
                "affordable_natural_options": "Apply hardwood ash (50 kg/acre), banana peel compost, or farmyard manure rich in organic potassium."
            })

        # pH induced deficiency
        if ph_info["category"] == "Acidic":
            deficiencies.append({
                "element": "Calcium / Magnesium lock",
                "title": "Soil Acidity Induced Nutrient Lock",
                "symptoms": "Blossom end rot in fruits, weak cell walls, magnesium deficiency (interveinal chlorosis).",
                "crop_effects": "Roots fail to absorb micronutrients even if present in soil due to acid toxicity.",
                "soil_management": "Liming with agricultural dolomite (adds Ca and Mg simultaneously).",
                "affordable_natural_options": "Apply powdered eggshells or limestone rock powder."
            })

        return deficiencies

    def _calculate_overall_health(self, ph_info: dict, moisture_info: dict, npk_info: dict, om: float) -> Dict[str, Any]:
        score = 100
        reasons = []

        if not ph_info["is_suitable"]:
            score -= 20
            reasons.append(f"Soil pH ({ph_info['value']}) is {ph_info['category'].lower()}, which inhibits nutrient uptake.")
        else:
            reasons.append(f"Soil pH ({ph_info['value']}) is in the optimal balanced range.")

        if moisture_info["status"] != "Optimal":
            score -= 15
            reasons.append(f"Soil moisture is {moisture_info['status'].lower()} ({moisture_info['value']}%).")
        else:
            reasons.append(f"Soil moisture ({moisture_info['value']}%) is at ideal field capacity.")

        low_count = sum(1 for el in ["nitrogen", "phosphorus", "potassium"] if npk_info[el]["status"] == "LOW")
        high_count = sum(1 for el in ["nitrogen", "phosphorus", "potassium"] if npk_info[el]["status"] == "HIGH")

        if low_count > 0:
            score -= (low_count * 15)
            reasons.append(f"{low_count} essential macronutrient(s) are critically LOW.")
        if high_count > 0:
            score -= (high_count * 5)
            reasons.append(f"Excessive concentration detected in {high_count} macronutrient(s).")
        if low_count == 0 and high_count == 0:
            reasons.append("All primary macronutrients (N-P-K) are in the healthy target equilibrium.")

        score = max(20, min(100, score))

        if score >= 75:
            grade = "Good"
            color = "#10b981"
            summary = "Soil demonstrates high biological and chemical fertility. Excellent foundation for crop growth."
        elif score >= 50:
            grade = "Moderate"
            color = "#f59e0b"
            summary = "Soil condition is fair but exhibits nutrient imbalances or moisture divergence needing corrective attention."
        else:
            grade = "Poor"
            color = "#ef4444"
            summary = "Soil health is severely compromised by nutrient depletion or adverse pH, requiring immediate soil amendment."

        return {
            "status": grade,
            "score": score,
            "color": color,
            "summary": summary,
            "reasons": reasons
        }

# Global singleton
soil_service = SoilAnalysisService()
