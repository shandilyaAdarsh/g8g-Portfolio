const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcPath = 'C:/Users/ASUS/.gemini/antigravity/brain/6a93aee6-1c43-48bd-bbbe-4ca96f17556b/.user_uploaded/media_1792363077455_0741151d.png';
const outDir = path.resolve('public/images/showcase');
fs.mkdirSync(outDir, { recursive: true });

// Pixel-perfect bounds matching exact visual card boundaries
const slices = {
  // 1. Navbar Logo
  'logo': { left: 23, top: 7, width: 72, height: 16 },

  // 2. Hero Lumière Artwork (bottle + petals + ambient lighting)
  'hero-lumiere': { left: 155, top: 25, width: 172, height: 125 },
  'hero-lumiere-pure': { left: 160, top: 25, width: 165, height: 104 },

  // 3. Hero badge small avatar
  'hero-badge-girl': { left: 232, top: 127, width: 26, height: 21 },

  // 4. "Type of Work" Banner Artwork (the girl with flower crown)
  'banner-animation-girl': { left: 125, top: 168, width: 130, height: 75 },
  'type-of-work-banner': { left: 15, top: 162, width: 311, height: 87 },

  // 5. Lumière Skincare (Featured Project)
  'lumiere-main': { left: 20, top: 260, width: 172, height: 79 },
  'lumiere-thumb-1': { left: 206, top: 316, width: 37, height: 24 },
  'lumiere-thumb-2': { left: 247, top: 316, width: 37, height: 24 },
  'lumiere-thumb-3': { left: 288, top: 316, width: 37, height: 24 },

  // 6. Nexa Audio Commercial
  'nexa-main': { left: 160, top: 350, width: 164, height: 77 },
  'nexa-thumb-1': { left: 27, top: 407, width: 36, height: 20 },
  'nexa-thumb-2': { left: 69, top: 407, width: 36, height: 20 },
  'nexa-thumb-3': { left: 112, top: 407, width: 36, height: 20 },

  // 7. Terra Motors Brand Film
  'terra-main': { left: 19, top: 438, width: 173, height: 78 },
  'terra-thumb-1': { left: 208, top: 493, width: 35, height: 22 },
  'terra-thumb-2': { left: 247, top: 493, width: 36, height: 22 },
  'terra-thumb-3': { left: 287, top: 493, width: 36, height: 22 },

  // 8. GEICO Animated Video
  'geico-main': { left: 166, top: 531, width: 149, height: 76 },
  'geico-thumb-1': { left: 27, top: 576, width: 63, height: 35 },
  'geico-thumb-2': { left: 98, top: 576, width: 57, height: 35 },

  // 9. Crohn's & Colitis Foundation (Astronaut & sphere)
  'crohns-main': { left: 24, top: 630, width: 147, height: 60 },
  'crohns-thumb-1': { left: 191, top: 670, width: 60, height: 21 },
  'crohns-thumb-2': { left: 258, top: 670, width: 59, height: 21 },

  // 10. Meraki Go Explainer Video (Woman presenter)
  'meraki-main': { left: 170, top: 708, width: 147, height: 63 },
  'meraki-thumb-1': { left: 27, top: 746, width: 62, height: 23 },
  'meraki-thumb-2': { left: 98, top: 746, width: 56, height: 23 },

  // 11. Nexenta Animated Campaigns (Green mug character)
  'nexenta-main': { left: 174, top: 794, width: 143, height: 49 },
  'nexenta-thumb-1': { left: 113, top: 818, width: 50, height: 26 },

  // 12. Our Studio Crew Photo
  'studio-team': { left: 134, top: 901, width: 191, height: 42 },

  // 13. Bottom Gradient CTA Banner
  'cta-gradient-banner': { left: 16, top: 966, width: 310, height: 33 },
};

async function extract() {
  console.log('Re-extracting perfectly aligned slices...');
  for (const [name, box] of Object.entries(slices)) {
    const dest = path.join(outDir, `${name}.png`);
    await sharp(srcPath)
      .extract(box)
      .resize({
        width: box.width * 3,
        height: box.height * 3,
        kernel: sharp.kernel.lanczos3,
      })
      .png({ quality: 95 })
      .toFile(dest);
  }
  console.log('All slices refined and saved!');
}

extract().catch(console.error);
