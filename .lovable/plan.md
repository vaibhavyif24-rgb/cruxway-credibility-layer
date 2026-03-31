

## Implementation Plan: Scroll-Zoom Fix, Nav Active State, Refinements & Animations

### Section 1: Fix overflow-hidden Breaking Sticky (30 seconds)
**Files**: `src/pages/InvestmentCriteria.tsx` (line 413), `src/pages/OurFocus.tsx` (line 145)

- Change `overflow-hidden` → `overflow-x-clip` on both scroll-zoom section wrappers

### Section 2: Navigation Active State — Gold Indicator (3 minutes)
**File**: `src/components/SiteHeader.tsx`

**Desktop nav (lines 126-149)**:
- Active link: `text-gold font-semibold` (both modes), remove `bg-foreground/[0.03]`
- Inactive links: `text-foreground/40` light / `text-primary-foreground/40` dark
- Underline: `h-[2px] bg-gold rounded-full` at `-bottom-1` (was `h-px bg-[hsl(228,45%,45%)]/30`)
- Add `useTransform` import (already have `useScroll`)

**Mobile nav (lines 296-305)**:
- Active: `text-gold font-medium` (both modes)
- Inactive: `text-foreground/25` light / `text-primary-foreground/25` dark

**Investor Login button (lines 228-237)**:
- Light: `border-gold/30 text-gold hover:border-gold/50`
- Dark: `border-gold/20 text-gold/80 hover:border-gold/40 hover:text-gold`

### Section 3: Scroll-Zoom Transition Refinement (5 minutes)
**Files**: `src/pages/OurFocus.tsx`, `src/pages/InvestmentCriteria.tsx`

In both `DesktopCriterionItem` / `ICDesktopCriterionItem`:
- Widen opacity transition window: `0.03` → `0.06`, intermediate `0.4` → `0.6`
- First item (`index === 0`): starts at 0.8 opacity so section isn't blank on entry

### Section 4: Header Scroll Fade + Progress Pulse (5 minutes)
**File**: `src/components/SiteHeader.tsx`

- Add `scrollY` from `useScroll()` (currently only `scrollYProgress`)
- Add `headerBgOpacity = useTransform(scrollY, [0, 60], [0, 0.95])`
- Light mode: change `bg-white/90` to transparent base + `motion.div` overlay with opacity linked to scroll
- Progress bar: wrap in container, add initial gold pulse `motion.div` that fades out after 1.5s

### Section 5: Footer Wordmark Hover (1 minute)
**File**: `src/components/SiteFooter.tsx`

- Line 43: Change `<p>` to `<motion.p>` with `whileHover={{ scale: 1.03 }}` on the "Cruxway" wordmark

### Section 6: Card Hover Glow Utility (1 minute)
**File**: `src/index.css`

- Add `.card-hover-glow` class with `box-shadow` and `translateY(-2px)` on hover

### Technical Details
**Files modified (5)**:
1. `src/pages/OurFocus.tsx` — overflow-x-clip, smoother opacity transitions, first-item visibility
2. `src/pages/InvestmentCriteria.tsx` — same overflow + opacity fixes
3. `src/components/SiteHeader.tsx` — gold active nav, scroll fade, progress pulse, investor login styling
4. `src/components/SiteFooter.tsx` — wordmark hover
5. `src/index.css` — card-hover-glow utility

