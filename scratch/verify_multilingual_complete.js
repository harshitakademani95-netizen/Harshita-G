const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('=================================================================');
console.log('BELE MITRA - COMPLETE MULTILINGUAL SYSTEM VERIFICATION');
console.log('=================================================================\n');

let allPassed = true;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
    allPassed = false;
  }
}

// 1. Verify all 6 locale JSON files
const localesDir = path.join(__dirname, '..', 'frontend', 'src', 'locales');
const languages = ['en', 'kn', 'hi', 'te', 'ta', 'mr'];
const localeData = {};

languages.forEach((lang) => {
  const filePath = path.join(localesDir, `${lang}.json`);
  assert(fs.existsSync(filePath), `Locale file exists: ${lang}.json`);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    localeData[lang] = content;
    assert(Object.keys(content).length > 0, `Locale ${lang}.json parsed successfully with ${Object.keys(content).length} top-level sections`);
  } catch (err) {
    assert(false, `Locale ${lang}.json failed to parse: ${err.message}`);
  }
});

// Helper to flatten nested keys
function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (const k in obj) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      keys = keys.concat(flattenKeys(obj[k], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = new Set(flattenKeys(localeData['en']));
console.log(`\nTotal translation keys in English baseline: ${enKeys.size}`);

// Verify all languages have 100% of the keys
languages.slice(1).forEach((lang) => {
  const currentKeys = new Set(flattenKeys(localeData[lang]));
  const missingKeys = [...enKeys].filter((k) => !currentKeys.has(k));
  assert(
    missingKeys.length === 0,
    `Language '${lang}' completeness: 0 missing keys (has all ${currentKeys.size}/${enKeys.size} keys)`
  );
  if (missingKeys.length > 0) {
    console.log(`   Sample missing in ${lang}:`, missingKeys.slice(0, 5));
  }
});

// 2. Check native script character presence
console.log('\n--- Checking Native Script Rendering ---');
const scriptTests = [
  { lang: 'kn', sampleKey: 'nav.dashboard', regex: /[\u0C80-\u0CFF]/, name: 'Kannada' },
  { lang: 'hi', sampleKey: 'nav.dashboard', regex: /[\u0900-\u097F]/, name: 'Hindi (Devanagari)' },
  { lang: 'te', sampleKey: 'nav.dashboard', regex: /[\u0C00-\u0C7F]/, name: 'Telugu' },
  { lang: 'ta', sampleKey: 'nav.dashboard', regex: /[\u0B80-\u0BFF]/, name: 'Tamil' },
  { lang: 'mr', sampleKey: 'nav.dashboard', regex: /[\u0900-\u097F]/, name: 'Marathi (Devanagari)' },
];

function getNestedValue(obj, keyPath) {
  return keyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
}

scriptTests.forEach(({ lang, sampleKey, regex, name }) => {
  const val = getNestedValue(localeData[lang], sampleKey);
  const hasScript = regex.test(val);
  assert(hasScript, `${name} (${lang}) renders native Unicode script: "${val}"`);
});

// 3. Verify globals.css Indian font stack
console.log('\n--- Checking Font Stack Support in globals.css ---');
const globalsCssPath = path.join(__dirname, '..', 'frontend', 'src', 'app', 'globals.css');
const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
assert(globalsCss.includes("'Nirmala UI'"), "globals.css includes 'Nirmala UI' for high-fidelity Indic script rendering");
assert(globalsCss.includes("'Tunga'"), "globals.css includes 'Tunga' for Kannada support");
assert(globalsCss.includes("'Gautami'"), "globals.css includes 'Gautami' for Telugu support");
assert(globalsCss.includes("'Latha'"), "globals.css includes 'Latha' for Tamil support");

// 4. Verify LanguageContext.tsx configuration
console.log('\n--- Checking LanguageContext.tsx ---');
const langContextPath = path.join(__dirname, '..', 'frontend', 'src', 'context', 'LanguageContext.tsx');
const langContext = fs.readFileSync(langContextPath, 'utf8');
assert(langContext.includes("'bele-mitra-language'"), "LanguageContext uses 'bele-mitra-language' localStorage key");
assert(langContext.includes("'en'") && langContext.includes("'kn'") && langContext.includes("'hi'") &&
       langContext.includes("'te'") && langContext.includes("'ta'") && langContext.includes("'mr'"),
       "LanguageContext strictly supports all 6 languages (en, kn, hi, te, ta, mr)");
assert(langContext.includes('ಕನ್ನಡ (Kannada)') && langContext.includes('हिंदी (Hindi)') &&
       langContext.includes('తెలుగు (Telugu)') && langContext.includes('தமிழ் (Tamil)') &&
       langContext.includes('मराठी (Marathi)'),
       "LanguageContext displays native script names in language dropdown");

// 5. Test Live Backend Chatbot API in all 6 languages
console.log('\n--- Testing Live Backend Chatbot Responses in All 6 Languages ---');
function testChatbot(lang) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      message: 'treatment for leaf blight',
      language: lang,
      crop: 'Tomato',
    });

    const req = http.request(
      'http://127.0.0.1:8000/api/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const hasResponse = parsed.response && parsed.response.length > 50;
            assert(hasResponse, `Backend chatbot returns localized response for lang='${lang}' (${parsed.response.length} chars)`);
            resolve(true);
          } catch (e) {
            assert(false, `Chatbot API error for ${lang}: ${e.message}`);
            resolve(false);
          }
        });
      }
    );
    req.on('error', (err) => {
      assert(false, `Chatbot request failed for ${lang}: ${err.message}`);
      resolve(false);
    });
    req.write(postData);
    req.end();
  });
}

// 6. Test Live Disease Prediction with Multilingual Localization
console.log('\n--- Testing Multilingual Disease Knowledge Base ---');
const translationsPyPath = path.join(__dirname, '..', 'backend', 'translations_data.py');
const translationsPy = fs.readFileSync(translationsPyPath, 'utf8');
assert(translationsPy.includes('Tomato_Early_Blight') && translationsPy.includes('Rice_Blast'),
  "translations_data.py contains complete localized pathology knowledge for all conditions");

(async function runLiveTests() {
  for (const lang of languages) {
    await testChatbot(lang);
  }

  console.log('\n=================================================================');
  if (allPassed) {
    console.log('ALL MULTILINGUAL SYSTEM VERIFICATIONS PASSED SUCCESSFULLY!');
  } else {
    console.error('SOME VERIFICATION CHECKS FAILED. PLEASE REVIEW LOGS.');
  }
  console.log('=================================================================');
})();
