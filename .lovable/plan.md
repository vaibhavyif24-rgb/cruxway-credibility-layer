

## Surgical Visual Polish — Implementation Plan

### Section 1: TeamStickyDeck Fixes
**File**: `src/components/TeamStickyDeck.tsx`

- **Line 185**: Remove `text-shimmer-gold` from h3 className
- **Line 120**: Gold accent line gradient `from-gold/30 via-gold/15` → `from-gold/50 via-gold/25`
- **Line 140**: Photo border `0.15`/`0.12` → `0.25`/`0.2` (theme-aware)
- **Line 176**: Counter color `0.4` → theme-aware `0.6`/`0.65`
- **Line 197**: Name underline gradient `0.3` → theme-aware `0.4`/`0.45`
- **Line 227-228**: "Select Investments" label: font `7px/8px` → `8px/9px`, color opacity `0.45` → theme-aware `0.7`/`0.8`
- **Line 237-241**: Summary `<p>` → `<motion.p>` with staggered fade-in (delay 0.2)
- **Line 246-257**: Highlights `<li>` → `<motion.li>` with staggered slide-in (delay 0.3 + i*0.08)
- **Line 254**: Bullet line `0.3` → theme-aware `0.45`/`0.5`

### Section 2: ScrollRevealText Enhancements
**File**: `src/components/ScrollRevealText.tsx`

- **Lines 54**: Contrast-light bg `hsl(40,22%,92%)` → `hsl(40,25%,90%)`
- **Lines 63-77**: Replace separate label `<motion.p>` + underline `<motion.div>` with a single `<motion.div>` containing flanking gold lines + label text
- **Line 101-102**: Stats border `border-gold/20`/`border-gold/25` → `border-gold/35`/`border-gold/40`
- **Line 130-133**: Word glow → double-layer `'0 0 20px hsl(43,78%,50%,0.35), 0 0 40px hsl(43,78%,50%,0.15)'`, fontWeight 600
- **Line 135-139**: Add `font-medium` class to highlighted words (already present, keep)
- **Line 161**: Stat value → `text-[clamp(1.8rem,4vw,2.8rem)]` + `font-semibold`
- **Line 164**: Stat label → `font-bold`, opacity `40→50` dark / `50→60` light
- **Line 159-167**: StatReveal `<motion.div>` → add `initial={{ y: 15, scale: 0.95 }}` + `whileInView` + stagger
- **Line 161**: Stat value `<p>` → `<motion.p>` with hover scale effect

### Section 3: Hero Gold Text Shadow
**File**: `src/pages/Home.tsx`
- **Lines 119-120**: Gold `<span>` textShadow `0.3` → `0.4` (stronger glow)

### Section 4: GlassCard Corner Accent Brightness
**File**: `src/components/GlassCard.tsx`
- **Lines 55-58**: Corner spans `bg-gold/45`/`bg-gold/40` → `bg-gold/60`/`bg-gold/55`

### Section 5: PrinciplesGrid Dot Pulse
**File**: `src/components/PrinciplesGrid.tsx`
- **Line 88-91**: Dot glow `<motion.div>` → add `animate={{ scale: [1, 1.3, 1] }}` with `transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}`; bump `bg-gold/20` → `bg-gold/25`

### Section 6: Sectors Gold Text Shadows (Light Mode)
**Files**: `src/components/CinematicScrollReveal.tsx`, `src/components/USCinematicScrollReveal.tsx`

For gold text on light overlay, change `textShadow: isDark ? '...' : 'none'` → `textShadow: isDark ? '...' : '0 1px 6px hsl(43,78%,50%,0.2)'` at:
- Line 114 (word opacity text)
- Line 190 ("Sectors We Look At" label)
- Line 285 (desktop "Sectors We Look At")
- Line 266 ("lower middle market" span)

Also update the sector heading textShadow light-mode path (line 40) from `'0 1px 4px rgba(0,0,0,0.06)'` → `'0 1px 4px rgba(0,0,0,0.06)'` (already fine, keep)

### Section 7: CriteriaCarousel Hover
**File**: `src/components/CriteriaCarousel.tsx`
- **Lines 68-88**: Wrap each carousel card `<div>` in a `<motion.div>` with `whileHover={{ y: -4, boxShadow: '0 12px 40px -8px hsl(43,78%,50%,0.1)' }}`

### Section 8: CTA Buttons — Already Done
All "Get in Touch" buttons already use `btn-premium btn-gold btn-premium-glow`. No changes needed.

### Technical Details
**Files modified (8)**:
1. `src/components/TeamStickyDeck.tsx` — shimmer removal, opacity fixes, staggered animations
2. `src/components/ScrollRevealText.tsx` — flanking lines, stat enhancements, glow
3. `src/pages/Home.tsx` — hero text shadow strength
4. `src/components/GlassCard.tsx` — corner accent brightness
5. `src/components/PrinciplesGrid.tsx` — dot pulse animation
6. `src/components/CinematicScrollReveal.tsx` — light-mode gold text shadows
7. `src/components/USCinematicScrollReveal.tsx` — same as above
8. `src/components/CriteriaCarousel.tsx` — hover lift effect

All changes are visual: color opacities, animations, text shadows. No structural changes.

