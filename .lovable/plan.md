

## Sticky Card Reveal for "Our Process" and "Evaluation Framework"

### Concept
Replace the current grid/pipeline layouts with a **sticky stacked card scroll** effect -- each card is `position: sticky` at increasing `top` offsets, so as the user scrolls, cards stack on top of each other like a physical deck being laid out. Each card is a large rounded container following the reference images' aesthetic: Swiss Grid text placement (title left, description below, optional stat/icon right).

### New Component: `StickyCardStack.tsx`

A reusable component accepting an array of card items and a variant (light/dark).

**Scroll mechanics:**
- Container has enough height for all cards to scroll through (~100vh per card)
- Each card uses `position: sticky` with incrementally increasing `top` values (e.g., card 0 at `top: 80px`, card 1 at `top: 100px`, card 2 at `top: 120px`, etc.) creating the physical stacking illusion
- Cards use `useScroll` + `useTransform` to slightly scale down (0.98) as the next card arrives, creating depth
- Each card has a subtle shadow that intensifies as cards stack

**Card visual design (matching reference images):**
- Large rounded containers (`rounded-2xl` or `rounded-3xl`) with solid background colors from the site palette
- **Light variant cards** cycle through: warm stone (`hsl(40 25% 96%)`), cream (`hsl(40 20% 93%)`), light gold tint (`hsl(38 20% 90%)`)
- **Dark variant cards** cycle through: prussian blue shades (`hsl(207 65% 12%)`, `hsl(207 50% 18%)`, `hsl(210 60% 8%)`)
- Swiss Grid: left column has large serif title + smaller sans description; right column has the step number in oversized serif or a subtle decorative element
- Min-height ~60-70vh per card, content vertically centered

**Typography:**
- Step number: oversized serif (`text-[clamp(3rem,8vw,6rem)]`) at low opacity on the right side
- Title: large serif (`text-[clamp(1.4rem,3vw,2.2rem)]`) left-aligned
- Description: sans `text-[14px] md:text-[16px]` with generous leading, left-aligned below title

### Changes to `src/pages/Home.tsx`

Replace the "Our Process" section (lines 183-215) with the new `StickyCardStack` component. Update the process step data to be more engaging:

- **01 -- Identify.** "We go where others don't. Deep networks, proprietary sourcing, and years of relationship-building surface businesses before they ever reach a market."
- **02 -- Evaluate.** "Every opportunity is stress-tested across financials, operations, culture, and market position. Rigour is our edge."
- **03 -- Invest.** "Majority stakes structured to preserve what works -- continuity for employees, clients, and the legacy founders built."
- **04 -- Build.** "Hands-on partnership from day one. We professionalise systems, deploy capital, and accelerate growth alongside management."

### Changes to `src/pages/InvestmentCriteria.tsx`

Replace the "Evaluation Framework" section (lines 206-233) which currently uses the `CriteriaPipeline` side-by-side layout. Convert to the same `StickyCardStack` component on dark variant. Update content for more engaging copy:

- **01 -- Discovery.** "We go beyond deal brokers. Our proprietary networks and deep sector relationships surface opportunities that never reach a market process."
- **02 -- Evaluation.** "Strategic fit, market position, culture alignment, and growth vectors -- every dimension is assessed with institutional rigour before we proceed."
- **03 -- Diligence.** "Deep financial, operational, legal, and commercial analysis. We leave no stone unturned because conviction requires evidence."
- **04 -- Structuring.** "Ownership, governance, and capital structures designed for decades -- not exits. Every term reflects our commitment to lasting partnership."

### Technical Details
- `StickyCardStack` uses `position: sticky` with CSS (no JS scroll listeners needed for the stacking)
- Each card wraps in a div with padding-bottom to create scroll distance
- `useScroll` per card tracks its progress to apply a subtle scale-down transform as the next card overlaps
- Background colors assigned via an array index rotation
- Fully responsive: on mobile, cards use smaller min-height (~50vh) and tighter padding
- `CriteriaPipeline.tsx` remains in the codebase but is no longer imported by InvestmentCriteria

