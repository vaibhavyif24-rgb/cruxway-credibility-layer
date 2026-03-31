

## Surgical Visual Polish — PrinciplesGrid, ScrollRevealText, OurFocus, Animations

### Section 1: Fix PrinciplesGrid Desktop Alignment (Critical Bug)
**File**: `src/components/PrinciplesGrid.tsx`

**Root cause**: Lines 107 and 118 use `inline-block` on both `<h3>` and `<p>`, causing them to flow horizontally instead of stacking vertically.

**Fix**: Replace the desktop return block (lines 72-124) with a `flex flex-col` wrapper that forces vertical stacking. The underline becomes a separate `<div>` below `<h3>` instead of an absolute `<span>` inside it. Add `ml-auto` for right-aligned underlines.

**Mobile fix** (lines 38-68): Reduce `pl-14` → `pl-12`, number `3rem` → `2.5rem`, add gold underline `w-8 h-[1.5px] bg-gold/40` below title, timeline dot position `1.5rem` → `1.25rem`.

### Section 2: Enhance Principles Scroll Effect
**File**: `src/components/PrinciplesGrid.tsx`

- Tighten scroll offset: `['start 0.85', 'center center', 'end 0.15']` → `['start 0.75', 'center 0.45', 'end 0.25']`
- Add `itemScale` transform: `[0, 0.45, 1] → [0.97, 1, 0.97]`
- Add `numberY` parallax: `[0, 1] → [-8, 8]`
- Dot glow: `inset-[-4px] bg-gold/25 blur-sm` → `inset-[-6px] bg-gold/35 blur-md`, scale `[1, 1.4, 1]`
- Add one-time slide-in: `initial={{ x: isLeft ? -30 : 30 }}` + `whileInView={{ x: 0 }}`
- Timeline line: `bg-gold/20` → `bg-gold/15`, shimmer uses `hsl(var(--gold) / 0.25)`, backgroundSize `300%`, duration `5s`

### Section 3: PrinciplesGrid Items Layout
Replace `space-y-8 md:space-y-12` with `space-y-0` and add faint gold separators (`h-px bg-gold/10`) between items with `py-4 md:py-6` spacing.

### Section 4: OurFocus CriterionRow Scroll Effect
**File**: `src/pages/OurFocus.tsx`

- Line 268: Tighten offset → `['start 0.75', 'center 0.45', 'end 0.25']`
- Add `itemScale` transform `[0, 0.45, 1] → [0.98, 1, 0.98]`
- Apply `scale: itemScale` to outer `motion.div` (line 278-279)

### Section 5: ScrollRevealText Enhancements
**File**: `src/components/ScrollRevealText.tsx`

- Line 54: Contrast-light bg → `bg-[hsl(40,22%,91%)]`
- Add animated gold border lines for `isContrastLight` variant (top + bottom `h-px` gradient lines with `scaleX` entrance)
- Line 98-99: Stats border `border-gold/35` / `border-gold/40`
- Line 168: Stat value → `text-[clamp(1.8rem,4vw,2.8rem)]` + `font-semibold` (already done — verify)
- Add gold underline below stat values: `<motion.div>` with `initial={{ width: 0 }}` → `whileInView={{ width: 24 }}`

### Section 6: Mobile Responsiveness
- **PrinciplesGrid**: `pl-14` → `pl-12`, timeline `left-[1.25rem]`
- **CTA buttons**: All `px-8` → `px-6 md:px-8` across Home, OurFocus, InvestmentCriteria, OurPlaybook, GuidingPrinciples, About
- **ScrollRevealText heading**: Add `break-words` class

### Section 7: Number Size Increase
Desktop principle numbers: `text-[3rem] md:text-[3.5rem]` → `text-[3.5rem] md:text-[4rem]`

### Technical Details
**Files modified (4)**:
1. `src/components/PrinciplesGrid.tsx` — alignment fix, scroll enhancements, animations, separators, mobile fixes
2. `src/components/ScrollRevealText.tsx` — contrast-light borders, stat underlines, break-words
3. `src/pages/OurFocus.tsx` — CriterionRow scroll tightening + scale
4. `src/pages/Home.tsx`, `src/pages/About.tsx`, `src/pages/OurPlaybook.tsx`, `src/pages/InvestmentCriteria.tsx`, `src/pages/GuidingPrinciples.tsx`, `src/pages/OurFocus.tsx` — CTA button responsive padding

All changes are visual: layout fixes, animations, opacities. No structural changes.

