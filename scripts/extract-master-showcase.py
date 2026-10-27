import os
import numpy as np
from PIL import Image

src_path = r'C:/Users/ASUS/.gemini/antigravity/brain/6a93aee6-1c43-48bd-bbbe-4ca96f17556b/.user_uploaded/media_1792374606541_3a9c2ce7.jpg'
src_img = Image.open(src_path).convert('RGB')
arr = np.array(src_img)

out_showcase = r'C:/Users/ASUS/OneDrive/Desktop/Coding/Projects/g8g portfolio/public/images/showcase'
out_doodles = r'C:/Users/ASUS/OneDrive/Desktop/Coding/Projects/g8g portfolio/public/images/doodles'

os.makedirs(out_showcase, exist_ok=True)
os.makedirs(out_doodles, exist_ok=True)

# 1. Project Visuals: Place in 16:9 cinematic frame (768 x 432)
def make_16_9_cinematic(crop_img, bg_color=(10, 10, 12), target_w=768, target_h=432):
    cw, ch = crop_img.size
    # scale crop to fit inside target_w * 0.95, target_h * 0.95
    scale = min((target_w * 0.95) / cw, (target_h * 0.95) / ch)
    new_w = int(cw * scale)
    new_h = int(ch * scale)
    resized = crop_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    canvas = Image.new('RGB', (target_w, target_h), bg_color)
    paste_x = (target_w - new_w) // 2
    paste_y = (target_h - new_h) // 2
    canvas.paste(resized, (paste_x, paste_y))
    return canvas

# 2. Extract with alpha (remove solid black background)
def make_transparent(crop_img, threshold=12, soft=15):
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

# Define tight coordinates for each asset from the master sheet
# (x1, y1, x2, y2)
project_crops = {
    # Lumiere Skincare
    'lumiere-raw': (14, 4, 374, 279),
    # Nexa Audio Headphones
    'nexa-raw': (621, 4, 1014, 194),
    # Terra Motors SUV
    'terra-raw': (396, 171, 679, 309),
    # GEICO Living room scene
    'geico-raw': (686, 191, 994, 334),
    # Crohn's & Colitis / 3D Medical Astronaut
    'crohns-raw': (21, 246, 279, 421),
    # Meraki Go Explainer Presenter
    'meraki-raw': (351, 286, 604, 434),
    # Nexenta 3D Animation / Green Mug
    'nexenta-raw': (647, 311, 794, 439),
    # Studio Team
    'studio-team': (13, 422, 364, 569),
    # 3 Thumbnails
    'lumiere-thumb-1': (19, 572, 94, 622),
    'lumiere-thumb-2': (99, 572, 179, 621),
    'lumiere-thumb-3': (184, 572, 264, 622),
    # Banner girl
    'banner-girl': (381, 6, 619, 184),
}

# Process Lumiere
lumiere_crop = src_img.crop(project_crops['lumiere-raw'])
lumiere_16_9 = make_16_9_cinematic(lumiere_crop)
lumiere_16_9.save(os.path.join(out_showcase, 'lumiere-media.png'), 'PNG')
lumiere_16_9.save(os.path.join(out_showcase, 'lumiere-main.png'), 'PNG')

# Transparent version for hero
lumiere_trans = make_transparent(lumiere_crop, threshold=12, soft=15)
lumiere_trans.save(os.path.join(out_showcase, 'hero-bottle-petals.png'), 'PNG')
lumiere_trans.save(os.path.join(out_showcase, 'hero-composite.png'), 'PNG')

# Nexa Headphones
nexa_crop = src_img.crop(project_crops['nexa-raw'])
nexa_16_9 = make_16_9_cinematic(nexa_crop)
nexa_16_9.save(os.path.join(out_showcase, 'nexa-media.png'), 'PNG')
nexa_16_9.save(os.path.join(out_showcase, 'nexa-main.png'), 'PNG')

# Terra SUV Car
terra_crop = src_img.crop(project_crops['terra-raw'])
terra_16_9 = make_16_9_cinematic(terra_crop)
terra_16_9.save(os.path.join(out_showcase, 'terra-media.png'), 'PNG')
terra_16_9.save(os.path.join(out_showcase, 'terra-main.png'), 'PNG')

# GEICO scene
geico_crop = src_img.crop(project_crops['geico-raw'])
geico_16_9 = make_16_9_cinematic(geico_crop)
geico_16_9.save(os.path.join(out_showcase, 'geico-media.png'), 'PNG')
geico_16_9.save(os.path.join(out_showcase, 'geico-main.png'), 'PNG')

# Crohn's Astronaut & Brain
crohns_crop = src_img.crop(project_crops['crohns-raw'])
crohns_16_9 = make_16_9_cinematic(crohns_crop)
crohns_16_9.save(os.path.join(out_showcase, 'crohns-media.png'), 'PNG')
crohns_16_9.save(os.path.join(out_showcase, 'crohns-main.png'), 'PNG')

# Meraki Presenter
meraki_crop = src_img.crop(project_crops['meraki-raw'])
meraki_16_9 = make_16_9_cinematic(meraki_crop)
meraki_16_9.save(os.path.join(out_showcase, 'meraki-media.png'), 'PNG')
meraki_16_9.save(os.path.join(out_showcase, 'meraki-main.png'), 'PNG')

# Nexenta Green Mug Character
nexenta_crop = src_img.crop(project_crops['nexenta-raw'])
nexenta_16_9 = make_16_9_cinematic(nexenta_crop)
nexenta_16_9.save(os.path.join(out_showcase, 'nexenta-media.png'), 'PNG')
nexenta_16_9.save(os.path.join(out_showcase, 'nexenta-main.png'), 'PNG')

# Studio Team Photo
studio_crop = src_img.crop(project_crops['studio-team'])
studio_crop.save(os.path.join(out_showcase, 'studio-team-full.png'), 'PNG')
studio_crop.save(os.path.join(out_showcase, 'studio-team.png'), 'PNG')

# 3 Lumière Thumbnails
t1 = src_img.crop(project_crops['lumiere-thumb-1'])
t2 = src_img.crop(project_crops['lumiere-thumb-2'])
t3 = src_img.crop(project_crops['lumiere-thumb-3'])
t1.save(os.path.join(out_showcase, 'lumiere-thumb-1.png'), 'PNG')
t2.save(os.path.join(out_showcase, 'lumiere-thumb-2.png'), 'PNG')
t3.save(os.path.join(out_showcase, 'lumiere-thumb-3.png'), 'PNG')

# Banner 3D Girl (transparent)
girl_crop = src_img.crop(project_crops['banner-girl'])
girl_trans = make_transparent(girl_crop, threshold=10, soft=15)
girl_trans.save(os.path.join(out_showcase, 'banner-girl-center.png'), 'PNG')
girl_trans.save(os.path.join(out_showcase, 'banner-animation-girl.png'), 'PNG')

print("Showcase assets extracted successfully!")
