

# Parallax Depth Layers for Landing Page Hero

## What We're Building

Transform the current flat Ken Burns hero into a **multi-layer parallax depth system** where different visual layers (background sky, midground mist, foreground oak tree silhouette, atmospheric haze) move at different speeds on mouse movement, creating a living 3D depth illusion — like looking through a window into the scene.

## Current State

The landing page uses a single `<img>` with a slow Ken Burns zoom/drift. It's cinematic but flat — no depth separation.

## Approach

Since we have a single photograph (not separate layers), we'll create **pseudo-depth** using:

1. **Mouse-tracking parallax** — the image and overlay layers respond to cursor position at different rates, creating perceived depth
2. **Layered atmospheric effects** — fog/haze bands at different z-depths that drift independently
3. **Foreground depth overlay** — a subtle gradient vignette that shifts with mouse, simulating foreground out-of-focus elements

### Layer Stack (back to front)

| Layer | Content | Movement | Speed |
|-------|---------|----------|-------|
| 0 | Oak tree photo | Slow inverse mouse-track + Ken Burns | 0.3x |
| 1 | Dark overlay gradient | Static | — |
| 2 | Low mist band (bottom 30%) | Slow horizontal drift + slight mouse response | 0.15x |
| 3 | Atmospheric haze (mid) | Very slow drift, opposite direction | 0.1x |
| 4 | Vignette / depth-of-field edge | Subtle mouse shift | 0.05x |
| 5 | Gold corner brackets | No mouse tracking (anchored) | — |
| 6 | Ambient glow | Gentle mouse follow | 0.2x |

## Technical Details

### File: `src/components/GeometricHero.tsx`

1. **Add mouse tracking** — `onMouseMove` handler on the container (remove `pointer-events-none` from outer div, re-apply to child layers selectively). Track normalized mouse position (-1 to 1) with `useMotionValue` + smooth spring damping.

2. **Photo layer** — Apply `translateX/Y` based on mouse position at 0.3x multiplier (max ~15px shift). Keep existing Ken Burns scale animation.

3. **Mist layer** — Add 2 semi-transparent gradient bands (CSS radial/linear gradients, white/blueish at ~3-5% opacity) positioned at bottom 30% of viewport. Apply slow horizontal CSS drift animation + slight mouse response at 0.15x.

4. **Atmospheric haze** — A mid-height blurred gradient band drifting in the opposite direction, very subtle (2-3% opacity).

5. **Dynamic vignette** — The existing vignette gets a slight translate based on mouse at 0.05x, so the dark edges subtly shift with your gaze.

6. **Ambient glow** — The gold center glow follows the mouse at 0.2x, making it feel like light source tracking.

7. **Mobile fallback** — On mobile (no mouse), use a gentle automatic oscillating motion via `useMotionValue` with a sine-wave timer, so the depth effect still plays without interaction.

### File: `src/pages/Landing.tsx`

- Minor: ensure the outer container allows pointer events to reach the hero for mouse tracking (currently the hero is `pointer-events-none`). The text/buttons above it already have `z-10` so they'll remain interactive.

## Performance

- All transforms use `will-change: transform` and `translateZ(0)` for GPU compositing
- Mouse values smoothed via framer-motion springs (no jank)
- Mist/haze layers are pure CSS gradients (no extra images)
- Reduced particle count on mobile

