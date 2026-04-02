

## Fix: Remove residual line & enhance Team hero consistency

### Problem
The `HeroDivider` at line 396 of Team.tsx renders a 1px gradient line at the very bottom of the hero section, sitting behind/below the stats bar's own `border-t`. It adds no value and looks like an artifact.

### Changes

**1. Remove `HeroDivider` from Team hero** (`src/pages/Team.tsx`, line 396)
- Delete `<HeroDivider />` — the stats bar already has its own `border-t` separator, making this redundant.

**2. Confirm CinematicHero Ken Burns motion is active**
- The hero image already has Ken Burns zoom (scale 1.02→1.14 over 28s) and horizontal drift (x: 0→15→-10→0 over 35s) plus scroll parallax. This matches every other page using `CinematicHero`. No change needed to the motion system — it's already consistent.

### Files Changed
| File | Change |
|------|--------|
| `src/pages/Team.tsx` | Remove `<HeroDivider />` (line 396) |

