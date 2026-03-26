

## Plan: Header Nav + Em Dash Removal + Light Mode Illustrations + Gap Audit

### 1. Header: Show Top Nav on Desktop, Investor Login Only on Mobile/Tablet

**File**: `src/components/SiteHeader.tsx`

- Desktop (`lg:` breakpoint): Keep current layout (nav links + theme toggle + Investor Login button). No change needed here.
- Mobile/Tablet (`< lg`): Remove the full nav items from the mobile overlay. Show only "Investor Login" button (and region switch). The hamburger menu icon remains but the overlay simplifies to just Investor Login + region switch.

Wait, re-reading: "Add top navigation across the website in desktop mode and investor login only in other modes." This means:
- Desktop: Show full nav (already done)
- Mobile/Tablet: Show only Investor Login button (no hamburger with full nav)

Changes:
- Replace the hamburger menu + full mobile overlay with just an "Investor Login" link button visible on mobile/tablet
- Remove the `mobileOpen` state, hamburger icon, and `AnimatePresence` mobile overlay
- Keep theme toggle on mobile

### 2. US Tagline Fix on Home Page

**File**: `src/pages/Home.tsx` (line 204)

Replace: `"Decades of institutional experience. One mission — partnering with founders who built America's essential industries."`

With: `"Decades of institutional experience dedicated to partnering with the founders who built America's essential industries."`

Also fix India tagline (line 203) which has em dash:
Replace: `"Global institutional expertise, applied locally — partnering with the founders shaping India's industrial future."`
With: `"Global institutional expertise applied locally, partnering with the founders shaping India's industrial future."`

### 3. Add "What Guides Us" Above Images in About Section

**File**: `src/pages/About.tsx` (lines 101-110)

The heading block already exists above `PrinciplesSlider` (added in previous edit). Confirmed present at lines 102-110. No change needed.

Also add "What Guides Us" heading to `src/pages/GuidingPrinciples.tsx` (line 70-71) before `PrinciplesSlider`:
```tsx
<div className="max-w-[1080px] mx-auto px-5 md:px-10 lg:px-16 pt-16 md:pt-20">
  <FadeIn>
    <SectionLabel>Our Values</SectionLabel>
    <h2 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] text-foreground leading-[1.15] mb-3">
      What Guides Us
    </h2>
    <GoldRule />
  </FadeIn>
</div>
```

### 4. Remove All Em Dashes from User-Facing Text

Comprehensive audit of em dashes (`—`) in rendered text across all files:

**`src/pages/Home.tsx`**:
- Line 64: `"preserve what works — continuity"` → `"preserve what works: continuity"`
- Line 71: same fix
- Lines 203-204: covered in step 2

**`src/pages/InvestmentCriteria.tsx`**:
- Line 115: `"Our Target Parameters — India"` → `"Our Target Parameters, India"`
- Line 176: `"growth vectors — every dimension"` → `"growth vectors. Every dimension"`
- Line 178: `"designed for decades — not exits"` → `"designed for decades, not exits"`

**`src/pages/About.tsx`**:
- Line 49: `"About — India"` → `"About, India"`

**`src/pages/GuidingPrinciples.tsx`**:
- Line 35: `"About Us — India"` → `"About Us, India"`

**`src/components/CinematicScrollReveal.tsx`**:
- Line 210: `"industries — built around"` → `"industries, built around"`

**`src/components/USCinematicScrollReveal.tsx`**: No user-facing em dashes found.

### 5. Light Mode Illustration Visibility (Criterion Slides)

**File**: `src/components/CriteriaIllustrations.tsx`

The `baseOpacity` for light mode is `0.1`, making illustrations nearly invisible on light backgrounds. Fix:
- Change `baseOpacity` from `isDark ? 0.12 : 0.1` to `isDark ? 0.15 : 0.25`
- This makes SVG elements 2.5x more visible in light mode

**File**: `src/components/StickyCardStack.tsx`

Same issue with `ThematicIllustration`:
- Line 65: Change `baseOpacity` from `isDark ? 0.12 : 0.1` to `isDark ? 0.15 : 0.25`

Also in `StickyCardStack.tsx`, the light mode slide backgrounds alternate between dark (`hsl(220 8% 18%)`) and light (`hsl(40 30% 96%)`). On the light backgrounds (indices 1, 2), text colors are dark, but the illustration gold SVGs at `0.1` opacity are invisible. The increased `baseOpacity` to `0.25` fixes this.

Additionally in `src/components/HorizontalStickyDeck.tsx` if it uses similar pattern, apply same fix.

### 6. Gap & Spacing Audit

Identified unnecessary gaps across pages:

**`src/pages/Home.tsx`**:
- Line 187: `pt-10 md:pt-14 lg:pt-16` on "Our Process" section is fine
- Between ScrollRevealText and LogoMarquee (lines 201-212): The ScrollRevealText already has internal padding. Remove any extra wrapper padding.

**`src/pages/InvestmentCriteria.tsx`**:
- Line 194: `-mt-10` on Value Creation Playbook is good
- The `pt-6 md:pt-8 lg:pt-10` on "What We Look For" section (line 131) could be tightened to `pt-4 md:pt-6 lg:pt-8`

**`src/pages/About.tsx`**:
- Line 102: `pt-16 md:pt-20` before principles heading could be `pt-12 md:pt-16`

**`src/pages/GuidingPrinciples.tsx`**:
- After ScrollRevealText and before PrinciplesSlider, add the heading with `pt-12 md:pt-16` instead of excessive gap

**`src/components/PrinciplesSlider.tsx`**:
- Line 149: `py-10 md:py-14` can be reduced to `pt-6 md:pt-8 pb-10 md:pb-14` since the heading section above already has bottom padding

### Files Modified Summary

1. `src/components/SiteHeader.tsx` - Simplify mobile to Investor Login only
2. `src/pages/Home.tsx` - Fix taglines, remove em dashes
3. `src/pages/About.tsx` - Remove em dash, tighten spacing
4. `src/pages/GuidingPrinciples.tsx` - Add "What Guides Us" heading, remove em dash
5. `src/pages/InvestmentCriteria.tsx` - Remove em dashes from text
6. `src/components/CinematicScrollReveal.tsx` - Remove em dash from card text
7. `src/components/CriteriaIllustrations.tsx` - Boost light mode opacity to 0.25
8. `src/components/StickyCardStack.tsx` - Boost light mode opacity to 0.25
9. `src/components/PrinciplesSlider.tsx` - Reduce top padding

