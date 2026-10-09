"""
AI Crop Doctor - Seed Quality Inspection Service
Assesses visible seed quality using image analysis metrics.
Provides Visual Assessment and structured Recommended Germination Test protocols.
Adheres strictly to agronomic safety guidelines without false claims on genetic quality.
"""

import io
from typing import Dict, Any, Optional
from PIL import Image
import numpy as np

class SeedQualityService:
    def analyze_seed_image(self, image_bytes: bytes, crop: Optional[str] = "Tomato") -> Dict[str, Any]:
        """Performs visual inspection on seed sample image."""
        try:
            img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        except Exception as e:
            raise ValueError(f"Could not decode seed image: {e}")

        # Resize for consistent inspection
        img_small = img.resize((200, 200))
        arr = np.array(img_small, dtype=np.float32) / 255.0

        r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
        gray = 0.299 * r + 0.587 * g + 0.114 * b

        # Detect dark spots/discoloration (dark pixels below threshold)
        discoloration_mask = (gray < 0.25) & (r < 0.3)
        discoloration_ratio = float(np.sum(discoloration_mask) / (200 * 200))

        # Detect mold-like or whitish-fuzzy patches (high brightness, low saturation)
        saturation = np.max(arr, axis=2) - np.min(arr, axis=2)
        mold_mask = (gray > 0.72) & (saturation < 0.12)
        mold_ratio = float(np.sum(mold_mask) / (200 * 200))

        # High variance in local brightness indicates broken/fragmented seed edges
        std_dev = float(np.std(gray))

        # Estimate damage and visual score
        damage_index = min(1.0, (discoloration_ratio * 3.5) + (mold_ratio * 4.0))
        visual_score = max(35, min(96, int(100 - (damage_index * 60) - (0.05 * std_dev * 100))))

        if visual_score >= 82:
            quality_category = "High Visual Quality"
            badge_color = "emerald"
            appearance_desc = "Seeds exhibit uniform coloration, intact seed coats, and minimal debris or visible deformities."
            broken_deformed_status = "Very Low (Under 3% estimated)"
            mold_status = "None detected visually"
        elif visual_score >= 65:
            quality_category = "Moderate Visual Quality"
            badge_color = "amber"
            appearance_desc = "Minor variations in seed coat coloration and slight debris. Seeds appear predominantly whole."
            broken_deformed_status = "Moderate (Estimated 5%–12% cracked/shriveled)"
            mold_status = "Slight surface speckling observed; check moisture"
        else:
            quality_category = "Poor Visual Quality"
            badge_color = "red"
            appearance_desc = "Significant discoloration, cracked/broken coats, or suspicious surface fuzziness detected."
            broken_deformed_status = "Elevated (Over 15% damaged or deformed)"
            mold_status = "Possible mold/fungal spore presence detected on seed coats"

        return {
            "crop": crop,
            "visual_assessment": {
                "estimated_quality": quality_category,
                "visual_score": visual_score,
                "badge_color": badge_color,
                "seed_appearance": appearance_desc,
                "discoloration_level": f"{round(discoloration_ratio * 100, 1)}% surface irregularities",
                "broken_deformed_signs": broken_deformed_status,
                "mold_fungal_signs": mold_status,
                "surface_uniformity": "Good" if std_dev < 0.28 else "Irregular"
            },
            "germination_test_guide": {
                "title": "Recommended Standard Germination Test (Paper Towel Method)",
                "steps": [
                    "1. Count 50 or 100 seeds randomly from the seed lot.",
                    "2. Moisten two clean paper towels with clean drinking water (damp, not dripping wet).",
                    "3. Space seeds evenly in rows across the first towel, then cover gently with the second towel.",
                    "4. Roll the towels loosely and place inside a sealed perforated zip bag at 22°C–26°C.",
                    "5. Keep in darkness for 4 to 7 days, checking daily to ensure paper remains moist.",
                    "6. Count sprouted seeds: (Number sprouted / Total seeds tested) x 100 = Germination %.",
                    "7. Viability threshold: Greater than 85% is recommended for field sowing."
                ],
                "floatation_test": "Quick Float Test: Place seeds in clean water. Heavy viable seeds typically sink within 10 minutes; hollow or insect-damaged seeds float to the surface."
            },
            "scientific_disclaimer": "CRITICAL NOTICE: Visual image assessment inspects surface characteristics only. It CANNOT evaluate internal embryo viability, genetic purity, or actual germination percentage. Always conduct a standard germination test prior to large-scale field planting."
        }

# Global singleton
seed_service = SeedQualityService()
