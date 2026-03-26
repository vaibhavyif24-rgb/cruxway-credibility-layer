

## Plan: Ultra-Compact Mobile Cinematic — Text on Image, No Dead Space

### Current Problem
At 55% scroll on mobile, the cinematic shows a full-screen image with the tagline pushed to the very top edge and ~80% of the viewport is just empty image. The `120vh` container still creates unnecessary scroll distance for mobile.

### Design

**No-scroll cinematic on mobile**: Replace the 120vh sticky scroll with a simple **100vh static full-bleed hero** — the image is already full-screen, no circle animation needed on mobile. The tagline sits centered vertically on the image (around 40% from top). This is cleaner, faster, and more professional on small screens.

**Circle animation is desktop-only**: On mobile, skip the sticky/scroll mechanics entirely. Just render a full-viewport image with the tagline overlaid, then sectors flow below naturally.

### Changes to both `CinematicScrollReveal.tsx` and `USCinematicScrollReveal.tsx`

**Mobile early-return** — when `isMobile`, render:

1. **Full-bleed image hero** (`height: 70vh`): The HD image covers the section with the dark gradient overlay. Tagline is absolutely positioned at ~40% vertically, centered horizontally. No scroll animation, no circle — just a clean cinematic image with text.

2. **Sectors section below**: Same as current — blurred background, dark overlay, "Sectors We Look At" heading, both columns stacked vertically. Seamless visual flow from the hero image.

**Desktop unchanged** — keeps the full 250vh sticky circle-expand animation.

### Technical Details

```text
Mobile layout (no scroll animation):
┌─────────────────────┐
│  70vh full-bleed img │
│                      │
│   "Where America's   │  ← tagline centered on image
│    essential..."     │
│                      │
└──────────────────────┘
┌─────────────────────┐
│  SECTORS WE LOOK AT │  ← normal flow, dark bg
│  Industrials         │
│  Business Services   │
└──────────────────────┘
```

### Files Modified
- `src/components/CinematicScrollReveal.tsx`
- `src/components/USCinematicScrollReveal.tsx`

