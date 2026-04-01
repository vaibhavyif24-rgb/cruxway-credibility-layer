

## Plan: Bring Crucible Video Back for Acts 3-4 with Smooth Cross-Dissolve

**File:** `src/components/CruxwayOriginStory.tsx` only.

### What changes

**1. Replace the flat solid background (line 227) with a returning Crucible video layer**

The current Acts 3-4 backdrop is a plain `solidBg` div. Replace it with a third video layer using `CRUCIBLE_VIDEO`, creating a full-circle narrative: Crucible → Way → Crucible.

**2. Smooth cross-dissolve from Way → returning Crucible**

New opacity keyframe for the returning Crucible layer:
- `crucibleReturnOp`: `[0.46, 0.54, 0.95, 1.0]` → `[0, 1, 1, 1]`

This overlaps with the Way video fading out at `[0.46, 0.52]`, creating a professional dissolve where both videos are briefly visible together.

**3. Heavy overlay on the returning Crucible for text readability**

Acts 3-4 have detailed text (the equation, wordmark, statements). The overlay must be much heavier than Act 1's crucible:
- Dark: `hsl(228 55% 8% / 0.78)` → `0.84` → `0.90`
- Light: `hsl(220 30% 10% / 0.70)` → `0.78` → `0.86`

This lets the warm crucible glow bleed through subtly while keeping all text perfectly legible.

**4. Keep CornerBrackets, add Grain and subtle GoldParticles**

The returning layer includes `CornerBrackets` (already there), plus `Grain` and `GoldParticles` for visual consistency with Acts 1-2.

**5. Update Acts 3-4 text to use `videoBodyColor`/`videoMutedColor`**

Since the background is now video (dark in both themes), Acts 3-4 text switches from theme-aware `bodyColor`/`mutedColor` to the always-light `videoBodyColor`/`videoMutedColor` with `videoTextShadow`, matching Acts 1-2. The gold heading colors stay unchanged.

### Technical summary

```text
Layer stack (z-index):
  1: Crucible video (Act 1, fades 0.20→0.28)
  2: Way video (Act 2, fades in 0.22→0.28, out 0.46→0.52)  
  3: Crucible return (Acts 3-4, fades in 0.46→0.54, holds to end)
     └─ heavy overlay + Grain + GoldParticles + CornerBrackets
 10: Text content (all acts)
```

The `solidBgOp` transform and `solidBg` div are removed entirely.

