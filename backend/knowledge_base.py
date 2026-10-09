"""
AI Crop Doctor - Agricultural Knowledge Base
Authoritative, scientifically grounded crop disease, soil, and management information.
Includes bilingual metadata (English & Kannada) for farmer accessibility.
"""

DISEASE_DATABASE = {
    "Tomato_Early_Blight": {
        "crop": "Tomato",
        "disease_name": "Early Blight (Alternaria solani)",
        "is_healthy": False,
        "cause_category": "Fungal",
        "default_severity": "Moderate",
        "causes": {
            "main": "Infection caused by the fungal pathogen Alternaria solani surviving in soil and plant debris.",
            "environmental": "High relative humidity (>80%) accompanied by warm temperatures (24°C–29°C).",
            "soil": "Overly wet soil, poor drainage, and splashing of pathogen-infested soil particles onto lower leaves.",
            "weather": "Periods of frequent rainfall or heavy dew followed by warm sunny days.",
            "pathogen": "Fungal spores spread rapidly via wind, rain splash, and contaminated gardening tools."
        },
        "symptoms": [
            "Concentric rings ('bullseye' or target-board pattern) on older lower leaves",
            "Yellow halo (chlorosis) surrounding dark brown or black necrotic lesions",
            "Progressive leaf yellowing leading to premature defoliation from bottom to top",
            "Dark, sunken, leathery cankers on stems near the soil line",
            "Dark brown leathery spots near the stem end of mature green or ripe fruits"
        ],
        "prevention": [
            "Practice minimum 2 to 3-year crop rotation avoiding other Solanaceous crops (potato, eggplant)",
            "Apply straw or plastic mulch to prevent soil splashing onto foliage during rain or irrigation",
            "Maintain wider plant spacing (60–75 cm) and stake plants to ensure excellent airflow",
            "Use drip irrigation instead of overhead watering to keep foliage completely dry",
            "Promptly prune and bury/burn infected lower leaves; never compost diseased material"
        ],
        "natural_approach": [
            "Foliar spray of 0.5% Cold-Pressed Neem Oil (5ml/L + mild organic soap) every 7–10 days",
            "Soil and foliar application of bio-agent Trichoderma viride or Trichoderma harzianum (5g/L)",
            "Baking soda antifungal spray (5g sodium bicarbonate + 2ml vegetable oil per liter of water)",
            "Fermented buttermilk/sour curd spray (1:10 dilution in water) acting as an organic lactic-acid shield"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. Prevention: Prune lower 30cm foliage and lay clean dry straw mulch around base (Cost: Free / Very Low).",
                "2. Cultural: Drip or base-watering early morning to allow rapid soil-surface drying (Cost: Low).",
                "3. Bio/Natural: Spray Trichoderma viride or 0.5% Neem oil at earliest appearance of spots (Cost: Low).",
                "4. Chemical (Last Resort): If disease covers >25% canopy, apply Copper Oxychloride (2.5g/L) or Mancozeb (2g/L) with safety gloves."
            ],
            "caution": "Wear protective mask while spraying copper compounds. Observe 7-day pre-harvest waiting interval."
        },
        "kannada": {
            "disease_name": "ಟೊಮೆಟೊ ಮುಂಚಿನ ಅಂಗಮಾರಿ ರೋಗ (Early Blight)",
            "cause_category": "ಶಿಲೀಂಧ್ರ (Fungal)",
            "symptoms": [
                "ಕೆಳಗಿನ ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ಗುರಿ ಹಲಗೆಯಂತಹ (ಟಾರ್ಗೆಟ್ ರಿಂಗ್) ಕಂದು ಬಣ್ಣದ ವೃತ್ತಾಕಾರದ ಕಲೆಗಳು",
                "ಕಲೆಯ ಸುತ್ತಲೂ ಹಳದಿ ಬಣ್ಣದ ವಲಯ",
                "ಎಲೆಗಳು ಒಣಗಿ ಕೆಳಭಾಗದಿಂದ ಉದುರುವುದು"
            ],
            "natural_approach": [
                "ಬೇವಿನ ಎಣ್ಣೆ (೫ ಮಿ.ಲೀ/ಲೀಟರ್) ಸಿಂಪಡಣೆ",
                "ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡೆ (೫ ಗ್ರಾಂ/ಲೀಟರ್) ಮಣ್ಣು ಮತ್ತು ಎಲೆಗಳ ಉಪಚಾರ",
                "ಹುಳಿ ಮಜ್ಜಿಗೆ ಸಿಂಪಡಣೆ (೧:೧೦ ಪ್ರಮಾಣ)"
            ],
            "affordable_treatment": "ಕಡಿಮೆ ವೆಚ್ಚ: ಹಾನಿಗೊಳಗಾದ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ತೆಗೆಯಿರಿ, ಬೇವಿನ ಕಷಾಯ ಅಥವಾ ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ಸಿಂಪಡಿಸಿ."
        }
    },
    "Tomato_Late_Blight": {
        "crop": "Tomato",
        "disease_name": "Late Blight (Phytophthora infestans)",
        "is_healthy": False,
        "cause_category": "Fungal-like (Oomycete)",
        "default_severity": "High",
        "causes": {
            "main": "Water-mold pathogen Phytophthora infestans capable of devastating entire fields within days.",
            "environmental": "Cool, persistent wet weather with temperatures between 15°C and 22°C.",
            "soil": "Waterlogged soils and prolonged standing water promoting spore motility.",
            "weather": "Continuous drizzling rain, high relative humidity (>90%), and prolonged cloud cover.",
            "pathogen": "Airborne sporangia travelling miles on wind currents and rainstorms."
        },
        "symptoms": [
            "Large, irregular, water-soaked dark greenish-brown lesions on leaves and stems",
            "Delicate white fungal down/mildew visible on leaf undersides in humid mornings",
            "Rapid collapse, wilting, and brown necrosis of entire leaf stems resembling frost damage",
            "Firm, greasy, olive-brown to dark lesions on green and ripening fruits"
        ],
        "prevention": [
            "Plant certified disease-free transplants or resistant varieties (e.g., Mountain Magic)",
            "Avoid planting adjacent to potato fields which harbor early inoculums",
            "Ensure well-drained raised beds and wide row spacing for maximum sunlight penetration",
            "Strictly avoid overhead sprinkler irrigation during overcast cool spells",
            "Immediately destroy heavily infected plants by bagging and deep burial"
        ],
        "natural_approach": [
            "Preventative spray of Copper octanoate (copper soap) or Bordeaux mixture (1%)",
            "Bacillus subtilis biological suspension applied weekly before rainy spells begin",
            "Cow urine extract (diluted 1:10) with ginger-garlic paste as cultural barrier"
        ],
        "affordable_treatment": {
            "cost_category": "Medium cost",
            "prioritized_steps": [
                "1. Immediate Sanitation: Rogue out and destroy severely blighted plants immediately (Free).",
                "2. Protection: Apply protective Bordeaux mixture (1%) or Copper Hydroxide (Low to Medium cost).",
                "3. Systemic Treatment (if epidemic strikes): Cymoxanil + Mancozeb or Dimethomorph as prescribed by extension officer."
            ],
            "caution": "Late blight progresses exponentially. Act within 24 hours of first detection."
        },
        "kannada": {
            "disease_name": "ಟೊಮೆಟೊ ತಡವಾದ ಅಂಗಮಾರಿ ರೋಗ (Late Blight)",
            "cause_category": "ಶಿಲೀಂಧ್ರ (Oomycete)",
            "symptoms": [
                "ಎಲೆಗಳ ಮೇಲೆ ನೀರಿನಿಂದ ನೆನೆದಂತಹ ಕಪ್ಪು-ಕಂದು ಬಣ್ಣದ ದೊಡ್ಡ ಕಲೆಗಳು",
                "ಎಲೆಯ ಕೆಳಭಾಗದಲ್ಲಿ ಬಿಳಿಯ ಶಿಲೀಂಧ್ರ ಬೆಳವಣಿಗೆ",
                "ಗಿಡವು ಸುಟ್ಟುಹೋದಂತೆ ಕಾಣುವುದು ಮತ್ತು ಹಣ್ಣು ಕೊಳೆಯುವುದು"
            ],
            "natural_approach": [
                "ಬೋರ್ಡೋ ದ್ರಾವಣ (೧%) ಸಿಂಪಡಣೆ",
                "ಬ್ಯಾಸಿಲಸ್ ಸಬ್ಟಿಲಿಸ್ ಜೈವಿಕ ನಿಯಂತ್ರಣ ದ್ರಾವಣ"
            ],
            "affordable_treatment": "ಮಧ್ಯಮ ವೆಚ್ಚ: ತಕ್ಷಣ ರೋಗಗ್ರಸ್ತ ಗಿಡಗಳನ್ನು ತೆಗೆಯಿರಿ, ತಾಮ್ರದ ಯುಕ್ತ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ."
        }
    },
    "Tomato_Leaf_Mold": {
        "crop": "Tomato",
        "disease_name": "Leaf Mold (Passalora fulva)",
        "is_healthy": False,
        "cause_category": "Fungal",
        "default_severity": "Moderate",
        "causes": {
            "main": "Fungal infection thriving in protected cultivation (polyhouses) and dense canopies.",
            "environmental": "High relative humidity (exceeding 85%) and moderate warmth (21°C–24°C).",
            "soil": "Overly shaded moist soil beds with stagnant microclimates.",
            "weather": "Humid stagnant days with low wind and poor canopy ventilation.",
            "pathogen": "Conidia spores spread by air movement, greenhouse fans, and clothing."
        },
        "symptoms": [
            "Pale greenish to bright yellow patches on the upper surface of older leaves",
            "Velvety olive-green to grayish-purple mold layer on the corresponding lower surface",
            "Leaves curl upwards, turn dark brown, wither, and drop prematurely"
        ],
        "prevention": [
            "Increase ventilation in greenhouses and prune lower suckers to allow airflow",
            "Keep humidity strictly below 80% through ridge venting and morning irrigation",
            "Sterilize greenhouse stakes and structural poles between growing cycles"
        ],
        "natural_approach": [
            "Spray potassium bicarbonate (3g/L) to alter leaf surface pH against spores",
            "Bio-control spray of Trichoderma harzianum on foliage canopy",
            "Neem oil 0.3% spray applied in late evening"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. Pruning and airflow improvement (Free).",
                "2. Potassium bicarbonate or baking soda spray (Low cost).",
                "3. Copper hydroxide or Chlorothalonil if severe (Medium cost)."
            ],
            "caution": "Avoid spraying during hot midday sun to prevent leaf scorching."
        },
        "kannada": {
            "disease_name": "ಟೊಮೆಟೊ ಎಲೆ ಬೂజు ರೋಗ (Leaf Mold)",
            "cause_category": "ಶಿಲೀಂಧ್ರ (Fungal)",
            "symptoms": ["ಎಲೆಯ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಹಳದಿ ಕಲೆಗಳು, ಕೆಳಭಾಗದಲ್ಲಿ ಆಲಿವ್ ಹಸಿರು ಬೂజు"],
            "natural_approach": ["ಬೇಕಿಂಗ್ ಸೋಡಾ ದ್ರಾವಣ ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ"],
            "affordable_treatment": "ಗಾಳಿಯಾಡುವಿಕೆ ಹೆಚ್ಚಿಸಿ ಮತ್ತು ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ."
        }
    },
    "Tomato_Septoria_Leaf_Spot": {
        "crop": "Tomato",
        "disease_name": "Septoria Leaf Spot (Septoria lycopersici)",
        "is_healthy": False,
        "cause_category": "Fungal",
        "default_severity": "Moderate",
        "causes": {
            "main": "Fungus Septoria lycopersici overwintering in solanaceous weed hosts and crop residues.",
            "environmental": "Warm temperatures (20°C–26°C) and prolonged leaf moisture.",
            "soil": "Contaminated soil splashing onto low foliage during irrigation or rain.",
            "weather": "Warm wet summer spells and heavy overnight dew.",
            "pathogen": "Pycnidia fruiting bodies producing thousands of water-splash spores."
        },
        "symptoms": [
            "Numerous small (2–4 mm), circular spots with dark brown margins and gray/tan centers",
            "Tiny black specks (pycnidia) clearly visible inside the center of each spot",
            "Extensive lower leaf yellowing and defoliation, exposing fruits to sunscald"
        ],
        "prevention": [
            "Clear solanaceous weeds (nightshade, horsenettle) around the farm perimeter",
            "Mulch heavily around each plant right after transplanting",
            "Clean staking equipment with diluted bleach (1:9) between seasons"
        ],
        "natural_approach": [
            "Application of bio-fungicide Bacillus amyloliquefaciens",
            "Diluted cold-pressed neem seed extract (3ml/L) spray",
            "Garlic-chili aqueous bio-spray as preventative barrier"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. Weed control and ground mulching (Low cost).",
                "2. Immediate removal of lower spotted leaves (Free).",
                "3. Copper-based organic bactericide/fungicide spray (Low to Medium cost)."
            ],
            "caution": "Do not work in the field when leaves are wet to prevent spreading spores."
        },
        "kannada": {
            "disease_name": "ಸೆಪ್ಟೋರಿಯಾ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ (Septoria Leaf Spot)",
            "cause_category": "ಶಿಲೀಂಧ್ರ (Fungal)",
            "symptoms": ["ಬೂದು ಮಧ್ಯಭಾಗ ಮತ್ತು ಕಪ್ಪು ಅಂಚುಳ್ಳ ಸಣ್ಣ ದುಂಡಗಿನ ಚುಕ್ಕೆಗಳು"],
            "natural_approach": ["ಬೇವಿನ ಬೀಜದ ಕಷಾಯ, ಮಲ್ಚಿಂಗ್ ಮಾಡುವುದು"],
            "affordable_treatment": "ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ತೆಗೆಯಿರಿ, ನೀರು ಚಿಮುಕಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ."
        }
    },
    "Tomato_Yellow_Leaf_Curl_Virus": {
        "crop": "Tomato",
        "disease_name": "Yellow Leaf Curl Virus (TYLCV)",
        "is_healthy": False,
        "cause_category": "Viral (Vector: Whitefly)",
        "default_severity": "High",
        "causes": {
            "main": "Begomovirus transmitted exclusively by the sweetpotato whitefly (Bemisia tabaci).",
            "environmental": "Warm, arid conditions favoring explosive whitefly breeding.",
            "soil": "Not directly transmitted through soil or seed; strictly vector-borne.",
            "weather": "Dry spells, high temperatures (28°C–35°C), and breezy conditions dispersing vectors.",
            "pathogen": "Single-stranded DNA virus reproducing inside plant phloem."
        },
        "symptoms": [
            "Severe upward curling and cupping of leaflets",
            "Marked interveinal yellowing (chlorosis) and purple venation",
            "Severe plant stunting with shortened internodes giving a bushy appearance",
            "Flower bud drop leading to near-total failure of fruit set"
        ],
        "prevention": [
            "Erect 40–50 mesh insect-proof netting in nursery beds to protect young seedlings",
            "Install yellow sticky traps (15–20 traps per acre) to monitor and capture whiteflies",
            "Plant border crops like maize, sorghum, or pearl millet as physical barrier hedges",
            "Rogue out and bury virus-infected plants as soon as initial upward cupping shows"
        ],
        "natural_approach": [
            "Neem oil (5ml/L) or Pongamia (Honge) oil spray to repel and disrupt whitefly feeding",
            "Spray entomopathogenic fungus Beauveria bassiana or Verticillium lecanii (5g/L) for vector biocontrol",
            "Agniastra / Dashaparni organic botanical formulation"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. Sticky Traps: Set up cheap yellow plastic sheets coated with castor oil (Very low cost).",
                "2. Border Barrier: Sow 3 rows of maize around the tomato plot (Low cost).",
                "3. Bio-vector control: Spray Verticillium lecanii (5g/L) targeting leaf undersides.",
                "4. Note: Viruses cannot be cured by chemicals; control the whitefly vector only."
            ],
            "caution": "Do not spray broad-spectrum insecticides that kill beneficial predatory insects (lacewings, ladybird beetles)."
        },
        "kannada": {
            "disease_name": "ಟೊಮೆಟೊ ಎಲೆ ಮುದುರು ವೈರಸ್ ರೋಗ (TYLCV)",
            "cause_category": "ವೈರಸ್ (ಬಿಳಿ ನೊಣದಿಂದ ಹರಡುತ್ತದೆ)",
            "symptoms": [
                "ಎಲೆಗಳು ಮೇಲ್ಮುಖವಾಗಿ ಬಟ್ಟಲಿನಂತೆ ಮುದುರಿಕೊಳ್ಳುವುದು",
                "ಎಲೆಗಳು ಹಳದಿಯಾಗುವುದು ಮತ್ತು ಗಿಡ ಬೆಳವಣಿಗೆ ಕುಂಠಿತವಾಗುವುದು",
                "ಹೂವುಗಳು ಉದುರಿ ಕಾಯಿ ಕಟ್ಟದಿರುವುದು"
            ],
            "natural_approach": [
                "ಹಳದಿ ಅಂಟು ಬಲೆಗಳ ಬಳಕೆ (Yellow Sticky Traps)",
                "ಬೇವಿನ ಎಣ್ಣೆ ಅಥವಾ ಹೊಂಗೆ ಎಣ್ಣೆ ಸಿಂಪಡಣೆ",
                "ಬೆವೆರಿಯಾ ಬ್ಯಾಸಿಯಾನಾ ಜೈವಿಕ ಕೀಟನಾಶಕ"
            ],
            "affordable_treatment": "ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಣಕ್ಕೆ ಹಳದಿ ಬಲೆ ಹಾಕಿ, ಬೇವಿನ ಕಷಾಯ ಸಿಂಪಡಿಸಿ."
        }
    },
    "Tomato_Bacterial_Spot": {
        "crop": "Tomato",
        "disease_name": "Bacterial Spot (Xanthomonas perforans)",
        "is_healthy": False,
        "cause_category": "Bacterial",
        "default_severity": "Moderate",
        "causes": {
            "main": "Bacterial pathogen Xanthomonas species surviving in seed coats and infected volunteer plants.",
            "environmental": "High relative humidity with warm temperatures (24°C–30°C).",
            "soil": "Wet field conditions and surface runoff transmitting bacteria between rows.",
            "weather": "Wind-driven heavy rains that create microscopic wounds on leaf epidermis.",
            "pathogen": "Bacterium entering plants through stomata and leaf abrasion wounds."
        },
        "symptoms": [
            "Small (less than 3 mm), dark brown to black, water-soaked, angular spots on leaves",
            "Spots may be surrounded by a narrow faint yellow halo",
            "In severe cases, centers of spots drop out giving a 'shot-hole' appearance",
            "Rough, scabby, raised dark brown spots on green tomato fruits"
        ],
        "prevention": [
            "Use hot water-treated (50°C for 25 mins) or certified pathogen-free seeds",
            "Avoid overhead irrigation and avoid cultivating field while foliage is damp",
            "Rotate out of solanaceous crops for minimum 2 seasons",
            "Disinfect pruning shears regularly with 70% isopropyl alcohol"
        ],
        "natural_approach": [
            "Foliar spray of copper soap (copper octanoate) combined with Bacillus subtilis",
            "Bio-fumigation with mustard cover crop green manure",
            "Aqueous extract of neem cake (5%) as soil drench"
        ],
        "affordable_treatment": {
            "cost_category": "Medium cost",
            "prioritized_steps": [
                "1. Prevention: Hot water seed treatment before nursery sowing (Free).",
                "2. Sanitation: Pruning and spacing for foliage drying (Low cost).",
                "3. Bio/Chemical: Copper Oxychloride (2g/L) combined with Streptocycline (0.1g/L) for severe outbreaks."
            ],
            "caution": "Do not overuse antibiotic sprays to prevent bacterial resistance development."
        },
        "kannada": {
            "disease_name": "ಟೊಮೆಟೊ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಚುಕ್ಕೆ ರೋಗ (Bacterial Spot)",
            "cause_category": "ಬ್ಯಾಕ್ಟೀರಿಯಾ (Bacterial)",
            "symptoms": ["ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ಕಪ್ಪು ಕೋನೀಯ ಚುಕ್ಕೆಗಳು, ಹಣ್ಣಿನ ಮೇಲೆ ತಗ್ಗುಬಿದ್ದ ಕಲೆಗಳು"],
            "natural_approach": ["ಬಿಸಿ ನೀರಿನಲ್ಲಿ ಬೀಜೋಪಚಾರ (೫೦°C ೨೫ ನಿಮಿಷ), ಬೇವಿನ ಹಿಂಡಿ ದ್ರಾವಣ"],
            "affordable_treatment": "ತಾಮ್ರದ ಶಿಲೀಂಧ್ರನಾಶಕ ಮತ್ತು ನೈರ್ಮಲ್ಯ ಕಾಪಾಡುವುದು."
        }
    },
    "Tomato_Healthy": {
        "crop": "Tomato",
        "disease_name": "Healthy Tomato Foliage",
        "is_healthy": True,
        "cause_category": "None (Plant is Healthy)",
        "default_severity": "None",
        "causes": {
            "main": "Optimal growing conditions with balanced nutrition and clean environment.",
            "environmental": "Well-balanced sunlight, ambient temperature (20°C–28°C), and humidity (55–70%).",
            "soil": "Healthy living soil rich in organic matter and balanced NPK ratio.",
            "weather": "Stable weather conditions without prolonged flooding or severe heat stress.",
            "pathogen": "No pathogenic symptoms detected."
        },
        "symptoms": [
            "Vibrant, deep green, uniform leaf color without spots or chlorosis",
            "Firm, upright stems and turgid leaves showing active transpiration",
            "Normal leaflet shape without curling, cupping, or necrotic edges",
            "Healthy vigor and robust terminal bud development"
        ],
        "prevention": [
            "Continue balanced drip fertigation and monitor soil moisture at 40–60%",
            "Apply prophylactic neem oil spray once every 14 days to deter pests",
            "Inspect underside of leaves weekly for early signs of thrips or whiteflies"
        ],
        "natural_approach": [
            "Apply Jeevamrutha or vermicompost tea every 15 days to nurture beneficial soil microbiome",
            "Maintain dry mulch layer around root zone to suppress weeds and retain soil biology",
            "Plant marigolds around field edges to deter nematodes and attract pollinators"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. Maintain current routine care and regular scouting (Free).",
                "2. Nourish with homemade compost or Jeevamrutha (Low cost).",
                "3. Ensure regular clean weeding and optimal drip irrigation."
            ],
            "caution": "Avoid unnecessary pesticide spraying to preserve predatory insects."
        },
        "kannada": {
            "disease_name": "ಆರೋಗ್ಯಕರ ಟೊಮೆಟೊ ಗಿಡ (Healthy)",
            "cause_category": "ಆರೋಗ್ಯಕರ (Healthy)",
            "symptoms": ["ಹಚ್ಚ ಹಸಿರಾದ ಎಲೆಗಳು, ಯಾವುದೇ ಕಲೆ ಅಥವಾ ಮುದುಡುವಿಕೆ ಇಲ್ಲ"],
            "natural_approach": ["ಜೀವಾಮೃತ ಮತ್ತು ಎರೆಹುಳು ಗೊಬ್ಬರ ಬಳಕೆ"],
            "affordable_treatment": "ಉತ್ತಮ ನೀರಾವರಿ ಮತ್ತು ನಿಯಮಿತ ಪರಿಶೀಲನೆ ಮುಂದುವರಿಸಿ."
        }
    },
    "Potato_Early_Blight": {
        "crop": "Potato",
        "disease_name": "Potato Early Blight (Alternaria solani)",
        "is_healthy": False,
        "cause_category": "Fungal",
        "default_severity": "Moderate",
        "causes": {
            "main": "Fungal infection from Alternaria solani attacking maturing potato plants.",
            "environmental": "Alternating dry and wet periods with temperatures of 24°C–29°C.",
            "soil": "Nutrient-depleted soil (low nitrogen) leaving plants vulnerable.",
            "weather": "Warm days followed by high dew and sporadic rain showers.",
            "pathogen": "Wind-blown spores infecting senescing lower leaf tissues."
        },
        "symptoms": [
            "Dark brown, angular, concentric ring lesions on mature lower foliage",
            "Yellowing around lesions progressing to leaf desiccation",
            "Tuber surface exhibits dark, sunken, irregular dry rot lesions with purplish margins"
        ],
        "prevention": [
            "Ensure adequate nitrogen and potassium fertilization to prevent premature leaf senescence",
            "Hill up tubers thoroughly to prevent spores washing into soil contacting tubers",
            "Allow vine kill and skin set for 10–14 days before harvest"
        ],
        "natural_approach": [
            "Trichoderma viride seed tuber treatment (10g/kg seed tuber) before planting",
            "Foliar spray of 0.5% neem oil combined with silicate amendments",
            "Bio-formulation of Pseudomonas fluorescens (5g/L)"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. Soil hilling and weed clearance (Free / Low cost).",
                "2. Bio-fungicide spray with Trichoderma or Pseudomonas (Low cost).",
                "3. Mancozeb 75% WP (2.5g/L) if field incidence crosses 10% threshold."
            ],
            "caution": "Harvest tubers in dry weather to minimize tuber rot in storage."
        },
        "kannada": {
            "disease_name": "ಆಲೂಗಡ್ಡೆ ಮುಂಚಿನ ಅಂಗಮಾರಿ (Potato Early Blight)",
            "cause_category": "ಶಿಲೀಂಧ್ರ (Fungal)",
            "symptoms": ["ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ವೃತ್ತಾಕಾರದ ಕಂದು ಕಲೆಗಳು, ಗೆಡ್ಡೆಗಳ ಮೇಲೆ ತಗ್ಗುಬಿದ್ದ ಕಲೆ"],
            "natural_approach": ["ಟ್ರೈಕೋಡರ್ಮಾ ಬೀಜೋಪಚಾರ, ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಣೆ"],
            "affordable_treatment": "ಸಾಕಷ್ಟು ಗೊಬ್ಬರ ನೀಡಿ ಗಿಡ ಬಲಪಡಿಸಿ, ಮ್ಯಾಂಕೋಜೆಬ್ ಸಿಂಪಡಿಸಿ."
        }
    },
    "Potato_Late_Blight": {
        "crop": "Potato",
        "disease_name": "Potato Late Blight (Phytophthora infestans)",
        "is_healthy": False,
        "cause_category": "Fungal-like (Oomycete)",
        "default_severity": "High",
        "causes": {
            "main": "Water-mold Phytophthora infestans — historic cause of catastrophic potato blights.",
            "environmental": "Cool, humid conditions (12°C–22°C) with prolonged leaf wetness >10 hours.",
            "soil": "Infested seed tubers and wet soil allowing zoospore migration to tubers.",
            "weather": "Dense fog, cloud cover, mist, and continuous drizzle.",
            "pathogen": "Flagellated motile zoospores swimming through soil water films to infect tubers."
        },
        "symptoms": [
            "Water-soaked dark lesions at leaf tips expanding rapidly into blotches",
            "White velvety fungal sporulation on leaf underside in morning humidity",
            "Petioles and stems turn black, brittle, and collapse with foul rotting odor",
            "Tubers develop purplish-brown surface depression and reddish-brown dry granular rot inside"
        ],
        "prevention": [
            "Use certified disease-free seed tubers from reputable cold storages",
            "Destroy all volunteer potato plants and cull piles before planting",
            "Hill soil deeply (minimum 10–12 cm over tubers) to form a barrier against washing spores",
            "Terminate vines (dehaulm) 10 days before harvesting when late blight is active"
        ],
        "natural_approach": [
            "Preventive spray of Bordeaux mixture (1%) before the onset of monsoon fog",
            "Application of Bacillus subtilis suspension (5ml/L)",
            "Chitosan oligosaccharide bio-elicitor spray to trigger plant systemic resistance"
        ],
        "affordable_treatment": {
            "cost_category": "Medium cost",
            "prioritized_steps": [
                "1. Cull and discard infected seed tubers before sowing (Free).",
                "2. Early prophylactic Bordeaux mixture (1%) application (Low cost).",
                "3. Metalaxyl + Mancozeb (2.5g/L) or Cymoxanil if disease strikes rapidly."
            ],
            "caution": "Do not leave harvested tubers in wet fields; dry immediately in shade."
        },
        "kannada": {
            "disease_name": "ಆಲೂಗಡ್ಡೆ ತಡವಾದ ಅಂಗಮಾರಿ (Potato Late Blight)",
            "cause_category": "ಶಿಲೀಂಧ್ರ (Oomycete)",
            "symptoms": ["ಎಲೆ ತುದಿಯಲ್ಲಿ ಕಪ್ಪು ಕಲೆ, ಎಲೆಯಡಿ ಬಿಳಿ ಬೂಜು, ಗೆಡ್ಡೆಗಳು ಕೊಳೆಯುವುದು"],
            "natural_approach": ["ಬೋರ್ಡೋ ಮಿಶ್ರಣ (೧%) ಸಿಂಪಡಣೆ, ಜೈವಿಕ ರಕ್ಷಕ"],
            "affordable_treatment": "ರೋಗಮುಕ್ತ ಬೀಜದ ಆಲೂಗಡ್ಡೆ ಬಳಸಿ, ತಕ್ಷಣ ಸಿಂಪಡಣೆ ಕೈಗೊಳ್ಳಿ."
        }
    },
    "Potato_Healthy": {
        "crop": "Potato",
        "disease_name": "Healthy Potato Foliage",
        "is_healthy": True,
        "cause_category": "None (Plant is Healthy)",
        "default_severity": "None",
        "causes": {
            "main": "Healthy growth with balanced nutrition and disease-free seed source.",
            "environmental": "Comfortable cool-season temperatures (15°C–24°C) with balanced soil moisture.",
            "soil": "Loose, well-aerated, sandy-loam soil with pH 5.8–6.5.",
            "weather": "Good sunlight, low humidity, and dry foliage conditions.",
            "pathogen": "No active pathogen."
        },
        "symptoms": [
            "Vigorous, dense green canopy with smooth, unblemished leaves",
            "Thick, upright stems and uniform development of floral buds",
            "No curling, necrotic spots, or wilting observed"
        ],
        "prevention": [
            "Maintain consistent soil moisture (60–70% field capacity) during tuber bulking",
            "Hill up soil around stems to keep growing tubers well covered from sunlight",
            "Scout foliage twice weekly for early aphid or blight spots"
        ],
        "natural_approach": [
            "Side dress with well-decomposed vermicompost or neem cake (100 kg/acre)",
            "Spray fermented Panchagavya (3%) once a month for vigor and immunity"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. Regular hilling and moisture maintenance (Low cost).",
                "2. Preventative neem spray every 15 days.",
                "3. Stop irrigation 10 days prior to harvest to toughen tuber skin."
            ],
            "caution": "Ensure tubers are not exposed to sunlight to prevent poisonous greening (solanine)."
        },
        "kannada": {
            "disease_name": "ಆರೋಗ್ಯಕರ ಆಲೂಗಡ್ಡೆ ಗಿಡ (Healthy)",
            "cause_category": "ಆರೋಗ್ಯಕರ (Healthy)",
            "symptoms": ["ದಟ್ಟ ಹಸಿರು ಎಲೆಗಳು, ಯಾವುದೇ ಕಲೆ ಇಲ್ಲದ ಆರೋಗ್ಯಕರ ಬೆಳವಣಿಗೆ"],
            "natural_approach": ["ಪಂಚಗವ್ಯ (೩%) ಸಿಂಪಡಣೆ, ಎರೆಹುಳು ಗೊಬ್ಬರ"],
            "affordable_treatment": "ಸಮತೋಲಿತ ನೀರು ಮತ್ತು ಮಣ್ಣು ಏರಿಸುವಿಕೆ (Hilling) ಮುಂದುವರಿಸಿ."
        }
    },
    "Corn_Common_Rust": {
        "crop": "Corn / Maize",
        "disease_name": "Corn Common Rust (Puccinia sorghi)",
        "is_healthy": False,
        "cause_category": "Fungal",
        "default_severity": "Moderate",
        "causes": {
            "main": "Fungal pathogen Puccinia sorghi carried by high altitude winds from southern regions.",
            "environmental": "Cool to moderate temperatures (16°C–25°C) with high relative humidity (>95%).",
            "soil": "Not soil-borne; pathogen requires living host tissue to survive.",
            "weather": "Heavy dew cycles, overcast conditions, and mild foggy weather.",
            "pathogen": "Urediniospores blowing hundreds of miles on storm fronts."
        },
        "symptoms": [
            "Golden-brown to cinnamon-brown powdery pustules (uredinia) scattered on both leaf surfaces",
            "Pustules rupture the leaf epidermis, releasing rust-colored powdery spores on contact",
            "As season progresses, pustules turn dark brown to black (teliospores)",
            "Severe infection leads to leaf chlorosis, premature death, and poor kernel fill"
        ],
        "prevention": [
            "Plant rust-resistant or tolerant hybrid maize cultivars",
            "Sow corn early in the season to complete grain fill before rust spores arrive on winds",
            "Avoid planting sweet corn adjacent to field corn that serves as rust reservoir"
        ],
        "natural_approach": [
            "Sulfur-based wettable powder spray (2g/L) during early vegetative stages",
            "Application of bio-agent Bacillus amyloliquefaciens on leaf canopy",
            "Cow urine fermented solution (10%) as traditional immune booster"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. Resistant hybrids: Best long-term zero-cost management.",
                "2. Early planting: Escapes peak spore migration periods.",
                "3. Wettable Sulfur (2g/L) or Mancozeb (2g/L) if rust appears prior to silking stage."
            ],
            "caution": "Fungicide sprays are rarely economical once corn has progressed past the dent stage."
        },
        "kannada": {
            "disease_name": "ಮೆಕ್ಕೆಜೋಳದ ತುಕ್ಕು ರೋಗ (Corn Common Rust)",
            "cause_category": "ಶಿಲೀಂಧ್ರ (Fungal)",
            "symptoms": ["ಎಲೆಗಳ ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಕಂದು ಬಣ್ಣದ ಪುಡಿ ತುಂಬಿದ ಸಣ್ಣ ಗುಳ್ಳೆಗಳು"],
            "natural_approach": ["ಗಂಧಕದ ಪುಡಿ (Sulfur 2g/L) ಸಿಂಪಡಣೆ, ಜೈವಿಕ ನಿಯಂತ್ರಣ"],
            "affordable_treatment": "ರೋಗ ನಿರೋಧಕ ತಳಿಗಳ ಬಳಕೆ, ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಗಂಧಕ ಸಿಂಪಡಿಸಿ."
        }
    },
    "Corn_Northern_Leaf_Blight": {
        "crop": "Corn / Maize",
        "disease_name": "Northern Corn Leaf Blight (Exserohilum turcicum)",
        "is_healthy": False,
        "cause_category": "Fungal",
        "default_severity": "Moderate",
        "causes": {
            "main": "Fungus Exserohilum turcicum overwintering on infested corn crop residue.",
            "environmental": "Moderate temperatures (18°C–27°C) accompanied by extended periods of leaf moisture (6–12 hrs).",
            "soil": "Abundant surface crop residue in zero-tillage systems without crop rotation.",
            "weather": "Wet, cloudy, rainy periods during mid-to-late vegetative season.",
            "pathogen": "Conidia spores splashed or blown onto lower leaves."
        },
        "symptoms": [
            "Characteristic long, elliptical, cigar-shaped grayish-green to tan lesions (2.5 to 15 cm)",
            "Lesions develop dark fungal spores in damp weather giving a dirty appearance",
            "Lesions coalesce, causing whole leaves to wither and burn, severely limiting grain yield"
        ],
        "prevention": [
            "Rotate crops with non-grasses (soybean, groundnut, pulses) for at least one full season",
            "Chop and till corn residue deep into soil to accelerate microbial decomposition",
            "Select resistant hybrids with Ht-gene single gene or multigenic resistance"
        ],
        "natural_approach": [
            "Foliar spray of Trichoderma harzianum (5g/L) during early vegetative growth",
            "Compost tea enriched with beneficial antagonistic bacteria",
            "Neem cake soil application (150 kg/acre) to enrich soil biodiversity"
        ],
        "affordable_treatment": {
            "cost_category": "Medium cost",
            "prioritized_steps": [
                "1. Crop rotation and residue management (Free / Low cost).",
                "2. Biocontrol application before tasseling (Low cost).",
                "3. Azoxystrobin + Difenoconazole or Mancozeb if upper leaves infected before silking."
            ],
            "caution": "Prioritize protection of the 'ear leaf' and leaves above it as they supply 75% of grain fill."
        },
        "kannada": {
            "disease_name": "ಉತ್ತರ ಮೆಕ್ಕೆಜೋಳದ ಎಲೆ ಅಂಗಮಾರಿ (Northern Leaf Blight)",
            "cause_category": "ಶಿಲೀಂಧ್ರ (Fungal)",
            "symptoms": ["ಉದ್ದನೆಯ ಸುರುಟಿದ ಸಿಗಾರ್ ಆಕಾರದ ಬೂದು-ಕಂದು ಬಣ್ಣದ ದೊಡ್ಡ ಕಲೆಗಳು"],
            "natural_approach": ["ಬೆಳೆ ಪರಿವರ್ತನೆ, ಟ್ರೈಕೋಡರ್ಮಾ ಸಿಂಪಡಣೆ"],
            "affordable_treatment": "ಬೆಳೆ ಉಳಿಕೆಗಳನ್ನು ಮಣ್ಣಿನಲ್ಲಿ ಹೂಳುವುದು, ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯುವುದು."
        }
    },
    "Corn_Healthy": {
        "crop": "Corn / Maize",
        "disease_name": "Healthy Corn / Maize",
        "is_healthy": True,
        "cause_category": "None (Plant is Healthy)",
        "default_severity": "None",
        "causes": {
            "main": "Optimum sunlight, adequate nitrogen supply, and proper weed-free field management.",
            "environmental": "Warm daytime temperatures (25°C–32°C) with balanced soil moisture.",
            "soil": "Fertile, deep, well-drained loam with high organic carbon and adequate nitrogen.",
            "weather": "Sunny days with periodic rainfall or reliable irrigation.",
            "pathogen": "No pathogen detected."
        },
        "symptoms": [
            "Broad, arching leaves with deep green uniform color and strong central midribs",
            "Robust stalk thickness and healthy prop roots at basal nodes",
            "Clean leaf blades without pustules, stripes, or necrotic edges"
        ],
        "prevention": [
            "Side dress with nitrogen (urea or neem-coated urea) at knee-high (V6) and tasseling stages",
            "Maintain weed-free zone around base during first 45 days after emergence",
            "Ensure regular irrigation during critical tasseling and silking stages"
        ],
        "natural_approach": [
            "Apply Jeevamrutha or vermicompost at 30 and 50 days after sowing",
            "Grow intercrops like cowpea or beans to fix atmospheric nitrogen naturally",
            "Spray zinc sulfate (0.5%) + lime (0.25%) if mild interveinal pale bands appear"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. Timely irrigation during flowering and grain formation (Crucial).",
                "2. Balanced nitrogen application in split doses.",
                "3. Monitor field for Fall Armyworm egg masses on whorls."
            ],
            "caution": "Avoid moisture stress during silking as it directly reduces cob seed-set."
        },
        "kannada": {
            "disease_name": "ಆರೋಗ್ಯಕರ ಮೆಕ್ಕೆಜೋಳ (Healthy Corn)",
            "cause_category": "ಆರೋಗ್ಯಕರ (Healthy)",
            "symptoms": ["ದಪ್ಪನೆಯ ಹಸಿರು ಎಲೆಗಳು, ಗಟ್ಟಿ ಕಾಂಡ, ಯಾವುದೇ ಕಲೆ ಇಲ್ಲ"],
            "natural_approach": ["ಜೀವಾಮೃತ ಬಳಕೆ, ದ್ವಿದಳ ಧಾನ್ಯಗಳ ಅಂತರ ಬೆಳೆ"],
            "affordable_treatment": "ಹೂ ಬಿಡುವ ಸಮಯದಲ್ಲಿ ನೀರಿನ ಕೊರತೆಯಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ."
        }
    },
    "Pepper_Bell_Bacterial_Spot": {
        "crop": "Bell Pepper / Chili",
        "disease_name": "Bacterial Spot (Xanthomonas euvesicatoria)",
        "is_healthy": False,
        "cause_category": "Bacterial",
        "default_severity": "Moderate",
        "causes": {
            "main": "Bacterial infection entering foliage through stomata and wind-blown abrasion injuries.",
            "environmental": "High relative humidity with warm temperatures (24°C–32°C).",
            "soil": "Infected seed and crop residues from previous capsicum or tomato crops.",
            "weather": "Wind-driven rains, heavy storms, and sprinkler irrigation droplets.",
            "pathogen": "Xanthomonas species surviving up to a year on dry crop debris."
        },
        "symptoms": [
            "Small (1–3 mm), dark, greasy, water-soaked spots on undersides of leaves",
            "Spots become angular with dark brown margins and slightly depressed pale centers",
            "Severely infected leaves turn yellow, scorch, and drop prematurely, causing fruit sunscald",
            "Fruits develop small blister-like raised rough warty spots"
        ],
        "prevention": [
            "Purchase certified pathogen-free seeds or soak seeds in 1.3% sodium hypochlorite for 1 min",
            "Avoid working in chili/pepper plots while plants are wet with morning dew or rain",
            "Use drip irrigation and maintain raised beds to avoid water pooling"
        ],
        "natural_approach": [
            "Prophylactic foliar spray of copper soap (copper octanoate) with Bacillus subtilis",
            "Neem seed kernel extract (5%) foliar spray",
            "Ginger-garlic-chili aqueous bio-extract to suppress bacterial surface populations"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. Hot water seed treatment before nursery bed preparation (Free).",
                "2. Remove and burn heavily infected foliage (Free).",
                "3. Copper Hydroxide (2g/L) mixed with Mancozeb (2g/L) for synergistic control (Low cost)."
            ],
            "caution": "Strictly do not cultivate or spray while leaves are wet."
        },
        "kannada": {
            "disease_name": "ಕ್ಯಾಪ್ಸಿಕಂ / ಮೆಣಸಿನಕಾಯಿ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಚುಕ್ಕೆ ರೋಗ",
            "cause_category": "ಬ್ಯಾಕ್ಟೀರಿಯಾ (Bacterial)",
            "symptoms": ["ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ಕಪ್ಪು ಜಿಡ್ಡುಗಟ್ಟಿದ ಚುಕ್ಕೆಗಳು, ಎಲೆ ಉದುರುವುದು, ಕಾಯಿ ಮೇಲೆ ಗುಳ್ಳೆ"],
            "natural_approach": ["ಬೇವಿನ ಬೀಜದ ಕಷಾಯ (೫%), ಶುಂಠಿ-ಬೆಳ್ಳುಳ್ಳಿ ಕಷಾಯ"],
            "affordable_treatment": "ತಾಮ್ರದ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಣೆ, ಒಣಗಿದಾಗ ಮಾತ್ರ ಕೃಷಿ ಕಾರ್ಯ ಮಾಡಿ."
        }
    },
    "Pepper_Bell_Healthy": {
        "crop": "Bell Pepper / Chili",
        "disease_name": "Healthy Bell Pepper / Chili Foliage",
        "is_healthy": True,
        "cause_category": "None (Plant is Healthy)",
        "default_severity": "None",
        "causes": {
            "main": "Proper spacing, adequate nutrients, and well-managed irrigation.",
            "environmental": "Day temperatures (22°C–28°C), night temperatures (18°C–21°C).",
            "soil": "Well-drained, sandy-loam soil with organic matter and pH 6.0–6.8.",
            "weather": "Balanced sunshine with moderate humidity.",
            "pathogen": "No pathogen detected."
        },
        "symptoms": [
            "Glossy, rich green foliage with smooth blade margins",
            "Strong central canopy, sturdy branches, and active flowering",
            "No leaf spots, curling, or viral mottling"
        ],
        "prevention": [
            "Maintain consistent soil moisture to prevent blossom end rot (calcium deficiency)",
            "Apply neem cake powder (50g per plant) around root zone to deter nematodes",
            "Monitor weekly for thrips or mite activity on shoot tips"
        ],
        "natural_approach": [
            "Spray fermented buttermilk (5%) every 20 days as a natural growth promoter",
            "Apply vermicompost and wood ash around base for slow-release potassium"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. Consistent drip irrigation (avoids calcium-deficiency blossom end rot).",
                "2. Blue & yellow sticky traps for thrips and mites (Low cost).",
                "3. Mulching to preserve root temperature."
            ],
            "caution": "Avoid nitrogen over-fertilization which produces excess leaves and attracts aphids."
        },
        "kannada": {
            "disease_name": "ಆರೋಗ್ಯಕರ ಕ್ಯಾಪ್ಸಿಕಂ / ಮೆಣಸಿನಕಾಯಿ (Healthy)",
            "cause_category": "ಆರೋಗ್ಯಕರ (Healthy)",
            "symptoms": ["ಹೊಳೆಯುವ ಹಸಿರು ಎಲೆಗಳು, ಆರೋಗ್ಯಕರ ಹೂವು ಮತ್ತು ಕಾಯಿ"],
            "natural_approach": ["ಎರೆಹುಳು ಗೊಬ್ಬರ, ಮಜ್ಜಿಗೆ ಸಿಂಪಡಣೆ"],
            "affordable_treatment": "ಸಮತೋಲಿತ ನೀರು ಮತ್ತು ಸಾವಯವ ಗೊಬ್ಬರ ನೀಡಿ."
        }
    },
    "Rice_Blast": {
        "crop": "Rice / Paddy",
        "disease_name": "Rice Blast (Magnaporthe oryzae)",
        "is_healthy": False,
        "cause_category": "Fungal",
        "default_severity": "High",
        "causes": {
            "main": "Fungal pathogen Magnaporthe oryzae attacking leaves, collars, and panicle necks.",
            "environmental": "High relative humidity (>90%) with nighttime temperatures of 17°C–22°C.",
            "soil": "Excessive application of chemical nitrogen fertilizer without balanced potassium.",
            "weather": "Prolonged rainfall, cloudy days, and heavy morning dew hanging on leaves >10 hrs.",
            "pathogen": "Airborne conidia adhering rapidly to rice cuticles via adhesive mucilage."
        },
        "symptoms": [
            "Spindle-shaped or diamond-shaped lesions with pointed ends and gray/white centers",
            "Outer margins of lesions are reddish-brown to dark brown",
            "Lesions coalesce causing complete leaf desiccation ('leaf blast')",
            "Black rotting of the panicle base ('neck blast') causing white empty grains (panicle death)"
        ],
        "prevention": [
            "Avoid excessive split doses of nitrogen; balance with muriate of potash and silicon",
            "Treat seed with Tricyclazole 75 WP (2g/kg) or Pseudomonas fluorescens (10g/kg)",
            "Avoid continuous flooding with stagnant deep water; practice Alternate Wetting and Drying (AWD)",
            "Destroy rice stubbles and volunteer grasses along field bunds"
        ],
        "natural_approach": [
            "Foliar spray of Pseudomonas fluorescens (10g/L) at tillering and panicle initiation",
            "Application of silicate fertilizers (rice husk ash / diatomaceous earth) to toughen cuticle",
            "Fermented cow urine + neem leaf extract (1:10) spray"
        ],
        "affordable_treatment": {
            "cost_category": "Medium cost",
            "prioritized_steps": [
                "1. Nitrogen Management: Immediately suspend urea top-dressing (Free).",
                "2. Bio-protection: Pseudomonas fluorescens foliar spray (Low cost).",
                "3. Targeted Chemical: Tricyclazole 75% WP (0.6g/L) or Isoprothiolane (1.5ml/L) at boot leaf stage."
            ],
            "caution": "Neck blast infection cannot be cured after panicle emergence. Prevention before boot leaf is essential."
        },
        "kannada": {
            "disease_name": "ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (Rice Blast)",
            "cause_category": "ಶಿಲೀಂಧ್ರ (Fungal)",
            "symptoms": [
                "ದೋಣಿಯ ಅಥವಾ ಕಣ್ಣಿನ ಆಕಾರದ ಕಂದು ಬಣ್ಣದ ಕಲೆಗಳು, ಮಧ್ಯದಲ್ಲಿ ಬೂದು ಬಣ್ಣ",
                "ತೆನೆಯ ಕುತ್ತಿಗೆ ಕಪ್ಪಾಗಿ ಕೊಳೆಯುವುದು (ಕುತ್ತಿಗೆ ಬೆಂಕಿ ರೋಗ)",
                "ಕಾಳು ಕಟ್ಟದೆ ಜಳ್ಳಾಗುವುದು"
            ],
            "natural_approach": [
                "ಸ್ಯೂಡೋಮೊನಾಸ್ ಫ್ಲೋರೊಸೆನ್ಸ್ (೧೦ ಗ್ರಾಂ/ಲೀಟರ್) ಸಿಂಪಡಣೆ",
                "ಬೂದಿ ಅಥವಾ ಸಿಲಿಕಾನ್ ಬಳಕೆ (ಎಲೆಗಳ ರಕ್ಷಣೆಗಾಗಿ)"
            ],
            "affordable_treatment": "ತಕ್ಷಣ ಯೂರಿಯಾ ಕೊಡುವುದನ್ನು ನಿಲ್ಲಿಸಿ, ಟ್ರೈಸೈಕ್ಲೋಜೋಲ್ ಸಿಂಪಡಿಸಿ."
        }
    },
    "Rice_Healthy": {
        "crop": "Rice / Paddy",
        "disease_name": "Healthy Rice / Paddy Foliage",
        "is_healthy": True,
        "cause_category": "None (Plant is Healthy)",
        "default_severity": "None",
        "causes": {
            "main": "Balanced water management, optimal fertilization, and disease-free nursery seedlings.",
            "environmental": "Full sun, warm temperatures (24°C–32°C).",
            "soil": "Clayey or loamy paddy soil with adequate organic matter.",
            "weather": "Good sunlight and balanced monsoon conditions.",
            "pathogen": "No pathogen detected."
        },
        "symptoms": [
            "Erect, vibrant green tillers with smooth, unspotted leaf blades",
            "Sturdy culms and strong root mass with white active feeder roots",
            "Uniform heading and healthy emergent green panicles"
        ],
        "prevention": [
            "Follow Alternate Wetting and Drying (AWD) water management",
            "Maintain balanced N:P:K ratio (typically 4:2:1 or as per soil test)",
            "Keep bunds weed-free to prevent harboring insect vectors"
        ],
        "natural_approach": [
            "Azospirillum and Phosphobacteria biofertilizers applied at transplanting",
            "Incorporate green manure crops (Sesbania / Sunn hemp) before puddling"
        ],
        "affordable_treatment": {
            "cost_category": "Low cost",
            "prioritized_steps": [
                "1. AWD water management saves up to 30% water and strengthens roots (Free).",
                "2. Split application of potash at panicle initiation for grain weight.",
                "3. Regular field scouting."
            ],
            "caution": "Avoid keeping water continuously stagnant at depth >5cm."
        },
        "kannada": {
            "disease_name": "ಆರೋಗ್ಯಕರ ಭತ್ತದ ಬೆಳೆ (Healthy Rice)",
            "cause_category": "ಆರೋಗ್ಯಕರ (Healthy)",
            "symptoms": ["ಹಚ್ಚ ಹಸಿರಾದ ಗರಿಗಳು, ಬಲವಾದ ತೆನೆಗಳು"],
            "natural_approach": ["ಹಸಿರೆಲೆ ಗೊಬ್ಬರ (ಡೈಂಚಾ/ಸೆಣಬು), ಜೈವಿಕ ಗೊಬ್ಬರ"],
            "affordable_treatment": "ಪರ್ಯಾಯ ಒಣಗಿಸುವಿಕೆ ಮತ್ತು ನೀರುಣಿಸುವಿಕೆ (AWD) ಪದ್ಧತಿ ಅನುಸರಿಸಿ."
        }
    }
}

