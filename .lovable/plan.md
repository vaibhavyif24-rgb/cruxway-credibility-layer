

## Surgical Visual Polish — Process Carousel, CTA Redesign, Footer, Mobile Sizing

### Section 1: Replace StickyCardStack with ProcessCarousel on Home
**File**: `src/pages/Home.tsx`

- Add `useState`, `useEffect` imports from React; `AnimatePresence` to framer-motion import; `useIsMobile` hook import
- Remove `StickyCardStack` import (only used here)
- Create `ProcessCarousel` component above `Home`:
  - State: `active` (index), `autoplay` (bool, default true)
  - Auto-advance every 5s when `autoplay` is true, cycling through steps
  - Clicking a step sets `active` and disables `autoplay`
  - Top row: all 4 step headings in a horizontal flex, each clickable with gold progress line on active step
  - Progress line animates width over 5s when autoplay, static full-width when manual
  - Bottom panel: `AnimatePresence` animated content showing large step number, title, gold underline, description
  - Navigation arrows (Previous/Next) with counter "01 / 04"
- Replace lines 205-217 (the StickyCardStack section) with the new carousel section using `DarkSectionEffects`/`LightSectionEffects`, `SectionLabel`, heading, `GoldRule`, and `<ProcessCarousel>`

### Section 2: CTA Redesign on Home
**File**: `src/pages/Home.tsx`

Replace lines 232-261 (CTA section) with a horizontal layout:
- `flex flex-col md:flex-row md:items-center md:justify-between gap-8`
- Left side: Connect label, larger heading `clamp(1.6rem,3.5vw,2.6rem)`, description at `text-[13px] md:text-[15px]`
- Right side: Large CTA button with `border-2 border-gold text-gold px-10 py-5 md:px-12 md:py-6`, `hover:bg-gold hover:text-white`, arrow icon (`ArrowRight` from lucide) that shifts right on hover
- Add shimmer sweep overlay inside button
- Increased section padding: `py-12 md:py-16 lg:py-20`
- Import `ArrowRight` from lucide-react

### Section 3: Mobile ScrollRevealText Sizing
**File**: `src/components/ScrollRevealText.tsx`

- Line 94: heading clamp `1.6rem,4.5vw,3.2rem` → `1.9rem,5.5vw,3.2rem`
- Line 80: container padding `py-8 md:py-10` → `py-10 md:py-12`
- Line 186: stat value clamp `1.8rem,4vw,2.8rem` → `2rem,5vw,2.8rem`
- Line 107: subtext `text-[13px]` → `text-[14px]`
- Line 87: label `text-[11px] md:text-[12px]` → `text-[12px] md:text-[13px]`

### Section 4: Footer Text Darkness
**File**: `src/components/SiteFooter.tsx`

- Line 58-62: Links `text-muted-foreground/50` → `text-foreground/45`, hover `hover:text-foreground/70`; dark `text-primary-foreground/15` → `/25`, hover `/35` → `/50`
- Line 65: Underline `bg-gold/30` → `bg-gold/40`
- Line 77: Copyright `text-muted-foreground/35` → `text-foreground/35`; dark `/10` → `/15`
- Line 84-87: Switch link same as footer links
- Line 93: Confidential `text-muted-foreground/20` → `text-foreground/25`; dark `/[0.06]` → `/[0.08]`
- Line 26: Footer bg `bg-card` → `bg-[hsl(40,15%,94%)]` in light mode

### Section 5: Stat Counter Animation
**File**: `src/components/ScrollRevealText.tsx`

In `StatReveal`, add counting animation:
- Import `useRef` (already imported), add `useState`, `useEffect` from React, `useInView` from framer-motion
- Track `statRef` with `useInView`, animate number from 0 to target over 30 frames
- Display `displayVal` instead of `stat.value`

### Section 6: CTA Shimmer + Index.css
**File**: `src/index.css`

Add `@keyframes shimmer-sweep-continuous` and `.animate-shimmer-sweep` class for continuous shimmer on CTA button.

### Section 7: CTA Layout Upgrade on Other Pages
**Files**: `OurFocus.tsx`, `InvestmentCriteria.tsx`, `OurPlaybook.tsx`, `GuidingPrinciples.tsx`, `About.tsx`

Apply same horizontal CTA pattern: `flex flex-col md:flex-row md:items-center md:justify-between gap-8`, with larger button (`border-2 px-10 py-5 md:px-12 md:py-6 hover:bg-gold hover:text-white`) including arrow icon. Import `ArrowRight` in each file.

### Technical Details
**Files modified (8)**:
1. `src/pages/Home.tsx` — ProcessCarousel component, CTA redesign, import changes
2. `src/components/ScrollRevealText.tsx` — mobile sizing, stat counter animation
3. `src/components/SiteFooter.tsx` — text opacity fixes, background color
4. `src/index.css` — shimmer-sweep-continuous keyframe
5. `src/pages/OurFocus.tsx` — horizontal CTA layout
6. `src/pages/InvestmentCriteria.tsx` — horizontal CTA layout
7. `src/pages/OurPlaybook.tsx` — horizontal CTA layout
8. `src/pages/GuidingPrinciples.tsx` — horizontal CTA layout
9. `src/pages/About.tsx` — horizontal CTA layout

