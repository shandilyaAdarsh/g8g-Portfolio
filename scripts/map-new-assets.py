from PIL import Image, ImageDraw

src_path = r'C:/Users/ASUS/.gemini/antigravity/brain/6a93aee6-1c43-48bd-bbbe-4ca96f17556b/.user_uploaded/media_1792374606541_3a9c2ce7.jpg'
src_img = Image.open(src_path).convert('RGB')
W, H = src_img.size
print(f"Image dimensions: {W} x {H}")

# In 1024 x 682:
# Let's inspect where items are:
# Top row (y: 10 to ~270):
# - Lumière bottle: x: 15 to 370, y: 10 to 270 (wait, petals extend down!)
# Let's test coordinates and draw rectangles:

boxes = {
    # 1. Project Visuals
    'lumiere-hero': (15, 8, 370, 275),
    'banner-girl': (375, 10, 615, 180),
    'nexa-headphones': (625, 8, 1010, 190),
    
    # Mid row
    'terra-car': (400, 175, 675, 305),
    'geico-scene': (690, 195, 990, 330),
    'astronaut-brain': (25, 250, 275, 420),
    'meraki-presenter': (355, 290, 600, 430),
    'green-coffee-cup': (635, 315, 790, 435),
    'studio-light-fixture': (810, 335, 940, 440),
    
    # Bottom section
    'studio-team': (15, 425, 360, 565),
    
    # 3 Thumbnails below studio team
    'lumiere-thumb-1': (20, 575, 90, 620),
    'lumiere-thumb-2': (100, 575, 175, 620),
    'lumiere-thumb-3': (185, 575, 260, 620),
    
    # Equipment & Doodles
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

debug_img = src_img.copy()
draw = ImageDraw.Draw(debug_img)

for name, (x1, y1, x2, y2) in boxes.items():
    draw.rectangle([x1, y1, x2, y2], outline=(0, 255, 0), width=2)
    draw.text((x1 + 3, y1 + 3), name, fill=(255, 255, 0))

debug_img.save(r'C:/Users/ASUS/OneDrive/Desktop/Coding/Projects/g8g portfolio/scripts/debug-new-sheet.jpg', quality=90)
print('Saved debug-new-sheet.jpg')
