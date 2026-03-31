

## Comprehensive Visual Polish — Mobile ScrollReveal, Footer, Home Page Variety

### Section 1: Footer Text Readability
**File**: `src/components/SiteFooter.tsx`

- Line 26: Footer bg `bg-[hsl(40,15%,94%)]` → `bg-[hsl(40,12%,91%)]`
- Lines 59-61: Links dark `text-primary-foreground/25` → `/30`, hover `/50` → `/60`; light `text-foreground/45` → `/55`, hover `/70` → `/80`
- Line 73: Divider `bg-border/30` → `bg-foreground/15`
- Line 77: Copyright dark `/15` → `/20`; light `/35` → `/45`
- Lines 84-87: Switch link same as footer links (dark `/30 hover:/60`, light `/55 hover:/80`)
- Line 92: Divider span `bg-border/30` → `bg-foreground/15`
- Line 93: Confidential dark `/[0.08]` → `/10`; light `/25` → `/35`

### Section 2: Mobile ScrollRevealText Redesign
**File**: `src/components/ScrollRevealText.tsx`

**Core change**: On mobile, replace scroll-linked word-by-word opacity with a viewport-triggered staggered entrance where all words are immediately readable.

- Add `useIsMobile` import and call inside component
- **Heading**: Branch on `isMobile`:
  - Mobile: new `MobileHeading` component — words start `opacity: 0, y: 8`, stagger in at 40ms each on viewport entry, full opacity immediately
  - Desktop: keep existing scroll-linked `Word` component
- **Label**: Mobile uses `FadeIn`-style entrance (no scroll-linked opacity)
- **Subtext**: Mobile uses `whileInView` entrance (no scroll-linked opacity)
- **Stats**: Change `grid-cols-1 md:grid-cols-3` → `grid-cols-3` so stats show in a row on mobile; reduce mobile gap/padding; pass `isMobile` to `StatReveal`
- **StatReveal**: On mobile, remove `style={{ opacity }}` (scroll-linked), use `whileInView` entrance instead; smaller text `text-[1.5rem]` on mobile; tighter spacing

**New component** `MobileHeading` below `ScrollRevealText`:
- Uses `useInView` on a container ref
- Maps words with 40ms stagger delay, `opacity: 0 → 1`, `y: 8 → 0`
- Highlighted words get `text-gold` + textShadow immediately

### Section 3: Desktop Scroll Speed
**File**: `src/components/ScrollRevealText.tsx`

- Line 29-32: Scroll offset → `isMobile ? ['start end', 'end start'] : ['start 0.85', 'end 0.45']`
- Line 142: Word starting opacity `0.15` → `0.25`

### Section 4: Home Page Visual Variety
**File**: `src/pages/Home.tsx`

**A. Transition dots** between "What We Do" and "The Opportunity" (after line 329):
- Three animated gold dots with staggered `delay` and infinite pulse

**B. Social Proof**: Replace `ScrollRevealText` (lines 364-371) with a simple `FadeIn` section using `<span className="text-gold">` for highlights instead of scroll-linked reveal

**C. ProcessCarousel mobile**: Add `overflow-x-auto scrollbar-hide` on mobile for step headers, each step `flex-shrink-0 w-[130px]` on mobile

**D. Keyboard navigation** for ProcessCarousel: ArrowLeft/ArrowRight handler

### Section 5: CSS Additions
**File**: `src/index.css`

Add after existing animations:
- `scrollbar-hide` utility classes
- `diamond-breathe` keyframe
- `gold-line-sweep` keyframe + `.section-gold-sweep` class

### Section 6: GoldRule Breathing Animation
**File**: `src/components/ui/Section.tsx`

- Line 90-97: Add `animate={{ scale: [1, 1.15, 1] }}` with `duration: 3, repeat: Infinity` to the diamond element

### Section 7: SectionShimmer Component
**File**: `src/components/ui/Section.tsx`

Add a new `SectionShimmer` export: a `motion.div` that animates `scaleX: 0 → 1` on viewport entry with gold gradient background

### Technical Details

**Files modified (4)**:
1. `src/components/ScrollRevealText.tsx` — mobile animation redesign, desktop speed, stat layout
2. `src/components/SiteFooter.tsx` — all opacity values increased, darker bg
3. `src/pages/Home.tsx` — transition dots, social proof simplification, carousel mobile/keyboard
4. `src/index.css` — scrollbar-hide, diamond-breathe, gold-line-sweep
5. `src/components/ui/Section.tsx` — GoldRule breathing, SectionShimmer component

