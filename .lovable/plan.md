

## Fix Team Page Hero — Remove Random Line & Polish Layout

### Problem
The Team page hero has a **GoldRule** element (a short gold line with a rotating diamond shape) floating awkwardly between the description text and the stats bar at the bottom. This looks like a random, misplaced line. Additionally, the hero content spacing and stats bar positioning need refinement for a polished, senior-designer feel.

### Changes

**1. Remove the GoldRule from the Team hero** (`src/pages/Team.tsx`, lines 383-385)
- The GoldRule works well on pages without a stats bar (About, etc.), but on the Team page it sits between the text and the absolute-positioned stats bar, looking random and unintentional.
- Delete the `<FadeIn delay={0.2}><GoldRule .../></FadeIn>` block.

**2. Fix hero content padding to properly clear the stats bar** (`src/pages/Team.tsx`, line 367)
- Currently `pb-28` on mobile pushes content too close to the stats bar or leaves uneven spacing.
- Change to `pb-36 md:pb-32 lg:pb-32` so the text content has consistent clearance above the stats bar across breakpoints.

**3. Clean up CinematicHero SVG — remove the low-opacity horizontal line and diamond** (`src/components/CinematicHero.tsx`, lines 90-99)
- Remove the horizontal line at `y=720` (line 92) and the diamond path (lines 93-97) — these draw a faint line and shape near the bottom of every hero using CinematicHero, contributing to the "random line" appearance.
- Keep the corner brackets (lines 82-89) and the subtle diagonal convergence lines (lines 90-91) as they provide the geometric framing effect.
- Also remove the two small circles at (250,480) and (950,480) (lines 98-99) which are endpoints of the diagonal lines — they're barely visible and add visual noise.

**4. Remove the horizontal shimmer line** (`src/components/CinematicHero.tsx`, lines 123-130)
- The full-width animated shimmer line at 40% height appears as a random horizontal line flashing across heroes.
- Remove it entirely.

### Files Changed
| File | Change |
|------|--------|
| `src/pages/Team.tsx` | Remove GoldRule, adjust hero content padding |
| `src/components/CinematicHero.tsx` | Remove bottom horizontal line, diamond path, endpoint circles, and shimmer line |

### Risk Assessment
- GoldRule removal is Team-page-only — no other pages affected.
- CinematicHero changes affect all pages using it (About, Team, OurPlaybook, InvestmentCriteria, Contact, GuidingPrinciples). The removed elements are very low opacity (0.1–0.18) decorative lines that read as visual noise. The corner brackets and diagonal convergence lines — the primary geometric framing — are preserved.

