

## Extract Flag Icon Components — Plan

### What
Move duplicated `IndiaFlag`, `USFlag`, and `FlagForRegion` SVG components into a shared file and update both consumers.

### Steps

1. **Create `src/components/FlagIcons.tsx`** — Export `IndiaFlag`, `USFlag` (with `size` prop), and `FlagForRegion` (with `region` prop). SVG markup copied verbatim from `SiteHeader.tsx`.

2. **Update `SiteHeader.tsx`** — Remove the three inline component definitions (~lines 10-30), add `import { IndiaFlag, USFlag, FlagForRegion } from '@/components/FlagIcons'`.

3. **Update `SiteFooter.tsx`** — Remove the two inline definitions (`IndiaFlag`, `USFlag`), add `import { IndiaFlag, USFlag } from '@/components/FlagIcons'`.

### Files touched
| File | Action |
|------|--------|
| `src/components/FlagIcons.tsx` | Create |
| `src/components/SiteHeader.tsx` | Remove definitions, add import |
| `src/components/SiteFooter.tsx` | Remove definitions, add import |

No visual or behavioral changes.

