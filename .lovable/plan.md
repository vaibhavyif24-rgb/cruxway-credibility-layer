

## Three-Part Update: AnimatedAccent-Style Illustrations, Horizontal Carousel, Team Modernization

### 1. StickyCardStack — Thematic SVG Illustrations (AnimatedAccent Style)

Replace the current minimal `CardDecoration` patterns with rich, animated gold line-art illustrations matching the `AnimatedAccent` component's aesthetic (gold strokes, data points, growth curves, axes, drop lines, pulsing nodes).

**4 thematic illustrations** (one per card):
- **Discovery** (01): Compass/radar — concentric circles with scanning sweep line, pulsing nodes at cardinal points, gold stroke grid
- **Evaluation** (02): Scales/balance — two-pan balance with axis lines, weighted data points, equilibrium indicators
- **Diligence** (03): Magnifying glass with data grid — dotted grid behind a lens outline, highlighted nodes inside the focal area
- **Structuring** (04): Partnership graph — growth curve with axes (TIME/VALUE), area fill, data points with drop lines (directly adapted from `AnimatedAccent` partnership variant)

**Auto-cycling**: Each card gets 2 illustration variants. A `useState` + `setInterval(2000)` toggles between them with CSS opacity crossfade (0.8s transition). Both layers gated by `isActive`.

**Style**: Gold stroke (`hsl(38 45% 55%)`), low opacity (0.08–0.15), corner accents, ambient glow circle — matching `AnimatedAccent` exactly.

**File**: `src/components/StickyCardStack.tsx` — replace `CardDecoration` with new `ThematicIllustration` component.

---

### 2. Investment Criteria — Horizontal Carousel for "What We Look For"

Replace the 6-card grid with a scroll-snap horizontal carousel.

**Implementation** (`src/pages/InvestmentCriteria.tsx`):
- Container: `overflow-x-auto`, `scroll-snap-type: x mandatory`, `scrollbar-width: none`
- Each card: `min-w-[280px] md:min-w-[320px]`, `snap-start`, `GlassCard` wrapper
- Content: large gold step number (`01`–`06`), bold serif title, single-line subtitle (~15 words max)
- Navigation: left/right arrow buttons (gold border, `btn-premium` style) + dot indicators
- Active dot tracked via `IntersectionObserver` on each card
- Edge fade gradients matching site pattern

---

### 3. Team Page — Modernization with ScrollRevealText

**File**: `src/pages/Team.tsx`

- **ScrollRevealText after Hero**: Insert between hero and first profile section. Heading: "Operators and investors who've built, scaled, and partnered across cycles."
- **ScrollRevealText before Network section**: Heading: "A curated network built over decades of shared conviction." (variant="dark" if on dark bg, else "light")
- **ProfileCard enhancements**:
  - Photo hover: subtle `scale(1.03)` transform
  - Name: gold gradient underline on hover
  - Highlight bullets: `motion.li` with staggered `whileInView` (delay per item)
- **Gold separators**: `GoldRule` between major sections

---

### Files Changed

| File | What |
|------|------|
| `src/components/StickyCardStack.tsx` | Replace `CardDecoration` with `ThematicIllustration` (4 rich SVG scenes + 2s auto-cycle crossfade) |
| `src/pages/InvestmentCriteria.tsx` | Replace criteria grid with horizontal scroll-snap carousel |
| `src/pages/Team.tsx` | Add 2 `ScrollRevealText` sections, modernize `ProfileCard` hover effects |

