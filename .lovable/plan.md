

## Plan: Fix CRU × WAY Merge Image + Increase × Symbol Size

### Problems
1. **Merge image (`cruxway-merge-v3.jpg`) looks bad and random** — AI-generated abstract image doesn't convey meaning
2. **The × symbol between CRU and WAY is too small** — needs to be more prominent as a visual anchor
3. **Image should be realistic** and thematically meaningful — converging roads, merging paths, or a crossroads

### Changes

#### 1. Generate a new realistic merge image — `src/assets/cruxway-merge-v4.jpg`

Use AI image generation with a detailed prompt for a **realistic, cinematic photograph** of two roads or paths converging into one — shot from an elevated/aerial perspective. Warm golden-hour lighting with dark edges for vignette. This works for both light mode (warm tones blend with cream overlay) and dark mode (golden text pops against darker edges).

Prompt direction: "Cinematic aerial photograph of two country roads merging into a single road at a Y-junction, golden hour sunset light, warm amber tones, long shadows, surrounded by fields, photorealistic, shallow depth of field, dark vignette at edges"

#### 2. Increase the × symbol size — `CruxwayOriginStory.tsx`

Current × font size: `clamp(1rem, 4vw, 1.5rem)` mobile / `clamp(1.2rem, 2.5vw, 2rem)` desktop

Increase to match the CRU/WAY text more closely:
- Mobile: `clamp(1.6rem, 7vw, 2.4rem)`  
- Desktop: `clamp(1.8rem, 4vw, 3rem)`

Also increase its opacity from `0.3`/`0.35` to `0.6`/`0.5` so it reads as a deliberate design element, not an afterthought.

#### 3. Update import — `CruxwayOriginStory.tsx`

Replace `cruxway-merge-v3.jpg` import with `cruxway-merge-v4.jpg`.

### Files Modified
- `src/assets/cruxway-merge-v4.jpg` — new realistic converging roads image (create)
- `src/components/CruxwayOriginStory.tsx` — update import, increase × size and opacity

