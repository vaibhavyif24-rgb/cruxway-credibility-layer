

## Cruxway v15: Finalization Pass

6 sections, ~10 files modified. Sectors light-mode fix, evaluation timeline, scroll-linked criteria, dark mode polish, micro-animations, visual refinements.

---

### Section 1: Sectors Light-Mode Background

**Files: `CinematicScrollReveal.tsx`, `USCinematicScrollReveal.tsx`**

Both files get identical changes:

- Add `LIGHT_OVERLAY` constant alongside existing `DARK_OVERLAY` (rename current `OVERLAY_GRADIENT` → use conditionally)
- Desktop overlay div: `background: isDark ? DARK_OVERLAY : LIGHT_OVERLAY`
- `textIsLight` changes to: `const textIsLight = isDark && imageProgress > 0.3`
- Theme-aware text shadow: `textIsLight ? dark shadow : imageProgress > 0.3 ? light white shadow : none`
- `SectorColumn` gets `isDark` prop. Colors become conditional:
  - Heading: `isDark ? '#F8F6F2' : 'hsl(var(--foreground))'`
  - Item name: `isDark ? '#F8F6F2' : 'hsl(var(--foreground))'`
  - Item desc: `isDark ? 'rgba(248,246,242,0.65)' : 'hsl(var(--muted-foreground))'`
  - Text shadows: only in dark mode
- "Sectors We Look At" label: gold in both modes (already correct)
- Center divider: `isDark ? 'hsl(38,55%,62%,0.2)' : 'hsl(38,48%,52%,0.15)'`
- Mobile sector list overlay: `isDark ? dark gradient : light warm gradient`
- Mobile word reveal text: `isDark ? '#F8F6F2' : 'hsl(var(--foreground))'`, shadows only in dark
- Pass `isDark` to all `SectorColumn` calls

---

### Section 2: Evaluation Framework — Horizontal Timeline

**File: `InvestmentCriteria.tsx`**

Replace the Evaluation Framework `StickyCardStack` (lines 220-242) with a horizontal 4-column timeline:
- Remove `StickyCardStack` import (check if still used for "What We Look For" — yes it is, keep import)
- New `EvalStep` component with per-item scroll tracking:
  - `useScroll` + `useTransform` for glowOpacity, dotScale, dotGlow
  - Timeline dot with gold glow halo
  - Step number, title, gold underline, description
- Container has a horizontal connecting line (`absolute top-[14px] h-px bg-gold/10`)
- 4-column grid on desktop, 2-col on tablet, 1-col mobile
- Add `useScroll, useTransform` to imports, add `useRef` (already imported)

---

### Section 3: OurFocus Criteria — Scroll-Linked Glow

**File: `OurFocus.tsx`**

Replace `CriterionRow` with scroll-linked version:
- Add `useScroll, useTransform` to framer-motion imports
- New `CriterionRow` uses `useScroll({ target: ref, offset: [...] })`
- `glowOpacity`, `numberIntensity`, `underlineWidth`, `dividerOpacity` all scroll-linked
- Replace `useInView`-based entrance with continuous scroll-linked opacity
- Title gets scroll-linked underline (gold, `width` mapped to scroll)
- Divider opacity linked to scroll position

---

### Section 4: Dark Mode Text Verification

**File: `Team.tsx`** — Line 435: "Our Network" heading
- Change `text-foreground` → `${isDark ? 'text-primary-foreground' : 'text-foreground'}`

**File: `OurFocus.tsx`** — Line 142: "What We Look For" heading
- Change `text-foreground` → `${isDark ? 'text-primary-foreground' : 'text-foreground'}`

**File: `InvestmentCriteria.tsx`** — Line 193: "What We Look For" heading
- Change `text-foreground` → `${isDark ? 'text-primary-foreground' : 'text-foreground'}`

Section.tsx SectionLabel auto-detection — already done (line 54: `shouldUseGold`). No changes needed.

Dark mode `--muted-foreground` — already at `228 10% 65%`. No changes needed.

---

### Section 5: Micro-Animations & Polish

**A. Investment Profile number glow** — `OurFocus.tsx` and `InvestmentCriteria.tsx`
- TypographicNumber: add `animate` with `textShadow` cycling `none → 0 0 30px gold/0.4 → none` over 2s, delay 0.5

**B. CTA button glow** — `btn-pulse` keyframe and `.btn-premium-glow` already exist in `index.css` (lines 362-366). Add `btn-premium-glow` class to "Get in Touch" buttons on: Home, OurFocus, InvestmentCriteria, OurPlaybook, GuidingPrinciples, About, Contact.

**C. Team photo grayscale-to-color** — `Team.tsx` ProfileCard: wrap photo in `motion.div` with `whileInView` filter transition from `grayscale(100%)` to `grayscale(0%)`

**D. Remove FadeIn from LogoMarquee** — `Home.tsx` line 214: remove `<FadeIn>` wrapper if present (check — line 214 shows bare `<LogoMarquee>`, already done). Team.tsx line 466-468: remove `<FadeIn delay={0.1}>` wrapper.

---

### Section 6: Visual Refinements

**A. ScrollRevealText gradient fades** — Add soft top/bottom gradient fades for non-dark variants to blend section transitions

**B. TypographicNumber gold accent line** — Add thin animated vertical gold line to the left of number values in both OurFocus and InvestmentCriteria

---

### Files Modified

| File | Changes |
|---|---|
| `CinematicScrollReveal.tsx` | Theme-aware overlays, text colors, SectorColumn isDark |
| `USCinematicScrollReveal.tsx` | Same as above |
| `InvestmentCriteria.tsx` | Horizontal eval timeline, dark text fix, number glow, CTA glow |
| `OurFocus.tsx` | Scroll-linked criteria, dark text fix, number glow, CTA glow |
| `Team.tsx` | Dark heading fix, photo grayscale, remove FadeIn on marquee |
| `Home.tsx` | CTA button glow class |
| `About.tsx` | CTA button glow class |
| `GuidingPrinciples.tsx` | CTA button glow class |
| `OurPlaybook.tsx` | CTA button glow class |
| `Contact.tsx` | CTA button glow class |
| `ScrollRevealText.tsx` | Gradient fade blends |