# Soil Nutrient Target Profiles for common crops
CROP_SOIL_PROFILES = {
    "Tomato": {"target_ph": (6.0, 6.8), "target_moisture": (50, 70), "target_n": (140, 220), "target_p": (30, 60), "target_k": (180, 280)},
    "Potato": {"target_ph": (5.5, 6.5), "target_moisture": (60, 75), "target_n": (120, 180), "target_p": (40, 70), "target_k": (200, 300)},
    "Corn / Maize": {"target_ph": (5.8, 7.0), "target_moisture": (45, 65), "target_n": (160, 250), "target_p": (35, 65), "target_k": (150, 240)},
    "Bell Pepper / Chili": {"target_ph": (6.0, 6.8), "target_moisture": (50, 65), "target_n": (120, 190), "target_p": (30, 55), "target_k": (160, 250)},
    "Rice / Paddy": {"target_ph": (5.5, 6.8), "target_moisture": (70, 95), "target_n": (100, 180), "target_p": (25, 50), "target_k": (120, 200)},
    "General / Other": {"target_ph": (6.0, 7.2), "target_moisture": (45, 65), "target_n": (120, 200), "target_p": (30, 60), "target_k": (150, 250)}
}

# Soil Microorganisms Database
SOIL_MICROORGANISMS = {
    "beneficial": [
        {
            "name": "Rhizobium spp.",
            "role": "Biological Nitrogen Fixation",
            "mechanism": "Forms symbiotic root nodules with legumes, fixing atmospheric N2 into plant-absorbable ammonium.",
            "impact": "Reduces synthetic nitrogen requirement by 30-50%, improves soil fertility and organic matter."
        },
        {
            "name": "Trichoderma viride & harzianum",
            "role": "Bio-fungicide & Mycoparasite",
            "mechanism": "Directly parasitizes harmful fungal pathogens (Fusarium, Rhizoctonia, Pythium) and releases protective chitinase enzymes.",
            "impact": "Suppresses soil-borne root rot and damping-off while stimulating root branching."
        },
        {
            "name": "Mycorrhizae (VAM / Glomus)",
            "role": "Nutrient & Water Absorption Enhancer",
            "mechanism": "Hyphal filaments extend deep into tiny soil pores inaccessible to root hairs, especially mobilizing insoluble phosphorus and zinc.",
            "impact": "Boosts phosphorus uptake by up to 200%, increases crop drought tolerance, and builds glomalin for soil structure."
        },
        {
            "name": "Bacillus subtilis & Pseudomonas fluorescens",
            "role": "Plant Growth Promoting Rhizobacteria (PGPR)",
            "mechanism": "Secretes auxins (IAA), solubilizes bound phosphorus, and produces antimicrobial lipopeptides (surfactin).",
            "impact": "Enhances early seedling vigor, root elongation, and systemic acquired resistance (SAR) against foliar pathogens."
        },
        {
            "name": "Azotobacter & Azospirillum",
            "role": "Free-living / Associative Nitrogen Fixers",
            "mechanism": "Fixes atmospheric nitrogen in aerobic soils of non-leguminous crops like maize, wheat, and vegetables.",
            "impact": "Supplies 15-25 kg N/hectare, synthesizes gibberellins, and improves seed germination."
        }
    ],
    "harmful": [
        {
            "name": "Fusarium oxysporum",
            "role": "Vascular Wilt Pathogen",
            "mechanism": "Penetrates roots and colonizes the xylem water vessels, clogging water transport with mycelial plugs and toxins.",
            "impact": "Causes irreversible yellowing, permanent daytime wilting, brown vascular discoloration, and plant mortality."
        },
        {
            "name": "Ralstonia solanacearum",
            "role": "Bacterial Wilt Pathogen",
            "mechanism": "Rapidly multiplies within xylem vessels, producing extracellular polysaccharides that block water circulation.",
            "impact": "Sudden green wilt where plant wilts without prior yellowing; stems emit milky bacterial streaming when placed in water."
        },
        {
            "name": "Pythium spp. & Rhizoctonia solani",
            "role": "Damping-off & Root Rot Complex",
            "mechanism": "Attacks tender germinating seeds and young succulent hypocotyl stems at the soil line.",
            "impact": "Water-soaked girdling at soil level causing seedlings to topple over and die before establishment."
        },
        {
            "name": "Meloidogyne spp. (Root-Knot Nematodes)",
            "role": "Microscopic Soil Parasites",
            "mechanism": "Microscopic worms enter root tips and induce giant nurse cells, forming distinctive galls or knots.",
            "impact": "Disrupts water and nutrient uptake, causing severe stunted growth, pale foliage, and secondary fungal infections."
        }
    ]
}
