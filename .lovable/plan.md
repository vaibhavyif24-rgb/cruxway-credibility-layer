

## Plan: Cruxway Light-Mode Elevation — 7-Section Refinement

This is a large, coordinated effort across 12+ files. The execution order follows the priority specified in the prompt to avoid cascading conflicts.

---

### Phase 1: SiteHeader Light-Mode Awareness

**File: `src/components/SiteHeader.tsx`**

- **Header background**: Conditionally apply `bg-white/90 backdrop-blur-xl border-b border-[hsl(38,20%,88%)]` in light mode vs existing `hero-gradient-animated` in dark mode. Scroll shadow becomes `shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)]` in light mode.
- **Wordmark**: Light mode → `text-[hsl(207,65%,12%)] hover:text-gold`. Dark mode → unchanged `text-primary-foreground`.
- **Nav links**: Light mode inactive → `text-[hsl(210,8%,46%)]`, active → `text-[hsl(207,65%,12%)]`, hover → `text-foreground`. Dark mode → unchanged.
- **Flag dropdown**: Light mode → `bg-white border border-border shadow-lg`. Dark mode → unchanged `hsl(215,50%,8%)`.
- **Theme toggle**: Light mode → `text-muted-foreground hover:text-foreground`. Dark mode → unchanged.
- **Investor Login button**: Light mode → `border-gold/20 text-gold hover:border-gold/40 hover:text-foreground`.
- **Mobile overlay**: Light mode → `bg-white` with `text-foreground`/`text-muted-foreground` links. Dark mode → unchanged `hero-gradient-animated`.
- **Animated shimmer line**: Replace static `h-px bg-gradient-to-r` with a CSS `@keyframes header-shimmer` animation (1px gold gradient sweeping across 4s infinite). Add to `index.css`.
- **Divider between sections**: `bg-primary-foreground/[0.06]` → conditional on theme.

---

### Phase 2: Light-Mode Shimmer & Animation System

**File: `src/index.css`** — Add three new keyframes:
- `shimmer-sweep`: `background-position: -200% 0` → `200% 0`
- `warm-pulse`: opacity 0 → 1 → 0 over cycle
- `float-particle`: translateY/scale/opacity cycle
- `header-shimmer`: background-position sweep for the header gold line

**New file: `src/components/LightSectionEffects.tsx`**
- Mirrors `DarkSectionEffects` role but for light mode
- Accepts `variant: 'hero' | 'section' | 'cta'`
- Renders: faint radial gold glow (top-right, pulsing), 3-5 floating gold dot particles (3-6px, `bg-gold/10`, staggered `float-particle` delays), 1px shimmer line along edges
- Intensity varies by variant (hero = stronger, section = subtle)

**All pages using `<DarkSectionEffects />`**: Wrap in conditional:
```tsx
{isDark ? <DarkSectionEffects variant="..." /> : <LightSectionEffects variant="..." />}
```
Apply in: `Home.tsx`, `About.tsx`, `GuidingPrinciples.tsx`, `OurFocus.tsx`, `OurPlaybook.tsx`, `InvestmentCriteria.tsx`, `Team.tsx`, `Contact.tsx`

**CTA sections**: Light mode background upgrades from `bg-card` to `bg-[hsl(40,18%,96%)]` with subtle animated radial gradient overlay + `LightSectionEffects variant="cta"`.

---

### Phase 3: Global Card Consistency in Light Mode

**File: `src/components/GlassCard.tsx`**
- Light mode: `bg-white/80` or `bg-[hsl(40,20%,98%)]/80`, `border-[hsl(38,15%,90%)]/50`, hover → `border-gold/20`, hover shadow → `shadow-[0_8px_32px_-8px_hsl(38,45%,52%,0.08)]`
- Gold corner accents 1.5x more opaque in light mode

**File: `src/components/StickyCardStack.tsx`**
- Light variant cards: apply same warm white bg, visible warm border, gold accents boosted

**File: `src/components/CriteriaCarousel.tsx`** (if still used)
- Same light-mode card spec

---

### Phase 4: Investment Profile Data + Layout

**File: `src/pages/OurFocus.tsx`**

Update `investmentProfile` for both regions:
- US: Revenue `$1M – $10M` (subtitle `₹10Cr – ₹100Cr`), EBITDA `$500K – $2.5M` (subtitle `₹5Cr – ₹25Cr`), Structure (long text), Hold Period (long text), Aligned Partnerships (long text). Remove Enterprise Value + Geography.
- India: Revenue `₹10Cr – ₹100Cr` (subtitle `$1M – $10M`), EBITDA `₹5Cr – ₹25Cr` (subtitle `$500K – $2.5M`), same Structure/Hold Period/Aligned Partnerships. Remove Enterprise Value + Geography.

**Stat band theme-responsiveness**:
- Dark → keep `bg-primary` + `DarkSectionEffects`
- Light → `bg-[hsl(40,18%,96%)]` with warm borders, `LightSectionEffects variant="section"`, text → `text-foreground` headings, `text-gold` values, `text-muted-foreground` labels

