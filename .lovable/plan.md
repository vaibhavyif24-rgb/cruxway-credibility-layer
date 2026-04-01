

## Plan: Replace AI Images, Remove Frosted Box, Fix Text Contrast

### Current Problems
1. **AI-generated images** (`cruxway-crucible-v2.jpg`, `cruxway-merge-v2.jpg`) look synthetic and cheap
2. **Visible frosted white box** (`FrostedScrim`) in light mode is amateurish -- a senior designer would never use a visible rectangle over a photo
3. **Gold text still hard to read** in light mode against bright images
4. **Origin Story bridge heading** still needs refinement across themes

### Design Philosophy (Senior UI/UX Approach)
Instead of a frosted box band-aid, use **compositional contrast** -- the same technique editorial magazines and luxury brands use:
- **Multi-layer radial vignette** centered on the text zone, blending into the image naturally
- **Stronger image overlays** that create a consistent tonal base
- **Text stroke/shadow** tuned per theme for guaranteed legibility
- The image + overlay work together so gold text reads directly -- no visible box needed

---

### Changes

#### 1. Download Real Stock Photos (via script)

**Crucible image**: Download a real foundry/molten metal pour photograph from Unsplash or Pexels -- dark background with golden/amber glow. Natural dark areas in the center provide inherent contrast for text. Candidate sources:
- Pexels: foundry molten metal pour (dark, dramatic, professional)
- Unsplash: forge/crucible with sparks

**Merge/CRU×WAY image**: Download an abstract golden light convergence or crossroads photograph -- warm golden tones with dark periphery. Something abstract that represents two forces merging.

Both images saved to `src/assets/` as `cruxway-crucible-v3.jpg` and `cruxway-merge-v3.jpg`.

#### 2. Remove FrostedScrim, Replace with Radial Vignette Overlay -- `CruxwayOriginStory.tsx`

**Delete** the entire `FrostedScrim` component (lines 106-135) and all 4 references to it.

**Replace with a centered radial vignette** as part of each Act's overlay system (not a separate element):

```
Dark mode:  radial-gradient(ellipse at center, hsl(228 50% 6% / 0.70) 0%, transparent 65%)
Light mode: radial-gradient(ellipse at center, hsl(40 30% 96% / 0.80) 0%, hsl(40 25% 94% / 0.45) 40%, transparent 70%)
```

This creates an invisible, natural contrast zone -- no visible edges, blends into the image seamlessly.

#### 3. Fix Text Shadows for Both Modes -- `CruxwayOriginStory.tsx`

- **Dark mode gold headings**: `text-shadow: 0 0 40px hsl(43 78% 50% / 0.3), 0 2px 8px rgba(0,0,0,0.6)` -- gold glow + dark anchor
- **Light mode gold headings**: `text-shadow: 0 0 30px hsl(43 78% 50% / 0.25), 0 1px 4px rgba(0,0,0,0.2)` -- subtle gold glow + light dark anchor (NOT white shadow which does nothing)
- **Body text dark mode**: keep current white with dark shadow
- **Body text light mode**: dark navy with subtle dark shadow `0 1px 3px rgba(0,0,0,0.10)` -- guaranteed readable against the radial vignette

#### 4. Strengthen Overlay Gradients -- `CruxwayOriginStory.tsx`

Light mode overlays currently too weak. Update:
- Crucible light: `hsl(35 30% 92% / 0.42) → hsl(35 25% 88% / 0.65)` (significantly heavier)
- Way light: `hsl(40 25% 90% / 0.50) → hsl(40 20% 85% / 0.68)`
- Merge light: `hsl(35 20% 90% / 0.65) → hsl(35 18% 85% / 0.80)`

The combination of stronger overlay + centered radial vignette eliminates the need for any frosted box.

#### 5. Update Image Imports -- `CruxwayOriginStory.tsx`

- Replace `cruxway-crucible-v2.jpg` with `cruxway-crucible-v3.jpg`
- Replace `cruxway-merge-v2.jpg` with `cruxway-merge-v3.jpg`
- `cruxway-way.jpg` stays (already a real photo that works well)

#### 6. Refine Origin Story Bridge -- `GuidingPrinciples.tsx`

The bridge heading already compact from prior work. Fine-tune theme-awareness:
- Light mode text: use `text-foreground/60` instead of `text-muted-foreground` for subtitle
- Ensure background perfectly matches the `solidBg` on both sides of the transition
- Add a subtle bottom border in light mode: `border-b border-gold/10`

---

### Files Modified
- `src/assets/cruxway-crucible-v3.jpg` -- new real stock photo (create)
- `src/assets/cruxway-merge-v3.jpg` -- new real stock photo (create)
- `src/components/CruxwayOriginStory.tsx` -- remove FrostedScrim, add radial vignettes, fix shadows, update images, strengthen overlays
- `src/pages/GuidingPrinciples.tsx` -- bridge heading theme refinement

### Result
Gold text reads directly on images without any visible box. Natural compositional contrast via radial vignettes. Real photographs replace AI-generated assets. Professional, editorial quality across both themes.

