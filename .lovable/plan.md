

## Plan: Word Fixes + Investment Criteria Content Enrichment

### 1. Replace "Acquiring/acquires" with "Investing/invests"

**File**: `src/pages/About.tsx` (line 80)
- `"invests in and acquires majority stakes"` → `"invests in and takes majority stakes"`

### 2. Replace "Values-Driven Investing" with "Investing Tailored to Each Company's Needs"

**File**: `src/pages/About.tsx` (line 53)
- Hero heading US: `"Values-Driven Investing"` → `"Investing Tailored to Each Company's Needs"`

**File**: `src/pages/GuidingPrinciples.tsx` (line 60)
- ScrollRevealText US heading: `"Values-driven investing for the long term."` → `"Investing tailored to each company's needs, for the long term."`

### 3. Preserve "Next Generation" Phrasing

Already present in Home.tsx hero and scroll reveal. No changes needed. Confirmed usage:
- US: "Building the Next Generation of Essential U.S. Companies"
- India: "Investing in India's Next Generation of Essential Companies"

### 4. Enrich Investment Criteria "What We Look For" Cards

The user wants comprehensive coverage of: target sectors, all stages, underserved/overlooked markets, ownership transition, proven persistency, cultural fit, established customer trust.

Current 6 cards cover: Founder-Led Succession (ownership transition ✓), Essential & Regulated Services (target sectors ✓), Recurring Revenue & Retention (persistency ✓), Platform & Consolidation (partially), Operational Improvement, Prudent Capital Structure.

**Missing**: underserved/overlooked markets, cultural fit, established customer trust explicitly.

**File**: `src/pages/InvestmentCriteria.tsx` (lines 41-48)

Update the 6 card descriptions to weave in missing themes without adding cards (keeping the 6-card structure with existing illustrations):

| # | Title (keep) | Updated Description |
|---|---|---|
| 1 | Founder-Led Succession | Partnering with owners ready for the next chapter: retirees, families, and founders seeking continuity for the businesses and teams they built. |
| 2 | Essential & Regulated Services | Compliance-driven B2B sectors across underserved and overlooked markets where reliability, safety, and recurring demand create natural moats. |
| 3 | Recurring Revenue & Retention | Businesses with established customer trust, high switching costs, and proven persistency that generates predictable, compounding cash flows. |
| 4 | Platform & Consolidation Potential | Fragmented, underserved markets where disciplined investment compounds value over a long hold period across multiple stages of growth. |
| 5 | Operational Improvement Runway | Undermanaged businesses where professionalised systems, reporting, and governance unlock enterprise value while preserving the culture that built the company. |
| 6 | Prudent Capital Structure | Conservative leverage philosophy focused on business building and cash flow generation, not financial engineering. *(unchanged)* |

Also update the section intro paragraph (line 137):
- Current: `"We evaluate opportunities through a rigorous lens, seeking businesses with enduring competitive advantages and alignment with our long-term partnership model."`
- New: `"We evaluate opportunities through a rigorous lens: target sectors, ownership transitions, cultural fit, and enduring competitive advantages that align with our long-term partnership model."`

### Files Modified

1. `src/pages/About.tsx` – replace "acquires" and "Values-Driven Investing"
2. `src/pages/GuidingPrinciples.tsx` – replace "Values-driven investing"
3. `src/pages/InvestmentCriteria.tsx` – enrich 5 of 6 card descriptions and intro paragraph

