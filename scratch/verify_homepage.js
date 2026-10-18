async function verifyHomepage() {
  console.log('--- Verifying Bele Mitra Homepage & Animations ---');
  
  // 1. Check Root Homepage
  const res = await fetch('http://localhost:3000');
  console.log('1. Homepage HTTP Status:', res.status);
  const html = await res.text();

  const checks = [
    { name: 'Brand Name (Bele Mitra)', pass: html.includes('Bele Mitra') },
    { name: 'Hero Headline', pass: html.includes('Smarter Farming. Healthier Crops. Better Harvests.') },
    { name: 'Hero Get Started CTA', pass: html.includes('Get Started') },
    { name: 'Hero Explore CTA', pass: html.includes('Explore Features') },
    { name: 'Hero animation slide-down on header', pass: html.includes('animate-slide-down') },
    { name: 'Hero animation slide-up elements', pass: html.includes('animate-slide-up') },
    { name: 'Hero animation staggered delays', pass: html.includes('animation-delay-100') && html.includes('animation-delay-200') && html.includes('animation-delay-300') && html.includes('animation-delay-400') },
    { name: 'Scroll reveal classes present', pass: html.includes('reveal-on-scroll') },
    { name: 'Stats: Crop Monitoring', pass: html.includes('Smart Crop Monitoring') },
    { name: 'Stats: Disease Detection', pass: html.includes('Disease Detection') },
    { name: 'Feature: Soil Health & NPK', pass: html.includes('Soil Health &amp; NPK') || html.includes('Soil Health & NPK') },
    { name: 'Feature: Seed Quality Check', pass: html.includes('Seed Quality Check') },
    { name: 'Feature: Weather & Forecast', pass: html.includes('Weather &amp; Forecast') || html.includes('Weather & Forecast') },
    { name: 'Feature: AI Agriculture Chatbot', pass: html.includes('AI Agriculture Chatbot') },
    { name: 'Feature: Voice Assistant', pass: html.includes('Voice Assistant') },
    { name: 'How It Works Title', pass: html.includes('How Bele Mitra Works') },
    { name: 'Step 1: Share Your Crop Information', pass: html.includes('Share Your Crop Information') },
    { name: 'Step 2: Get Intelligent Insights', pass: html.includes('Get Intelligent Insights') },
    { name: 'Step 3: Make Informed Decisions', pass: html.includes('Make Informed Decisions') },
    { name: 'Banner Title', pass: html.includes('Every Healthy Harvest Starts with Better Information.') },
    { name: 'About Title', pass: html.includes('Technology That Supports Better Farming') },
    { name: 'Helpline Number', pass: html.includes('1800-180-1551') }
  ];

  checks.forEach(c => {
    console.log(`   ${c.pass ? '✓' : '✗'} ${c.name}`);
  });

  // 2. Check Carousel Images
  const images = [
    '/images/agriculture-background.jpg',
    '/images/hero-lush-fields.jpg',
    '/images/hero-smart-farming.jpg'
  ];

  for (const imgPath of images) {
    const imgRes = await fetch('http://localhost:3000' + imgPath);
    console.log(`2. Image ${imgPath}: status ${imgRes.status}, Content-Type: ${imgRes.headers.get('content-type')}`);
  }

  // 3. Backend Health
  try {
    const beRes = await fetch('http://127.0.0.1:8000/api/health');
    const beData = await beRes.json();
    console.log('3. Backend Health:', beRes.status, beData);
  } catch (e) {
    console.log('3. Backend status error:', e.message);
  }
}

verifyHomepage();
