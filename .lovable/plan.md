

## Plan: Gap Reduction, Principles Stacking Deck, Effects Enhancement, and Performance

### Summary
Four workstreams: tighten excess vertical spacing site-wide, rebuild the Principles slider as a smooth stacking deck (matching Team page pattern), fix console errors, and add subtle polish effects while improving runtime performance.

---

### 1. Reduce Excess Vertical Gaps Across All Pages

Targeted padding/margin reductions that preserve content hierarchy but remove excess whitespace:

| Location | Current | Proposed |
|---|---|---|
| **ScrollRevealText** container | `py-20 md:py-28 lg:py-36` | `py-14 md:py-20 lg:py-24` |
| **ScrollRevealText** label mb | `mb-8 md:mb-10` | `mb-5 md:mb-7` |
| **ScrollRevealText** subtext mt | `mt-10 md:mt-14` | `mt-7 md:mt-10` |
| **ScrollRevealText** stats mt/pt | `mt-12 md:mt-16 pt-10 md:pt-12` | `mt-8 md:mt-12 pt-8 md:pt-10` |
| **Home** "Our Process" section | `pt-10 md:pt-14 lg:pt-16 pb-4` | `pt-8 md:pt-10 lg:pt-12 pb-2` |
| **Home** CTA section | `py-10 md:py-14 lg:py-16` | `py-8 md:py-12 lg:py-14` |
| **OurFocus** criteria section | `py-16 md:py-24 lg:py-28` | `py-12 md:py-16 lg:py-20` |
| **OurFocus** criteria GoldRule mb | `mb-10 md:mb-14` | `mb-8 md:mb-10` |
| **OurPlaybook** value creation | `pt-14 md:pt-20 lg:pt-24 pb-14 md:pb-20 lg:pb-24` | `pt-10 md:pt-14 lg:pt-18 pb-10 md:pb-14 lg:pb-18` |
| **Team** institutional exp | `pt-10 md:pt-14 pb-10 md:pb-14` | `pt-8 md:pt-10 pb-8 md:pb-10` |
| **Contact** cards section | `py-10 md:py-14 lg:py-16` | `py-8 md:py-12 lg:py-14` |
| **GuidingPrinciples** section header | `pt-12 md:pt-16` | `pt-8 md:pt-12` |
| All CTA sections (all pages) | `py-10 md:py-14 lg:py-16` | `py-8 md:py-12 lg:py-14` |

Files: `ScrollRevealText.tsx`, `Home.tsx`, `OurFocus.tsx`, `OurPlaybook.tsx`, `Team.tsx`, `Contact.tsx`, `GuidingPrinciples.tsx`

---

### 2. Rebuild Principles Slider as Stacking Deck

Replace the current `PrinciplesSlider` with a stacking deck that mirrors the `TeamStickyDeck` pattern:

- **Same sticky mechanics**: `position: sticky` with incremental `top` offsets (base 80px, step 16px)
- **Same box shadow**: lifted card shadow matching team cards
- **Smooth content transitions**: CSS transitions on opacity/transform driven by IntersectionObserver (same as current, but tuned for snappier response with `rootMargin: '-15% 0px -25% 0px'`)
- **Preserve celestial backgrounds**: Keep the deep navy gradient, celestial SVG illustrations, nebula pulse, rotating glow, floating particles, and shimmer sweep
- **Card height**: Reduce from `min(85vh, 600px)` to `min(75vh, 520px)` for tighter stacking
- **Card margin-bottom**: Reduce from `mb-6` to `mb-3` for smoother overlap
- **Scroll clearance**: Add `h-[100px] md:h-[60px]` after last card (matching team deck)
- **Rounded corners**: Keep `rounded-2xl md:rounded-3xl`

File: `PrinciplesSlider.tsx`

---

### 3. Fix Console Errors

Two warnings found:

**A. `ThematicIllustration` cannot be given refs**
- In `StickyCardStack.tsx`, `SlideCard` is passing a ref to `ThematicIllustration` which is a plain function component
- Fix: The warning is about React internals trying to assign ref; no actual ref is being passed in code. The warning comes from the component being rendered inside an array without `forwardRef`. Non-blocking but clean it up by wrapping `ThematicIllustration` with `React.forwardRef`.

**B. `ScrollRevealText` cannot be given refs**
- Same issue: `ScrollRevealText` is used as a direct child and React tries to assign a ref
- Fix: Wrap `ScrollRevealText` component with `React.forwardRef`

Files: `StickyCardStack.tsx`, `ScrollRevealText.tsx`

---

### 4. Add Subtle Effects and Improve Performance

**New effects (lightweight, CSS-only where possible):**
- **Section divider shimmer**: Add a thin gold gradient shimmer line between major sections (reuse existing `shimmer-effect` class) in `GuidingPrinciples.tsx`, `Home.tsx`, `OurFocus.tsx`
- **Card hover lift on CriterionCards**: Already exists; add subtle gold glow pulse on active/hovered principle cards
- **Footer subtle gradient**: Add a faint radial gold glow behind the Cruxway wordmark in the footer

**Performance improvements:**
- Add `will-change: auto` cleanup — several components set `will-change-transform` permanently; add `will-change: auto` when elements leave viewport via IntersectionObserver in `PrinciplesSlider`
- Wrap `CelestialIllustration` in `React.memo` to prevent re-renders on parent state changes
- Add `content-visibility: auto` to off-screen sections (`ScrollRevealText`, criteria grid) for rendering performance
- Use `contain: layout style paint` on sticky card containers for compositor optimization

Files: `PrinciplesSlider.tsx`, `CelestialIllustrations.tsx`, `StickyCardStack.tsx`, `index.css`, `SiteFooter.tsx`, `Home.tsx`

---

### Technical Details

- All gap changes are pure Tailwind class adjustments — no structural changes
- The principles deck rebuild reuses the exact same sticky CSS pattern proven in `TeamStickyDeck` (sticky positioning with incremental top offsets)
- `React.forwardRef` wrapping for error fixes is non-breaking
- `content-visibility: auto` is a progressive enhancement (ignored by unsupported browsers)
- `React.memo` on `CelestialIllustration` prevents unnecessary SVG re-renders during scroll

