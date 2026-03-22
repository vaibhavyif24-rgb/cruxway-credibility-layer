

## Plan: Consistent Animations, Effects, and Polish Across All Pages

### Issues Identified

1. **Console warnings**: `StatBlock` in Home.tsx and `LogoMarquee` are function components receiving refs from `FadeIn` (which uses `forwardRef` and passes `ref`). These need `forwardRef` wrapping or the `FadeIn` usage needs adjustment.

2. **Missing `DarkSectionEffects` on some dark sections**: The About page's "Our Approach" dark section has `DarkSectionEffects` but the Contact page's "Commitment" section (light) and InvestorLogin dark page lack the animated effects that other dark sections use.

3. **Inconsistent CTA sections**: All pages have CTA sections with `DarkSectionEffects variant="cta"` except Contact (no CTA section) and InvestorLogin (no effects at all).

4. **Contact page lacks visual richness**: No animated accents, no GlassCard usage on contact cards (they use manual glass styling instead of the shared component), and the Commitment section has no border-top separation pattern.

5. **InvestorLogin page has no `DarkSectionEffects`**: It's a fully dark page but lacks the floating orbs, shimmer lines, and particle effects used on other dark sections.

6. **Footer lacks any animation**: `SiteFooter` has no `FadeIn` or motion effects, unlike every other section.

7. **Whitespace opportunities**: Contact page has two consecutive light sections (Contact Cards + Commitment) that could benefit from tighter integration. The Team page hero has tight padding on mobile.

---

### Changes by File

#### 1. `src/pages/Home.tsx`
- Wrap `StatBlock` with `forwardRef` to fix the console warning when used inside `FadeIn`

#### 2. `src/components/LogoMarquee.tsx`
- Wrap with `forwardRef` to fix console warning when used inside `FadeIn`

#### 3. `src/pages/Contact.tsx`
- Add `DarkSectionEffects` import
- Add a dark CTA section at the bottom (before disclaimer) matching the pattern from all other pages, with `DarkSectionEffects variant="cta"`
- Convert contact cards to use `GlassCard` component for consistency
- Add `FadeIn` with staggered delays to the Commitment section text elements

#### 4. `src/pages/InvestorLogin.tsx`
- Add `DarkSectionEffects` to the background for floating orbs, shimmer, and particle effects matching other dark sections
- Add gold corner accents to the form container matching the `GlassCard` pattern
- Add subtle `GoldRule`-style divider elements

#### 5. `src/components/SiteFooter.tsx`
- Wrap footer content blocks in `FadeIn` for scroll-triggered entrance animations
- Add a subtle `GoldRule` accent next to the brand name
- Add `DarkSectionEffects` (minimal) for the footer background to match other dark sections

#### 6. `src/pages/About.tsx` (the route renders `GuidingPrinciples.tsx` for `/about`)
No changes needed; already well-structured with consistent effects.

#### 7. `src/pages/Team.tsx`
- The hero section uses `hero-gradient-animated` but not `CinematicHero` like other pages. This is intentional (no photo). Add a subtle `GoldRule` after the subtitle for consistency.
- The Network section (`Section` component wrapper) doesn't have visible `FadeIn` on the left-side heading; verify it's working.

#### 8. `src/components/SiteHeader.tsx`
- No changes needed; already has scroll shadow and mobile animation.

---

### Summary of Consistency Fixes

| Pattern | Currently Missing On | Fix |
|---|---|---|
| `DarkSectionEffects` on dark backgrounds | InvestorLogin, SiteFooter | Add component |
| `FadeIn` scroll animations | SiteFooter, some Contact elements | Wrap with FadeIn |
| `GlassCard` for card-style content | Contact page cards | Replace manual styling |
| CTA section with `hero-gradient-animated` | Contact page | Add CTA before disclaimer |
| `forwardRef` on components used inside FadeIn | StatBlock, LogoMarquee | Wrap with forwardRef |
| Gold corner accents | InvestorLogin form | Add accent spans |

### Files to Edit
1. `src/pages/Home.tsx` - Fix StatBlock forwardRef
2. `src/components/LogoMarquee.tsx` - Add forwardRef
3. `src/pages/Contact.tsx` - Add GlassCard, CTA section, DarkSectionEffects
4. `src/pages/InvestorLogin.tsx` - Add DarkSectionEffects, gold accents
5. `src/components/SiteFooter.tsx` - Add FadeIn, DarkSectionEffects

