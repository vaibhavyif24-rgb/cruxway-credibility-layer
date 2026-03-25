

## Plan: US Reveal Image Replacement + Home Page Quote Fix

### 1. Replace US Cinematic Scroll Reveal Image

Copy the uploaded industrial night photo (`american-public-power-association-bv2pvCGMtzg-unsplash.jpg`) to `src/assets/us-industrial-reveal.jpg`, replacing the current image. This ultra-HD photo perfectly matches the "Where America's essential industries find their permanent partner" tagline.

**File**: `src/assets/us-industrial-reveal.jpg` — overwrite with uploaded image

No code changes needed in `USCinematicScrollReveal.tsx` since it already imports from this path.

### 2. Fix Home Page Social Proof Quote (India)

**File**: `src/pages/Home.tsx` (lines 200-220)

Changes:
- **India quote**: Replace `"Operators and investors who have built, scaled, and partnered across the world's leading institutions — now focused on India."` with a cleaner line without the em dash, e.g.: `"Operators and investors who have built, scaled, and partnered with the world's leading institutions to unlock India's potential."`
- **Reduce white gap**: Change `pt-14 md:pt-18` to `pt-8 md:pt-12` on the social proof container (line 202)

### Files Modified
- `src/assets/us-industrial-reveal.jpg` — replace with uploaded UHD industrial image
- `src/pages/Home.tsx` — fix India quote text, reduce top padding

