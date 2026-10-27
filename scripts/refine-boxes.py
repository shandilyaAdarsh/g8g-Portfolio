import os
import numpy as np
from PIL import Image

src_path = r'C:/Users/ASUS/.gemini/antigravity/brain/6a93aee6-1c43-48bd-bbbe-4ca96f17556b/.user_uploaded/media_1792374606541_3a9c2ce7.jpg'
src_img = Image.open(src_path).convert('RGB')
arr = np.array(src_img)

# Let's inspect each element's exact tight bounding box by finding non-black pixels
def find_tight_box(arr, rough_box, pad=4, bg_thresh=15):
    x1, y1, x2, y2 = rough_box
    sub = arr[y1:y2, x1:x2]
    # brightness: max(r,g,b)
    bright = np.maximum(sub[:,:,0], np.maximum(sub[:,:,1], sub[:,:,2]))
    mask = bright > bg_thresh
    if not np.any(mask):
        return rough_box
    rows = np.where(mask.any(axis=1))[0]
    cols = np.where(mask.any(axis=0))[0]
    new_y1 = max(0, y1 + rows[0] - pad)
    new_y2 = min(arr.shape[0], y1 + rows[-1] + pad + 1)
    new_x1 = max(0, x1 + cols[0] - pad)
    new_x2 = min(arr.shape[1], x1 + cols[-1] + pad + 1)
    return (new_x1, new_y1, new_x2, new_y2)

rough_boxes = {
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
    'lumiere-thumb-1': (20, 575, 90, 620),
    'lumiere-thumb-2': (100, 575, 175, 620),
    'lumiere-thumb-3': (185, 575, 260, 620),
}

for name, rbox in rough_boxes.items():
    tight = find_tight_box(arr, rbox)
    w = tight[2] - tight[0]
    h = tight[3] - tight[1]
    print(f"{name:20}: rough={rbox} -> tight={tight} ({w}x{h}, aspect={w/h:.2f})")
