import os
from PIL import Image

src_path = r'C:/Users/ASUS/.gemini/antigravity/brain/6a93aee6-1c43-48bd-bbbe-4ca96f17556b/.user_uploaded/media_1792374606541_3a9c2ce7.jpg'
src_img = Image.open(src_path).convert('RGB')
test_dir = r'C:/Users/ASUS/OneDrive/Desktop/Coding/Projects/g8g portfolio/scripts/test-crops'
os.makedirs(test_dir, exist_ok=True)

# Test box coordinates
boxes = {
    # 1. Project Visuals
    'lumiere-hero': (15, 8, 370, 275),
    'banner-girl': (375, 10, 615, 180),
    'nexa-headphones': (625, 8, 1010, 190),
    'terra-car': (400, 175, 675, 305),
    'geico-scene': (690, 195, 990, 330),
    'astronaut-brain': (25, 250, 275, 420),
    'meraki-presenter': (355, 290, 600, 430),
    'green-coffee-cup': (635, 315, 790, 435),
    'studio-light-fixture': (810, 335, 940, 440),
    'studio-team': (15, 425, 360, 565),
    
    # 3 Thumbnails
    'lumiere-thumb-1': (20, 575, 90, 620),
    'lumiere-thumb-2': (100, 575, 175, 620),
    'lumiere-thumb-3': (185, 575, 260, 620),
    
    # Doodles
    'cinema-camera': (370, 435, 510, 520),
    'clapperboard': (520, 430, 615, 520),
    'spotlight': (625, 425, 715, 520),
    'film-reel': (730, 430, 855, 520),
    'laptop-g8g': (865, 420, 990, 520),
    'drone': (665, 525, 810, 590),
    'megaphone': (820, 535, 915, 600),
    'microphone': (915, 530, 975, 615),
    'storyboard': (500, 525, 595, 605),
    'lightbulb': (370, 525, 420, 590),
    'play-button-dark': (435, 530, 490, 575),
    'globe-rings': (715, 590, 815, 665),
}

for name, box in boxes.items():
    crop = src_img.crop(box)
    crop.save(os.path.join(test_dir, f"{name}.jpg"), quality=95)
    print(f"Saved {name}: {crop.size}")

print("All test crops saved.")
