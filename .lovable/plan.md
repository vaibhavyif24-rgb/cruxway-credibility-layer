

## Fix: Team Sticky Deck — Proper Stacking Card Scroll Effect

### Root Cause

The stacking effect is broken because `SCROLL_RUNWAY = 600px` is **shorter than the viewport** (704px - 88px header = 616px). For `position: sticky` to work, the card's outer wrapper must be **taller** than the sticky element's height — otherwise the card never actually "sticks" and just scrolls normally.

### Architecture Fix

```text
Card wrapper div (height: 100vh + 500px scroll runway)
└── Sticky div (position: sticky, top: 88px, height: calc(100vh - 88px))
    └── motion.div (card surface with scale/opacity transforms)
```

Each card needs ~1100-1200px of wrapper height so the sticky element pins for ~500px of scrolling before the next card's sticky element overlaps it.

### File: `src/components/TeamStickyDeck.tsx` — Rewrite

**1. Fix scroll runway calculation**
- Change `SCROLL_RUNWAY` from 600 to a dynamic value: `window.innerHeight * 0.8` (roughly 560px at 704vh, scales with viewport)
- Each card wrapper: `height = cardHeight + scrollRunway` where `cardHeight = 100vh - STICKY_TOP`
- This guarantees the sticky div stays pinned for the full runway distance

**2. Add `position: relative` to the outer container**
- Fixes the framer-motion warning: "Please ensure that the container has a non-static position"

**3. Scroll-linked cover transforms (keep existing, they're correct)**
- `useScroll` per card with `offset: ['start start', 'end start']`
- Scale: `[1, 1, 0.92]` — previous card shrinks as covered
- Opacity: `[1, 1, 0.25]` — previous card dims
- Border radius: `[16, 16, 24]` — softens edges as it recedes

**4. Typography and visual polish**
- Name: `text-[1.8rem] md:text-[2.4rem]` serif, tight tracking
- Role: gold uppercase `tracking-[0.25em]`
- Photo: `96px md:120px` with gold ring hover
- Summary: `text-[13px] md:text-[14px]` with `leading-[1.75]`
- Highlights: 2-column grid with gold dash markers
- Counter: gold `01 / 03` format
- Progressive box-shadow depth per card index

**5. Theme-aware backgrounds (keep existing palettes)**
- Dark: `hsl(220 8% 15%)`, `hsl(207 45% 13%)`, `hsl(215 12% 11%)`
- Light: `hsl(40 30% 96%)`, `hsl(38 22% 93%)`, `hsl(42 28% 95%)`

**6. Last card trailing space**
- Replace the full-viewport spacer with just `scrollRunway` height so the last card stays visible without excessive blank space

### File: `src/pages/Team.tsx` — Minor

- No changes needed; data and section structure stays the same

### Summary

Single file edit: `src/components/TeamStickyDeck.tsx`. The fix is primarily mathematical — making each card wrapper tall enough for sticky positioning to actually engage, creating the smooth "next card slides over previous" stacking effect.

