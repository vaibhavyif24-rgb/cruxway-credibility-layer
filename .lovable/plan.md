

## Fix: Sticky Card Stack - Content Visibility and True Stacking

### Current Problems
1. **Content invisible**: Cards 1-3 are not visible at all. The negative `marginBottom` approach (`-(CARD_MIN_H - PEEK)` = -160px) collapses cards on top of each other without enough scroll runway, making them invisible.
2. **No stacking behavior**: The sticky approach has failed across multiple attempts because the container height and card spacing math never provides enough scroll distance for cards to stay pinned while the next one arrives.

### Root Cause
The Boundless reference does NOT use CSS `position: sticky` per card. It uses a completely different approach: a **scroll-driven vertical carousel** inside a single sticky/fixed container. A wrapper is pinned to the viewport, and scroll progress drives `translateY` on an inner carousel so cards slide up one-by-one, each fully covering the previous one.

### Solution: Scroll-Linked Vertical Carousel
Completely rewrite `StickyCardStack.tsx` to use the Boundless approach:

1. **Outer wrapper**: A tall div whose height = `(cards.length) * 100vh` to create scroll runway
2. **Inner sticky container**: A `position: sticky; top: 88px` div with `overflow: hidden` and a fixed visible height (e.g., 420px)
3. **Carousel track**: All cards stacked vertically inside, moved via `translateY` based on scroll progress
4. **Scroll listener**: On scroll, compute which card should be active based on how far through the outer wrapper the user has scrolled, then set `translateY(-${activeIndex * 100}%)` on the carousel track
5. **Dot indicators**: Optional active card indicator (like Boundless dots)

This guarantees:
- Each card takes the full visible area
- Scrolling moves to the next card, which slides up and fully covers the previous
- All card content is always visible when active
- The effect is identical to Boundless

### Files to Change
- **`src/components/StickyCardStack.tsx`** — Complete rewrite to scroll-driven carousel
- **`src/pages/InvestmentCriteria.tsx`** — Remove any padding/spacing adjustments that conflict
- **`src/pages/Home.tsx`** — Minor spacing adjustments if needed

### Technical Details

```text
Structure:
┌─────────────────────────────────┐  ← Outer div (height: N * 100vh)
│  ┌───────────────────────────┐  │  ← Sticky container (top: 88px, overflow: hidden, fixed height)
│  │  ┌─────────────────────┐  │  │  ← Carousel track (translateY based on scroll)
│  │  │  Card 1 (100% h)    │  │  │
│  │  ├─────────────────────┤  │  │
│  │  │  Card 2 (100% h)    │  │  │
│  │  ├─────────────────────┤  │  │
│  │  │  Card 3 (100% h)    │  │  │
│  │  ├─────────────────────┤  │  │
│  │  │  Card 4 (100% h)    │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘

Scroll progress → activeIndex → translateY(-activeIndex * 100%)
```

- Smooth CSS transition on translateY for polished card changes
- Keep existing card surface styling (backgrounds, SVG decorations, typography)
- Ensure dark variant works for Investment Criteria page
- Use `requestAnimationFrame` for scroll performance

