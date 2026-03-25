

## Plan: Criteria Page Redesign + Home Social Proof Fix

### 1. Stats Band Redesign (InvestmentCriteria.tsx)

Add a proper heading above the numbers and move the "Investment Criteria" label to the top of the stats band:

```text
Current:          →   New:
[just numbers]        INVESTMENT PROFILE  (SectionLabel)
                      Our Target Parameters (heading)
                      [gold rule]
                      [6 stat blocks in grid]
```

This gives context before the numbers appear, matching the professional PE deck structure from the uploaded PDF.

### 2. Replace "What We Look For" Criteria

Current criteria have some fluffy language. Replace with sharper, PE-logical criteria drawn from the firm's actual approach (from the PDF):

| # | Title | Description |
|---|-------|-------------|
| 01 | Founder-Led Succession | Partnering with owners at an inflection point, preserving legacy while enabling the next chapter of growth. |
| 02 | Essential & Regulated Services | Compliance-driven B2B sectors where reliability, safety, and recurring demand create natural moats. |
| 03 | Recurring Revenue & Retention | Businesses with embedded customer relationships, high switching costs, and predictable cash flows. |
| 04 | Platform & Consolidation Potential | Fragmented markets where disciplined acquisitions compound value over a long hold period. |
| 05 | Operational Improvement Runway | Undermanaged businesses where professionalised systems, reporting, and governance unlock enterprise value. |
| 06 | Prudent Capital Structure | Conservative leverage philosophy focused on business building and cash flow generation, not financial engineering. |

### 3. Replace Hero Images (AI-Generated Ultra HD)

Generate 2 new high-resolution images using Nano banana 2 (gemini-3.1-flash):
- **US Criteria**: Modern American industrial infrastructure, steel and glass, blue hour lighting, cinematic wide angle
- **India Criteria**: Indian industrial/business district, golden hour, modern infrastructure with cultural elements

These replace `hero-us-criteria.jpg` and `hero-india-criteria.jpg`.

### 4. Home Page: Redesign Social Proof Section

Current: Plain heading "Our team has invested and operated across leading global institutions" — generic and flat.

Redesign as a **quote-style block** with a large italic serif pull-quote and subtle gold vertical rule accent:

```text
Current layout:
  INSTITUTIONAL EXPERIENCE
  "Our team has invested and operated across leading global institutions"
  [logo marquee]

New layout:
  [centered layout, no SectionLabel]
  Gold vertical line accent (40px)
  "Operators and investors who have built,
   scaled, and partnered across the world's
   leading institutions."
  — large serif italic, muted gold tint
  [logo marquee unchanged]
```

This transforms a flat descriptor into a confident, editorial pull-quote that matches the site's premium aesthetic.

### Files Modified

1. **`src/pages/InvestmentCriteria.tsx`** — Stats band heading, criteria data, image imports
2. **`src/pages/Home.tsx`** — Social proof section redesign (lines 200-216)
3. **`src/assets/hero-us-criteria.jpg`** — New AI-generated image
4. **`src/assets/hero-india-criteria.jpg`** — New AI-generated image

### What Stays Unchanged
- All scroll animations (StickyCardStack, CinematicScrollReveal, expanding circle)
- CriteriaCarousel, Evaluation Framework
- LogoMarquee component and logo data
- All CSS variables, DarkSectionEffects, theme system

