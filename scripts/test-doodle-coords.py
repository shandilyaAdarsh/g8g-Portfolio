import numpy as np
from PIL import Image, ImageFilter

def extract_element(img_np, bbox, name, threshold=15, soft_range=20, boost_colors=True):
    # bbox is (x1, y1, x2, y2)
    x1, y1, x2, y2 = bbox
    crop = img_np[y1:y2, x1:x2].copy()
    
    # Calculate luminance or max channel
    r = crop[:, :, 0].astype(float)
    g = crop[:, :, 1].astype(float)
    b = crop[:, :, 2].astype(float)
    
    # max channel is great for detecting non-black pixels (even deep blue or pink)
    max_c = np.maximum(r, np.maximum(g, b))
    
    # Soft alpha matte
    alpha = np.zeros_like(max_c)
    
    # where max_c <= threshold: alpha = 0
    # where max_c >= threshold + soft_range: alpha = 255
    # linear in between
    mask_in = max_c > threshold
    mask_soft = (max_c > threshold) & (max_c < (threshold + soft_range))
    mask_solid = max_c >= (threshold + soft_range)
    
    alpha[mask_solid] = 255.0
    if soft_range > 0:
        alpha[mask_soft] = ((max_c[mask_soft] - threshold) / float(soft_range)) * 255.0
        
    # Un-premultiply colors so semi-transparent edges don't look black or dirty
    norm_alpha = np.clip(alpha / 255.0, 0.001, 1.0)
    
    unpre_r = np.clip(r / norm_alpha, 0, 255)
    unpre_g = np.clip(g / norm_alpha, 0, 255)
    unpre_b = np.clip(b / norm_alpha, 0, 255)
    
    rgba = np.zeros((crop.shape[0], crop.shape[1], 4), dtype=np.uint8)
    rgba[:, :, 0] = unpre_r.astype(np.uint8)
    rgba[:, :, 1] = unpre_g.astype(np.uint8)
    rgba[:, :, 2] = unpre_b.astype(np.uint8)
    rgba[:, :, 3] = alpha.astype(np.uint8)
    
    result = Image.fromarray(rgba, 'RGBA')
    
    # Auto-crop any completely empty margins
    bbox_crop = result.getbbox()
    if bbox_crop:
        result = result.crop(bbox_crop)
        
    return result

# Load source image
src_path = r'C:/Users/ASUS/.gemini/antigravity/brain/6a93aee6-1c43-48bd-bbbe-4ca96f17556b/.user_uploaded/media_1792371538284_6b976def.jpg'
src_img = Image.open(src_path).convert('RGB')
src_np = np.array(src_img)
H, W, _ = src_np.shape
print(f"Source loaded: {W}x{H}")

# Define bounding boxes for each element based on 1024x682
# (x1, y1, x2, y2)
elements = {
    # Row 1
    'brand-8': (20, 25, 180, 220),
    'cinema-camera': (300, 115, 485, 275),
    'clapperboard': (490, 60, 625, 275),
    'studio-light': (625, 35, 775, 290),
    'film-reel': (775, 115, 930, 275),
    'paper-plane': (890, 270, 995, 375),
    
    # Row 2
    'laptop': (10, 260, 220, 460),
    'play-button-dark': (235, 310, 315, 425),
    'lightbulb': (335, 315, 420, 470),
    'storyboard': (510, 285, 675, 485),
    'drawing-tablet': (715, 315, 860, 480),
    
    # Row 3
    'camera-operator': (15, 460, 175, 665),
    'character-headphones': (250, 485, 395, 675),
    'editing-monitor': (395, 475, 550, 660),
    'drone': (590, 495, 760, 625),
    'cloud-play': (745, 500, 875, 655),
    'globe': (770, 650, 925, 810), # Note: check bottom bounds
    
    # Row 4 / bottom items
    'megaphone': (20, 680, 140, 835),
    'microphone': (160, 650, 235, 825),
    'audio-waveform': (290, 690, 365, 790),
    'ribbon-m': (370, 655, 535, 805),
    'rec-target': (555, 675, 635, 760),
    'growth-chart': (645, 665, 760, 800),
    
    # 3D Shapes at bottom right
    'shape-ribbon-s': (430, 820, 515, 915),
    'shape-twist': (525, 815, 655, 960),
    'shape-torus': (650, 835, 750, 965),
    'shape-cube': (745, 830, 835, 965),
    'shape-spheres': (830, 820, 925, 970),
    'shape-pyramid': (910, 815, 995, 965),
    
    # Sparkles, doodles, arrows
    'doodle-arrow-curved': (125, 825, 250, 970),
    'doodle-speech-bubble': (255, 805, 365, 970),
}

# Wait! Let's check the height of src_img. H was 682!
# Let's see why some Y coords are > 682:
# In the previous test, print('Size:', img.size) returned (1024, 682).
# Let's inspect the actual coordinate layout with a quick script!
