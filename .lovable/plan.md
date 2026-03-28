

## Plan: Site Reorganization & UI Fixes

### Problem Summary
1. **ScrollRevealText bug**: Last words in long sentences don't fully light up because their opacity ranges end at the very tail of scroll progress (near 1.0), which users rarely reach completely.
2. **Investment Criteria page**: The 6 criteria use a StickyCardStack slides animation that feels heavy; user wants all 6 visible in a polished grid/card layout.
3. **Site restructure**: Current nav (Home / About Us / Investment Criteria / Team / Contact) needs to become (Home / Our Principles / Our Focus / Our Playbook / Team / Contact), splitting current Investment Criteria content across "Our Focus" and "Our Playbook."
4. **Sector font size**: Too small in the cinematic reveal sections.

---

### Changes

#### 1. Fix ScrollRevealText word reveal (ScrollRevealText.tsx)
- Compress word ranges to `[0, 0.8]` instead of `[0, 1]` so all words reach full opacity well before the user finishes scrolling through the section.
- Change: `const start = (i / words.length) * 0.8` and `const end = ((i + 1) / words.length) * 0.8`.
- This ensures the last word hits 100% opacity at 80% scroll progress, leaving comfortable buffer.

#### 2. Replace StickyCardStack with a 2×3 criteria grid (InvestmentCriteria.tsx → becomes OurFocus.tsx)
- Remove `StickyCardStack` for the "What We Look For" section.
- Create a responsive `2×3` grid (mobile: single column) of `GlassCard` components, each showing the criterion number, title, gold divider, and description.
- Staggered fade-in entrance animations using `FadeIn` with incremental delays.
- Each card gets a subtle hover effect (border glow, gold accent line expansion) consistent with existing `GlassCard` patterns.

#### 3. Reorganize navigation and pages

**New nav structure** (SiteHeader.tsx):
```
Home | Our Principles | Our Focus | Our Playbook | Team | Contact
```

**Route changes** (App.tsx):
- `/:region/about` → `/:region/principles` (Our Principles, existing GuidingPrinciples page)
- `/:region/criteria` → `/:region/focus` (Our Focus, new page)
- `/:region/playbook` → new page (Our Playbook)

**Our Focus page** (new `src/pages/OurFocus.tsx`):
- Hero section (reuse existing criteria hero imagery)
- Investment Profile stats band
- "What We Look For" 2×3 criteria grid (all 6 criteria visible)
- Cinematic Scroll Reveal with sectors (existing component, unchanged)
- CTA section

**Our Playbook page** (new `src/pages/OurPlaybook.tsx`):
- Hero section with distinct imagery
- "How We Evaluate Opportunities" section (Discovery → Evaluation → Diligence → Structuring) using the existing `CriteriaPipeline` vertical timeline component (not StickyCardStack slides)
- ScrollRevealText "Our Edge" section
- "Value Creation" section using the existing `CriteriaCarousel` (Stabilise, Optimise, Invest, Compound)
- CTA section

#### 4. Increase sector font sizes (CinematicScrollReveal.tsx, USCinematicScrollReveal.tsx)
- Mobile sector heading: `1.25rem` → `1.5rem`
- Mobile sector item name: `1.05rem` → `1.2rem`
- Mobile sector item desc: `13px` → `15px`
- Desktop sector heading: `1.8rem` → `2rem`
- Desktop sector item name: `1.5rem` → `1.7rem`
- Desktop sector item desc: `17px` → `18px`

---

### Files to create/modify
| File | Action |
|------|--------|
| `src/components/ScrollRevealText.tsx` | Fix word range compression |
| `src/pages/OurFocus.tsx` | New page (criteria grid + sectors) |
| `src/pages/OurPlaybook.tsx` | New page (pipeline + value creation) |
| `src/pages/InvestmentCriteria.tsx` | Remove (replaced by OurFocus + OurPlaybook) |
| `src/components/SiteHeader.tsx` | Update nav items |
| `src/App.tsx` | Update routes |
| `src/components/CinematicScrollReveal.tsx` | Increase sector font sizes |
| `src/components/USCinematicScrollReveal.tsx` | Increase sector font sizes |
| `src/pages/Home.tsx` | Update CTA links from `/criteria` to `/focus` |
| `src/pages/GuidingPrinciples.tsx` | Rename route reference if needed |

