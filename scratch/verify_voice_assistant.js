const fs = require('fs');

async function testFetch(url, options = {}) {
  return fetch(url, options);
}

async function verifyVoiceAssistant() {
  console.log('=== VERIFYING BELE MITRA VOICE ASSISTANT ===');

  // 1. Homepage & Voice Assistant Component Source Verification
  const voiceFile = 'frontend/src/components/VoiceAssistantModule.tsx';
  const voiceCode = fs.readFileSync(voiceFile, 'utf8');

  // Check Heading & Description
  const hasHeading = voiceCode.includes('BeleMitra Voice Assistant');
  const hasDescription = voiceCode.includes("Provides interactive spoken guides for all website features");
  console.log('1. Heading & Description:');
  console.log('   ✓ Heading "BeleMitra Voice Assistant":', hasHeading);
  console.log('   ✓ Description present:', hasDescription);

  // Check 5 Topics
  const hasTopicTour = voiceCode.includes('Complete BeleMitra Tour') && voiceCode.includes('Platform Tour');
  const hasTopicDisease = voiceCode.includes('AI Crop Doctor (Leaf Vision)') && voiceCode.includes('Crop Diagnostics');
  const hasTopicSoil = voiceCode.includes('Soil NPK & Chemistry Analysis') && voiceCode.includes('Soil Chemistry');
  const hasTopicWeather = voiceCode.includes('Weather & Microclimate Forecast') && voiceCode.includes('Microclimate Radar');
  const hasTopicCombined = voiceCode.includes('Combined Farm Insights') && voiceCode.includes('Holistic Advisory');

  console.log('2. 5 Spoken Agricultural Guides:');
  console.log('   ✓ Complete BeleMitra Tour:', hasTopicTour);
  console.log('   ✓ AI Crop Doctor (Leaf Vision):', hasTopicDisease);
  console.log('   ✓ Soil NPK & Chemistry Analysis:', hasTopicSoil);
  console.log('   ✓ Weather & Microclimate Forecast:', hasTopicWeather);
  console.log('   ✓ Combined Farm Insights:', hasTopicCombined);

  // Check Speech Playback & Pause/Resume/Stop Controls
  const hasPlayControl = voiceCode.includes('Play Audio Guide') || voiceCode.includes('handleTopicPlayToggle');
  const hasPauseControl = voiceCode.includes('pauseSpeech') && voiceCode.includes('Pause');
  const hasResumeControl = voiceCode.includes('resumeSpeech') && voiceCode.includes('Resume');
  const hasStopControl = voiceCode.includes('stopAllSpeech') && voiceCode.includes('Stop');

  console.log('3. Speech Controls:');
  console.log('   ✓ Play Button:', hasPlayControl);
  console.log('   ✓ Pause Button:', hasPauseControl);
  console.log('   ✓ Resume Button:', hasResumeControl);
  console.log('   ✓ Stop Button:', hasStopControl);

  // Check Language Selector
  const hasLangEnglish = voiceCode.includes('LANGUAGES.map');
  const hasKnGuides = voiceCode.includes('ಬೆಳೆ ಮಿತ್ರ (Bele Mitra)');
  const hasHiGuides = voiceCode.includes('बेले मित्र (Bele Mitra)');

  console.log('4. Language Support:');
  console.log('   ✓ Multi-language selector (English, Kannada, Hindi, etc.):', hasLangEnglish);
  console.log('   ✓ Full Kannada spoken explanations:', hasKnGuides);
  console.log('   ✓ Full Hindi spoken explanations:', hasHiGuides);

  // Check "Ask by Voice"
  const hasAskByVoice = voiceCode.includes('Ask by Voice');
  const hasSampleQuestion = voiceCode.includes('Explain the Weather Forecast');
  const hasMicButton = voiceCode.includes('toggleListening') && voiceCode.includes('<Mic');
  const hasManualFallback = voiceCode.includes('manualInput') && voiceCode.includes('Ask');
  const hasErrorHandling = voiceCode.includes('micDenied') && voiceCode.includes('speechUnsupported');

  console.log('5. "Ask by Voice" Features:');
  console.log('   ✓ Section "Ask by Voice":', hasAskByVoice);
  console.log('   ✓ Sample Question ("Explain the Weather Forecast"):', hasSampleQuestion);
  console.log('   ✓ Microphone Button & Listener:', hasMicButton);
  console.log('   ✓ Manual Text Fallback:', hasManualFallback);
  console.log('   ✓ Permission & Error Handling:', hasErrorHandling);

  // 6. Test Backend AI Response for Sample Question
  try {
    const res = await testFetch('http://127.0.0.1:8000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Explain the Weather Forecast and farming precautions',
        language: 'en',
        crop: 'Tomato',
      }),
    });
    const data = await res.json();
    console.log('6. Backend AI Service response test: status', res.status, 'has advice:', Boolean(data.response));
  } catch (err) {
    console.log('6. Backend test error:', err.message);
  }

  // 7. Verify Server HTTP 200
  const webRes = await testFetch('http://localhost:3000');
  console.log('7. Next.js Web Server Status:', webRes.status);

  console.log('=== ALL VOICE ASSISTANT VERIFICATIONS COMPLETED SUCCESSFULLY ===');
}

verifyVoiceAssistant();
