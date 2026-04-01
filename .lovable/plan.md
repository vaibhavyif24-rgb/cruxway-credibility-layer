

## Plan: Tight Text-Frost, Hindi Meanings, Bridge Redesign

### Problem
1. Large rectangular frosted-glass scrims look unprofessional — visible square backdrop behind text
2. Light mode text still hard to read in places
3. "Way" shows Hindi meaning on all regions; Crucible has no Hindi meaning
4. Origin Story bridge section needs a more polished design

---

### Changes

#### 1. Replace rectangular scrims with tight text-hugging frost — `CruxwayOriginStory.tsx`

Remove all 4 large `rounded-2xl` frosted divs (Acts 1-4). Replace with a compact radial frost that hugs only the gold heading area:

- Smaller element: ~280px wide, ~120px tall, centered on the heading
- Softer radial gradient with higher blur: `blur(16px)` with `rgba(255,255,255,0.65)` center fading to transparent
- `rounded-full` instead of `rounded-2xl` for organic shape
- Strengthen light-mode image overlays further (Crucible: end `0.65`, Way: end `0.68`, Return: end `0.80`) so the images themselves are more washed, reducing the burden on the scrim

#### 2. Add Hindi for Crucible, make Way Hindi conditional — `CruxwayOriginStory.tsx`

- Import `useRegion` from contexts
- Act 1 phonetic line: append `· Hindi: कसौटी (kasauṭī)` only when `isIndia`
- Act 2 phonetic line: show `· Hindi: मार्ग (mārg)` only when `isIndia` (currently always shown)

#### 3. Redesign the Origin Story bridge — `GuidingPrinciples.tsx`

Remove the current text-heavy bridge. Replace with a minimal, cinematic divider:

- A single thin gold rule (1px, 60px wide, centered) with a tiny diamond or dot accent
- No text at all — let the visual transition from hero to origin story speak for itself
- Smooth gradient background from hero bottom color to origin story `solidBg`
- Total height: ~40px, purely a visual seam

This is the senior designer approach: trust the content, don't over-explain with labels.

### Files Modified
- `src/components/CruxwayOriginStory.tsx` — tight frost scrims, stronger overlays, Hindi meanings with region awareness
- `src/pages/GuidingPrinciples.tsx` — minimal bridge redesign

