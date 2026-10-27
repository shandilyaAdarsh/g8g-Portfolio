import os
import numpy as np
from PIL import Image

src_path = r'C:/Users/ASUS/.gemini/antigravity/brain/6a93aee6-1c43-48bd-bbbe-4ca96f17556b/.user_uploaded/media_1792374606541_3a9c2ce7.jpg'
src_img = Image.open(src_path).convert('RGB')
out_doodles = r'C:/Users/ASUS/OneDrive/Desktop/Coding/Projects/g8g portfolio/public/images/doodles'

def extract_alpha(crop_img, threshold=12, soft=15):
    arr = np.array(crop_img).astype(float)
    max_c = np.maximum(arr[:,:,0], np.maximum(arr[:,:,1], arr[:,:,2]))
    
    alpha = np.zeros_like(max_c)
    mask_solid = max_c >= (threshold + soft)
    mask_soft = (max_c > threshold) & (max_c < (threshold + soft))
    
    alpha[mask_solid] = 255.0
    if soft > 0:
        alpha[mask_soft] = ((max_c[mask_soft] - threshold) / float(soft)) * 255.0
        
    norm_alpha = np.clip(alpha / 255.0, 0.05, 1.0)
    unpre_r = np.clip(arr[:,:,0] / norm_alpha, 0, 255)
    unpre_g = np.clip(arr[:,:,1] / norm_alpha, 0, 255)
    unpre_b = np.clip(arr[:,:,2] / norm_alpha, 0, 255)
    
    rgba = np.zeros((arr.shape[0], arr.shape[1], 4), dtype=np.uint8)
    rgba[:,:,0] = unpre_r.astype(np.uint8)
    rgba[:,:,1] = unpre_g.astype(np.uint8)
    rgba[:,:,2] = unpre_b.astype(np.uint8)
    rgba[:,:,3] = alpha.astype(np.uint8)
    
    res = Image.fromarray(rgba, 'RGBA')
    bbox = res.getbbox()
    if bbox:
        res = res.crop(bbox)
    return res

doodles_map = {
    'cinema-camera': (370, 435, 510, 520),
    'clapperboard': (520, 430, 615, 520),
    'studio-light': (625, 425, 715, 520),
    'studio-light-fixture': (825, 330, 945, 445),
    'film-reel': (730, 430, 855, 520),
    'laptop': (865, 420, 990, 520),
    'drone': (665, 525, 810, 590),
    'megaphone': (820, 535, 915, 600),
    'microphone': (915, 530, 975, 615),
    'storyboard': (500, 525, 595, 605),
    'lightbulb': (370, 525, 420, 590),
    'play-button-dark': (435, 530, 490, 575),
    'globe': (715, 590, 815, 665),
    'shape-cube': (265, 590, 340, 670),
    'paper-plane': (445, 595, 505, 660),
    'ribbon-m': (20, 610, 140, 675),
}

for name, box in doodles_map.items():
    crop = src_img.crop(box)
    res = extract_alpha(crop)
    out_p = os.path.join(out_doodles, f"{name}.png")
    res.save(out_p, 'PNG')
    print(f"Saved doodle {name}: {res.size}")

print("Doodles updated from master sheet!")
