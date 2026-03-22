

## Plan: Replace About SVG with Bullseye Target + Reformat Investment Criteria Page

---

### 1. Replace Mountain Peak SVG with Bullseye Target (About Page)

**File:** `src/components/AnimatedAccent.tsx` — `partnership` variant

Remove the entire mountain/flag composition. Replace with:
- Three concentric target rings centered at (200, 140), drawn with `pathLength` animation
- A small filled gold circle at the exact center (bullseye hit)
- Interactive hover: the entire target group scales slightly (`whileHover: scale 1.04`)
- Pulse ripple effect on the center point
- Retain the quote below: *"Aligned ambition. Enduring partnership."* at the same position and size

### 2. Eliminate Duplication on Investment Criteria Page

**File:** `src/pages/InvestmentCriteria.tsx`

Current page has significant content overlap across sections:

| Section | Content | Overlap |
|---|---|---|
| Our Approach (4 cards) | Long-Term Alignment, Essential Services, Operational Partnership, Disciplined Capital | Overlaps with Investment Criteria section |
| Investment Criteria (7 rows) | Target Sectors, All Stages, Underserved Markets, Ownership Transition, etc. | Overlaps with Deal Characteristics |
| Deal Characteristics (4 cards) | Founder Succession, Growth Capital, Operational Complexity, Fragmented Markets | Duplicates Investment Criteria items |
| What Sets Us Apart (4 steps + StrengthsWidget) | Value creation playbook + strengths grid | Unique but intro text overlaps |

**Restructured page (5 sections instead of 7):**

1. **Hero** — keep as-is
2. **Investment Profile Band** — keep the stats band as-is
3. **Our Thesis + CriteriaPipeline** — merge "Our Approach" and the pipeline widget into one section. Remove the 4 approach cards (their content is covered by the criteria section). Keep CriteriaPipeline widget full-width with a brief thesis statement beside it.
4. **What We Look For** — consolidate "Investment Criteria" and "Deal Characteristics" into one cohesive section. Deduplicate overlapping items (merge "Ownership Transition" with "Founder Succession", merge "Underserved Markets" with "Fragmented Markets"). Reduce from 7+4=11 items down to ~6 distinct, non-redundant criteria presented as GlassCards in a 2-column grid.
5. **What Sets Us Apart** — keep the value creation playbook (Stabilise, Optimise, Invest, Compound) and StrengthsWidget. Tighten the intro copy to avoid repeating thesis language.
6. **Target Sectors** — keep US-only section as-is
7. **CTA** — keep as-is

### 3. Consistent Effects Across Page

- Ensure every section uses the same `FadeIn`, `GoldRule`, `DarkSectionEffects` pattern already in place
- The CriteriaPipeline widget and StrengthsWidget already have hover/scroll animations — no changes needed there
- Remove the `criteria` variant from `AnimatedAccent.tsx` since it's no longer used (replaced by CriteriaPipeline widget)

### Files to Edit
1. **`src/components/AnimatedAccent.tsx`** — Replace `partnership` variant with bullseye target SVG
2. **`src/pages/InvestmentCriteria.tsx`** — Remove duplicated sections, merge content, restructure layout

