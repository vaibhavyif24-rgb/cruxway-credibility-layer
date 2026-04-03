

## Plan: Unified Loader, Professional Origin Copy, Light Mode Visibility, and Card Animation Polish

### 1. Unified PageLoader for Both Themes (App.tsx)

**Problem:** Light and dark mode loaders have different particle opacities, shimmer intensities, and gold ring opacity values, creating an inconsistent brand experience.

**Fix:** Remove all `isDark` ternary branching from the loader. Use a single unified design that works on both backgrounds:
- Wordmark fill: `hsl(43 78% 50% / 0.20)` (gold tint, visible on both)
- Shimmer sweep: `hsl(43 78% 50% / 0.4)` (same for both)
- Pulsing ring border: `hsl(43 78% 50% / 0.07)`
- Rotating arc stroke: `hsl(43 78% 50% / 0.10)`
- Vertical particles opacity: `0.25`
- Horizontal particles opacity: `0.18`
- Background: keep theme-aware (`isDark` for bg color only, since that must differ)
- Radial glow: `hsl(43 78% 50% / 0.06)` unified

This ensures the animation layer is identical; only the canvas color changes.

### 2. Professional Act 3 Statement (CruxwayOriginStory.tsx, line 483)

**Current (too casual):** "Getting from A to B matters. To do that, one must transform under pressure and sustained discipline. But the journey itself matters too. It must be aligned with the natural order of things."

**Replace with:** "Outcome without process is reckless. Process without conviction is hollow. We believe enduring value is forged when both align."

This is sharper, more intentional, and reads like a considered investment philosophy rather than a general statement.

### 3. Light Mode Visibility Audit (Multiple Files)

Scan for low-contrast text patterns in light mode and increase visibility:

**Contact.tsx:**
- `text-muted-foreground/55` (label "Email", "Location"): increase to `text-muted-foreground/70`
- `text-muted-foreground/30` (arrow icons): increase to `text-muted-foreground/45`
- Disclaimer text `text-muted-foreground/45`: increase to `text-muted-foreground/55`

**Home.tsx:**
- `text-foreground/20` (inactive step numbers/titles): increase to `text-foreground/30`
- `text-foreground/25` (page indicator "01 / 04"): increase to `text-foreground/35`
- `text-primary-foreground/50` (CTA description in dark): increase to `/55`

**About.tsx:**
- `text-primary-foreground/50` (CTA sub-text): increase to `/55`

**OurFocus.tsx:**
- `text-primary-foreground/50` sector descriptions: increase to `/55`

**GuidingPrinciples.tsx:**
- `text-primary-foreground/50` CTA description: increase to `/55`

### 4. Card Animation and GlassCard Usage Audit

**GlassCard is already used in:** Home.tsx (process carousel panel). But several pages use plain `div` or `border` cards without GlassCard's frosted glass, gold corners, and hover effects.

**Contact.tsx (lines 61-110):** The email and location cards use plain `GlassCard` already. Verify the hover lift (`whileHover={{ y: -4 }}`) is applied to the outer wrapper. Currently it wraps the GlassCard in a `motion.div` with hover. Good.

**InvestmentCriteria.tsx:** The `EvalStep` cards and the `TypographicNumber`/`TypographicText` blocks are plain styled divs. Wrap the evaluation step cards in `GlassCard` for consistent premium card treatment with gold corners and hover glow.

**OurPlaybook.tsx:** The `StepNavigator` description panel and `ValueCreationChart` bar descriptions use plain bordered divs. Wrap the active description panel in `GlassCard`.

**About.tsx:** The `ApproachTable` items use plain styling. Wrap each approach item in `GlassCard` with staggered index.

**Home.tsx process panel:** The active content panel (line 168) uses a plain div with manual border/bg. Replace with `GlassCard` for consistency.

### Technical Summary

| File | Changes |
|------|---------|
| `App.tsx` | Unify all loader particle/ring/shimmer values to be theme-agnostic (only bg color differs) |
| `CruxwayOriginStory.tsx` | Replace Act 3 explanation text (line 483) with professional philosophy statement |
| `Contact.tsx` | Increase muted text opacity values for light mode visibility |
| `Home.tsx` | Increase inactive step text opacity; wrap process panel in GlassCard |
| `About.tsx` | Increase CTA text opacity |
| `OurFocus.tsx` | Increase sector description opacity |
| `GuidingPrinciples.tsx` | Increase CTA description opacity |
| `InvestmentCriteria.tsx` | Wrap EvalStep cards in GlassCard |
| `OurPlaybook.tsx` | Wrap step description panel in GlassCard |

### Constraints
- American English only
- Both themes must look professional
- GlassCard import added where needed
- No changes to ThemeContext, RegionContext, SiteHeader, SiteFooter, or Landing

