

## Plan: Boundless-Style ScrollTrigger Team Deck

### What We're Building

A complete rewrite of the `TeamStickyDeck` component to use a **stacking cards** pattern inspired by Boundless Ventures' portfolio section. Instead of snapping between cards via `translateY`, each card will be independently `position: sticky` and stack on top of the previous one as the user scrolls — creating a smooth, organic "card peeling" effect.

### Architecture

```text
Outer container (height = N * scrollRunway)
├── Card 1 wrapper (position: sticky, top: 88px, z-index: 1)
│   └── Card surface (full viewport, fades/scales slightly as covered)
├── Card 2 wrapper (position: sticky, top: 88px, z-index: 2)  
│   └── Card surface (slides up from below, covers card 1)
├── Card 3 wrapper (position: sticky, top: 88px, z-index: 3)
│   └── Card surface (slides up from below, covers card 2)
```

Each card is its own sticky element. As you scroll, the next card naturally rises from below and overlaps the previous one. The previous card gets a subtle scale-down and opacity reduction as it's being covered — creating depth.

### Key Differences from Current

| Current | New |
|---|---|
| Single sticky frame with `translateY` snap | Each card independently sticky |
| Discrete snap transitions | Continuous scroll-linked parallax |
| Cards switch instantly | Cards smoothly slide over each other |
| Flat card stack | Depth via scale + shadow progression |

### Visual & Typography Upgrades

- **Larger name**: `text-[1.8rem] md:text-[2.4rem]` serif with letter-spacing `-0.03em`
- **Larger photo**: `96px md:120px` with subtle gold ring on hover
- **Role**: `text-[10px] md:text-[11px]` gold uppercase
- **Summary**: `text-[13px] md:text-[14px]` with more generous `leading-[1.75]`
- **Highlights**: cleaner spacing, gold dash markers, `text-[12px] md:text-[13px]`
- **Deal logos marquee**: stays floating at bottom with refined spacing
- **Subtle gold radial gradient** in top-right corner of each card
- **Progressive shadow**: deeper shadow on higher z-index cards for depth

### Scroll-Linked Effects (using framer-motion `useScroll` + `useTransform`)

For each card:
1. **Cover effect**: As the next card scrolls over, the current card scales to `0.95` and dims to `0.3` opacity
2. **Entry**: Each card enters naturally via scroll — no artificial animation triggers
3. **Content stagger**: Name, role, summary, highlights fade in with `0.05s` stagger delays when card enters viewport

### Technical Details

**File: `src/components/TeamStickyDeck.tsx`** — Full rewrite:
- Remove the single-sticky-frame + translateY architecture
- Each card wrapped in a div with `position: sticky; top: 88px` and ascending `z-index`
- Use `useScroll` per card to track its progress and apply cover transforms
- Outer container height: `cardHeight * members.length + scrollRunway`
- Theme-aware: light cream / dark navy backgrounds (existing palettes)
- Smooth `cubic-bezier(0.22, 1, 0.36, 1)` transitions on all animated properties

**File: `src/pages/Team.tsx`** — Minor:
- No structural changes, just passes same data to the new deck

### Files to Edit
1. `src/components/TeamStickyDeck.tsx` — Complete rewrite with stacking card architecture
2. `src/pages/Team.tsx` — Remove any unused padding/wrapper that conflicts with new sticky behavior

