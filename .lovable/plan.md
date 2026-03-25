

## Audit: White Gap on Right Side of Criteria Pages

### Root Cause

The horizontal overflow (white gap on the right) is caused by **DarkSectionEffects** — its absolutely positioned decorative elements (floating orbs up to 500px wide, shimmer lines) extend beyond the viewport. These are inside sections that lack overflow clipping:

1. **"What We Look For" section** (line 122) — `bg-background`, no overflow constraint, contains StickyCardStack in sticky mode
2. **"Evaluation Framework" section** (line 154) — `bg-primary`, has `DarkSectionEffects` with large orbs, no overflow constraint, contains StickyCardStack in slides mode
3. **CinematicScrollReveal / USCinematicScrollReveal** — 300vh tall with expanding circle animation, no outer overflow constraint

### Why `overflow-hidden` Won't Work

Both problematic sections contain **sticky-positioned children** (StickyCardStack). Adding `overflow: hidden` creates a new scroll container, which **breaks `position: sticky`** behavior entirely.

### The Fix: `overflow-x: clip`

CSS `overflow-x: clip` clips content visually (like `hidden`) but does **not** create a new scroll container, so sticky positioning is fully preserved. This is the correct modern solution.

### Changes — Single File: `src/pages/InvestmentCriteria.tsx`

**1. "What We Look For" section (line 122)**
```
- <section className="bg-background">
+ <section className="bg-background overflow-x-clip">
```

**2. "Evaluation Framework" section (line 154)**
```
- <section className="relative bg-primary text-primary-foreground">
+ <section className="relative bg-primary text-primary-foreground overflow-x-clip">
```

**3. CinematicScrollReveal wrapper — add clip to the outer div (line 80)**
```
- <div>
+ <div className="overflow-x-clip">
```

This is the complete fix. No changes to animations, sticky card stacks, carousels, CSS variables, or any other component files.

### Technical Note

`overflow-x: clip` has full browser support in all modern browsers (Chrome 90+, Safari 16+, Firefox 81+). Tailwind CSS v3.3+ includes the `overflow-x-clip` utility class natively.

