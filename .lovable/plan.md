

## Plan: Principles Grid, Focus Data Updates, Playbook Step Navigator

### 1. Our Principles — 2×3 Grid with Expandable Cards

**Replace** `PrinciplesDeck` scroll-driven deck with a static 2×3 grid in `GuidingPrinciples.tsx`.

**New component: `PrinciplesGrid.tsx`**
- 2×3 CSS grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) showing all 6 principles simultaneously — no scroll mechanics
- Each card shows title + gold rule + truncated description (2 lines)
- Clicking a card expands it inline (accordion style) to reveal the full description with a smooth `max-height` + opacity transition (~300ms)
- Active/selected card gets a gold left-border highlight and subtle scale on hover (`scale(1.02)`)
- "Expand All / Collapse All" toggle button above the grid — styled as a subtle uppercase text button matching the site's `btn-premium` pattern
- Cards use the existing alternating palette (light/dark aware) and gold watermark numbers
- Remove `PrinciplesDeck` import from `GuidingPrinciples.tsx`, replace with `PrinciplesGrid`

### 2. Our Focus — Data Updates

**Changes to `OurFocus.tsx` lines 16-23** (US `investmentProfile`):
- Revenue: `'$1M – $10M (₹10Cr – ₹100Cr)'`
- EBITDA: `'$500K – $2.5M (₹5Cr – ₹25Cr)'`
- Remove `Enterprise Value` row entirely
- Structure → `'Primarily majority control, with structured minority investments where alignment is strong'`
- Hold Period → `'Long-term ownership with no predefined exit horizon'`
- Remove `Geography` row, replace with `{ label: 'Aligned Partnerships', value: 'Prioritize situations where owners reinvest and teams remain in place.' }`

Grid layout: adjust from `lg:grid-cols-6` to `lg:grid-cols-5` (now 5 items) or keep responsive with auto-fill.

### 3. Our Playbook — Step Navigator + Value Creation Grid

**Deal Process section** (`OurPlaybook.tsx` lines 60-78):
- Replace `StickyCardStack` with a **horizontal stepper/tab navigator**
- All 4 steps visible as numbered tab buttons at the top (e.g., `01 Discovery | 02 Evaluation | 03 Diligence | 04 Structuring`)
- Active step has a filled gold pill/underline treatment
- Clicking a step crossfades to that step's content panel below
- Content panel shows the step title + description with the existing illustration
- Minimum 44×44px tap targets on all step buttons

**Value Creation section** (`OurPlaybook.tsx` lines 88-103):
- Replace `CriteriaCarousel` horizontal scroll with a **2×2 grid** (`grid-cols-1 md:grid-cols-2`)
- All 4 items visible on one screen, no horizontal scroll
- Increase font sizes: heading `text-[1.25rem]`, body `text-[1rem]`
- Each card gets the existing `GlassCard` treatment with gold accents
- Remove small dot indicators — replaced by the grid layout itself

### Files Modified

| File | Change |
|---|---|
| `src/components/PrinciplesGrid.tsx` | **New** — 2×3 expandable card grid with Expand All toggle |
| `src/pages/GuidingPrinciples.tsx` | Swap `PrinciplesDeck` → `PrinciplesGrid` |
| `src/pages/OurFocus.tsx` | Update US investment profile data (revenue, EBITDA, structure, hold period, aligned partnerships; remove enterprise value + geography) |
| `src/pages/OurPlaybook.tsx` | Replace StickyCardStack with tab stepper; replace CriteriaCarousel with 2×2 grid |

