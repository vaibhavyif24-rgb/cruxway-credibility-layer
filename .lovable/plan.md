

## Typography Consistency Audit — Plan

### Target Scale

| Role | Spec |
|------|------|
| Hero H1 | `font-serif text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.08] tracking-[-0.03em]` |
| Section H2 | `font-serif text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15] tracking-[-0.02em]` |
| Eyebrow/Label | `font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-gold` |
| Body text | `font-sans text-[15px] leading-[1.75]` |
| Card titles | `font-serif text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.2] tracking-[-0.02em]` |
| Card body | `font-sans text-[14px] leading-[1.7]` |
| Button/CTA | `font-sans text-[11px] font-semibold uppercase tracking-[0.16em]` |

### Deviations Found & Fixes

#### 1. SectionLabel component (`src/components/ui/Section.tsx` line 68)
- **Current**: `text-[11px] md:text-[12px] font-semibold tracking-[0.25em]`
- **Fix**: `text-[11px] font-bold tracking-[0.25em]` (remove responsive md:text-[12px], change semibold→bold)

#### 2. ScrollRevealText label (`src/components/ScrollRevealText.tsx` line 99)
- **Current**: `text-[12px] md:text-[13px] font-bold tracking-[0.3em]`
- **Fix**: `text-[11px] font-bold tracking-[0.25em]` (standardize size and tracking)

#### 3. Hero H1s — standardize min clamp from 2rem to 2.2rem
All hero H1s currently use `text-[clamp(2rem,5vw,3.4rem)]`. Change min to 2.2rem:
- `Home.tsx` line 417
- `OurFocus.tsx` line 123
- `OurPlaybook.tsx` line 341
- `GuidingPrinciples.tsx` line 36
- `Team.tsx` line 372
- `Contact.tsx` line 41

#### 4. CTA section H2s — standardize to section H2 scale
Three CTA sections use `text-[clamp(1.6rem,3.5vw,2.6rem)]` instead of the standard H2:
- `Home.tsx` line 536
- `OurPlaybook.tsx` line 410
- `GuidingPrinciples.tsx` line 71
- `OurFocus.tsx` line 263

**Fix**: Change all to `text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.15]`

#### 5. Hero body text — standardize
Currently `text-[15px] md:text-[16px]`. Spec says body = `text-[15px]`.
- `Home.tsx` line 424
- `OurFocus.tsx` line 128
- `OurPlaybook.tsx` line 346
- `GuidingPrinciples.tsx` line 41
- `Team.tsx` line 377
- `Contact.tsx` line 46

**Fix**: Remove `md:text-[16px]`, keep `text-[15px] leading-[1.75]`

#### 6. CTA body text — standardize
Currently `text-[13px] md:text-[15px]` in multiple CTA sections.
- `Home.tsx` line 539
- `OurPlaybook.tsx` line 413
- `GuidingPrinciples.tsx` line 74
- `OurFocus.tsx` line 266

**Fix**: `text-[15px] leading-[1.75]` (remove responsive step-up from 13px)

#### 7. Home.tsx gold tagline (line 412)
- **Current**: `text-[12px] md:text-[13px] font-semibold tracking-[0.22em]`
- **Fix**: `text-[11px] font-semibold tracking-[0.16em]` (align to CTA/button spec)

#### 8. Card titles — standardize to `clamp(1.1rem,2vw,1.4rem)`
- Home ProcessCarousel card title (line 185): `text-[clamp(1.2rem,2.5vw,1.6rem)]` → `text-[clamp(1.1rem,2vw,1.4rem)]`
- OurPlaybook StepNavigator card title (line 81): `text-[clamp(1.2rem,2.2vw,1.6rem)]` → `text-[clamp(1.1rem,2vw,1.4rem)]`
- OurPlaybook ValueCreation card title (line 298): `text-[clamp(1.3rem,2.5vw,1.8rem)]` → `text-[clamp(1.1rem,2vw,1.4rem)]`
- OurFocus CriteriaTabs card title (line 362): `text-[clamp(1.2rem,2.5vw,1.6rem)]` → `text-[clamp(1.1rem,2vw,1.4rem)]`

#### 9. Card body text — standardize to `text-[14px] leading-[1.7]`
- Home ProcessCarousel body (line 199): `text-[14px] md:text-[15px] leading-[1.8]` → `text-[14px] leading-[1.7]`
- OurPlaybook StepNavigator body (line 85): `text-[15px] md:text-[16px] leading-[1.75]` → `text-[14px] leading-[1.7]`
- OurPlaybook ValueCreation body (line 306): `text-[15px] md:text-[17px] leading-[1.85]` → `text-[14px] leading-[1.7]`
- OurFocus CriteriaTabs body (line 371): `text-[15px] md:text-[17px] leading-[1.85]` → `text-[14px] leading-[1.7]`
- OurFocus CriteriaAccordion body (line 428): `text-[15px] leading-[1.75]` → `text-[14px] leading-[1.7]`
- ConvictionsDeck body (line 110): `text-[14px] md:text-[15px] leading-[1.8]` → `text-[14px] leading-[1.7]`
- ConvictionsDeck subtext (line 149): `text-[14px] md:text-[15px]` → `text-[14px] leading-[1.7]` (already close)

#### 10. CTA button text — standardize
Currently `text-[11px] md:text-[12px]` in most CTA buttons. Spec says `text-[11px]`.
- Remove `md:text-[12px]` from all CTA link elements across Home, OurFocus, OurPlaybook, GuidingPrinciples

#### 11. Team.tsx profile card specifics
- Profile name (line 253): `text-[1.05rem] md:text-[1.3rem]` — this is a name, not a card title per se. Leave as-is.
- Profile summary (line 270): `text-[12.5px] md:text-[13px]` — bump to `text-[14px] leading-[1.7]` per card body spec
- Profile highlights (line 281): `text-[11.5px] md:text-[12px]` — small detail text, leave as-is (intentionally subordinate)

#### 12. Contact.tsx card body (line 78, 102)
- Already `text-[14px] md:text-[15px]` → standardize to `text-[14px] leading-[1.7]`

#### 13. OurFocus.tsx TypographicText body (line 499)
- `text-[14.5px]` → `text-[14px] leading-[1.7]`

#### 14. Contact.tsx card eyebrow labels (lines 72, 96)
- `text-[10px] md:text-[11px]` → `text-[11px]` (standardize)

#### 15. OurPlaybook.tsx value creation description body (line 390)
- `text-[14px] md:text-[15px]` → `text-[15px] leading-[1.75]` (this is section body, not card body)

### Files Modified

| File | Change count |
|------|-------------|
| `src/components/ui/Section.tsx` | 1 |
| `src/components/ScrollRevealText.tsx` | 1 |
| `src/components/ConvictionsDeck.tsx` | 2 |
| `src/pages/Home.tsx` | ~8 |
| `src/pages/OurFocus.tsx` | ~7 |
| `src/pages/OurPlaybook.tsx` | ~7 |
| `src/pages/GuidingPrinciples.tsx` | ~4 |
| `src/pages/Team.tsx` | ~4 |
| `src/pages/Contact.tsx` | ~4 |

### What stays unchanged
- Font families (EB Garamond / Inter)
- All animations, layout, responsive breakpoints, theme conditionals
- Decorative/watermark text sizes
- Navigation text, stat numbers, disclaimer text

