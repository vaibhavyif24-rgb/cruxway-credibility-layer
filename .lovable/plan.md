

## Plan: Fix Clipped Descenders on Hero H1 Headings

### Problem
Letters with descenders (g, y, p, j) are clipped at the bottom in hero headings across all pages. The cause is `leading-[1.08]` or `leading-[1.1]` — too tight for EB Garamond's descender depth at large display sizes.

### Fix
Change line-height from `1.08` / `1.1` to `1.18` on all hero H1 elements. This value clears descenders without visually loosening the heading.

### Files and Lines

| File | Line | Current | Fix |
|------|------|---------|-----|
| `Home.tsx` | 417 | `leading-[1.08]` | `leading-[1.18]` |
| `Team.tsx` | 372 | `leading-[1.08]` | `leading-[1.18]` |
| `Contact.tsx` | 41 | `leading-[1.1]` | `leading-[1.18]` |
| `OurFocus.tsx` | 123 | `leading-[1.1]` | `leading-[1.18]` |
| `OurPlaybook.tsx` | 341 | `leading-[1.1]` | `leading-[1.18]` |
| `GuidingPrinciples.tsx` | 36 | `leading-[1.1]` | `leading-[1.18]` |
| `About.tsx` | 59 | `leading-[1.1]` | `leading-[1.18]` |
| `InvestmentCriteria.tsx` | 206 | `leading-[1.1]` | `leading-[1.18]` |

8 single-value replacements. No other changes.

