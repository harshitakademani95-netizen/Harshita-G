# 🌱 AI Crop Doctor – Smart Agriculture Assistant

> **AI in Agriculture Hackathon Project**  
> An intelligent, farmer-friendly, multimodal agriculture platform for crop disease detection, soil agronomy analysis, seed quality screening, real-time meteorological monitoring, and affordable natural treatments.

---

## 🚀 Live Access URLs
- **Frontend Web Application:** [http://localhost:3000](http://localhost:3000)
- **Backend FastAPI Core:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger API Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 📋 Comprehensive Requirements & Implementation Checklist

| # | Requirement | Status | Details |
|---|---|:---:|---|
| **1** | **Plant Disease Detection** | ✅ **Full** | Pretrained image classification, crop selector, confidence score, healthy/affected indicator, low-confidence warning. |
| **2** | **Disease Causes** | ✅ **Full** | Structured breakdown of pathogen, environmental, soil, and meteorological causes. |
| **3** | **Disease Symptoms** | ✅ **Full** | Detailed symptoms: target lesions, chlorosis halos, wilting, stunting, fruit rot. |
| **4** | **Disease Prevention** | ✅ **Full** | Cultural hygiene, spacing, drip irrigation, crop rotation, soil drainage. |
| **5** | **Pathogen Category Identification** | ✅ **Full** | Identified as "Possible Cause Category" (Fungal, Bacterial, Viral, Pest, Deficiency). |
| **6** | **Natural Disease Control** | ✅ **Full** | "NATURAL / LOW-CHEMICAL APPROACH" (Neem oil, Trichoderma viride, copper soap, bio-controls). |
| **7** | **Cheap & Effective Treatment** | ✅ **Full** | Prioritized: Prevention → Low-Cost → Natural → Chemical Caution. Cost badges (Low/Medium/High). |
| **8** | **Overall Soil Test** | ✅ **Full** | Evaluates pH, moisture, N, P, K, EC, Organic Matter → Good / Moderate / Poor index. |
| **9** | **Good vs Bad Microorganisms** | ✅ **Full** | Detailed guide on Rhizobium, Trichoderma, Mycorrhizae, PGPR vs Fusarium, Ralstonia, Nematodes. |
| **10** | **Soil Deficiency Detection** | ✅ **Full** | Evaluates N-P-K & pH; flags deficiencies (e.g. Low Nitrogen) with symptoms and natural remedies. |
| **11** | **Seed Quality Check** | ✅ **Full** | Visual image inspection for discoloration & mold + Paper Towel Germination Test protocol & float test. |
| **12** | **pH Value & Visual Scale** | ✅ **Full** | Interactive Acidic (red) ← Neutral (green) → Alkaline (blue) scale with crop suitability & lime/sulfur advice. |
| **13** | **Soil Moisture Section** | ✅ **Full** | Dry / Optimal / Wet visual indicator with dynamic irrigation advice. |
| **14** | **NPK Value + Chart** | ✅ **Full** | Interactive NPK dashboard with distribution progress charts, Low/Normal/High badges, and target ranges. |
| **15** | **Weather Information** | ✅ **Full** | Real-time Open-Meteo meteorological integration (temperature, humidity, rainfall, wind) + offline fallback. |
| **16** | **Weather Forecast Interface** | ✅ **Full** | 5-Day forecast cards with rain probability, condition icons, and agricultural spray/irrigation advisories. |
| **17** | **AI Agriculture Chatbot** | ✅ **Full** | Interactive assistant answering disease, soil, and farming questions in English & Kannada with safety disclaimer. |
| **18** | **Voice Assistant** | ✅ **Full** | Web Speech API speech-to-text recognition with audio synthesis readouts and fallback text input. |
| **19** | **Language Implementation** | ✅ **Full** | Instant multilingual switching: English ↔ Kannada (ಕನ್ನಡ) for UI, chatbot, and recommendations. |
| **21** | **Pretrained Model Architecture** | ✅ **Full** | Modular `disease_model.py` with Hugging Face integration and zero-latency vision & heuristic fallback. |
| **22** | **Technology Stack** | ✅ **Full** | Next.js 16 + React 19 + TypeScript + Tailwind CSS (Frontend) and FastAPI + PyTorch + Pillow (Backend). |
| **23** | **Dashboard Structure** | ✅ **Full** | Sidebar with 7 navigation tabs + 6 top summary cards + 1-click quick demo triggers. |
| **24** | **Design Requirements** | ✅ **Full** | Farmer-friendly, clean emerald/amber agriculture aesthetics, cards, responsive mobile layout. |
| **25** | **Backend API Structure** | ✅ **Full** | Clean REST endpoints: `/api/disease/predict`, `/api/soil/analyze`, `/api/seed/analyze`, `/api/weather`, `/api/chat`, `/api/voice`. |
| **27** | **Safety & Accuracy Rules** | ✅ **Full** | Clear disclaimers; distinguishes AI prediction from laboratory confirmation; low-confidence warnings. |
| **29** | **Demo Flow Ready** | ✅ **Full** | Pre-loaded 1-click demo images for Tomato Blight, Healthy Leaf, Corn Rust, and Seed Viability. |

---

## 🏗️ Project Architecture

```
ERROR 404/
├── backend/
│   ├── main.py                # FastAPI main application & CORS routes
│   ├── disease_model.py       # Modular vision classification service
│   ├── knowledge_base.py      # Scientifically grounded pathology & bilingual DB
│   ├── soil_service.py        # Soil NPK, pH, moisture & deficiency calculator
│   ├── seed_service.py        # Seed image analyzer & germination test guides
│   ├── weather_service.py     # Live Open-Meteo weather client & risk advisories
│   ├── multimodal_service.py  # Core AI multimodal fusion engine
│   ├── chatbot_service.py     # Bilingual (EN/KN) chatbot & voice handler
│   ├── requirements.txt       # Python dependencies
│   └── .env.example           # Environment template
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx       # Master integrated application dashboard
│   │   │   ├── layout.tsx     # Metadata & font configuration
│   │   │   └── globals.css    # Agricultural design system tokens & animations
│   │   ├── components/
│   │   │   ├── Navbar.tsx             # Bilingual header, weather & status
│   │   │   ├── Sidebar.tsx            # Navigation drawer with 9 modules
│   │   │   ├── DashboardOverview.tsx  # Top 6 summary cards & 1-click demos
│   │   │   ├── DiseaseDetectionModule.tsx # Leaf pathology analyzer
│   │   │   ├── SoilHealthModule.tsx   # pH scale, moisture gauge & NPK charts
│   │   │   ├── SeedQualityModule.tsx  # Visual seed tester & germination guides
│   │   │   ├── WeatherModule.tsx      # 5-day forecast & farm risk alerts
│   │   │   ├── MultimodalDoctorModule.tsx # Core AI Leaf+Soil+Weather fusion
│   │   │   ├── AIChatbotModule.tsx    # Bilingual interactive chatbot
│   │   │   ├── VoiceAssistantModule.tsx   # Audio speech recognition & TTS
│   │   │   └── ReportsModule.tsx      # Diagnostic report archiver & printing
│   │   └── lib/
│   │       ├── api.ts          # Typed REST API client
│   │       └── translations.ts # English & Kannada dictionaries
│   └── public/
│       └── samples/           # Pre-loaded 1-click hackathon demo test assets
```

---

## ⚡ Quick 1-Click Hackathon Demo Flow (Requirement 29)

To present a flawless live demonstration to judges in under 2 minutes:

1. **Dashboard Home:**
   - Observe the **Top 6 Summary Cards** (Crop Health, Disease Risk, Soil Health, Moisture, Weather, NPK Status).
   - Point out the **Live Weather Pill** in the Navbar (Open-Meteo live feed).
2. **1-Click Disease Detection:**
   - Click the **"🍅 Tomato Early Blight"** demo button on the dashboard.
   - Click **"Analyze Plant Image"**.
   - Show the result: **Early Blight (94% confidence)**, Moderate severity, Possible Cause Category (Fungal), Symptoms bullet points, Environmental causes, Cultural prevention, and **Natural/Low-Chemical Approach (Neem oil, Trichoderma)**.
3. **Soil Health Lab & NPK:**
   - Click **"Soil Health & NPK"** on the sidebar.
   - Adjust the **pH slider** from 6.2 to 5.1 → notice the real-time **Acidic alert** and lime recommendation.
   - Click the preset **"⚠️ Low Nitrogen"** → see the **"Possible Nitrogen Deficiency"** warning card and organic compost remedies.
   - Review the **Good Bacteria vs Bad Bacteria** guide (Rhizobium, Trichoderma vs Fusarium, Ralstonia).
4. **Seed Quality Check:**
   - Click **"Seed Quality Check"** → click **"⚠️ Damaged / Moldy Seeds"** sample.
   - View visual surface metrics and the standard **Paper Towel Germination Test** step-by-step protocol.
5. **The Core Innovation — Multimodal Crop Doctor:**
   - Navigate to **"AI Multimodal Doctor"**.
   - Show the combined inputs: Leaf Photo + Crop Type + Soil pH & NPK + Weather Humidity & Rain.
   - Click **"Generate Holistic Diagnostic Report"**.
   - Admire the standard **🌱 CROP HEALTH REPORT** (Requirement 26) combining visual disease with soil deficiency and weather risks. Click **"Print / Save"**.
6. **AI Agriculture Chatbot & Voice Assistant:**
   - Navigate to **"AI Chatbot"** and click a prompt: *"My tomato leaves are turning yellow. What should I check?"*
   - Navigate to **"Voice Assistant"**, tap the microphone, speak a question, and hear the spoken reply.
7. **Bilingual Demonstration:**
   - Switch the language toggle in the Navbar to **ಕನ್ನಡ (Kannada)**.
   - Notice UI titles, symptoms, prevention, and chatbot prompts seamlessly localized for regional farmers.

---

## 🛠️ Local Setup & Run Instructions

### 1. Backend (Python + FastAPI)
```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
Backend runs at `http://127.0.0.1:8000`.

### 2. Frontend (Next.js + React + Tailwind CSS)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Or run production build
npm run build && npm run start -p 3000
```
Frontend runs at `http://localhost:3000`.

---

## 🛡️ Agricultural Safety & Accuracy Disclaimers
This software complies with agricultural safety standards:
- It **never claims 100% diagnostic certainty** or laboratory equivalence.
- When confidence drops below threshold, it advises: *"Low confidence – please consult an agricultural extension specialist."*
- Organic, cultural, and low-cost prevention methods are prioritized over hazardous chemical recommendations.
