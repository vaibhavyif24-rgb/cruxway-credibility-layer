

## Fix: Clipped Descenders on Hero H1 Headings

### Problem
The serif font EB Garamond has deep descenders on letters like "g", "y", "p". The current hero H1 line-height values (`leading-[1.08]` and `leading-[1.1]`) are too tight, causing these descenders to clip at the bottom — visible in the uploaded screenshot where the "g" in "Backbone" is cut off.

### Fix
Change line-height to `leading-[1.18]` on every hero H1 across all 8 pages. This clears the descenders while keeping the heading visually tight.

### All Changes

| File | Line | Current | New |
|------|------|---------|-----|
| `Home.tsx` | 417 | `leading-[1.08]` | `leading-[1.18]` |
| `Team.tsx` | 372 | `leading-[1.08]` | `leading-[1.18]` |
| `Contact.tsx` | 41 | `leading-[1.1]` | `leading-[1.18]` |
| `OurFocus.tsx` | 123 | `leading-[1.1]` | `leading-[1.18]` |
| `OurPlaybook.tsx` | 341 | `leading-[1.1]` | `leading-[1.18]` |
| `GuidingPrinciples.tsx` | 36 | `leading-[1.1]` | `leading-[1.18]` |
| `About.tsx` | 59 | `leading-[1.1]` | `leading-[1.18]` |
| `InvestmentCriteria.tsx` | 206 | `leading-[1.1]` | `leading-[1.18]` |

8 single-value replacements. No layout, copy, animation, or structural changes.

