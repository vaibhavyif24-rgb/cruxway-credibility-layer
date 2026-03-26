

## Plan: Replace Landing Page Background with Road/Decision Point Image

### Concept
Replace the current `hero-crossroads.webp` background with a cinematic image of a road leading toward a promising horizon with a visible fork or decision point. This metaphor directly reinforces the "Cruxway" brand name (crux = critical decision point, way = the path forward). The message: every business reaches a crossroads, and Cruxway is the partner who helps navigate it.

### Approach

**Step 1: Generate the hero image**
Use the AI image generation API (Nano banana pro for highest quality) to create a cinematic, atmospheric photograph of a road through dramatic landscape reaching a fork, with one path leading toward a golden-lit horizon. Style: moody, dark tones with warm golden light ahead (matching the site's navy/gold palette). Save to `src/assets/hero-crossroads-road.webp`.

Prompt direction: "Cinematic aerial/eye-level photograph of a long road through dramatic landscape reaching a fork in the road, one path leading toward golden sunrise light on the horizon. Dark moody blue tones, warm golden light ahead. No text, no people. Professional landscape photography, wide aspect ratio."

**Step 2: Update GeometricHero.tsx**
- Change the import from `hero-crossroads.webp` to the new road image
- All existing effects (Ken Burns zoom, parallax drift, dark overlay, gold geometric lines, corner frames, floating particles, ambient glow, vignette) remain completely untouched

### Files Modified
1. `src/assets/` — new hero image file (generated via AI)
2. `src/components/GeometricHero.tsx` — update import path (line 2 only)

