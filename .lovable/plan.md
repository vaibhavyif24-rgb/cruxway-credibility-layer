

## Improve Largest Contentful Paint (LCP) — from 3.7s to target < 2.5s

### Root Cause

The `index.html` preloads the **wrong image file**:
- Preloaded: `/src/assets/hero-crossroads.webp`
- Actually used by LCP element (`GeometricHero`): `/src/assets/hero-crossroads-road.webp`

This means the browser wastes bandwidth fetching an unused image while the real LCP image waits in the request queue until JavaScript discovers it.

Additionally, the LCP element (the "Cruxway" h1 heading) starts with `opacity: 0` and `y: 10` via Framer Motion, which delays LCP measurement until the animation completes.

### Plan

**1. Fix the preload URL mismatch** (index.html)
- Change the preload `href` from `/src/assets/hero-crossroads.webp` to `/src/assets/hero-crossroads-road.webp` so the browser fetches the correct image immediately.

**2. Remove initial opacity animation from the LCP text element** (Landing.tsx)
- The `<h1>Cruxway</h1>` is likely the LCP element. It's wrapped in a `motion.div` with `initial={{ y: 10 }}` which Framer Motion translates to `opacity: 0` by default on first render.
- Change the wrapper to render the h1 visible immediately (no initial opacity of 0). Keep the subtle `y` slide if desired, but ensure `opacity` starts at 1.
- The sub-elements (divider line, "Investment & Partnership") can keep their delayed animations — only the h1 matters for LCP.

**3. Remove the stale preload for the unused image**
- Delete or update the preload so we're not wasting a network connection on `hero-crossroads.webp` (only used nowhere in the codebase).

### Technical Details

- The LCP metric measures when the largest visible element finishes painting. If `opacity: 0` is set initially, Chrome waits until the element becomes visible.
- Fixing the preload mismatch alone should shave ~500-800ms. Removing the opacity animation gate on the h1 should further improve LCP by ~200-400ms.
- No visual change to the user — the hero text will simply appear ~300ms earlier, which is imperceptible given the page transition animation.

### Files Changed
| File | Change |
|------|--------|
| `index.html` | Fix preload href to `hero-crossroads-road.webp` |
| `src/pages/Landing.tsx` | Ensure h1's parent motion.div starts with `opacity: 1` explicitly |

