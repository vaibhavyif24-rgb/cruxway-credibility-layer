

## Plan: Reduce Cinematic Pixelation + Vintage Principle Illustrations

### Part 1: Cinematic Reveal — Reduce Pixelation

**Problem**: The 180px circle scales up ~16x (`maxDim * 1.5 / 180`). On a 1920px screen, that's `(1920 * 1.5) / 180 = 16x`. At 16x, even a 4000px image gets stretched to an effective 2880px container from a 250px source area — causing visible pixelation.

**Fix**: Increase circle size from 180px to 300px. This reduces max scale to ~9.6x (`(1920 * 1.5) / 300`), keeping the image sharp. The circle starts slightly larger but the expand animation remains smooth.

**Additional readability improvements**:
- Strengthen overlay to 5-stop gradient: `rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.82) 75%, rgba(0,0,0,0.88) 100%`
- Increase text shadow intensity on all sector text
- Mobile: increase container height to `350vh`, increase `overlayOffset` to `26%` for more breathing room between heading and sectors
- Mobile: bump sector heading to `1.25rem`, item names to `1.05rem`, descriptions to `13px`

**Files**: `CinematicScrollReveal.tsx`, `USCinematicScrollReveal.tsx` — identical structural changes, different image URLs

---

### Part 2: Principles — Vintage/Retro Sci-Fi Illustrations

**Problem**: Current principle cards use AI-generated photographic JPGs. One image shows "rockets through an asteroid field" which doesn't match the professional PE tone. User wants distinct vintage/retro sci-fi art style illustrations that match each principle's theme.

**Fix**: Replace the 6 JPG photo backgrounds with inline SVG illustrations rendered directly in the component. Each illustration uses a vintage/retro aesthetic with:
- Muted gold, sepia, and warm tones
- Art deco geometric patterns and line work
- Thematic imagery matching each principle:
  1. **Integrity** — A compass rose with radiating geometric lines (truth/direction)
  2. **Servant Leadership** — Hands supporting an upward arch/bridge (service/elevation)
  3. **Humility** — An open book with radiating light rays (continuous learning)
  4. **Grit** — An anvil with hammer and sparks (forging/perseverance)
  5. **Bias to Action** — Forward-pointing arrow through concentric rings (momentum/decisiveness)
  6. **The Golden Rule** — A balanced scale with interconnected figures (fairness/reciprocity)

- Remove all JPG imports and the `src/assets/principles/` dependency
- Render SVGs as background elements behind the dark overlay, replacing `<img>` tags
- Keep the existing card layout, overlay gradient, and text animation system intact
- Each SVG uses the same gold palette (`hsl(38, 45%, 55%)`) with low opacity for a subtle vintage etched-print feel

**File**: `PrinciplesSlider.tsx`

---

### Files Modified

1. `src/components/CinematicScrollReveal.tsx` — larger circle (300px), stronger overlay, mobile spacing
2. `src/components/USCinematicScrollReveal.tsx` — same changes as above
3. `src/components/PrinciplesSlider.tsx` — replace JPG imports with inline SVG illustrations

