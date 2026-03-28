

## Plan: Fix Principles Cards — Alternating Colors, Illustrations in Both Modes, Transition Errors

### Issues

1. **Console error**: `PrincipleCard` is a plain `React.FC` — React warns about refs. Fix by converting to `forwardRef`.
2. **No illustrations in light mode**: Celestial SVGs are gated behind `isDark && (...)`. Need to show them in both modes with adjusted opacity.
3. **No alternating colors**: All cards use the same background. Need alternating palettes for visual rhythm.
4. **Transition jank**: IntersectionObserver thresholds need tuning; first card should always start visible.

### Changes

#### A. `PrinciplesSlider.tsx` — Full rework

**Alternating card backgrounds (6 cards, 2 palettes):**
- **Dark mode**: Even cards use deep navy (`hsl(220, 40%, 8%)`), odd cards use slightly warmer dark (`hsl(225, 35%, 11%)`) — subtle but distinct
- **Light mode**: Even cards use warm ivory (`hsl(40, 25%, 96%)`), odd cards use soft warm gray (`hsl(38, 18%, 91%)`) — noticeable alternation

**Illustrations in both modes:**
- Remove the `{isDark && (...)}` gate on `MemoizedCelestial` — render it always
- In light mode: add a lower opacity wrapper (`opacity: 0.25`) and a light-mode vignette (`radial-gradient` fading to the card's light bg color instead of navy)
- In dark mode: keep existing opacity and dark vignette

**Background effects in both modes:**
- Render animated effects (celestial-rotate glow, nebula-pulse, floating particles, shimmer) in BOTH modes
- Light mode: reduce opacity values by ~60% so they're subtle accents rather than dominant
- Dark mode: keep current values

**Fix ref warning:**
- Convert `PrincipleCard` from `React.FC` to `React.forwardRef` with `displayName`

**Transition improvements:**
- Change transition timing from `0.5s ease-out` to `0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)` for smoother feel
- Stagger delays: index `0.08s`, title `0.12s`, rule `0.18s`, description `0.24s`
- Set `isActive` default to `true` for `index === 0` (already done, but ensure IntersectionObserver doesn't immediately flip it off by adjusting rootMargin)

**Border/gap cleanup:**
- Add `border` with `1px solid` using theme-aware subtle border: dark mode `hsl(38, 45%, 55%, 0.06)`, light mode `hsl(38, 30%, 60%, 0.12)`
- This eliminates the visible gap between card edge and background

#### B. `GuidingPrinciples.tsx` — Minor spacing

- Tighten the "Principles" section header bottom margin (`mb-3` to `mb-2`)

### Files Modified

| File | Changes |
|---|---|
| `PrinciplesSlider.tsx` | forwardRef fix, alternating bg palettes, illustrations + effects in both modes, transition tuning, border treatment |
| `GuidingPrinciples.tsx` | Minor spacing tweak |

