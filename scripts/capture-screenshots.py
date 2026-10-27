import subprocess
import time
import os

viewports = [
    (1440, 900, "desktop-1440x900.png"),
    (1280, 800, "desktop-1280x800.png"),
    (1024, 768, "tablet-landscape-1024x768.png"),
    (768, 1024, "tablet-portrait-768x1024.png"),
    (390, 844, "mobile-390x844.png"),
    (375, 812, "mobile-375x812.png"),
]

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
out_dir = r"C:\Users\ASUS\OneDrive\Desktop\Coding\Projects\g8g portfolio\scripts\screenshots"
os.makedirs(out_dir, exist_ok=True)

for w, h, filename in viewports:
    out_path = os.path.join(out_dir, filename)
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        f"--window-size={w},{h}",
        "--virtual-time-budget=3000",
        f"--screenshot={out_path}",
        "--hide-scrollbars",
        "http://localhost:3000",
    ]
    print(f"Capturing {w}x{h} -> {filename}...")
    subprocess.run(cmd, capture_output=True)
    time.sleep(0.5)

print("Finished capturing screenshots.")
