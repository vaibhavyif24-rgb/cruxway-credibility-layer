

## Upgrade India Video + Refine Light-Mode Polish

### File: `src/pages/Home.tsx` — `OpportunityCinematic` component

### 1. Replace India video with Mumbai dusk aerial (35213732)

The current video (35213738) shows a daytime cityscape that reads as generic. Swap to Pexels **35213732** — "Aerial View of Mumbai Cityscape at Dusk" — same creator (Rajkumarrr comics), same series, but shot at golden hour/dusk with warm amber tones in the sky. This is the version that works beautifully under both overlays: the warm dusk tones bleed through the navy overlay creating a subtle amber-navy interplay that feels premium.

- **Video**: `https://videos.pexels.com/video-files/35213732/14917606_2560_1440_60fps.mp4`
- **Poster**: `https://images.pexels.com/videos/35213732/4k-aerial-4k-aerial-shot-abstract-sky-aerial-from-the-sky-35213732.jpeg?auto=compress&w=1200`

2560x1440 at 60fps. Smooth drone pan across Mumbai's modern skyline with warm dusk lighting — aspirational, recognizably Indian (Worli/Bandra high-rises visible), the exact aesthetic a global PE firm would use.

### 2. Enhance light-mode overlay for sophistication

Current light-mode overlay is a single linear gradient. Upgrade to a **layered overlay** that adds depth:

- **Base gradient** stays: `hsl(228 45% 12% / 0.75)` to `0.95` (bottom-heavy for text legibility)
- **Add a secondary radial vignette**: dark edges fading to slightly more transparent center, creating a cinematic depth-of-field feel rather than a flat color wash
- **Add a subtle warm undertone layer**: `hsl(228 40% 18% / 0.08)` radial at center — this lets a whisper of the video's warmth through in light mode, preventing the section from feeling like a dead flat navy block

Implementation: two additional absolute `div` layers in the overlay stack (z-[2]):
```
// Radial vignette (both themes)
radial-gradient(ellipse at center, transparent 30%, hsl(228 55% 8% / 0.25) 100%)

// Light-mode warm center glow (light only)  
radial-gradient(ellipse at 50% 60%, hsl(40 30% 50% / 0.04) 0%, transparent 60%)
```

### 3. No changes to
- US video (Manhattan evening — already great)
- Dark-mode overlay (already works well)
- Text content, animations, grain, ornament, parallax logic
- Performance attributes (`fetchpriority`, `preload`)

### Why this matters
The dusk video has warm amber tones that interact with the navy overlay to create the kind of color-temperature interplay seen in premium film color grading. In light mode, the heavier overlay keeps text crisp while the warm radial lets just enough video warmth through to feel alive rather than flat.