**Stat card layout refactor**:
- Top row: 2 "number cards" (Revenue, EBITDA) side-by-side — value in gold serif, subtitle below in muted
- Bottom row: 3 equal-width cards (Structure, Hold Period, Aligned Partnerships) — label as heading, value as body
- All 5 cards: bordered (`border border-border/30 rounded-sm p-5 md:p-6`), hover lift (`whileHover={{ y: -3 }}`), gold accent on hover
- Light cards: `bg-white/70 backdrop-blur-sm`. Dark cards: `bg-[hsl(210,45%,9%)]/80`

**File: `src/pages/InvestmentCriteria.tsx`** — Apply identical data + layout changes to keep both pages in sync.

---

### Phase 5: Principles "What We Stand For" Redesign

**File: `src/pages/GuidingPrinciples.tsx`**
- Add `SectionLabel` reading "CORE VALUES" above heading
- Split heading: "What We" in `text-foreground`, "Stand For" in `text-gold` (two lines)
- Add descriptor paragraph below heading
- `GoldRule` gets viewport-triggered width animation (0 → final over 600ms ease-out)

**File: `src/components/PrinciplesGrid.tsx`**
- Remove all expand/collapse accordion behavior — descriptions always visible
- Remove "Expand All / Collapse All" toggle
- Each card becomes a refined static glass-card with:
  - `bg-card/60` (dark) / `bg-[hsl(40,20%,97%)]/80` (light), `backdrop-blur-sm`, `border border-border/30`
  - Gold left-edge 2px bar: `bg-gold/15` → `bg-gold/50` on hover, height animation 0→100%
  - Watermark number: `text-[5.5rem]` italic serif, `text-gold/[0.03]` → `text-gold/[0.07]` on hover
  - Content: label, title, gold divider (w-8 → w-12 on hover), description always visible
  - Hover: radial-gradient gold inner glow, `scale(1.02)`
  - Light mode: warm shadow on hover `shadow-[0_8px_32px_-8px_hsl(38,45%,52%,0.08)]`
- Staggered entrance: `opacity:0, y:20` → `opacity:1, y:0`, delay `index * 0.08s`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5`
- Add ambient gold shimmer pseudo-element on grid container via CSS

---

### Phase 6: Criterion Cards Light-Mode Polish

**File: `src/pages/OurFocus.tsx` (CriterionCard)**
- Light mode: `bg-[hsl(40,20%,98%)]/80`, `border-[hsl(38,15%,90%)]/60`, hover → `border-gold/25`, shadow → `shadow-[0_12px_40px_-10px_hsl(38,45%,52%,0.1)]`
- Gold left-edge: default `bg-gold/20`, hover `bg-gold/60`
- Watermark: `text-gold/[0.05]` → `text-gold/[0.1]` on hover
- Gold divider: `bg-gold/30` → `bg-gold/50` on hover

**File: `src/components/StickyCardStack.tsx`**
- Ensure light variant has equivalent warm styling for "What We Look For" on InvestmentCriteria page

---

### Phase 7: ScrollRevealText Light-Mode Polish

**File: `src/components/ScrollRevealText.tsx`**
- When `variant="light"`: highlighted words get `text-shadow: 0 0 40px hsl(38,48%,52%,0.15)` fading in with the word
- Add `LightSectionEffects variant="section"` behind the text when light variant
- Subtext: `text-muted-foreground` (already correct, verify)

---

### Files Modified (Total: ~14 files)

| File | Change |
|---|---|
| `src/components/SiteHeader.tsx` | Full theme-aware header: bg, text, dropdown, mobile overlay, shimmer line |
| `src/index.css` | Add `shimmer-sweep`, `warm-pulse`, `float-particle`, `header-shimmer` keyframes + utility classes |
| `src/components/LightSectionEffects.tsx` | **New** — ambient gold glow, particles, shimmer for light mode sections |
| `src/components/GlassCard.tsx` | Light-mode card spec: warm bg, visible border, boosted gold accents |
| `src/components/PrinciplesGrid.tsx` | Remove accordion, always-visible descriptions, refined static card design |
| `src/pages/GuidingPrinciples.tsx` | Section header: CORE VALUES label, split heading, descriptor, GoldRule animation |
| `src/pages/OurFocus.tsx` | Updated data (both regions), theme-aware stat band with 2-row card layout, CriterionCard light polish |
| `src/pages/InvestmentCriteria.tsx` | Synced data + stat band layout, light-mode polish |
| `src/pages/OurPlaybook.tsx` | Conditional DarkSectionEffects/LightSectionEffects, CTA light upgrade |
| `src/pages/Home.tsx` | Conditional effects, CTA light upgrade |
| `src/pages/About.tsx` | Conditional effects, CTA light upgrade |
| `src/pages/Team.tsx` | Conditional effects |
| `src/pages/Contact.tsx` | Conditional effects, theme-aware hero text |
| `src/components/ScrollRevealText.tsx` | Light variant: text-shadow on highlights, LightSectionEffects overlay |
| `src/components/StickyCardStack.tsx` | Light variant card styling refinement |
| `src/components/DarkSectionEffects.tsx` | No changes (preserved as-is) |

