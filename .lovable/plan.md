

## Plan: Add Cinematic Animated Effects + Theme-Aware Styling to All Three Origin Story Backgrounds

**File:** `src/components/CruxwayOriginStory.tsx`

### Approach

Keep the reliable local images as the base layer. Add dramatic, highly visible animated effects on top that create a genuine "living video" feel. Make the overlays and effects theme-aware so light mode and dark mode each have a distinct cinematic character.

---

### 1. Crucible Section: Forge Fire Effects

Three animated layers that together simulate a living forge:

- **Rising Embers** (12 particles on desktop, 6 on mobile): Gold/orange glowing dots (3-6px) that rise from the bottom with horizontal sway. Each has `box-shadow` for a soft glow halo. Staggered durations (5-10s) and delays create organic randomness.
- **Heat Pulse**: A large radial gradient (amber/orange, centered at bottom) that pulses in scale and opacity on a 6s cycle, simulating the forge breathing with molten heat.
- **Smoke Drift**: Two wide, blurred gradient bands that slowly translate horizontally across the scene (25-35s), creating a haze/smoke effect over the image.

### 2. Way Section: Desert Journey Effects

Three layers simulating moving light through a landscape:

- **Sweeping Light Rays**: 3 diagonal gradient streaks (gold/white at 0.04-0.08 opacity) that slowly pan across the scene (18-28s), simulating sunlight shifting through atmospheric haze.
- **Dust Motes**: 8 tiny warm particles (1-3px) with gentle randomized float paths (both x and y drift), very slow cycles (10-18s). Creates depth and atmosphere.
- **Horizon Pulse**: A horizontal warm gradient band near the center that shifts in intensity on a 10s cycle, simulating distant heat shimmer on the road.

### 3. CRU x WAY Section: Convergence Energy

Three layers creating a sense of two forces merging:

- **Convergence Sparks**: 8 gold particles that drift inward from the edges toward center on long arcing paths (12-18s cycles). Creates the visual metaphor of crucible + way merging.
- **Central Radial Pulse**: A large radial gradient that expands and contracts from center (12s cycle), creating a breathing energy behind the equation text.
- **Energy Lines**: Two horizontal gradient lines that slowly sweep inward from opposite edges and fade at center (20s cycle), reinforcing the convergence motif.

### 4. Theme-Aware Overlays (Light vs Dark)

Currently, overlays are identical in both themes. Update to be theme-responsive:

**Dark mode**: Current deep navy overlays stay. Effects use warm gold/amber tones for particles and glows, creating a rich, cinematic darkness.

**Light mode**: 
- Crucible overlay uses a warm sepia-tinted gradient (lighter opacity ~0.35-0.55) so more of the forge image shows through
- Way overlay uses a soft cream/warm white gradient (lighter opacity ~0.40-0.60) for an ethereal, sun-washed feel  
- CRU x WAY overlay uses a medium warm gradient for balanced readability
- Effect particles shift to deeper gold/bronze tones for visibility against lighter backgrounds
- Text colors adjust: use dark navy text (`hsl(228 55% 12%)`) with light text-shadow in light mode vs white text in dark mode

### 5. Implementation

Create three new internal components: `CrucibleEffects`, `WayEffects`, `MergeEffects`. Each accepts `isMobile` to reduce particle count. Insert them into the respective background layers between the image and the overlay div.

Update overlay gradients and text colors to use `isDark` conditionals throughout all four acts.

**Estimated additions**: ~180 lines of new effect components + ~30 lines of theme-conditional updates to existing overlays and text colors.

