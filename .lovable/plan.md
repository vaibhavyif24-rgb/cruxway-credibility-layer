

## Plan: Fix Clipped Descenders on Hero H1 Headings

### Problem
Letters with descenders (g, y, p, j) are being clipped at the bottom in hero headings across all pages. The cause is tight line-height values (`leading-[1.08]` or `leading-[1.1]`) that don't leave enough room for EB Garamond's descender depth at large display sizes.

### Fix
Change line-height to `leading-[1.18]` on all hero H1 elements — just enough to clear descenders without visually loosening the heading.

### Changes (8 files, one value each)

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

No layout, copy, animation, or structural changes. Line-height only.

