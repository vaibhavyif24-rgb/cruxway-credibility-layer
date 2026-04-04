

## Fix: Clipped Descenders on Hero H1 Headings

### Problem
The serif font EB Garamond has deep descenders on letters like "g", "y", "p". The current hero H1 line-height values (`leading-[1.08]` and `leading-[1.1]`) are too tight, causing the bottom of these letters to get cut off -- visible in your screenshot where the "g" in "Backbone" is clipped.

### Fix
Change line-height to `leading-[1.18]` on every hero H1 across all 8 pages. This is just enough to clear descenders without visually loosening the heading.

### All Changes

| File | Current | New |
|------|---------|-----|
| `Home.tsx` (line 417) | `leading-[1.08]` | `leading-[1.18]` |
| `Team.tsx` (line 372) | `leading-[1.08]` | `leading-[1.18]` |
| `Contact.tsx` (line 41) | `leading-[1.1]` | `leading-[1.18]` |
| `OurFocus.tsx` (line 123) | `leading-[1.1]` | `leading-[1.18]` |
| `OurPlaybook.tsx` (line 341) | `leading-[1.1]` | `leading-[1.18]` |
| `GuidingPrinciples.tsx` (line 36) | `leading-[1.1]` | `leading-[1.18]` |
| `About.tsx` (line 59) | `leading-[1.1]` | `leading-[1.18]` |
| `InvestmentCriteria.tsx` (line 206) | `leading-[1.1]` | `leading-[1.18]` |

8 single-value replacements across 8 files. No layout, copy, animation, or structural changes.

