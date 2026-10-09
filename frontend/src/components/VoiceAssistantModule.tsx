'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Bot,
  ShieldAlert,
  Send,
  Sparkles,
  Compass,
  ScanSearch,
  Sprout,
  CloudSun,
  Layers,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage, LANGUAGES, SupportedLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { sendChatMessage } from '@/lib/api';

interface SpokenTopic {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  title: Record<SupportedLanguage, string>;
  content: Record<SupportedLanguage, string>;
}

export const VoiceAssistantModule: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { success } = useToast();

  // Speech Recognition state for "Ask by Voice"
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState<string>('');

  // Speech Synthesis state for Topics & AI Answers
  const [activePlayingTopic, setActivePlayingTopic] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isAnswerSpeaking, setIsAnswerSpeaking] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const langCodes: Record<SupportedLanguage, string> = {
    en: 'en-IN',
    kn: 'kn-IN',
    hi: 'hi-IN',
    te: 'te-IN',
    ta: 'ta-IN',
    mr: 'mr-IN',
  };

  // 5 Complete Agricultural Guides explaining real Bele Mitra features
  const topics: SpokenTopic[] = [
    {
      id: 'tour',
      icon: Compass,
      tag: 'Platform Tour',
      title: {
        en: 'Complete BeleMitra Tour',
        kn: 'ಸಂಪೂರ್ಣ ಬೆಳೆಮಿತ್ರ ಪರಿಚಯ (Complete BeleMitra Tour)',
        hi: 'सम्पूर्ण बेलेमित्र टूर (Complete BeleMitra Tour)',
        te: 'సంపూర్ణ బెలెమిత్ర పరిచయం (Complete Tour)',
        ta: 'முழுமையான பெலேமித்ரா சுற்றுலா (Complete Tour)',
        mr: 'संपूर्ण बेलेमित्र फेरफटका (Complete Tour)',
      },
      content: {
        en: 'Welcome to Bele Mitra — your AI Crop Doctor and smart agricultural companion. Bele Mitra provides a unified suite of tools designed to support everyday farming decisions. You can inspect crop leaves for diseases using computer vision in the Disease Detection module, analyze soil NPK macronutrients and pH balance in Soil Health, check seed viability in Seed Quality Check, monitor microclimate rainfall and spray advisories in Weather Forecast, and ask multi-turn questions anytime in the AI Chatbot. All recommendations prioritize affordable, eco-friendly biological remedies and are available in your regional language.',
        kn: 'ಬೆಳೆ ಮಿತ್ರ (Bele Mitra) ಕೃಷಿ ವೇದಿಕೆಗೆ ಸ್ವಾಗತ. ಇದು ರೈತರಿಗೆ ಕೃಷಿ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ನೆರವಾಗುವ ಸಮಗ್ರ AI ಕೃಷಿ ವೈದ್ಯ. ಇಲ್ಲಿ ನೀವು ಎಲೆ ರೋಗ ಪತ್ತೆ (Disease Detection), ಮಣ್ಣಿನ NPK ಪೋಷಕಾಂಶಗಳ ಪರೀಕ್ಷೆ (Soil Health), ಬಿತ್ತನೆ ಬೀಜದ ಗುಣಮಟ್ಟ (Seed Quality), ಸ್ಥಳೀಯ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ (Weather Forecast), ಮತ್ತು ಕೃಷಿ AI ಚಾಟ್‌ಬಾಟ್ ಸೌಲಭ್ಯಗಳನ್ನು ಬಳಸಬಹುದು. ಎಲ್ಲಾ ಪರಿಹಾರಗಳು ಕೈಗೆಟುಕುವ ಜೈವಿಕ ವಿಧಾನಗಳನ್ನು ಆದ್ಯತೆ ನೀಡುತ್ತವೆ.',
        hi: 'बेले मित्र (Bele Mitra) कृषि मंच में आपका स्वागत है। यह किसानों के लिए एक उन्नत AI कृषि सहायक है। यहाँ आप फसल की पत्तियों के रोग की पहचान (Disease Detection), मिट्टी के NPK पोषक तत्वों का विश्लेषण (Soil Health), बीज की गुणवत्ता की जाँच (Seed Quality), स्थानीय मौसम का पूर्वानुमान (Weather Forecast), और 24 घंटे AI चैटबॉट की सुविधा प्राप्त कर सकते हैं। सभी उपचार जैविक और पर्यावरण-अनुकूल उपायों को प्राथमिकता देते हैं।',
        te: 'బెలె మిత్ర (Bele Mitra) స్మార్ట్ వ్యవసాయ వేదికకు స్వాగతం. ఇది రైతులకు సమగ్ర AI పంట వైద్యునిగా సహాయం చేస్తుంది. ఇక్కడ మీరు పంట తెగుళ్ల గుర్తింపు, నేల NPK పోషకాల విశ్లేషణ, విತ್ತన నాణ్యత పరీక్ష, వాతావరణ సమాచారం మరియు AI చాట్‌బాట్ సేవలను సులభంగా ఉపయోగించవచ్చు.',
        ta: 'பெலே மித்ரா (Bele Mitra) ஸ்மார்ட் விவசாய தளத்திற்கு வரவேற்கிறோம். இது விவசாயிகளுக்கு உதவும் முழுமையான AI பயிர் மருத்துவர். பயிர் நோய் கண்டறிதல், மண் NPK ஊட்டச்சத்து பகுப்பாய்வு, விதை தரம் மற்றும் வானிலை முன்னறிவிப்பு வசதிகளை உங்கள் தாய்மொழியில் பயன்படுத்தலாம்.',
        mr: 'बेले मित्र (Bele Mitra) स्मार्ट कृषी मंचावर आपले स्वागत आहे. हा शेतकऱ्यांसाठी एक सर्वसमावेशक AI पीक डॉक्टर आहे. यामध्ये तुम्ही पीक रोग निदान, मातीचे NPK विश्लेषण, बियाणे गुणवत्ता आणि हवामान अंदाज सहज वापरू शकता.',
      },
    },
    {
      id: 'disease',
      icon: ScanSearch,
      tag: 'Crop Diagnostics',
      title: {
        en: 'AI Crop Doctor (Leaf Vision)',
        kn: 'AI ಬೆಳೆ ವೈದ್ಯ (Leaf Vision)',
        hi: 'AI फसल डॉक्टर (Leaf Vision)',
        te: 'AI పంట డాక్టర్ (Leaf Vision)',
        ta: 'AI பயிர் மருத்துவர் (Leaf Vision)',
        mr: 'AI पीक डॉक्टर (Leaf Vision)',
      },
      content: {
        en: 'The AI Crop Doctor module analyzes plant leaves using computer vision trained on crop pathology. When you upload or capture a photo of crops such as tomato, potato, or corn, Bele Mitra identifies diseases such as early blight, late blight, bacterial spot, or rust. It provides a diagnosis confidence score, highlights contributing environmental triggers, and delivers actionable organic treatment plans — emphasizing neem seed kernel extract, Trichoderma bio-fungicides, and proper crop hygiene.',
        kn: 'AI ಬೆಳೆ ವೈದ್ಯ (Leaf Vision) ವಿಭಾಗವು ಎಲೆಯ ಛಾಯಾಚಿತ್ರವನ್ನು ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ತಂತ್ರಜ್ಞಾನದಿಂದ ವಿಶ್ಲೇಷಿಸಿ ರೋಗಗಳನ್ನು ಪತ್ತೆ ಮಾಡುತ್ತದೆ. ಟೊಮ್ಯಾಟೋ, ಆಲೂಗಡ್ಡೆ ಅಥವಾ ಮುಸುಕಿನ ಜೋಳದ ಎಲೆಯ ಫೋಟೋ ನೀಡಿದಾಗ, ಅರ್ಲಿ ಬ್ಲೈಟ್, ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಸ್ಪಾಟ್ ಮುಂತಾದ ರೋಗಗಳನ್ನು ಗುರುತಿಸಿ, ನೈಸರ್ಗಿಕ ಬೇವಿನ ಕಷಾಯ, ಟ್ರೈಕೋಡರ್ಮಾ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕ ಮತ್ತು ನೈರ್ಮಲ್ಯ ಕ್ರಮಗಳ ಚಿಕಿತ್ಸೆಯನ್ನು ನೀಡುತ್ತದೆ.',
        hi: 'AI फसल डॉक्टर (Leaf Vision) मॉड्यूल पौधों की पत्तियों की फोटो का विश्लेषण करके रोगों की सटीक पहचान करता है। टमाटर, आलू या मक्का की पत्ती की तस्वीर अपलोड करने पर यह अर्ली ब्लाइट, लेट ब्लाइट, रस्ट या जीवाणु धब्बों की पहचान करता है और 5% नीम तेल अर्क तथा ट्राइकोडर्मा जैसे किफायती जैविक उपचार की सलाह देता है।',
        te: 'AI పంట వైద్యుడు (Leaf Vision) పంట ఆకుల ఫోటోలను విశ్లేషించి తెగుళ్లను గుర్తిస్తుంది. టమోటా, బంగాళాదుంప, మొక్కజొన్న ఆకులలో వచ్చే తెగుళ్లను గుర్తించి, వేప కషాయం మరియు ట్రైకోడెర్మా వంటి సహజ నివారణోపాయాలను సూచిస్తుంది.',
        ta: 'AI பயிர் மருத்துவர் (Leaf Vision) இலை புகைப்படங்களை ஆய்வு செய்து பயிர் நோய்களைக் கண்டறிகிறது. தக்காளி, உருளைக்கிழங்கு, சோளம் போன்ற பயிர்களின் இலைக்கருகல் நோய்களைக் கண்டறிந்து, வேப்ப எண்ணெய் மற்றும் இயற்கை பூஞ்சாணக்கொல்லி மருந்துகளைப் பரிந்துரைக்கிறது.',
        mr: 'AI पीक डॉक्टर (Leaf Vision) पानांच्या छायाचित्रांचे विश्लेषण करून रोगांचे अचूक निदान करते. टोमॅटो, बटाटा किंवा मका पिकांवरील करपा व तांबेरा यांसारख्या रोगांवर सेंद्रिय उपाय आणि निंबोळी अर्काचा वापर सुचवते.',
      },
    },
    {
      id: 'soil',
      icon: Sprout,
      tag: 'Soil Chemistry',
      title: {
        en: 'Soil NPK & Chemistry Analysis',
        kn: 'ಮಣ್ಣಿನ NPK & ರಸಾಯನಶಾಸ್ತ್ರ ವಿಶ್ಲೇಷಣೆ',
        hi: 'मृदा NPK व रसायन विश्लेषण',
        te: 'నేల NPK & రసాయన విశ్లేషణ',
        ta: 'மண் NPK & வேதியியல் பகுப்பாய்வு',
        mr: 'माती NPK आणि रसायन विश्लेषण',
      },
      content: {
        en: 'The Soil Health and Chemistry module allows farmers to evaluate soil vitals and macronutrients. You can enter or calibrate soil pH, moisture percentage, and levels for Nitrogen (N), Phosphorus (P), and Potassium (K). The system assesses nutrient deficiencies and provides tailored organic and balanced inorganic amendments — including vermicompost, bio-fertilizers like Rhizobium and Azotobacter, and precise dosage adjustments to restore soil vitality sustainably.',
        kn: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು NPK ವಿಭಾಗವು ಮಣ್ಣಿನ ಫಲವತ್ತತೆ, ರಸಸಾರ (pH), ತೇವಾಂಶ ಮತ್ತು ಸಾರಜನಕ (N), ರಂಜಕ (P), ಪೊಟ್ಯಾಷ್ (K) ಪೋಷಕಾಂಶಗಳನ್ನು ಪರೀಕ್ಷಿಸುತ್ತದೆ. ಪೋಷಕಾಂಶಗಳ ಕೊರತೆಯನ್ನು ಗುರುತಿಸಿ, ಎರೆಹುಳು ಗೊಬ್ಬರ, ರೈಜೋಬಿಯಂ ಮತ್ತು ಜೈವಿಕ ರಸಗೊಬ್ಬರಗಳ ಸಮತೋಲಿತ ಬಳಕೆಯ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.',
        hi: 'मृदा स्वास्थ्य और NPK मॉड्यूल मिट्टी के पीएच मान, नमी और मुख्य पोषक तत्वों—नाइट्रोजन (N), फॉस्फोरस (P) तथा पोटैशियम (K) का विश्लेषण करता है। यह पोषक तत्वों की कमी को दूर करने के लिए वर्मीकम्पोस्ट और जैव उर्वरकों की संतुलित मात्रा की सिफारिश करता है।',
        te: 'నేల ఆరోగ్యం & NPK విభాగం నేల పిహెచ్ (pH), తేమ మరియు నైట్రోజన్, భాస్వరం, పొటాషియం స్థాయిలను అంచనా వేస్తుంది. పోషకాల లోపాలను సరిదిద్దడానికి సేంద్రీయ ఎరువులు మరియు వర్మీకంపోస్ట్ వాడకాన్ని సూచిస్తుంది.',
        ta: 'மண் ஆரோக்கியம் & NPK பிரிவு மண்ணின் அமில-காரத்தன்மை (pH), ஈரப்பதம் மற்றும் தழை, மணி, சாம்பல் சத்துக்களை பகுப்பாய்வு செய்கிறது. மண்புழு உரம் மற்றும் இயற்கை நுண்ணுயிர் உரங்களின் சரியான அளவைப் பரிந்துரைக்கிறது.',
        mr: 'माती आरोग्य व NPK विभाग मातीचा सामू (pH), ओलावा आणि नत्र, स्फुरद, पालाश या घटकांचे विश्लेषण करतो. संतुलित खतांचा वापर आणि गांडूळ खताच्या वापराबाबत मार्गदर्शन करतो.',
      },
    },
    {
      id: 'weather',
      icon: CloudSun,
      tag: 'Microclimate Radar',
      title: {
        en: 'Weather & Microclimate Forecast',
        kn: 'ಹವಾಮಾನ ಮತ್ತು ಸೂಕ್ಷ್ಮ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ',
        hi: 'मौसम और सूक्ष्म-जलवायु पूर्वानुमान',
        te: 'వాతావరణ & సూక్ష్మ వాతావరణ అంచనా',
        ta: 'வானிலை & நுண்ணிய காலநிலை முன்னறிவிப்பு',
        mr: 'हवामान आणि सूक्ष्म हवामान अंदाज',
      },
      content: {
        en: 'The Weather and Microclimate Forecast module tracks real-time local conditions, including ambient temperature, relative humidity, wind velocity, and precipitation probability across a 5-day radar. Crucially for farmers, Bele Mitra translates forecasts into proactive agronomic advisories: alerting you when high humidity increases fungal disease risks, suggesting optimal spray windows before rainfall, and helping you schedule irrigation efficiently.',
        kn: 'ಹವಾಮಾನ ಮತ್ತು ಮುನ್ಸೂಚನೆ ವಿಭಾಗವು ತಾಪಮಾನ, ಗಾಳಿಯ ತೇವಾಂಶ, ಮಳೆಯ ಸಾಧ್ಯತೆ ಮತ್ತು 5 ದಿನಗಳ ಹವಾಮಾನವನ್ನು ನೀಡುತ್ತದೆ. ಮಳೆಯ ಮೊದಲು ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆಯ ಸಮಯ ಮತ್ತು ತೇವಾಂಶ ಹೆಚ್ಚಿದಾಗ ರೋಗಬಾಧೆಯ ಅಪಾಯಗಳ ಬಗ್ಗೆ ರೈತರಿಗೆ ಮುಂಚಿತವಾಗಿ ಎಚ್ಚರಿಕೆ ನೀಡುತ್ತದೆ.',
        hi: 'मौसम और सूक्ष्म-जलवायु पूर्वानुमान मॉड्यूल तापमान, आर्द्रता, वर्षा की संभावना और 5 दिनों का कृषि मौसम पूर्वानुमान प्रदान करता है। यह किसानों को बारिश से पहले कीटनाशक छिड़काव के सही समय और सिंचाई प्रबंधन की सटीक चेतावनी देता है।',
        te: 'వాతావరణ & సూక్ష్మ వాతావరణ అంచనా విభాగం ఉష్ణోగ్రత, తేమ మరియు వర్షపాత సూచనలను అందిస్తుంది. వర్షానికి ముందు మందుల పిచికారీ మరియు నీటిపారుదల సమయాలను రైతులకు తెలియజేస్తుంది.',
        ta: 'வானிலை முன்னறிவிப்பு பிரிவு வெப்பநிலை, காற்றின் ஈரப்பதம் மற்றும் 5 நாள் மழை வாய்ப்புகளைக் கண்காணிக்கிறது. பூச்சிக்கொல்லி தெளிக்கும் சரியான நேரம் மற்றும் பாசன மேலாண்மை குறித்து விவசாயிகளுக்கு எச்சரிக்கிறது.',
        mr: 'हवामान अंदाज विभाग तापमान, हवेतील आर्द्रता आणि ५ दिवसांचा पावसाचा अंदाज देतो. औषध फवारणीसाठी योग्य वेळ आणि सिंचनाचे नियोजन करण्यासाठी शेतकऱ्यांना मोलाचा सल्ला देतो.',
      },
    },
    {
      id: 'combined',
      icon: Layers,
      tag: 'Holistic Advisory',
      title: {
        en: 'Combined Farm Insights',
        kn: 'ಸಂಯೋಜಿತ ಕೃಷಿ ಒಳನೋಟಗಳು (Combined Farm Insights)',
        hi: 'संयुक्त कृषि अंतर्दृष्टि (Combined Farm Insights)',
        te: 'సమగ్ర వ్యవసాయ సమాచారం (Combined Insights)',
        ta: 'ஒருங்கிணைந்த பண்ணை நுண்ணறிவு (Combined Insights)',
        mr: 'एकत्रित शेती माहिती (Combined Farm Insights)',
      },
      content: {
        en: 'Combined Farm Insights brings together leaf health, soil fertility, and weather telemetry into an integrated diagnostic view. Plant issues rarely happen in isolation: by combining soil nitrogen levels, moisture saturation, and humidity forecasts, Bele Mitra determines whether leaf yellowing is caused by fungal pathogens, nutrient deficiency, or root waterlogging. This prevents costly misdiagnosis and enables precise farm management.',
        kn: 'ಸಂಯೋಜಿತ ಕೃಷಿ ಒಳನೋಟಗಳು (Combined Farm Insights) ಎಲೆ ರೋಗ, ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಮತ್ತು ಹವಾಮಾನವನ್ನು ಒಟ್ಟಾಗಿ ಪರಿಶೀಲಿಸುತ್ತದೆ. ಎಲೆ ಹಳದಿಯಾಗಲು ಶಿಲೀಂಧ್ರ ಕಾರಣವೋ ಅಥವಾ ಸಾರಜನಕದ ಕೊರತೆಯೋ ಎಂಬುದನ್ನು ನಿಖರವಾಗಿ ಪತ್ತೆಹಚ್ಚಿ ಅನಗತ್ಯ ವೆಚ್ಚ ತಪ್ಪಿಸಿ ಸರಿಯಾದ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಲು ಸಹಕರಿಸುತ್ತದೆ.',
        hi: 'संयुक्त कृषि अंतर्दृष्टि (Combined Farm Insights) फसल की बीमारी, मिट्टी की उर्वरता और मौसम के आंकड़ों को एक साथ मिलाकर समग्र विश्लेषण प्रस्तुत करती है। इससे यह स्पष्ट होता है कि पत्तियां फंगस से पीली हो रही हैं या नाइट्रोजन की कमी से, जिससे सही इलाज संभव होता है।',
        te: 'సమగ్ర వ్యవసాయ సమాచారం (Combined Farm Insights) పంట ఆరోగ్యం, నేల పోషకాలు మరియు వాతావరణాన్ని కలిపి విశ్లేషిస్తుంది. ఆకులు పసుపు రంగులోకి మారడానికి తెగులు కారణమా లేదా పోషకాల లోపమా అనేది ఖచ్చితంగా గుర్తిస్తుంది.',
        ta: 'ஒருங்கிணைந்த பண்ணை நுண்ணறிவு (Combined Farm Insights) பயிர் நோய், மண் வளம் மற்றும் வானிலை ஆகியவற்றை ஒருங்கிணைத்து முழுமையான தீர்வை வழங்குகிறது.',
        mr: 'एकत्रित शेती माहिती (Combined Farm Insights) पीक आरोग्य, मातीची सुपीकता आणि हवामान यांचे एकत्र विश्लेषण करून अचूक मार्गदर्शन प्रदान करते.',
      },
    },
  ];

  // Sample questions for "Ask by Voice"
  const sampleQuestions: Record<SupportedLanguage, string[]> = {
    en: [
      'Explain the Weather Forecast',
      'How to identify tomato leaf diseases?',
      'What is the ideal soil pH for crops?',
      'How to treat early blight naturally?',
    ],
    kn: [
      'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆಯನ್ನು ವಿವರಿಸಿ (Explain Weather)',
      'ಟೊಮ್ಯಾಟೋ ಎಲೆ ರೋಗಗಳನ್ನು ಗುರುತಿಸುವುದು ಹೇಗೆ?',
      'ಬೆಳೆಗಳಿಗೆ ಸೂಕ್ತವಾದ ಮಣ್ಣಿನ ರಸಸಾರ (pH) ಎಷ್ಟು?',
      'ಅರ್ಲಿ ಬ್ಲೈಟ್ ರೋಗಕ್ಕೆ ನೈಸರ್ಗಿಕ ಚಿಕಿತ್ಸೆ ಏನು?',
    ],
    hi: [
      'मौसम के पूर्वानुमान के बारे में समझाएं (Explain Weather)',
      'टमाटर की पत्तियों के रोगों की पहचान कैसे करें?',
      'फसलों के लिए मिट्टी का आदर्श pH मान क्या है?',
      'अर्ली ब्लाइट का जैविक उपचार क्या है?',
    ],
    te: [
      'వాతావరణ సమాచారాన్ని వివరించండి (Explain Weather)',
      'టమోటా ఆకు తెగుళ్లను ఎలా గుర్తించాలి?',
      'పంటలకు అనువైన నేల pH ఎంత?',
    ],
    ta: [
      'வானிலை முன்னறிவிப்பை விளக்குங்கள் (Explain Weather)',
      'தக்காளி இலை நோய்களைக் கண்டறிவது எப்படி?',
      'பயிர்களுக்கான சிறந்த மண் pH அளவு என்ன?',
    ],
    mr: [
      'हवामान अंदाज समजावून सांगा (Explain Weather)',
      'टोमॅटो पानावरील रोगांचे निदान कसे करावे?',
      'पिकांसाठी मातीचा योग्य सामू (pH) किती असावा?',
    ],
  };

  // Ensure speech synthesis voice list is loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    return () => {
      stopAllSpeech();
    };
  }, []);

  // Cancel speech when language changes to prevent language mismatch
  useEffect(() => {
    stopAllSpeech();
    setVoiceError(null);
  }, [language]);

  // Robust Text-to-Speech Helper
  const playSpeech = (text: string, onFinish?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVoiceError(
        t(
          'voice.ttsUnsupported',
          'Text-to-speech audio is not supported in this browser. Please read the full guide text on screen.'
        )
      );
      return false;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const targetLang = langCodes[language] || 'en-IN';
      utterance.lang = targetLang;
      utterance.rate = 0.95;

      // Find matching browser voice
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice =
        voices.find((v) => v.lang.toLowerCase() === targetLang.toLowerCase()) ||
        voices.find((v) => v.lang.toLowerCase().startsWith(targetLang.split('-')[0].toLowerCase())) ||
        voices.find((v) => v.lang.toLowerCase().includes('in')) ||
        null;

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setActivePlayingTopic(null);
        setIsAnswerSpeaking(false);
        activeUtteranceRef.current = null;
        if (onFinish) onFinish();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        setIsSpeaking(false);
        setIsPaused(false);
        setActivePlayingTopic(null);
        setIsAnswerSpeaking(false);
        activeUtteranceRef.current = null;
      };

      activeUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.error('Speech synthesis initiation failed:', err);
      return false;
    }
  };

  const stopAllSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setActivePlayingTopic(null);
    setIsAnswerSpeaking(false);
    activeUtteranceRef.current = null;
  };

  const pauseSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    }
  };

  const resumeSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      }
    }
  };

  // Toggle Play / Pause for a Topic Guide
  const handleTopicPlayToggle = (topic: SpokenTopic) => {
    setVoiceError(null);
    const textToSpeak = topic.content[language] || topic.content.en;

    // Case 1: Currently playing this topic
    if (activePlayingTopic === topic.id) {
      if (isPaused) {
        resumeSpeech();
      } else if (isSpeaking) {
        pauseSpeech();
      } else {
        stopAllSpeech();
        setActivePlayingTopic(topic.id);
        playSpeech(textToSpeak);
      }
      return;
    }

    // Case 2: Switching to a different topic or starting fresh
    stopAllSpeech();
    setActivePlayingTopic(topic.id);
    playSpeech(textToSpeak);
  };

  // "Ask by Voice" Speech Recognition
  const toggleListening = async () => {
    setVoiceError(null);

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setIsListening(false);
      return;
    }

    // Check SpeechRecognition support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setVoiceError(
        t(
          'voice.speechUnsupported',
          'Web Speech Recognition is not supported in this browser. Please use the text question box or click a sample question below.'
        )
      );
      return;
    }

    // Request microphone access
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
      }
    } catch (err) {
      console.warn('Microphone permission denied:', err);
      setVoiceError(
        t(
          'voice.micDenied',
          'Microphone permission was denied. Please allow microphone access in your browser or type your question below.'
        )
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = langCodes[language] || 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setVoiceError(
            t(
              'voice.micDenied',
              'Microphone permission was denied. Please allow microphone access in your browser or type your question below.'
            )
          );
        } else if (event.error !== 'no-speech') {
          setVoiceError(
            t(
              'voice.recError',
              'Voice recognition interrupted. Please speak clearly into your microphone or try a sample question.'
            )
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
          mediaStreamRef.current = null;
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start recognition:', err);
      setIsListening(false);
      setVoiceError(t('voice.recStartFail', 'Could not start voice listener. Please try typing below.'));
    }
  };

  // Submit Question to Agricultural AI Core
  const handleAsk = async (questionText?: string) => {
    const q = questionText || transcript || manualInput;
    if (!q.trim() || loading) return;

    setLoading(true);
    setVoiceError(null);
    stopAllSpeech();

    try {
      const res = await sendChatMessage(q, language, 'Tomato');
      setAiResponse(res.response);
      setDisclaimer(res.disclaimer);
      setManualInput('');
      success('AI Advisory Ready', 'Audio playback starting.');

      // Automatically speak the response
      setIsAnswerSpeaking(true);
      playSpeech(res.response, () => {
        setIsAnswerSpeaking(false);
      });
    } catch (err) {
      console.error('AI Service Error:', err);
      setVoiceError(
        t('chat.error', 'Unable to reach AI Agricultural service. Please check connection and try again.')
      );
      setAiResponse('');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAnswerSpeech = () => {
    if (!aiResponse) return;
    if (isAnswerSpeaking) {
      stopAllSpeech();
    } else {
      stopAllSpeech();
      setIsAnswerSpeaking(true);
      playSpeech(aiResponse, () => {
        setIsAnswerSpeaking(false);
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 select-none">
      {/* =========================================================================
          HEADER: Title, Description, and Comprehensive Language Selector
      ========================================================================= */}
      <div className="bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-[#1e3a30] shadow-sm text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('voice.badge', 'Interactive Spoken Agronomy')}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          BeleMitra Voice Assistant
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t(
            'voice.description',
            "Provides interactive spoken guides for all website features, agricultural advice, and hands-free voice inquiries in your preferred language."
          )}
        </p>

        {/* Language Selector supporting English, Kannada, Hindi and all regional languages */}
        <div className="pt-2 border-t border-emerald-50 dark:border-[#1e3a30] space-y-2">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            {t('voice.selectLanguage', 'Select Voice Language / ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:')}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/25 ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-[#12241e]'
                      : 'bg-white dark:bg-[#172e27] hover:bg-emerald-50 dark:hover:bg-[#1d3d33] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#224438]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="font-mono text-sm">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Global Error Banner (Dismissible) */}
      {voiceError && (
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>{voiceError}</span>
          </div>
          <button
            type="button"
            onClick={() => setVoiceError(null)}
            className="p-1 rounded-lg hover:bg-amber-200/50 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 cursor-pointer"
            aria-label="Dismiss message"
          >
            ✕
          </button>
        </div>
      )}

      {/* =========================================================================
          SECTION 1: ASK BY VOICE (Microphone Question Input & Spoken AI Answers)
      ========================================================================= */}
      <section className="bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md rounded-3xl border border-emerald-100 dark:border-[#1e3a30] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-50 dark:border-[#1e3a30] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 to-green-600 text-white flex items-center justify-center shadow-md shadow-emerald-700/25">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('voice.askTitle', 'Ask by Voice')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('voice.askSubtitle', 'Speak your farming question or click any sample question to listen.')}
              </p>
            </div>
          </div>

          {isSpeaking && (
            <button
              type="button"
              onClick={stopAllSpeech}
              className="px-3 py-1.5 rounded-xl bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 text-xs font-bold flex items-center gap-1.5 border border-red-200 dark:border-red-900 cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-red-600" />
              <span>{t('voice.stopAllAudio', 'Stop Audio')}</span>
            </button>
          )}
        </div>

        {/* Interactive Microphone Button & Status */}
        <div className="flex flex-col items-center justify-center py-4 space-y-4 text-center">
          <div className="relative">
            {isListening && (
              <span className="absolute -inset-3 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
            )}

            <button
              type="button"
              onClick={toggleListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer ${
                isListening
                  ? 'bg-red-600 shadow-red-600/40 animate-pulse'
                  : 'bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 shadow-emerald-900/30'
              }`}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
              title={isListening ? 'Click to stop listening' : 'Click to start voice recording'}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 animate-pulse" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              {isListening
                ? t('voice.listeningActive', 'Listening... Speak your crop question clearly')
                : loading
                ? t('voice.processingAI', 'Processing with Agricultural AI core...')
                : t('voice.clickToAsk', 'Click Microphone to Ask')}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {speechSupported
                ? t('voice.hint', 'Hands-free voice recognition configured for your selected language')
                : t('voice.unsupportedHint', 'Speech recognition unavailable in this browser; use text input below')}
            </p>
          </div>
        </div>

        {/* Clickable Sample Questions */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            {t('voice.sampleQuestions', 'Sample Questions (Click to Ask):')}
          </span>
          <div className="flex flex-wrap gap-2">
            {(sampleQuestions[language] || sampleQuestions.en).map((sq, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAsk(sq)}
                disabled={loading}
                className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#172e27] hover:bg-emerald-50 dark:hover:bg-[#1d3d33] text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-semibold border border-slate-200 dark:border-[#224438] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{sq}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recognized Transcript or Text Input */}
        <div className="space-y-3 pt-2">
          {transcript && (
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-[#172e27]/80 border border-emerald-200 dark:border-[#224438] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                  {t('voice.recognizedTitle', 'Recognized Question:')}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                  "{transcript}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setTranscript('')}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-[#2a4d40] text-xs text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 cursor-pointer"
                >
                  {t('voice.clear', 'Clear')}
                </button>
                <button
                  type="button"
                  onClick={() => handleAsk()}
                  disabled={loading}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('voice.submit', 'Submit')}</span>
                </button>
              </div>
            </div>
          )}

          {/* Manual Input Fallback */}
          <div className="flex gap-2">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAsk();
              }}
              placeholder={t('voice.manualPlaceholder', 'Or type your farming question here...')}
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => handleAsk()}
              disabled={loading || !manualInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shrink-0 shadow-sm"
            >
              {t('voice.askBtn', 'Ask')}
            </button>
          </div>
        </div>

        {/* Spoken AI Answer Card */}
        {aiResponse && (
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-[#172e27] border border-emerald-200 dark:border-[#224438] space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-emerald-200/60 dark:border-[#2a4d40] pb-2">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t('voice.responseTitle', 'AI Agricultural Advisory Speech Response:')}</span>
              </span>

              <button
                type="button"
                onClick={handleToggleAnswerSpeech}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isAnswerSpeaking
                    ? 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                }`}
              >
                {isAnswerSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>{t('voice.stopAnswer', 'Stop Speech')}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{t('voice.replayAnswer', 'Replay Speech')}</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {aiResponse}
            </p>

            {disclaimer && (
              <div className="pt-2 border-t border-emerald-200/60 dark:border-[#2a4d40] text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{disclaimer}</span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 2: CHOOSE A TOPIC TO LISTEN (Spoken Agricultural Guides)
      ========================================================================= */}
      <section className="bg-white/95 dark:bg-[#12241e]/95 backdrop-blur-md rounded-3xl border border-emerald-100 dark:border-[#1e3a30] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-50 dark:border-[#1e3a30] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 to-green-600 text-white flex items-center justify-center shadow-md shadow-emerald-700/25">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('voice.chooseTopicTitle', 'Choose a Topic to Listen')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('voice.chooseTopicSubtitle', 'Click any topic play button to listen to complete spoken explanations.')}
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-[#172e27] border border-emerald-200 dark:border-[#224438]">
            5 Audio Guides
          </span>
        </div>

        {/* 5 Spoken Topic Cards */}
        <div className="space-y-4">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            const isPlayingThis = activePlayingTopic === topic.id;
            const topicTitle = topic.title[language] || topic.title.en;
            const topicContent = topic.content[language] || topic.content.en;

            return (
              <div
                key={topic.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                  isPlayingThis
                    ? 'bg-emerald-50/90 dark:bg-[#172e27] border-emerald-500 dark:border-emerald-500 shadow-md ring-1 ring-emerald-500'
                    : 'bg-white dark:bg-[#12241e] border-slate-200 dark:border-[#1e3a30] hover:border-emerald-300 dark:hover:border-emerald-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                        isPlayingThis
                          ? 'bg-emerald-700 text-white animate-pulse'
                          : 'bg-emerald-100 dark:bg-[#1b382e] text-emerald-700 dark:text-emerald-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                          {('0' + (index + 1)).slice(-2)}.
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {topicTitle}
                        </h3>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {topic.tag}
                      </span>
                    </div>
                  </div>

                  {/* Play / Pause / Stop Controls for this topic */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {isPlayingThis ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleTopicPlayToggle(topic)}
                          className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                          title={isPaused ? 'Resume Audio' : 'Pause Audio'}
                        >
                          {isPaused ? (
                            <>
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>{t('voice.resume', 'Resume')}</span>
                            </>
                          ) : (
                            <>
                              <Pause className="w-3.5 h-3.5 fill-white" />
                              <span>{t('voice.pause', 'Pause')}</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={stopAllSpeech}
                          className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                          title="Stop Audio"
                        >
                          <Square className="w-3.5 h-3.5 fill-white" />
                          <span>{t('voice.stop', 'Stop')}</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleTopicPlayToggle(topic)}
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
                        title="Listen to complete spoken guide"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{t('voice.listen', 'Play Audio Guide')}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Explanation text */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {topicContent}
                </p>

                {isPlayingThis && (
                  <div className="mt-3 pt-2.5 border-t border-emerald-200/60 dark:border-[#224438] flex items-center gap-2 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>
                      {isPaused
                        ? t('voice.audioPaused', 'Speech paused. Click Resume to continue listening.')
                        : t('voice.audioPlaying', 'Speaking aloud in selected language...')}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
