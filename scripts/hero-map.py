#!/usr/bin/env python3
"""Draw the home page's hero map (public/hero-map.svg) and the pin-free copy
used inside the phone mockup (public/hero-map-base.svg).

An illustrative city — not a real place — so it carries no map-data credit.
Deterministic (fixed seed): re-running gives the same files.
  python3 scripts/hero-map.py
"""
import math
import random
from pathlib import Path

W, H = 1600, 1000
rnd = random.Random(7202610)
LAND, STREET, ARTERIAL, CASING, PARK, WATER, WATER_EDGE = "#F2F4F6", "#FFFFFF", "#FFFFFF", "#E2E7ED", "#DCEBD6", "#CFE3F3", "#BBD6EC"
RED, INK = "#E4012B", "#10192B"


def grid(cx, cy, w, h, angle, step):
    """A street grid of a district, rotated about its centre."""
    out = []
    a = math.radians(angle)
    ca, sa = math.cos(a), math.sin(a)
    rot = lambda x, y: (cx + x * ca - y * sa, cy + x * sa + y * ca)
    for i in range(-int(w / step), int(w / step) + 1):
        x = i * step + rnd.uniform(-4, 4)
        (x1, y1), (x2, y2) = rot(x, -h), rot(x, h)
        out.append(f'<line x1="{x1:.0f}" y1="{y1:.0f}" x2="{x2:.0f}" y2="{y2:.0f}"/>')
    for j in range(-int(h / step), int(h / step) + 1):
        y = j * step + rnd.uniform(-4, 4)
        (x1, y1), (x2, y2) = rot(-w, y), rot(w, y)
        out.append(f'<line x1="{x1:.0f}" y1="{y1:.0f}" x2="{x2:.0f}" y2="{y2:.0f}"/>')
    return out


def blob(cx, cy, r):
    pts = []
    for k in range(9):
        t = k / 9 * 2 * math.pi
        rr = r * rnd.uniform(.7, 1.15)
        pts.append((cx + rr * math.cos(t), cy + rr * .75 * math.sin(t)))
    d = f"M{pts[0][0]:.0f},{pts[0][1]:.0f} " + " ".join(f"L{x:.0f},{y:.0f}" for x, y in pts[1:]) + " Z"
    return f'<path d="{d}"/>'


# Three districts, each with its own grid, kept inside its own area (no crosshatch).
DISTRICTS = [
    ("d1", "M-20,-20 L740,-20 L700,700 L-20,720 Z", grid(360, 340, 600, 600, 0, 46)),
    ("d2", "M740,-20 L1700,-20 L1700,1020 L760,1020 L700,700 Z", grid(1100, 500, 700, 700, 14, 52)),
    ("d3", "M-20,720 L700,700 L760,1020 L-20,1020 Z", grid(360, 860, 600, 400, -18, 50)),
]
arterials = [
    "M-20,610 C300,560 620,520 980,430 S1420,300 1640,240",
    "M760,-20 C780,240 820,500 800,760 S760,980 790,1020",
    "M-20,180 C260,230 520,300 760,320",
    "M980,1020 C1040,820 1120,640 1260,520",
]
water = ("M1660,-20 L1330,-20 C1290,120 1360,220 1300,330 C1240,450 1340,560 1280,680 "
         "C1230,780 1120,860 1080,1020 L1660,1020 Z")
lagoon = "M-20,860 C120,820 260,900 330,1020 L-20,1020 Z"
parks = [blob(330, 300, 70), blob(560, 700, 60), blob(1040, 300, 55), blob(140, 520, 50), blob(900, 760, 45), blob(470, 120, 40)]

# Around where the phone sits (the middle third, as the hero crops the map): a
# group to its left and one to its right, all on land.
PINS = [(520, 250), (430, 520), (560, 770), (1180, 170), (1230, 450), (1150, 640), (600, 400), (1200, 330)]
LINKS = [(0, 6), (6, 1), (1, 2), (3, 7), (7, 4), (4, 5)]
DOTS = (6, 7)


def pin(x, y, s=1.0):
    # teardrop pin with a white dot; tip at (x, y)
    return (f'<g transform="translate({x},{y}) scale({s})" filter="url(#sh)">'
            f'<path d="M0,0 C-6,-12 -16,-20 -16,-32 A16,16 0 1 1 16,-32 C16,-20 6,-12 0,0 Z" fill="{RED}"/>'
            f'<circle cx="0" cy="-32" r="6" fill="#fff"/></g>')


def svg(with_pins: bool) -> str:
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">',
             '<defs><filter id="sh" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity=".22"/></filter></defs>',
             f'<rect width="{W}" height="{H}" fill="{LAND}"/>',
             f'<g fill="{PARK}">' + "".join(parks) + "</g>",
             "<defs>" + "".join(f'<clipPath id="{i}"><path d="{d}"/></clipPath>' for i, d, _ in DISTRICTS) + "</defs>",
             "".join(f'<g clip-path="url(#{i})" stroke="{STREET}" stroke-width="4" stroke-linecap="round">' + "".join(g) + "</g>" for i, _, g in DISTRICTS),
             f'<g fill="none" stroke-linecap="round"><g stroke="{CASING}" stroke-width="15">' + "".join(f'<path d="{d}"/>' for d in arterials) + "</g>",
             f'<g stroke="{ARTERIAL}" stroke-width="11">' + "".join(f'<path d="{d}"/>' for d in arterials) + "</g></g>",
             f'<path d="{water}" fill="{WATER}" stroke="{WATER_EDGE}" stroke-width="3"/>',
             f'<path d="{lagoon}" fill="{WATER}" stroke="{WATER_EDGE}" stroke-width="3"/>']
    if with_pins:
        dots = []
        for a, b in LINKS:
            (x1, y1), (x2, y2) = PINS[a], PINS[b]
            mx, my = (x1 + x2) / 2 + (y2 - y1) * .18, (y1 + y2) / 2 - (x2 - x1) * .18
            dots.append(f'<path d="M{x1},{y1} Q{mx:.0f},{my:.0f} {x2},{y2}"/>')
        parts.append(f'<g fill="none" stroke="{RED}" stroke-opacity=".45" stroke-width="2" stroke-dasharray="3 6">' + "".join(dots) + "</g>")
        parts.append("".join(f'<circle cx="{x}" cy="{y}" r="4.5" fill="{RED}"/>' for x, y in [PINS[i] for i in DOTS]))
        parts.append("".join(pin(x, y, 1.05) for i, (x, y) in enumerate(PINS) if i not in DOTS))
    parts.append("</svg>")
    return "\n".join(parts)


pub = Path(__file__).resolve().parent.parent / "public"
(pub / "hero-map.svg").write_text(svg(True))
(pub / "hero-map-base.svg").write_text(svg(False))
print("wrote", pub / "hero-map.svg", pub / "hero-map-base.svg")
