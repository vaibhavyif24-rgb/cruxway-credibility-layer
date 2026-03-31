

## CriteriaScrollZoom + Principles Enhancement — Implementation Plan

### Section 1: Create CriteriaScrollZoom for OurFocus.tsx
**File**: `src/pages/OurFocus.tsx`

- Delete `CriterionRow` component (lines 262-326)
- Replace "What We Look For" section (lines 143-160) with new sticky scroll-zoom section
- Add three new components above the default export:
  - `CriteriaScrollZoom` — container with tall scroll area (desktop) or stacked cards (mobile)
  - `DesktopCriterionItem` — absolute-positioned card with scroll-linked opacity/scale/y/numberScale/underlineWidth + progress bar + numberGlow textShadow
  - `MobileCriterionCard` — simple card with scroll-linked scale/opacity and `whileTap`
- Add `useIsMobile` import
- Desktop: `height: ${totalItems * 100}vh`, sticky viewport, items fade/zoom one at a time
- Progress bar with 6 segments, active one gets gold glow shadow
- Bottom counter with scroll-linked fill bar
- Gradient transitions (h-12) at top/bottom of scroll zone

### Section 2: Apply Same to InvestmentCriteria.tsx
**File**: `src/pages/InvestmentCriteria.tsx`

- Replace lines 254-281 (StickyCardStack usage) with same CriteriaScrollZoom pattern
- Copy the three components into this file (CriteriaScrollZoom, DesktopCriterionItem, MobileCriterionCard)
- Note: `whatWeLookFor` in this file lacks `num` field — need to generate it: `String(i+1).padStart(2,'0')`
- Remove `StickyCardStack` import if no longer used elsewhere in this file

### Section 3: Enhance PrinciplesGrid Scroll Effect
**File**: `src/components/PrinciplesGrid.tsx`

- Line 30: Change glowOpacity from `[0.3, 0.85, 1, 0.85, 0.3]` → `[0.15, 0.7, 1, 0.7, 0.15]` for more dramatic contrast
- Add desktop-only blur: `const itemBlur = useTransform(...)` with values `[2, 0.5, 0, 0.5, 2]`
- Apply blur via `filter: useTransform(itemBlur, v => \`blur(\${v}px)\`)` on the desktop `motion.div` style prop
- Skip blur transform entirely on mobile (already handled by early return)
- Line 92-97: Replace single glow div with double-ring (outer ring `border border-gold/20 inset-[-8px]` + inner glow `bg-gold/30 blur-md inset-[-5px]` with scale `[1, 1.3, 1]` at 2.5s)
- Line 51: Mobile number size `text-[2.5rem]` → `text-[2rem]`
- Line 159: Fix hardcoded gold `hsl(40,65%,44%,0.25)` → `hsl(43,78%,50%,0.25)`

### Section 4: btn-gold Hover Glow Enhancement
**File**: `src/index.css`

- Update `.btn-gold` (lines 309-330) to add `position: relative` and a `::before` pseudo-element for the glow halo effect
- Add `transition: all 0.4s` (was 0.3s)

### Section 5: Mobile Dot Indicator
- Add simple dot indicator below mobile cards in CriteriaScrollZoom
- Ensure `min-h-[140px]` wrapper on mobile cards to prevent layout shift

### Technical Details
**Files modified (4)**:
1. `src/pages/OurFocus.tsx` — new CriteriaScrollZoom replacing CriterionRow
2. `src/pages/InvestmentCriteria.tsx` — same CriteriaScrollZoom replacing StickyCardStack
3. `src/components/PrinciplesGrid.tsx` — dramatic glow contrast, blur, double-ring dot, mobile number size fix
4. `src/index.css` — btn-gold glow halo pseudo-element

