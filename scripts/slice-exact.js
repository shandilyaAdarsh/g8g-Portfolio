const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = 'C:/Users/ASUS/.gemini/antigravity/brain/6a93aee6-1c43-48bd-bbbe-4ca96f17556b/.user_uploaded/media_1792363077455_0741151d.png';
const OUT = path.join(__dirname, '../public/images/showcase');

if (!fs.existsSync(OUT)) {
  fs.mkdirSync(OUT, { recursive: true });
}

const slices = [
  // 1. Logo
  { name: 'logo.png', left: 24, top: 8, width: 48, height: 16, scale: 4 },

  // 2. Hero composite (entire right hero artwork with clean left border)
  { name: 'hero-composite.png', left: 152, top: 25, width: 178, height: 135, scale: 3 },
  { name: 'hero-floating-badge.png', left: 230, top: 125, width: 95, height: 28, scale: 3 },

  // 3. Type of Work Banner Artwork
  { name: 'type-of-work-banner-full.png', left: 15, top: 164, width: 311, height: 92, scale: 3 },
  { name: 'banner-girl-center.png', left: 130, top: 168, width: 125, height: 86, scale: 3 },

  // 4. Project 1 - Lumiere
  { name: 'lumiere-media.png', left: 20, top: 262, width: 172, height: 88, scale: 3 },
  { name: 'lumiere-thumb-1.png', left: 206, top: 321, width: 38, height: 28, scale: 3 },
  { name: 'lumiere-thumb-2.png', left: 247, top: 321, width: 38, height: 28, scale: 3 },
  { name: 'lumiere-thumb-3.png', left: 287, top: 321, width: 38, height: 28, scale: 3 },

  // 5. Project 2 - Nexa
  { name: 'nexa-media.png', left: 160, top: 353, width: 165, height: 84, scale: 3 },
  { name: 'nexa-thumb-1.png', left: 27, top: 414, width: 37, height: 23, scale: 3 },
  { name: 'nexa-thumb-2.png', left: 68, top: 414, width: 38, height: 23, scale: 3 },
  { name: 'nexa-thumb-3.png', left: 110, top: 414, width: 39, height: 23, scale: 3 },

  // 6. Project 3 - Terra Motors
  { name: 'terra-media.png', left: 19, top: 443, width: 173, height: 88, scale: 3 },
  { name: 'terra-thumb-1.png', left: 208, top: 504, width: 36, height: 25, scale: 3 },
  { name: 'terra-thumb-2.png', left: 247, top: 504, width: 37, height: 25, scale: 3 },
  { name: 'terra-thumb-3.png', left: 287, top: 504, width: 37, height: 25, scale: 3 },

  // 7. Project 4 - GEICO
  { name: 'geico-media.png', left: 166, top: 538, width: 150, height: 90, scale: 3 },
  { name: 'geico-thumb-1.png', left: 27, top: 593, width: 63, height: 35, scale: 3 },
  { name: 'geico-thumb-2.png', left: 98, top: 593, width: 57, height: 35, scale: 3 },

  // 8. Project 5 - Crohn's & Colitis
  { name: 'crohns-media.png', left: 24, top: 635, width: 147, height: 75, scale: 3 },
  { name: 'crohns-thumb-1.png', left: 192, top: 686, width: 62, height: 23, scale: 3 },
  { name: 'crohns-thumb-2.png', left: 258, top: 686, width: 60, height: 23, scale: 3 },

  // 9. Project 6 - Meraki Go
  { name: 'meraki-media.png', left: 170, top: 713, width: 148, height: 82, scale: 3 },
  { name: 'meraki-thumb-1.png', left: 27, top: 762, width: 64, height: 26, scale: 3 },
  { name: 'meraki-thumb-2.png', left: 103, top: 762, width: 55, height: 26, scale: 3 },

  // 10. Project 7 - Nexenta
  { name: 'nexenta-media.png', left: 174, top: 800, width: 151, height: 64, scale: 3 },
  { name: 'nexenta-thumb-1.png', left: 113, top: 835, width: 49, height: 29, scale: 3 },

  // 11. Studio
  { name: 'studio-team-full.png', left: 134, top: 905, width: 191, height: 62, scale: 3 },

  // 12. Bottom CTA Banner
  { name: 'cta-banner-full.png', left: 15, top: 988, width: 311, height: 33, scale: 3 },
  { name: 'cta-doodle.png', left: 75, top: 994, width: 18, height: 20, scale: 4 },
];

async function extractAll() {
  console.log('Extracting exact reference slices...');
  for (const s of slices) {
    const outPath = path.join(OUT, s.name);
    const targetWidth = Math.round(s.width * (s.scale || 3));
    const targetHeight = Math.round(s.height * (s.scale || 3));

    await sharp(SRC)
      .extract({
        left: s.left,
        top: s.top,
        width: s.width,
        height: s.height,
      })
      .resize(targetWidth, targetHeight, {
        kernel: sharp.kernel.lanczos3,
        fit: 'fill',
      })
      .sharpen()
      .png({ quality: 100, compressionLevel: 8 })
      .toFile(outPath);

    console.log(`✓ Sliced: ${s.name} (${targetWidth}x${targetHeight})`);
  }
  console.log('All slices completed!');
}

extractAll().catch(console.error);
