const fs = require('fs');
const path = require('path');

async function testCss() {
  const cssDir = path.join(__dirname, '../frontend/.next/static/css');
  if (fs.existsSync(cssDir)) {
    const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
    console.log('Found CSS files in .next/static/css:', files);
    for (const file of files) {
      const content = fs.readFileSync(path.join(cssDir, file), 'utf8');
      if (content.includes('agriculture-background')) {
        console.log('✓ Found agriculture-background in', file);
        console.log('  - Opacity 0.5:', content.includes('opacity:.5') || content.includes('opacity:0.5') || content.includes('opacity: .5'));
        console.log('  - Pointer events none:', content.includes('pointer-events:none') || content.includes('pointer-events: none'));
        console.log('  - Position fixed:', content.includes('position:fixed') || content.includes('position: fixed'));
        console.log('  - Cover & Center:', content.includes('background-size:cover') || content.includes('background-size: cover'));
      }
    }
  } else {
    console.log('No static css dir found');
  }

  const res = await fetch('http://localhost:3000/images/agriculture-background.jpg');
  console.log('✓ Image endpoint status:', res.status, 'Content-Type:', res.headers.get('content-type'));
}

testCss();
