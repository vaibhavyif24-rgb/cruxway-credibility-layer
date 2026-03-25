

## Criteria Page: Horizontal Sticky Deck + Value Creation Carousel

### Overview
Two changes on the Investment Criteria page:

1. **"What We Look For" → Horizontal scroll-triggered sticky deck** (like the vertical StickyCardStack but slides horizontally). Each card fills the viewport width, with scroll driving a `translateX` transition. Includes unique AnimatedAccent-style SVG illustrations per card (different themes from Evaluation Framework).

2. **"Value Creation Playbook" (Stabilise/Optimise/Invest/Compound) → Horizontal scroll carousel** with the `CriteriaCarousel` component, replacing the 4-column grid.

---

### 1. New Component: `HorizontalStickyDeck`

**File**: `src/components/HorizontalStickyDeck.tsx`

A horizontal variant of `StickyCardStack`:
- Outer wrapper provides scroll runway: `(N-1) * 0.65 * 100vh + cardHeight`
- Sticky inner frame pinned at `top: 88px`, full width, height = `cardHeight`
- Cards laid out side-by-side; scroll drives `translateX(-${activeIndex * 100}%)`
- Smooth 0.6s cubic-bezier transition between cards (feels like changing a slide)
- Dot indicators on the right side (vertical dots, same as StickyCardStack)
- Same scroll handler logic: `progress = scrolled / scrollableRange`, `activeIndex = Math.round(progress * (N-1))`

**6 unique thematic illustrations** (different from the 4 in StickyCardStack):
- **01 Founder Succession**: Torch/flame handoff — two hands passing a flame, gold line art
- **02 Regulated Services**: Shield with compliance checkmarks, regulatory grid
- **03 Customer Retention**: Circular loyalty loop — arrows forming a cycle with connection nodes
- **04 Consolidation**: Merge diagram — multiple small circles converging into one large circle
- **05 Operational Upside**: Ascending bar chart with gear icon overlay
- **06 Values Alignment**: Concentric circles with a compass/star at center

Each card auto-cycles between 2 SVG variants every 2 seconds (same crossfade pattern as StickyCardStack's `ThematicIllustration`).

**Card layout**: Same as `CardSurface` — full-height card with step label, serif title, description on the left, illustration on the right. Background colors alternate between the same palettes used in StickyCardStack.

### 2. Value Creation Playbook → CriteriaCarousel

Replace the 4-column grid (lines 227-249) with the existing `CriteriaCarousel` component, passing the 4 items as carousel data.

### 3. Page Updates (`src/pages/InvestmentCriteria.tsx`)

- Import `HorizontalStickyDeck` instead of `CriteriaCarousel` for "What We Look For"
- Pass `whatWeLookFor` data to `HorizontalStickyDeck` with matching card interface
- Replace the Value Creation grid with `CriteriaCarousel` using the 4 playbook items
- Keep everything else (Hero, Stats, Evaluation Framework, Target Sectors, CTA) unchanged

### Files

| File | Action |
|------|--------|
| `src/components/HorizontalStickyDeck.tsx` | **Create** — horizontal scroll-driven deck with 6 unique illustrations |
| `src/pages/InvestmentCriteria.tsx` | **Edit** — swap "What We Look For" to HorizontalStickyDeck, swap Value Creation grid to CriteriaCarousel |

