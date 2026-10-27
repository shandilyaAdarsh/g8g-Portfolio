import numpy as np
from PIL import Image, ImageDraw

src_path = r'C:/Users/ASUS/.gemini/antigravity/brain/6a93aee6-1c43-48bd-bbbe-4ca96f17556b/.user_uploaded/media_1792371538284_6b976def.jpg'
src_img = Image.open(src_path).convert('RGB')
W, H = src_img.size

# Let's map out elements carefully:
# Format: name: (x1, y1, x2, y2)
boxes = {
    # Row 1 (y: 10 - 200)
    'brand-8': (20, 15, 175, 160),
    'cinema-camera': (300, 75, 485, 190),
    'clapperboard': (490, 40, 625, 185),
    'studio-light': (625, 25, 775, 195),
    'film-reel': (775, 75, 930, 185),
    'paper-plane': (890, 180, 995, 255),

    # Row 2 (y: 180 - 330)
    'laptop': (10, 180, 220, 310),
    'play-button-dark': (235, 210, 315, 290),
    'lightbulb': (335, 215, 420, 320),
    'storyboard': (510, 195, 675, 330),
    'drawing-tablet': (715, 215, 860, 330),

    # Row 3 (y: 320 - 460)
    'camera-operator': (15, 315, 175, 455),
    'character-headphones': (250, 330, 395, 460),
    'editing-monitor': (395, 325, 550, 450),
    'drone': (590, 340, 760, 425),
    'cloud-play': (745, 340, 875, 450),

    # Row 4 (y: 440 - 565)
    'megaphone': (20, 460, 140, 565),
    'microphone': (160, 445, 235, 560),
    'audio-waveform': (290, 470, 365, 540),
    'ribbon-m': (370, 450, 535, 550),
    'rec-target': (555, 460, 635, 520),
    'growth-chart': (645, 455, 760, 550),
    'globe': (770, 445, 925, 555),

    # Row 5 (y: 550 - 680)
    'doodle-arrow-curved': (125, 565, 250, 665),
    'doodle-speech-bubble': (255, 550, 365, 665),
    'shape-ribbon-s': (430, 560, 515, 625),
    'shape-twist': (525, 560, 655, 660),
    'shape-torus': (650, 570, 750, 665),
    'shape-cube': (745, 570, 835, 660),
    'shape-spheres': (830, 560, 925, 665),
    'shape-pyramid': (910, 560, 995, 660),
}

# Draw bounding boxes onto a copy to visually verify alignment
debug_img = src_img.copy()
draw = ImageDraw.Draw(debug_img)

for name, (x1, y1, x2, y2) in boxes.items():
    draw.rectangle([x1, y1, x2, y2], outline=(0, 255, 0), width=2)
    draw.text((x1 + 3, y1 + 3), name, fill=(255, 255, 0))

debug_img.save(r'C:/Users/ASUS/OneDrive/Desktop/Coding/Projects/g8g portfolio/scripts/debug-boxes.jpg', quality=90)
print('Debug image saved.')
