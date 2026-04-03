

## Plan: Replace Landing Hero with a Meaningful, Mission-Aligned Image

### The Problem
The current mountain ridge image is generic and doesn't convey Cruxway's mission: long-term partnership, steward leadership, building enduring value alongside founders and owners.

### Image Concept
**A lone, ancient oak tree on a gentle hillside at golden hour** — photographed in a cinematic, editorial style (think Condé Nast Traveler or Blackstone's annual report).

Why this works for Cruxway:
- **Deep roots** = long-term commitment, patient capital
- **Enduring strength** = essential businesses that outlast cycles
- **Golden hour light** = optimism, warmth, the gold brand accent
- **Single tree, expansive landscape** = focused conviction, not scattered bets
- **Growth rings (implied)** = compounding value over time

This is the visual language used by top institutional investors (Berkshire, KKR annual letters) — a natural metaphor for patience, stewardship, and enduring value.

### Technical Changes

**1. Generate new hero image** (`src/assets/hero-forking-road.jpg` — reuse path)
- Prompt: Cinematic editorial photograph, lone ancient oak tree on a rolling green hillside, golden hour warm light from the right, soft mist in the valley below, expansive sky, no people, no text, ultra high quality, shallow atmosphere, Hasselblad medium format look

**2. Refine `src/components/GeometricHero.tsx`**
- Keep Ken Burns zoom + drift (already working well)
- Warm the overlay gradient slightly to complement golden hour tones (shift from pure navy to navy with a hint of warm)
- Keep minimal gold corner brackets — they complement the gold light
- Keep vignette and ambient glow as-is

**3. No changes to `Landing.tsx`** — it already imports GeometricHero correctly

### What stays the same
- All text, region buttons, layout, animations
- Ken Burns motion system
- Corner bracket accents
- Dark overlay for readability

