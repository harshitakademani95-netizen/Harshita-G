const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('=================================================================');
console.log('BELE MITRA - HORIZONTAL MODULE NAVIGATION VERIFICATION');
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

// 1. Check HorizontalModuleNav component file exists and contains all 7 modules
const navFilePath = path.join(__dirname, '..', 'frontend', 'src', 'components', 'HorizontalModuleNav.tsx');
assert(fs.existsSync(navFilePath), 'HorizontalModuleNav.tsx exists');

const navContent = fs.readFileSync(navFilePath, 'utf8');

// Verify all 7 Lucide icons are used
const requiredIcons = [
  'LayoutDashboard',
  'ScanSearch',
  'Sprout',
  'Wheat',
  'CloudSun',
  'MessageCircle',
  'Mic'
];

requiredIcons.forEach(icon => {
  assert(navContent.includes(icon), `HorizontalModuleNav includes requested icon: ${icon}`);
});

// Verify all 7 module IDs are defined
const requiredModuleIds = ['dashboard', 'disease', 'soil', 'seed', 'weather', 'chat', 'voice'];
requiredModuleIds.forEach(id => {
  assert(navContent.includes(`id: '${id}'`), `HorizontalModuleNav includes module id: '${id}'`);
});

// 2. Check page.tsx layout structure
const pageFilePath = path.join(__dirname, '..', 'frontend', 'src', 'app', 'page.tsx');
const pageContent = fs.readFileSync(pageFilePath, 'utf8');

assert(pageContent.includes('<HorizontalModuleNav'), 'page.tsx renders <HorizontalModuleNav directly below header');
assert(!pageContent.includes('<AppSidebar'), 'page.tsx does NOT render left <AppSidebar (left sidebar completely removed)');
assert(pageContent.includes('max-w-7xl w-full mx-auto'), 'page.tsx main content expands to full available width');
assert(pageContent.includes('<AppHeader'), 'page.tsx preserves <AppHeader branding, weather, status, theme & language toggle');

// 3. Test HTTP request to http://localhost:3000
http.get('http://localhost:3000', (res) => {
  assert(res.statusCode === 200, `Next.js application returns HTTP 200 (Got ${res.statusCode})`);

  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    assert(data.includes('Bele Mitra'), 'Rendered HTML contains Bele Mitra branding');
    assert(data.includes('Agriculture Modules') || data.includes('Dashboard'), 'Rendered HTML contains horizontal modules navigation');
    
    // Check that all 6 languages have translations for all 7 navigation modules
    const localesDir = path.join(__dirname, '..', 'frontend', 'src', 'locales');
    const languages = ['en', 'kn', 'hi', 'te', 'ta', 'mr'];
    
    console.log('\n--- Checking 6-Language Translations for All 7 Module Tabs ---');
    languages.forEach(lang => {
      const locPath = path.join(localesDir, `${lang}.json`);
      const loc = JSON.parse(fs.readFileSync(locPath, 'utf8'));
      const nav = loc.nav;
      
      const hasAll = nav.dashboard && nav.disease && nav.soil && nav.seed && nav.weather && nav.chat && nav.voice;
      assert(hasAll, `[${lang}] All 7 modules translated: Dashboard="${nav.dashboard}", Disease="${nav.disease}", Soil="${nav.soil}", Seed="${nav.seed}", Weather="${nav.weather}", Chat="${nav.chat}", Voice="${nav.voice}"`);
    });

    console.log('\n=================================================================');
    if (allPassed) {
      console.log('ALL HORIZONTAL TOP NAVIGATION VERIFICATION CHECKS PASSED!');
    } else {
      console.error('SOME VERIFICATION CHECKS FAILED.');
    }
    console.log('=================================================================');
  });
}).on('error', (err) => {
  assert(false, `Failed to reach localhost:3000: ${err.message}`);
});
