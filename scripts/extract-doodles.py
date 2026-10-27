import os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

def extract_clean_asset(crop_img, bg_threshold=12, feather=1.5):
    """
    Extracts an object from a black background by identifying the background
    as the connected region of near-black pixels starting from the edges,
    preserving dark interior elements (like black hoodies, cameras, tablets).
    """
    arr = np.array(crop_img).astype(float)
    h, w, c = arr.shape
    
    # Brightness metric: max of RGB
    max_c = np.maximum(arr[:, :, 0], np.maximum(arr[:, :, 1], arr[:, :, 2]))
    
    # Initial background mask: pixels near black that touch the borders
    is_dark = max_c <= bg_threshold
    
    # Flood-fill from border to find only external background
    # Create mask of borders
    border_mask = np.zeros((h, w), dtype=bool)
    border_mask[0, :] = True
    border_mask[-1, :] = True
    border_mask[:, 0] = True
    border_mask[:, -1] = True
    
    # Seed points are dark pixels on the border
    seed = is_dark & border_mask
    
    # Morphological flood fill (reconstruction) to find all connected dark background pixels
    # Using scipy.ndimage.binary_dilation or connected components
    labeled, num_features = ndimage.label(is_dark)
    
    # Find which labels touch the seed
    border_labels = np.unique(labeled[seed])
    border_labels = border_labels[border_labels != 0]
    
    # Outer background is any pixel belonging to a border-connected dark component
    outer_bg = np.isin(labeled, border_labels)
    
    # Foreground is inverse of outer_bg
    fg_mask = (~outer_bg).astype(float)
    
    # For edge antialiasing: where fg_mask meets outer_bg, use luminance-based alpha transition
    # Distance transform from background
    dist_from_bg = ndimage.distance_transform_edt(~outer_bg)
    
    # Smooth alpha mask
    alpha = np.clip(dist_from_bg / feather, 0.0, 1.0)
    
    # Blend with normalized brightness near edges so semi-transparent glows blend naturally
    edge_zone = (dist_from_bg > 0) & (dist_from_bg <= (feather * 2.0))
    edge_brightness = np.clip(max_c / (bg_threshold * 2.5), 0.0, 1.0)
    alpha[edge_zone] = np.maximum(alpha[edge_zone] * 0.5, edge_brightness[edge_zone])
    alpha[outer_bg] = 0.0
    
    # Un-premultiply slightly on the edge to remove dark rim
    norm_alpha = np.clip(alpha, 0.05, 1.0)
    unpre_r = np.clip(arr[:, :, 0] / norm_alpha, 0, 255)
    unpre_g = np.clip(arr[:, :, 1] / norm_alpha, 0, 255)
    unpre_b = np.clip(arr[:, :, 2] / norm_alpha, 0, 255)
    
    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[:, :, 0] = unpre_r.astype(np.uint8)
    rgba[:, :, 1] = unpre_g.astype(np.uint8)
    rgba[:, :, 2] = unpre_b.astype(np.uint8)
    rgba[:, :, 3] = (alpha * 255.0).astype(np.uint8)
    
    res = Image.fromarray(rgba, 'RGBA')
    bbox = res.getbbox()
    if bbox:
        # Add 2px padding
        x1 = max(0, bbox[0] - 2)
        y1 = max(0, bbox[1] - 2)
        x2 = min(w, bbox[2] + 2)
        y2 = min(h, bbox[3] + 2)
        res = res.crop((x1, y1, x2, y2))
    return res

src_path = r'C:/Users/ASUS/.gemini/antigravity/brain/6a93aee6-1c43-48bd-bbbe-4ca96f17556b/.user_uploaded/media_1792371538284_6b976def.jpg'
src_img = Image.open(src_path).convert('RGB')
out_dir = r'C:/Users/ASUS/OneDrive/Desktop/Coding/Projects/g8g portfolio/public/images/doodles'
os.makedirs(out_dir, exist_ok=True)

# Precise coordinates tailored from visual inspection
elements = {
    # Key Filmmaking & Studio Equipment
    'clapperboard': (490, 42, 625, 185),
    'cinema-camera': (300, 75, 485, 190),
    'studio-light': (625, 25, 775, 195),
    'film-reel': (775, 75, 930, 185),
    'drone': (590, 340, 760, 425),
    'editing-monitor': (395, 325, 550, 450),
    'drawing-tablet': (715, 215, 860, 330),
    'laptop': (10, 180, 220, 310),
    'microphone': (160, 445, 235, 560),
    'megaphone': (20, 460, 140, 565),
    
    # Characters
    'camera-operator': (15, 315, 175, 455),
    'character-headphones': (250, 330, 395, 460),
    
    # Story & Ideas
    'lightbulb': (335, 215, 420, 320),
    'storyboard': (510, 195, 675, 330),
    'paper-plane': (890, 180, 995, 255),
    'globe': (770, 445, 925, 555),
    'growth-chart': (645, 455, 760, 550),
    
    # Play Buttons & Media
    'cloud-play': (745, 340, 875, 450),
    'play-button-dark': (235, 210, 315, 290),
    'audio-waveform': (290, 470, 365, 540),
    'rec-target': (555, 460, 635, 520),
    
    # 3D Motion Ribbons & Shapes
    'ribbon-m': (370, 450, 535, 550),
    'shape-ribbon-s': (430, 560, 515, 625),
    'shape-twist': (525, 560, 655, 660),
    'shape-torus': (650, 570, 750, 665),
    'shape-cube': (745, 570, 835, 660),
    'shape-spheres': (830, 560, 925, 665),
    'shape-pyramid': (910, 560, 995, 660),
    
    # Hand-drawn Doodles & Brand
    'brand-8': (20, 15, 175, 160),
    'doodle-arrow-curved': (125, 565, 250, 665),
    'doodle-speech-bubble': (255, 550, 365, 665),
    
    # Tiny Sparkles & Star Accents
    'sparkle-star-pink': (485, 25, 525, 68),
    'sparkle-star-cyan': (645, 510, 685, 550),
    'sparkle-star-large': (885, 500, 930, 545),
}

saved = []
for name, (x1, y1, x2, y2) in elements.items():
    crop = src_img.crop((x1, y1, x2, y2))
    # Threshold tweaks for subtle items
    thresh = 10 if 'sparkle' in name or 'waveform' in name else 14
    asset = extract_clean_asset(crop, bg_threshold=thresh, feather=1.2)
    path = os.path.join(out_dir, f"{name}.png")
    asset.save(path, format="PNG")
    saved.append((name, asset.size))

print(f"Successfully extracted {len(saved)} assets into public/images/doodles:")
for name, size in saved:
    print(f"  - {name}.png ({size[0]}x{size[1]})")
