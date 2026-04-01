

## Plan: Fix Origin Story — Images, Hindi Text, Heading, Text Visibility

### Problems to Fix
1. **Text invisible in light mode** — frosted scrims not providing enough contrast; overlays too weak
2. **Hindi meaning of "Crucible" missing** — "Way" already has Hindi (`मार्ग`) but it shows on both India and US pages
3. **Images don't suit light mode** — current crucible image is too dark/busy for light overlays
4. **Origin Story bridge heading** looks unprofessional and poorly formatted

---

### Changes

#### 1. Generate two new images via AI — script to `/tmp`

Generate two cinematic images optimized for both themes (lighter base tones, golden warmth):
- **Crucible image**: Molten gold being poured into a dark stone crucible against a gradient background (dark at edges, golden warmth in center) — works with both dark navy and cream overlays
- **Merge/CRU×WAY image**: Two golden light streams converging into a single beam against a dark-to-warm gradient — replaces reusing the crucible image for Acts 3-4

Save to `src/assets/cruxway-crucible-v2.jpg` and `src/assets/cruxway-merge-v2.jpg`.

#### 2. Fix text visibility — `CruxwayOriginStory.tsx`

**Light mode**: Replace the current weak frosted scrims with stronger ones:
- Increase backdrop blur from `12px` → `20px`
- Strengthen radial gradient center from `rgba(255,255,255,0.55)` → `rgba(255,255,255,0.72)`
- Add a subtle dark text shadow in light mode: `0 1px 3px rgba(0,0,0,0.12)` instead of the white halo (which does nothing against white scrims)
- Increase light-mode overlay opacity further (crucible `0.62`, way `0.65`, merge `0.78`)

**Dark mode**: Add dark scrim behind Act 1 (currently only Act 2 has one) for consistency.

#### 3. Add region-awareness for Hindi text — `CruxwayOriginStory.tsx`

- Import `useRegion` from `@/contexts/RegionContext`
- Add `const { region } = useRegion(); const isIndia = region === 'india';`
- **Act 1 (Crucible)**: Add Hindi meaning only for India: `Hindi: कुठाली (kuṭhālī)` after the phonetic line
- **Act 2 (Way)**: Wrap the existing `· Hindi: मार्ग (mārg)` in a conditional: only show when `isIndia`

#### 4. Redesign Origin Story bridge heading — `GuidingPrinciples.tsx`

Replace the current minimal strip with a more polished, centered heading block:

```
┌─────────────────────────────────────────────┐
│          ── THE ORIGIN STORY ──             │
│  Every name carries weight.                 │
│  Ours was forged with intent.               │
└─────────────────────────────────────────────┘
```

- Centered layout with gold horizontal rules flanking the label
- Subtitle on its own line below, slightly larger font (`13px` → `14px`)
- Proper theme-aware text colors (not `white/40` which disappears in light mode)
- Compact padding: `py-6 md:py-8` (professional spacing without waste)
- Background matches the `solidBg` of the origin story for seamless transition

#### 5. Update image imports — `CruxwayOriginStory.tsx`

- Replace `crucibleImg` import with new `cruxway-crucible-v2.jpg`
- Add new `mergeImg` import for `cruxway-merge-v2.jpg`
- Use `mergeImg` for the Acts 3-4 background instead of reusing `crucibleImg`

---

### Files Modified
- `src/assets/cruxway-crucible-v2.jpg` — new AI-generated image (create)
- `src/assets/cruxway-merge-v2.jpg` — new AI-generated image (create)
- `src/components/CruxwayOriginStory.tsx` — new images, stronger scrims, region-aware Hindi, dark scrims
- `src/pages/GuidingPrinciples.tsx` — redesigned bridge heading

