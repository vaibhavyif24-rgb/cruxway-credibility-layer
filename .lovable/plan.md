

## Plan

### 1. About Page SVG: Move climber to the peak
**File:** `src/components/AnimatedAccent.tsx` (partnership variant)

- Move the climber figure to the summit position (at the peak, ~y=120) instead of mid-climb
- Show the climber standing upright at the top, arm raised planting the flag
- Adjust the climbing trail to end at the peak
- Remove blank space below by tightening the ground line and tagline positioning (move tagline from y=268 up to ~y=260, ground line from y=280 to ~y=270)
- Keep all existing effects (hover wave on flag, sparkles, achievement glow, mountain silhouette)

### 2. Criteria Pipeline: Remove "Partnership" and "From Discovery to Partnership"
**File:** `src/components/CriteriaPipeline.tsx`

- Remove the "From Discovery to Partnership" subtitle text and its gold rule (lines 61-64)
- Remove the entire "Partnership terminus" block at the bottom (lines 158-172)
- Reduce `mb-8` on the title container since we're removing the subtitle

### 3. Criteria Page: Merge Value Creation + Strengths for India into single structure
**File:** `src/pages/InvestmentCriteria.tsx`

- For India region, combine the "Value Creation Playbook" (left column) and "StrengthsWidget" (right column) into a unified single-column layout
- Replace emoji/presentation icons in the US sectors grid with refined SVG line icons (matching the style already used in CriteriaPipeline and StrengthsWidget)
- Remove em dashes from all copy on this page

### 4. Remove em dashes globally
**Files:** `src/pages/InvestmentCriteria.tsx`, `src/components/CriteriaPipeline.tsx`

- Replace any em dash characters with commas or periods as contextually appropriate

### Files to edit
1. `src/components/AnimatedAccent.tsx` - adjust climber position to peak, reduce blank space
2. `src/components/CriteriaPipeline.tsx` - remove Partnership heading and subtitle
3. `src/pages/InvestmentCriteria.tsx` - merge value creation + strengths for India, replace emoji icons with SVG icons, remove em dashes

