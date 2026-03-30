

## Finalization Pass — Implementation Plan

### Section 1: Investor Login Theme-Aware Redesign
**File**: `src/pages/InvestorLogin.tsx` — Full rewrite

- Add `useTheme` hook, derive `isDark`
- Background: `bg-background` in light, `bg-primary` in dark
- Conditionally render `DarkSectionEffects` or `LightSectionEffects` + `WaveBackground`
- Glass-morphism form card: `bg-white/70 backdrop-blur-sm` (light) / `bg-[hsl(228,42%,11%)]/60` (dark)
- Animated gold corner accents on load (framer-motion `scaleX`/`scaleY` from 0→1)
- `focused` state: labels turn gold, animated gold underline on active input
- Lock icon with subtle rotation animation
- Loading spinner (`.spinner-gold` class) on submit
- "Back" link with `ArrowLeft` icon in top-left
- Staggered entrance animations on brand, card, and help text
- `GoldRule` divider under brand

### Section 2: Footer Link Underline Fix
**File**: `src/components/SiteFooter.tsx` (line 65)

- Change `hover:w-full` → `group-hover:w-full` on the underline `<span>`
- The parent `<Link>` needs `group` class added (currently not present — the `group` is on the `motion.div` wrapper, but underline span is inside the `<Link>`)

### Section 3: Smooth Page Transitions
**File**: `src/App.tsx`

- Add `PageLoader` component: centered pulsing "Cruxway" in gold as `Suspense` fallback
- Add `AnimatePresence` + `motion.div` wrapper around routes for 200ms opacity fade
- Extract `AppRoutes` component that uses `useLocation` for keyed transitions
- Move `BrowserRouter` to wrap everything, extract inner component for hooks

### Section 4: Micro-Animations
**A. Hero scroll indicator** — Already exists in `Home.tsx` (lines 153-166). No change needed.

**B. Spinner keyframe** — `src/index.css`: Add `@keyframes spin-smooth` and `.spinner-gold` class

**C. GlassCard inner glow** — `src/components/GlassCard.tsx`: Add a second hover glow layer with gold radial gradient, slightly stronger than existing

**D. Team name gold underline** — `src/components/TeamStickyDeck.tsx` (after line 188): Add `motion.div` with `scaleX: 0→1` gold underline below name

**E. Active dot ring** — `src/components/StickyCardStack.tsx` (line 520-528): Add `motion.span` with pulsing ring around active dot

### Section 5: Small Visual Fixes

**A. Contact card hover** — `src/pages/Contact.tsx`: Already using `GlassCard` which has hover lift built in. Verified — no change needed.

**B. Section spacing** — `src/components/ui/Section.tsx` line 44: Change `lg:py-16` → `lg:py-14`. `SectorShowcase.tsx` line 120: Change `py-14 md:py-16 lg:py-16` → `py-14 md:py-14 lg:py-14`. Internal card padding in `StickyCardStack.tsx` and `HorizontalStickyDeck.tsx` (`lg:py-16`) is card-internal padding, not section padding — leave as-is.

**C. NotFound page** — `src/pages/NotFound.tsx`: Full rewrite with theme awareness, ambient effects, large gold "404", motion entrance, and "Return Home" link.

### Section 6: Verification Checklist
- `contentVisibility` — already confirmed: zero matches ✓
- Footer underlines — fixed in Section 2
- `SectionLabel` — already uses `useTheme()` (confirmed in summary)
- `--muted-foreground` dark mode — confirmed `228 10% 65%` at line 93 ✓

### Technical Details

**Files modified (7)**:
1. `src/pages/InvestorLogin.tsx` — full rewrite
2. `src/components/SiteFooter.tsx` — one-line fix (line 65)
3. `src/App.tsx` — add PageLoader, AnimatePresence wrapper
4. `src/index.css` — add spinner-gold class
5. `src/components/GlassCard.tsx` — add inner glow layer
6. `src/components/TeamStickyDeck.tsx` — add name underline
7. `src/components/StickyCardStack.tsx` — add active dot ring
8. `src/pages/NotFound.tsx` — full rewrite
9. `src/components/ui/Section.tsx` — spacing fix
10. `src/components/SectorShowcase.tsx` — spacing fix

