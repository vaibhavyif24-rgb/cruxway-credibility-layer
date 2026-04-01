

## Plan: Make "The Opportunity" Video Section Theme-Aware

### Problem
The overlay on the video section uses dark navy gradients (`hsl(228 55% 8%)`) in **both** light and dark mode, making it always look like a dark-themed section. In light mode, this clashes with the surrounding warm cream aesthetic.

### Solution
Make the overlay adapt to the theme — warm cream/gold tones in light mode, deep navy in dark mode. Text colors also need to flip accordingly.

### Changes — `src/pages/Home.tsx` (lines 305-389)

**1. Light-mode overlay** — replace the dark navy gradient with warm cream:
```
light: linear-gradient(to bottom,
  hsl(40 25% 94% / 0.75) 0%,
  hsl(40 22% 91% / 0.88) 40%,
  hsl(40 22% 91% / 0.95) 100%)
```
Keep dark mode as-is.

**2. Radial vignette** — theme-aware:
- Dark: `hsl(228 55% 8% / 0.25)` (current)
- Light: `hsl(40 20% 85% / 0.3)`

**3. Warm ambient glow in light mode** — increase the existing subtle gold radial from `0.04` to `0.08` opacity for a warmer feel.

**4. Text color** — currently hardcoded `text-white`:
- Dark: keep `text-white`
- Light: switch to `text-prussian` (dark navy text on cream overlay)
- Gold accent spans stay gold in both modes
- Drop shadow: remove in light mode (unnecessary on cream), keep in dark

**5. Top/bottom edge blends** — the bottom gradient already adapts (line 388 uses `from-[hsl(40,22%,91%)]`), but make sure it matches the new overlay exactly.

**6. Grain overlay** — reduce from `0.03` to `0.015` in light mode so it doesn't add noise to the cream surface.

### Files Modified
- `src/pages/Home.tsx` — lines 305-389 in `OpportunityCinematic`

