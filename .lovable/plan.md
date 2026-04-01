

## Plan: Fix Crucible Text Visibility, Remove Initial Scroll Effect, Revamp Footer

### Part 1: Crucible "The First Word" Visibility + Transition Fix

**Problem**: "The First Word" label in Act 1 is hard to read. On desktop, there's an unnecessary upward-scrolling effect at the start that delays content visibility.

**Changes in `src/components/CruxwayOriginStory.tsx`:**

1. **Make Act 1 text appear immediately** — remove the delayed entry. Change scroll ranges so content is visible from the start:
   - `act1LabelOp`: `[0.02, 0.05, ...]` → `[0, 0.01, ...]` (instant)
   - `act1HeadingOp`: `[0.03, 0.08, ...]` → `[0, 0.02, ...]`
   - `act1HeadingScale`: start at `1` instead of `0.92` (remove scale-up)
   - `act1HeadingY`: start at `0` instead of `20` (remove Y translation)
   - `act1PhoneticOp`, `act1DefOp`: tighten to appear within first 1-3% of scroll

2. **Boost "The First Word" label visibility** — increase font size from `11px/12px` to `12px/13px`, increase gold opacity, and add a stronger text shadow with a warm glow behind it.

3. **Strengthen TextAura for Act 1** — increase the aura opacity in both modes to ensure the label text pops against the crucible image.

### Part 2: Revamp Footer — Compact, Professional, Structured

**Problem**: Current 4-column footer is too large, unstructured, and visually heavy with unnecessary effects and redundant elements.

**Redesign in `src/components/SiteFooter.tsx`:**

Replace the current sprawling 4-column layout with a **compact 2-row footer**:

**Row 1** (main content — single horizontal line):
- Left: "Cruxway" wordmark + "Lower Middle Market Private Equity" tagline (inline)
- Center: Inline navigation links (Home · Principles · Focus · Playbook · Team · Contact) separated by `·` dots — all on one line
- Right: Region switcher pill + email link

**Row 2** (bottom bar — slim):
- Left: © 2026 Cruxway LLC
- Right: Privacy · Terms

**What gets removed:**
- Remove `DarkSectionEffects` / `LightSectionEffects` (too heavy for footer)
- Remove the grain texture overlay
- Remove the animated shimmer divider (replace with simple `border-t`)
- Remove the `MapPin` address line
- Remove "Patient capital for essential businesses" subtitle
- Remove "Privileged & Confidential" text
- Remove the `GoldRule` component
- Remove the radial glow behind the brand name
- Remove individual `FadeIn` and staggered `motion.div` animations on each link

**What stays:**
- Clean gold top border line
- Theme-aware background (dark navy / light cream)
- Region switcher with flag icons
- Email link
- Copyright + legal links

**Visual style:** Clean, minimal, ~80px total height on desktop. No visual effects — just clean typography and spacing. Professional institutional aesthetic.

### Files Modified
- `src/components/CruxwayOriginStory.tsx` — fix Act 1 timing and label visibility
- `src/components/SiteFooter.tsx` — complete revamp to compact 2-row layout

