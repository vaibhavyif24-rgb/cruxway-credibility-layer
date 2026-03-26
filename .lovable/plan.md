

## Plan: Compact Mobile Cinematic with Tagline on Image + Sectors Below

### Problem
On mobile (390px), the current cinematic scroll has three issues:
1. Tagline floats at `top: 30%` while the circle starts at `top: 62%` — creating a large blank gap between text and image
2. The 150vh scroll distance is too long for a simple circle-expand, making it feel empty
3. Sectors appear as a disconnected dark block below with no visual relationship to the cinematic image

### Design (Senior UI/UX approach)

**Short, punchy cinematic**: Reduce to `120vh` total. The circle starts centered at `50%` (not 62%), begins expanding immediately, and the tagline sits ON TOP of the image from the start — no floating text above blank space.

**Layout**: Tagline is vertically centered over the circle/image. As the user scrolls, the circle expands to fill the screen. The tagline stays centered with text shadow for readability. No phase 2 inside the sticky — it's just a clean image reveal with text overlay.

**Sectors seamlessly below**: The mobile sectors section gets a top gradient that blends from the image into the dark background, creating visual continuity rather than a hard cut.

### Changes to both `CinematicScrollReveal.tsx` and `USCinematicScrollReveal.tsx`

1. **Container height**: `isMobile ? '120vh' : '250vh'` — snappier scroll
2. **Circle initial position**: `top: 50%` on mobile (centered), not 62%
3. **Tagline position**: `top: 38%` on mobile — sits directly over the circle/image center, moves up slightly as image expands
4. **Image progress mapping**: `progress / 0.9` on mobile — image fills screen over 90% of the short scroll
5. **Mobile sectors section**: Add a top border/gradient transition so it flows from the expanded image into the dark sector block seamlessly; keep the blurred background image approach but tighten padding

### Technical Details

```text
Mobile scroll journey (120vh):
┌─────────────────────┐
│ sticky h-screen     │
│                     │
│    ┌──────────┐     │  ← circle starts at 50%, tagline centered ON it
│    │  image   │     │
│    │ +tagline │     │
│    └──────────┘     │
│         ↓ scroll    │
│  ┌─────────────────┐│  ← circle fills screen, tagline still on image
│  │    full image    ││
│  │    + tagline     ││
│  └─────────────────┘│
└─────────────────────┘
┌─────────────────────┐
│  SECTORS WE LOOK AT │  ← normal flow, dark bg, fully scrollable
│  Industrials        │
│  Business Services  │
└─────────────────────┘
```

### Files Modified
- `src/components/CinematicScrollReveal.tsx`
- `src/components/USCinematicScrollReveal.tsx`

