

## Plan: Fix Light Mode Text Readability + Compact Origin Story Bridge

### Problem
1. **Light mode text invisible on images** — the warm cream overlays are too transparent, and dark navy text lacks contrast against bright, busy backgrounds. Need a localized frosted-glass scrim behind each text block.
2. **"The Origin Story" bridge section wastes vertical space** — currently ~120px of padding with a tiny label, a divider, and a subtitle stacked vertically. Needs to be collapsed into a tight, elegant transition.

---

### Changes

#### 1. Add frosted text scrims to all 4 Acts (light mode only) — `CruxwayOriginStory.tsx`

Each Act's content div already has a centered layout. Add a **backdrop blur scrim** behind the text area that only appears in light mode:

```tsx
// Inserted inside each Act's content wrapper, behind text
{!isDark && (
  <div
    className="absolute rounded-2xl pointer-events-none"
    style={{
      width: isMobile ? '92%' : '560px',
      height: isMobile ? '70%' : '380px',
      background: 'radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 60%, transparent 100%)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: -1,
    }}
  />
)}
```

This creates a soft frosted-glass halo that makes dark text pop without looking like an ugly box. The radial gradient fades to transparent at the edges for a natural, editorial look.

Also strengthen the light-mode text shadows to use a subtle dark halo instead of the current white halo (white-on-white doesn't help):

- `videoTextShadow` light: `'0 1px 12px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.4)'`
- `videoSubShadow` light: `'0 1px 8px rgba(255,255,255,0.7)'`

#### 2. Strengthen light-mode overlays slightly — `CruxwayOriginStory.tsx`

Increase the light-mode overlay opacity by ~10-15% so the images are more washed out (closer to the reference screenshot):

- Crucible light: end at `0.58` instead of `0.50`
- Way light: end at `0.62` instead of `0.55`
- Crucible return light: end at `0.75` instead of `0.70`

#### 3. Compact the Origin Story bridge — `GuidingPrinciples.tsx`

Replace the current large padded block (gradient div + padded content area = ~140px total) with a single compact strip:

- Remove the separate `h-16` gradient div
- Collapse into one `py-5 md:py-6` container with the label and subtitle on a single line or tightly stacked
- Reduce to: small gold "THE ORIGIN STORY" label inline with the subtitle text, separated by a `·` dot or thin gold divider — all in one line on desktop, two tight lines on mobile
- Total height drops from ~140px to ~60-70px

Layout: `THE ORIGIN STORY  ——  Every name carries weight. Ours was forged with intent.` (single horizontal line on desktop)

### Files Modified
- `src/components/CruxwayOriginStory.tsx` — frosted scrims + overlay opacity tweaks
- `src/pages/GuidingPrinciples.tsx` — compact bridge section

