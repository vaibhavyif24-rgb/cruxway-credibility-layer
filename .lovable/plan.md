

## Plan: Principles Section Redesign — Paired Deck Layout + Mobile QA

### What's changing

Replace the current single-card sticky stack in "What We Stand For" with a **scroll-driven paired deck** that shows 2 principles side-by-side (3 pairs total), transitioning simultaneously as the user scrolls. On mobile, stack vertically as a 1-column pair.

### Architecture

**New component: `PrinciplesDeck.tsx`** (replaces `PrinciplesSlider`)

```text
┌─────────────────────────────────────────────┐
│  ┌──────────────────┐ ┌──────────────────┐  │
│  │  01 / 06         │ │  02 / 06         │  │
│  │  Integrity       │ │  Servant         │  │
│  │  ─── gold rule   │ │  Leadership      │  │
│  │  Description...  │ │  ─── gold rule   │  │
│  │                  │ │  Description...  │  │
│  │  [celestial bg]  │ │  [celestial bg]  │  │
│  └──────────────────┘ └──────────────────┘  │
│                 • • •                       │
└─────────────────────────────────────────────┘
  ↕ scroll triggers pair 1→2→3 transition
```

**Desktop**: Sticky container with tall outer wrapper. Scroll progress maps to 3 pairs. Each pair crossfades in/out with `0.55s cubic-bezier(0.22, 1, 0.36, 1)` — same easing as HorizontalStickyDeck.

**Mobile**: Same paired transitions but cards stack vertically (1 column, 2 cards per "slide"). The sticky container approach works here since it's a single viewport-height frame.

### Detailed implementation

#### 1. `PrinciplesDeck.tsx` — New component

- **Pair grouping**: Split 6 principles into 3 pairs: `[[0,1], [2,3], [4,5]]`
- **Scroll mechanics**: Reuse the proven pattern from `HorizontalStickyDeck` / `StickyCardStack`:
  - Tall outer `div` (height = `cardHeight * 3 * SCROLL_PER_CARD`)
  - Inner `sticky` container at `top: 88px`, `height: 100vh`
  - `IntersectionObserver`-free — use `window scroll → progress → activeIndex` (0, 1, 2)
- **Card rendering**: Each pair renders 2 cards in a `grid grid-cols-2` (desktop) / `grid-cols-1` (mobile) with `gap-3`
- **Transitions**: All 3 pairs rendered as absolute-positioned layers; active pair has `opacity: 1, translateY: 0`; others have `opacity: 0, translateY: 8px` with staggered delays (left card 0s, right card 0.08s)
- **Card visuals**: Keep existing celestial illustrations, alternating backgrounds, vignettes, gold effects — ported from `PrincipleCard`
- **Dot indicators**: 3 dots on the right edge (same style as `StickyCardStack`)
- **Moving effect**: Subtle `translateY` micro-animation on card content using `framer-motion`'s `animate` with a slow float (4s cycle, ±4px) while active

#### 2. `GuidingPrinciples.tsx` — Swap component

- Replace `<PrinciplesSlider>` with `<PrinciplesDeck>`
- No content changes

#### 3. Mobile QA fixes

- Verify `overflow-x: clip` on all page root wrappers (`Home.tsx` already done)
- The new deck component uses `sticky` + scroll-driven approach (not individual sticky cards), which avoids the mobile layout breaks of the old slider

### Files modified

| File | Change |
|---|---|
| `src/components/PrinciplesDeck.tsx` | **New** — Paired scroll-driven deck with 2-up layout |
| `src/pages/GuidingPrinciples.tsx` | Swap `PrinciplesSlider` → `PrinciplesDeck` |
| `src/components/PrinciplesSlider.tsx` | No changes (kept for reference, unused) |

### Technical notes

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` — matches existing deck components
- Card height: `min(65vh, 480px)` per card — slightly shorter than full-bleed to show the pair comfortably
- Scroll multiplier: `0.8` per pair — gives enough scroll range for 3 transitions
- Gold floating particles, celestial-rotate, nebula-pulse, shimmer — all carried over with `fxOpacity` multiplier (1.0 dark, 0.55 light)
- `will-change: transform` only when near viewport (same pattern as current code)

