## Plan: Definitive Light-Mode Fix + Content Updates (14 Fixes)

---

### Fix 1: ScrollRevealText Theme-Awareness

**File: `src/components/ScrollRevealText.tsx**`

Import `useTheme`. Replace the simple `isDark = variant === 'dark'` with a 3-way classification:

- `isActuallyDark` = variant is dark AND theme is dark → keep existing navy bg + cream text
- `isContrastLight` = variant is dark AND theme is light → warm stone bg `bg-[hsl(40,16%,94%)]`, dark text, gold highlights, LightSectionEffects
- `isLight` = variant is light → existing behavior

Update: section className, label color, word text color, stat colors, subtext color, stats border, and ambient overlay. Pass the correct `isDark` boolean to Word and StatReveal sub-components.

---

### Fix 2: LogoMarquee Theme-Awareness

**File: `src/components/LogoMarquee.tsx**`

Import `useTheme`. When `variant === 'dark'` but `theme === 'light'`:

- Background: `bg-[hsl(40,16%,94%)]` instead of `bg-primary`
- Edge fades: `from-[hsl(40,16%,94%)]` instead of `from-primary`
- mixBlendMode: `undefined` (not `screen`)
- Opacity: `opacity-50 hover:opacity-75`

Dark theme + dark variant: unchanged.

---

### Fix 3: Team StatItem Visibility

**File: `src/pages/Team.tsx**` (StatItem component, ~line 350-365)

Make StatItem accept `isDark` prop. Change:

- Value: `isDark ? 'text-primary-foreground' : 'text-foreground'`
- Label: `isDark ? 'text-primary-foreground/25' : 'text-muted-foreground/50'`

Update the 3 StatItem usages in the stats bar to pass `isDark`.

---

### Fix 4: Remove Benson Zhang Entirely

**File: `src/pages/Team.tsx**`

- Delete `bensonPhoto` import (line 15)
- Delete all Benson deal logo imports (lines 28-35: abgLogo, rpxLogo, ideraLogo, westernDigitalLogo, mindbodyLogo, selligentLogo, micronLogo)
- Delete `bensonDealLogos` array (lines 98-106)
- Delete the Benson entry from `founders` array (lines 109-126), keeping only Harin
- Update stats bar:
  - `"25+"` → `"15+"`
  - `"$30B+"` → `"$15B+"`
  - US third stat: keep `"50+"` / `"Transactions"`
- Remove Benson-related logos from `foundersLogos` array: remove `creditSuisseLogo` entry (line 187) since it was Benson's — actually check: Harin also lists Credit Suisse? No, Harin's logos are Warburg, Evercore, Deutsche Bank. Credit Suisse was Benson's. Remove Credit Suisse from `foundersLogos` (line 187). Also remove `blackrockLogo` from `foundersLogos` (line 182) — BlackRock was Benson's institution. Keep: Warburg Pincus, Neos Partners, Deutsche Bank, Saltwater, Lam Research, Evercore, Dunes Point, Culinary Institute, DePaul.   
  
REMOVE Bekley Haas logo too.

---

### Fix 5: Investment Profile Currency — Remove Subtitles

**Files: `src/pages/OurFocus.tsx`, `src/pages/InvestmentCriteria.tsx**`

US region: Remove `subtitle` from Revenue and EBITDA entries.
India region: Remove `subtitle` from Revenue and EBITDA entries.
Remove the `subtitle` rendering logic from StatCard in both files (the `{subtitle && ...}` block). Remove `subtitle` from StatCard props.

---

### Fix 6: StatCard Design Upgrade

**Files: `src/pages/OurFocus.tsx`, `src/pages/InvestmentCriteria.tsx**`

Enhance number cards (isCompact):

- Gold top-border: `border-t-2 border-gold/30` that shimmers on hover
- Value: `font-serif text-[clamp(1.5rem,3vw,2rem)] text-gold` with hover text-shadow
- Currency watermark: region-based `$` or `₹` at `absolute top-3 right-4 text-[3rem] text-gold/[0.05] font-serif italic`

Enhance text cards:

- Gold left-border: `border-l-2 border-gold/20 hover:border-gold/50`
- Gold dot before label: `<span className="text-gold mr-1">•</span>`
- Value text: `text-[14px] md:text-[15px] text-foreground/85 leading-[1.7]`
- Hover: lift 4px + radial gold inner glow

Add shimmer sweep pseudo-element on the stat band container.

---

### Fix 7 + 8: Home & Team Page Verification

These are auto-fixed by Fixes 1-4. No additional code changes needed — ScrollRevealText and LogoMarquee will now be theme-aware.

---

### Fix 9: CSS Keyframes Completeness

**File: `src/index.css**`

Add missing keyframe:

```css
@keyframes gold-border-pulse {
  0%, 100% { border-color: hsl(38 48% 52% / 0.15); }
  50% { border-color: hsl(38 48% 52% / 0.35); }
}
```

Add utility class `.gold-shimmer-border`.

All other keyframes already exist.

---

### Fix 10: Section Ambient Effects Audit

Pages to verify/update: All pages already have conditional `{isDark ? <DarkSectionEffects> : <LightSectionEffects>}` from the previous round. Quick audit confirms this is done in Home, About, GuidingPrinciples, OurFocus, InvestmentCriteria, OurPlaybook, Team, Contact.

---

### Fix 11: CinematicScrollReveal & USCinematicScrollReveal

**Files: `src/components/CinematicScrollReveal.tsx`, `src/components/USCinematicScrollReveal.tsx**`

Both components use full-bleed photographic images with dark gradient overlays — this is intentional cinematic photography, not a "dark section" that should flip. These are image-based reveals (like hero banners) where the dark overlay ensures text readability over the photo. No changes needed — the image always needs a dark overlay regardless of theme.

---

### Fix 12: SiteFooter — Already Theme-Aware

The footer already uses `isDark ? 'bg-primary' : 'bg-card'` conditional. Footer conventionally stays dark/navy even in light mode on PE sites. Current implementation is correct. No changes.

---

### Fix 13: GlassCard — Already Updated

GlassCard already has the light-mode spec from the previous round (warm bg, visible border, boosted gold accents). No changes needed.

---

### Fix 14: Mobile Responsiveness

Verified by structural review. All grid layouts use responsive breakpoints. No additional changes needed.

---

### Files Modified


| File                                  | Changes                                                                          |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| `src/components/ScrollRevealText.tsx` | Import useTheme, 3-way theme logic, warm stone bg for dark-variant-in-light-mode |
| `src/components/LogoMarquee.tsx`      | Import useTheme, warm stone bg for dark-variant-in-light-mode                    |
| `src/pages/Team.tsx`                  | Remove all Benson traces, fix StatItem visibility, update stats                  |
| `src/pages/OurFocus.tsx`              | Remove subtitles, upgrade StatCard design                                        |
| `src/pages/InvestmentCriteria.tsx`    | Remove subtitles, upgrade StatCard design                                        |
| `src/index.css`                       | Add gold-border-pulse keyframe + utility class                                   |
